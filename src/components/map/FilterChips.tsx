import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';

interface FilterChipItem {
  id: string;
  label: string;
  countLabel?: string;
}

export const FilterChips: React.FC = () => {
  const { selectedMarketFilter, setSelectedMarketFilter } = useMarket();
  const [filterMode, setFilterMode] = useState<'theme' | 'market'>('theme');

  // 4대 테마길 기준 칩 (결과보고서 공식 테마 자원 분류)
  const themeChips: FilterChipItem[] = [
    { id: 'all', label: '🌟 전체 보기', countLabel: '전체' },
    { id: 'theme_sight', label: '🏛️ 볼거리', countLabel: '역사·문화' },
    { id: 'theme_food', label: '🍜 먹거리', countLabel: '노포·미식' },
    { id: 'theme_play', label: '🌿 즐길거리', countLabel: '체험·웰니스' },
    { id: 'theme_nightlife', label: '🌙 야간놀거리', countLabel: '야시장·펍' },
  ];

  // 9개 시장별 칩
  const marketChips: FilterChipItem[] = [
    { id: 'all', label: '전체 (9개 시장)' },
    { id: 'gyeongdong', label: '경동시장' },
    { id: 'cheongnyangni_total', label: '청량리종합시장' },
    { id: 'yaknyeongsi', label: '서울약령시' },
    { id: 'cheonggwa', label: '청량리청과물' },
    { id: 'gwangseong', label: '경동광성상가' },
    { id: 'hyundai', label: '청량리현대시장' },
    { id: 'dongseo', label: '동서시장' },
  ];

  const currentChips = filterMode === 'theme' ? themeChips : marketChips;

  return (
    <div className="space-y-2">
      {/* Mode Switcher Tab (4대 테마길 우선) */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => {
              setFilterMode('theme');
              if (selectedMarketFilter !== 'all' && !selectedMarketFilter.startsWith('theme_')) {
                setSelectedMarketFilter('all');
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              filterMode === 'theme'
                ? 'bg-white text-navy-900 shadow-xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            4대 테마길 기준
          </button>
          <button
            onClick={() => {
              setFilterMode('market');
              if (selectedMarketFilter.startsWith('theme_')) {
                setSelectedMarketFilter('all');
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
              filterMode === 'market'
                ? 'bg-white text-navy-900 shadow-xs border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 font-semibold'
            }`}
          >
            9개 시장 구역별
          </button>
        </div>

        <span className="text-[11px] text-slate-400 font-medium">
          {filterMode === 'theme' ? '자원별 코스 필터' : '시장별 점포 필터'}
        </span>
      </div>

      {/* Horizontal Scrollable Chips Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
        {currentChips.map((chip) => {
          const isSelected = selectedMarketFilter === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setSelectedMarketFilter(chip.id)}
              className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#EFC548] text-[#0C1326] font-black shadow-xs ring-2 ring-[#EFC548]/60'
                  : 'bg-white border border-slate-200 text-slate-700 font-bold hover:text-navy-900 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <span>{chip.label}</span>
              {chip.countLabel && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${
                  isSelected ? 'bg-black/15 text-[#0C1326]' : 'bg-slate-100 text-slate-500'
                }`}>
                  {chip.countLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
