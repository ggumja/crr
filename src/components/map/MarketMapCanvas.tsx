import React, { useState, useRef } from 'react';
import { 
  Search, 
  Utensils, 
  ShoppingBag, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  X, 
  Layers,
  MapPinOff,
  Landmark,
  Moon,
  Sparkles
} from 'lucide-react';
import { MARKETS_DATA } from '../../data/marketsData';
import { STORES_DATA } from '../../data/storesData';
import { StoreItem, MarketId, ThemeCategory } from '../../types/market';
import { useMarket } from '../../context/MarketContext';
import { FilterChips } from './FilterChips';
import { StorePreviewCard } from './StorePreviewCard';

// Market zone polygon definitions based on the official 1024x964 guide map illustration
interface MarketPolygon {
  id: MarketId;
  name: string;
  points: string; // percentage points (0-100)
  labelPos: { x: number; y: number };
}

const MARKET_POLYGONS: MarketPolygon[] = [
  {
    id: 'yaknyeongsi',
    name: '서울약령시',
    points: '1,1 15.5,1 15.5,27.5 1,27.5',
    labelPos: { x: 8, y: 14 },
  },
  {
    id: 'hyundai',
    name: '청량리현대시장 / 현대코어',
    points: '15,7 36,7 36,27.5 15,27.5',
    labelPos: { x: 25, y: 17 },
  },
  {
    id: 'traditional',
    name: '청량리전통시장',
    points: '40.5,0 58,0 58.5,15.5 56,16 56,26.5 40.5,26.5',
    labelPos: { x: 49, y: 13 },
  },
  {
    id: 'cheonggwa',
    name: '청량리청과물시장',
    points: '64,27 93,27 93,37 91,46 67,46 64,27',
    labelPos: { x: 78, y: 36 },
  },
  {
    id: 'gyeongdong',
    name: '경동시장',
    points: '12.5,31 41,31 41,51 22.5,51 12.5,53.5',
    labelPos: { x: 27, y: 40 },
  },
  {
    id: 'gwangseong',
    name: '경동광성상가',
    points: '41,27.5 49.5,27.5 49.5,35.5 62.5,35.5 62.5,41 55,48.5 53,48.5 42.5,45',
    labelPos: { x: 50, y: 39 },
  },
  {
    id: 'dongseo',
    name: '청량리동서시장',
    points: '50,47 65.5,47 69.5,56.5 70,64 64.5,64 64.5,60 52,60 50,47',
    labelPos: { x: 60, y: 55 },
  },
  {
    id: 'wholesale',
    name: '청량리종합도매시장',
    points: '69.5,41.5 93,41.5 95,54 75,61.5 69.5,56.5',
    labelPos: { x: 82, y: 51 },
  },
];

