import React from 'react';
import { useMarket } from '../../context/MarketContext';

export const FilterChips: React.FC = () => {
  const { selectedMarketFilter, setSelectedMarketFilter } = useMarket();

  const chips = [
    { id: 'all', label: '전체 (9개 시장)' },
    { id: 'gyeongdong', label: '경동시장' },
    { id: 'cheongnyangni_total', label: '청량리종합시장' },
    { id: 'yaknyeongsi', label: '서울약령시' },
    { id: 'cheonggwa', label: '청량리청과물' },
    { id: 'gwangseong', label: '경동광성상가' },
    { id: 'hyundai', label: '청량리현대시장' },
    { id: 'dongseo', label: '동서시장' },
    { id: 'category_food', label: '🍜 맛집/식음' },
    { id: 'category_heritage', label: '⏳ 30년+ 노포' },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
      {chips.map((chip) => {
        const isSelected = selectedMarketFilter === chip.id;
        return (
          <button
            key={chip.id}
            onClick={() => setSelectedMarketFilter(chip.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all active:scale-95 ${
              isSelected
                ? 'bg-[#EFC548] text-[#0C1326] font-black shadow-xs ring-1 ring-[#EFC548]'
                : 'bg-white border border-slate-200 text-slate-600 font-medium hover:text-navy-900 hover:border-slate-300'
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
};
