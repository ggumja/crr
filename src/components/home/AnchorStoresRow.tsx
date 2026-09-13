import React from 'react';
import { Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { STORES_DATA } from '../../data/storesData';

export const AnchorStoresRow: React.FC = () => {
  const { openStoreDetail } = useMarket();

  const anchorStores = STORES_DATA.filter((s) => s.isAnchor);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="font-extrabold text-sm tracking-tight text-navy-900 flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#EFC548]" />
            청량로드 추천 앵커시설 & 명소
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            전통시장 재생과 문화가 살아 숨 쉬는 대표 거점
          </p>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">가로 스크롤 →</span>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 scroll-smooth">
        {anchorStores.map((store) => (
          <div
            key={store.id}
            onClick={() => openStoreDetail(store)}
            className="w-64 shrink-0 rounded-2xl bg-white border border-slate-200/90 shadow-xs overflow-hidden cursor-pointer hover:shadow-md hover:border-[#EFC548]/80 transition-all group flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative h-36 w-full overflow-hidden bg-slate-100">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-semibold">
                {store.marketName}
              </span>

              {store.titleBadge && (
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#EFC548] text-[#0C1326] text-[10px] font-black shadow-xs">
                  {store.titleBadge}
                </span>
              )}
            </div>

            {/* Info Box */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-navy-900 group-hover:text-[#7E5D0A] transition-colors line-clamp-1">
                  {store.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed font-normal">
                  {store.description}
                </p>
              </div>

              <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-[#7E5D0A] font-bold flex items-center gap-1">
                  <span>스몰비 O2O 연동</span>
                  <ExternalLink size={10} />
                </span>
                <span className="text-[11px] text-[#7E5D0A] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  <span>상세보기</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