export const MarketMapCanvas: React.FC = () => {
  const { 
    selectedMarketFilter, 
    setSelectedMarketFilter, 
    searchQuery, 
    setSearchQuery, 
    openStoreDetail,
  } = useMarket();

  const [activePreviewStore, setActivePreviewStore] = useState<StoreItem | null>(STORES_DATA[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showStorePins, setShowStorePins] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Filter stores according to search query and 4 theme roads or market filter
  const filteredStores = STORES_DATA.filter((store) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = store.name.toLowerCase().includes(q);
      const matchMarket = store.marketName.toLowerCase().includes(q);
      const matchTags = store.tags.some(t => t.toLowerCase().includes(q));
      const matchMenu = store.signatureMenu.some(m => m.toLowerCase().includes(q));
      if (!matchName && !matchMarket && !matchTags && !matchMenu) return false;
    }

    // 4대 테마길 기준 필터 (볼거리, 먹거리, 즐길거리, 야간놀거리)
    if (selectedMarketFilter === 'theme_sight') return store.themeCategory === 'sight';
    if (selectedMarketFilter === 'theme_food') return store.themeCategory === 'food';
    if (selectedMarketFilter === 'theme_play') return store.themeCategory === 'play';
    if (selectedMarketFilter === 'theme_nightlife') return store.themeCategory === 'nightlife';

    // 전체 필터
    if (selectedMarketFilter === 'all') return true;

    // 9개 시장 구역 필터
    return store.marketId === selectedMarketFilter;
  });

  // 4대 테마길 기준 직관적 아이콘 & 테마 색상 반환
  const getThemePinStyle = (themeCategory: ThemeCategory) => {
    switch (themeCategory) {
      case 'sight':
        return {
          icon: Landmark,
          bg: 'bg-sky-600',
          border: 'border-sky-300',
          text: 'text-white',
          label: '볼거리',
        };
      case 'food':
        return {
          icon: Utensils,
          bg: 'bg-rose-600',
          border: 'border-rose-300',
          text: 'text-white',
          label: '먹거리',
        };
      case 'play':
        return {
          icon: Sparkles,
          bg: 'bg-emerald-600',
          border: 'border-emerald-300',
          text: 'text-white',
          label: '즐길거리',
        };
      case 'nightlife':
        return {
          icon: Moon,
          bg: 'bg-indigo-700',
          border: 'border-indigo-400',
          text: 'text-white',
          label: '야간놀거리',
        };
      default:
        return {
          icon: ShoppingBag,
          bg: 'bg-slate-700',
          border: 'border-slate-400',
          text: 'text-white',
          label: '점포',
        };
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Render the core map content (clean, simple without tour clutter)
  const renderMapContent = () => (
    <div 
      className="relative w-full aspect-[1024/964] select-none transition-transform duration-200 origin-center overflow-hidden"
      style={{
        transform: `scale(${zoomLevel})`,
      }}
    >
      {/* 1. Base Map Illustration (Official 2.5D Guide Map) */}
      <img
        src="./cheongnyang-official-map.jpg"
        alt="1960 청량로드 전통시장 공식 가이드맵"
        className="w-full h-full object-contain pointer-events-none block"
      />

      {/* 2. Interactive SVG Layer for Market Zone Highlighting */}
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-auto"
      >
        <defs>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Market Zone Hotspots */}
        {showZones && MARKET_POLYGONS.map((zone) => {
          const isSelected = selectedMarketFilter === zone.id;
          const isHovered = hoveredZone === zone.id;

          return (
            <polygon
              key={zone.id}
              points={zone.points}
              onClick={() => setSelectedMarketFilter(isSelected ? 'all' : zone.id)}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              className="cursor-pointer transition-all duration-200"
              fill={
                isSelected 
                  ? 'rgba(239, 197, 72, 0.28)' 
                  : isHovered 
                  ? 'rgba(239, 197, 72, 0.16)' 
                  : 'rgba(255, 255, 255, 0.01)'
              }
              stroke={isSelected ? '#EFC548' : isHovered ? '#EFC548' : 'transparent'}
              strokeWidth={isSelected ? '0.8' : isHovered ? '0.6' : '0'}
              strokeDasharray={isSelected ? 'none' : '1.5 1'}
              filter={isSelected ? 'url(#goldGlow)' : undefined}
            />
          );
        })}
      </svg>

      {/* 3. Interactive Store Pins Overlay (Clean, 번호 없는 깔끔한 핀) */}
      {showStorePins && filteredStores.map((store) => {
        const isSelected = activePreviewStore?.id === store.id;
        const style = getThemePinStyle(store.themeCategory);
        const Icon = style.icon;

        return (
          <button
            key={store.id}
            onClick={() => setActivePreviewStore(store)}
            style={{
              left: `${store.coordinates.x}%`,
              top: `${store.coordinates.y}%`,
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-200 group active:scale-95 ${
              isSelected ? 'scale-125 z-30' : 'hover:scale-115'
            }`}
            title={`${store.name} (${store.marketName}) - ${style.label}`}
          >
            {/* Animated Pulse Ring on Selected */}
            {isSelected && (
              <span className="absolute -inset-1.5 rounded-full bg-[#EFC548] animate-ping opacity-75 -z-10" />
            )}

            {/* Clean Rounded Pin Badge without tour numbers */}
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md border-2 transition-all ${
              isSelected
                ? 'bg-[#EFC548] text-[#0C1326] border-white font-black ring-2 ring-[#0C1326]/40 scale-110'
                : `${style.bg} ${style.text} ${style.border} hover:brightness-110`
            }`}>
              <Icon size={14} className="stroke-[2.2px]" />
            </div>

            {/* Floating Store Name Tooltip */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2.5 py-1 rounded-lg bg-[#0C1326] text-white text-xs font-bold whitespace-nowrap pointer-events-none shadow-lg border border-white/20 z-30 transition-opacity ${
              isSelected ? 'block' : 'hidden group-hover:block'
            }`}>
              <span>{store.name}</span>
            </div>
          </button>
        );
      })}

      {/* 4. Active Zone Tooltip Float */}
      {hoveredZone && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0C1326]/95 backdrop-blur-sm text-white text-xs font-bold border border-[#EFC548]/40 shadow-md flex items-center gap-2 pointer-events-none z-30">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFC548]" />
          <span>
            {MARKET_POLYGONS.find(z => z.id === hoveredZone)?.name}
            {MARKETS_DATA.find(m => m.id === hoveredZone) ? ` (${MARKETS_DATA.find(m => m.id === hoveredZone)?.storesCount}개 점포)` : ''}
          </span>
          <span className="text-[#EFC548] text-xs font-extrabold">· 클릭하여 점포 필터</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-3.5">
      {/* Search Input Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="점포명, 품목(순대국, 쌍화차, 통닭, 족발, 과일) 검색..."
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm sm:text-base text-navy-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EFC548] focus:bg-white shadow-xs transition-colors"
        />
        <Search className="absolute left-4 top-4 text-slate-400" size={18} />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 bg-slate-200/70 rounded-full w-6 h-6 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* 4대 테마길 기준 Filter Chips Bar */}
      <FilterChips />

      {/* 4대 테마 컬러 범례 (깔끔하고 직관적인 가이드) */}
      <div className="flex items-center justify-between px-1 py-1 text-[11px] text-slate-500 font-bold bg-slate-100/70 rounded-xl border border-slate-200/60 overflow-x-auto no-scrollbar gap-2">
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" />
          <span>볼거리</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
          <span>먹거리</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
          <span>즐길거리</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-700 inline-block" />
          <span>야간놀거리</span>
        </div>
        <span className="text-slate-400 font-medium shrink-0">총 {filteredStores.length}개 점포</span>
      </div>

      {/* Interactive Map Header Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFC548]" />
          <span className="font-extrabold text-navy-900 text-sm sm:text-base">공식 안내도</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">2.5D 입체 지도</span>
        </div>

        {/* Map Control Toggle Chips */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowZones(!showZones)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 shrink-0 transition-all active:scale-95 ${
              showZones
                ? 'bg-[#FAF6E6] text-[#7E5D0A] border-[#EFC548] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="9개 시장 구역 토글"
          >
            <Layers size={13} />
            <span>시장 구역</span>
          </button>

          <button
            onClick={() => setShowStorePins(!showStorePins)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 shrink-0 transition-all active:scale-95 ${
              showStorePins
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="점포 핀 표시 토글"
          >
            <MapPinOff size={13} />
            <span>점포 핀</span>
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-navy-900 text-xs font-bold shrink-0 shadow-2xs active:scale-95 transition-all"
            title="지도 크게 보기"
          >
            <Maximize2 size={13} />
            <span>크게보기</span>
          </button>
        </div>
      </div>

      {/* Main Map Box */}
      <div 
        ref={mapContainerRef}
        className="relative bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm"
      >
        {renderMapContent()}

        {/* Floating Zoom Control Buttons (Bottom Right) */}
        <div className="absolute bottom-3 right-3 z-30 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-md border border-slate-200/80">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-navy-900 hover:bg-slate-100 active:scale-95 transition-all"
            title="지도 확대"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-navy-900 hover:bg-slate-100 active:scale-95 transition-all"
            title="지도 축소"
          >
            <ZoomOut size={16} />
          </button>
          {zoomLevel !== 1 && (
            <button
              onClick={handleResetZoom}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-navy-900 hover:bg-slate-100 active:scale-95 transition-all"
              title="원래 크기로 리셋"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Store Preview Card on Selection */}
      {activePreviewStore && (
        <StorePreviewCard
          store={activePreviewStore}
          onClose={() => setActivePreviewStore(null)}
        />
      )}

      {/* Filtered Store List View Below Map (원래 매장 목록 복원) */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-sm sm:text-base text-navy-900">
            상권 주요 점포 ({filteredStores.length}곳)
          </h3>
          <span className="text-xs text-slate-400">지도 핀 클릭 시 위치 확인</span>
        </div>

        <div className="space-y-2.5">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              onClick={() => {
                setActivePreviewStore(store);
                // 스크롤 올려서 지도로 포커스
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className={`p-3.5 sm:p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md ${
                activePreviewStore?.id === store.id
                  ? 'bg-[#FAF6E6] border-[#EFC548] ring-2 ring-[#EFC548]/40'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                      {store.marketName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {store.category}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-navy-900 mt-1 truncate">{store.name}</h4>
                  <p className="text-xs text-slate-600 truncate mt-0.5">{store.signatureMenu[0]}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pl-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openStoreDetail(store);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#0C1326] text-white text-xs sm:text-sm font-black hover:bg-[#131E3A] transition-colors"
                >
                  상세
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Map Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col">
          <div className="flex items-center justify-between p-4 bg-[#0C1326] text-white">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EFC548]" />
              <span className="font-black text-sm">청량로드 통합 가이드맵 전체화면</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              {renderMapContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
