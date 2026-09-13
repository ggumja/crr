import React, { useState, useRef } from 'react';
import { 
  Search, 
  Utensils, 
  Coffee, 
  HeartPulse, 
  Apple, 
  ShoppingBag, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  X, 
  Route, 
  Layers,
  MapPinOff
} from 'lucide-react';
import { MARKETS_DATA } from '../../data/marketsData';
import { STORES_DATA } from '../../data/storesData';
import { StoreItem, MarketId } from '../../types/market';
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
    openStoreDetail 
  } = useMarket();

  const [activePreviewStore, setActivePreviewStore] = useState<StoreItem | null>(STORES_DATA[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showTourTrail, setShowTourTrail] = useState<boolean>(true);
  const [showZones, setShowZones] = useState<boolean>(true);
  const [showStorePins, setShowStorePins] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Filter stores according to search query and market filter
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

    // Filter chip match
    if (selectedMarketFilter === 'all') return true;
    if (selectedMarketFilter === 'category_food') return store.category === '맛집/식음' || store.category === '노포';
    if (selectedMarketFilter === 'category_heritage') return store.tags.some(t => t.includes('전통') || t.includes('노포'));
    return store.marketId === selectedMarketFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '맛집/식음': return Utensils;
      case '노포': return Utensils;
      case '문화/복합': return Coffee;
      case '한방/건강': return HeartPulse;
      case '청과/신선': return Apple;
      default: return ShoppingBag;
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

  // 1 to 8 tour spots ordered coordinates for SVG path
  const tourSpotsSorted = [...STORES_DATA]
    .filter(s => s.tourSpotNumber)
    .sort((a, b) => (a.tourSpotNumber || 0) - (b.tourSpotNumber || 0));

  const tourPointsString = tourSpotsSorted
    .map(s => `${s.coordinates.x},${s.coordinates.y}`)
    .join(' ');

  // Render the core map content (used both in regular canvas and full screen modal)
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

      {/* 2. Interactive SVG Layer for Zone Highlighting & Tour Trail */}
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

        {/* 2-1. Animated Tour Trail Line (1 -> 8) */}
        {showTourTrail && tourSpotsSorted.length > 1 && (
          <g className="transition-opacity duration-300 pointer-events-none">
            {/* Background shadow stroke */}
            <polyline
              points={tourPointsString}
              fill="none"
              stroke="#0C1326"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Golden dashed animated trail */}
            <polyline
              points={tourPointsString}
              fill="none"
              stroke="#EFC548"
              strokeWidth="0.8"
              strokeDasharray="2 1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* 2-2. Interactive Market Zone Hotspots */}
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

      {/* 3. Interactive Store Pins Overlay */}
      {showStorePins && filteredStores.map((store) => {
        const isSelected = activePreviewStore?.id === store.id;
        const Icon = getCategoryIcon(store.category);
        const isAnchor = store.isAnchor;

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
            title={`${store.name} (${store.marketName})`}
          >
            {/* Animated Pulse Ring if selected */}
            {isSelected && (
              <span className="absolute -inset-1.5 rounded-full bg-[#EFC548] animate-ping opacity-75 -z-10" />
            )}

            {/* Pin Badge Graphic */}
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md border-2 transition-all ${
              isSelected
                ? 'bg-[#EFC548] text-[#0C1326] border-white font-black ring-2 ring-[#0C1326]/20'
                : isAnchor
                ? 'bg-[#0C1326] text-[#EFC548] border-[#EFC548] hover:bg-[#131E3A]'
                : 'bg-white text-navy-900 border-[#EFC548] hover:bg-[#FAF6E6]'
            }`}>
              {store.tourSpotNumber ? (
                <span className="font-black text-xs sm:text-sm">
                  {store.tourSpotNumber}
                </span>
              ) : (
                <Icon size={14} className="sm:w-4 sm:h-4" />
              )}
            </div>

            {/* Floating Store Name Tooltip on Hover / Selected */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2.5 py-1 rounded-lg bg-[#0C1326] text-white text-xs font-bold whitespace-nowrap pointer-events-none shadow-lg border border-[#EFC548]/40 z-30 transition-opacity ${
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
      {/* Search Input Bar (text-base prevents auto-zoom on iOS mobile) */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="점포명, 품목(순대국, 쌍화차, 통닭, 과일) 검색..."
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

      {/* Filter Chips Bar */}
      <FilterChips />

      {/* Interactive Map Header Bar */}
      <div className="flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2 font-bold text-navy-900 text-xs sm:text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFC548]" />
          <span>공식 안내도 (2.5D 입체 가이드맵)</span>
        </div>

        {/* Map Control Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowTourTrail(!showTourTrail)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all ${
              showTourTrail
                ? 'bg-[#FAF6E6] text-[#7E5D0A] border-[#EFC548]'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="미식 투어 1~8번 연결 동선 토글"
          >
            <Route size={13} />
            <span>투어 동선</span>
          </button>

          <button
            onClick={() => setShowStorePins(!showStorePins)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all ${
              showStorePins
                ? 'bg-[#FAF6E6] text-[#7E5D0A] border-[#EFC548]'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="점포 핀 표시 토글"
          >
            <MapPinOff size={13} />
            <span>점포 핀</span>
          </button>

          <button
            onClick={() => setShowZones(!showZones)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all ${
              showZones
                ? 'bg-[#FAF6E6] text-[#7E5D0A] border-[#EFC548]'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="시장 구역 강조 토글"
          >
            <Layers size={13} />
            <span>구역 강조</span>
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-navy-900 hover:border-slate-300"
            title="지도 크게 보기"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div 
        ref={mapContainerRef}
        className="relative w-full rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm"
      >
        {/* Render Map Content */}
        {renderMapContent()}

        {/* Floating In-Map Zoom Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-30 bg-white/95 backdrop-blur-sm rounded-2xl p-1 shadow-sm border border-slate-200/80">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
            title="확대 (+)"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
            title="축소 (-)"
          >
            <ZoomOut size={16} />
          </button>
          {zoomLevel > 1 && (
            <button
              onClick={handleResetZoom}
              className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors text-xs font-bold"
              title="원래 배율 복원"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 text-xs border border-slate-200/80 text-slate-700 space-y-1 z-10 shadow-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#EFC548] text-[#0C1326] font-black text-[9px] flex items-center justify-center">1</span>
            <span className="font-bold text-navy-900">미식 투어 스팟 (1~8번)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#EFC548]/40 border border-[#EFC548]" />
            <span className="font-medium text-slate-600">선택 구역 하이라이트</span>
          </div>
        </div>
      </div>

      {/* Selected Store Mini Preview Slide-Up Card */}
      {activePreviewStore && (
        <StorePreviewCard
          store={activePreviewStore}
          onClose={() => setActivePreviewStore(null)}
        />
      )}

      {/* Filtered Store List View Below Map */}
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
              onClick={() => setActivePreviewStore(store)}
              className={`p-3.5 sm:p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between shadow-xs hover:shadow-md ${
                activePreviewStore?.id === store.id
                  ? 'bg-[#FAF6E6] border-[#EFC548] ring-2 ring-[#EFC548]/40'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                      {store.marketName}
                    </span>
                    {store.tourSpotNumber && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#FAF6E6] text-[#7E5D0A] font-black border border-[#EFC548]/40">
                        #{store.tourSpotNumber}
                      </span>
                    )}
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-navy-900 mt-1 line-clamp-1">{store.name}</h4>
                  <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{store.signatureMenu[0]}</p>
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EFC548]" />
              <h3 className="font-extrabold text-base">1960 청량로드 공식 가이드맵</h3>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-2">
            <div className="w-full max-w-3xl rounded-3xl overflow-hidden bg-white shadow-2xl">
              {renderMapContent()}
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-slate-300 font-medium">
            핀 또는 구역을 터치하여 점포 정보를 확인하세요
          </div>
        </div>
      )}
    </div>
  );
};
