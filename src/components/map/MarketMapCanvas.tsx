import React, { useState } from 'react';
import { Search, Utensils, Coffee, HeartPulse, Apple, ShoppingBag } from 'lucide-react';
import { MARKETS_DATA } from '../../data/marketsData';
import { STORES_DATA } from '../../data/storesData';
import { StoreItem } from '../../types/market';
import { useMarket } from '../../context/MarketContext';
import { FilterChips } from './FilterChips';
import { StorePreviewCard } from './StorePreviewCard';

export const MarketMapCanvas: React.FC = () => {
  const { 
    selectedMarketFilter, 
    setSelectedMarketFilter, 
    searchQuery, 
    setSearchQuery, 
    openStoreDetail 
  } = useMarket();

  const [activePreviewStore, setActivePreviewStore] = useState<StoreItem | null>(STORES_DATA[0]);

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

  return (
    <div className="space-y-3">
      {/* Search Input Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="점포명, 품목(순대국, 쌍화차, 통닭, 과일) 검색..."
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-navy-900 placeholder:text-slate-400 focus:outline-none focus:border-[#EFC548] focus:bg-white shadow-xs transition-colors"
        />
        <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-200/70 rounded-full w-5 h-5 flex items-center justify-center"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Chips Bar */}
      <FilterChips />

      {/* Interactive Map Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-100 rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm">
        
        {/* Street Roads Grid Background */}
        <div className="absolute inset-0 select-none pointer-events-none">
          {/* Main Boulevards: Wangsan-ro & Gosanja-ro */}
          <div className="absolute top-[34%] left-0 right-0 h-4 bg-white/90 shadow-2xs -rotate-1 transform origin-left flex items-center justify-end px-3">
            <span className="text-[9px] font-bold text-slate-500 tracking-wider">왕산로 (Wangsan-ro)</span>
          </div>
          <div className="absolute top-0 bottom-0 left-[53%] w-5 bg-white/90 shadow-2xs flex items-center justify-center">
            <span className="text-[9px] font-bold text-slate-500 [writing-mode:vertical-rl] tracking-wider">고산자로 (Gosanja-ro)</span>
          </div>

          {/* Cheongnyangni Station Marker */}
          <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-xl bg-[#131E3A] text-[#EFC548] border border-[#EFC548]/40 text-[10px] font-bold shadow-xs flex items-center gap-1 z-10">
            <span>🚆 청량리역 (1호선·GTX)</span>
          </div>

          {/* Jegi-dong Station Marker */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-[#131E3A] text-[#EFC548] border border-[#EFC548]/30 text-[9px] font-bold shadow-xs z-10">
            <span>🚇 제기동역 2번출구</span>
          </div>
        </div>

        {/* 9 Traditional Market Zone Blocks */}
        <div className="absolute inset-0 p-2">
          {MARKETS_DATA.map((zone) => {
            const isHighlighted = selectedMarketFilter === zone.id || (selectedMarketFilter === 'all');
            return (
              <div
                key={zone.id}
                onClick={() => {
                  setSelectedMarketFilter(zone.id);
                }}
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  width: `${zone.w}%`,
                  height: `${zone.h}%`,
                }}
                className={`absolute rounded-2xl border transition-all cursor-pointer p-1.5 flex flex-col justify-between select-none ${
                  isHighlighted
                    ? 'bg-white/95 border-slate-200/90 shadow-xs hover:border-[#EFC548] hover:bg-white'
                    : 'bg-slate-200/50 border-slate-300/40 opacity-40 hover:opacity-80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-navy-900 truncate">
                    {zone.name}
                  </span>
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: zone.color }}
                  />
                </div>
                <div className="text-[9px] text-slate-500 truncate">
                  {zone.specialty[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Store Pins */}
        {filteredStores.map((store) => {
          const Icon = getCategoryIcon(store.category);
          const isSelected = activePreviewStore?.id === store.id;

          return (
            <button
              key={store.id}
              onClick={() => setActivePreviewStore(store)}
              style={{
                left: `${store.coordinates.x}%`,
                top: `${store.coordinates.y}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all group active:scale-95 ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
              title={store.name}
            >
              {/* Animated Ripple Pulse if selected */}
              {isSelected && (
                <div className="absolute -inset-1.5 rounded-full bg-[#EFC548] animate-pin-pulse -z-10" />
              )}

              <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 transition-colors ${
                isSelected
                  ? 'bg-[#EFC548] text-[#0C1326] border-white font-black'
                  : 'bg-white text-navy-900 border-[#EFC548] hover:bg-[#FAF6E6]'
              }`}>
                {store.tourSpotNumber ? (
                  <span className="font-black text-[11px]">
                    {store.tourSpotNumber}
                  </span>
                ) : (
                  <Icon size={13} />
                )}
              </div>

              {/* Pin Label on Hover/Selected */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded-md bg-[#0C1326] text-white text-[9px] font-bold whitespace-nowrap pointer-events-none shadow-xs border border-[#EFC548]/30 ${
                isSelected ? 'block' : 'hidden group-hover:block'
              }`}>
                {store.name}
              </div>
            </button>
          );
        })}

        {/* Map Legend Overlay */}
        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-xl px-2 py-1 text-[9px] border border-slate-200 text-slate-600 space-y-0.5 z-10 shadow-xs">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#EFC548] inline-block" />
            <span className="font-medium text-navy-900">숫자: 미식 투어 스팟 (1~8)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#131E3A] inline-block" />
            <span>블록: 9대 전통시장 구역</span>
          </div>
        </div>
      </div>

      {/* Selected Store Mini Preview Slide-Up */}
      {activePreviewStore && (
        <StorePreviewCard
          store={activePreviewStore}
          onClose={() => setActivePreviewStore(null)}
        />
      )}

      {/* Filtered Store List View Below Map */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-xs text-slate-900">
            선택 조건 점포 목록 ({filteredStores.length}곳)
          </h3>
          <span className="text-[10px] text-slate-400">카드 클릭 시 상세 이동</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              onClick={() => setActivePreviewStore(store)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                activePreviewStore?.id === store.id
                  ? 'bg-orange-50/70 border-orange-400 ring-1 ring-orange-400/30'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                      {store.marketName}
                    </span>
                    {store.tourSpotNumber && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-orange-100 text-orange-800 font-bold">
                        #{store.tourSpotNumber}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-0.5 line-clamp-1">{store.name}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{store.signatureMenu[0]}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openStoreDetail(store);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-orange-500 text-white text-[10px] font-bold shrink-0 hover:bg-orange-600 transition-colors"
              >
                상세
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
