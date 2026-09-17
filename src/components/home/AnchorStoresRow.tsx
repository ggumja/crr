import React from 'react';
import { Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { STORES_DATA } from '../../data/storesData';
import { STORE_TRANSLATIONS } from '../../data/i18nData';

export const AnchorStoresRow: React.FC = () => {
  const { openStoreDetail, language, t } = useMarket();

  const anchorStores = STORES_DATA.filter((s) => s.isAnchor);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="font-extrabold text-base tracking-tight text-navy-900 flex items-center gap-1.5">
            <Sparkles size={16} className="text-[#EFC548]" />
            {t('anchorTitle')}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('anchorSub')}
          </p>
        </div>
        <span className="text-xs text-slate-400 font-medium">{t('horizontalScroll')}</span>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 scroll-smooth">
        {anchorStores.map((store) => {
          const trans = STORE_TRANSLATIONS[store.storeId]?.[language];
          const name = trans?.name || store.name;
          const description = trans?.description || store.description;
          const titleBadge = trans?.titleBadge || store.titleBadge;
          const marketName = trans?.marketName || store.marketName;

          return (
            <div
              key={store.id}
              onClick={() => openStoreDetail(store)}
              className="w-72 shrink-0 rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden cursor-pointer hover:shadow-md hover:border-[#EFC548]/80 transition-all group flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={store.image}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold">
                  {marketName}
                </span>

                {titleBadge && (
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#EFC548] text-[#0C1326] text-xs font-black shadow-xs">
                    {titleBadge}
                  </span>
                )}
              </div>

              {/* Info Box */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-navy-900 group-hover:text-[#7E5D0A] transition-colors line-clamp-1">
                    {name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 leading-relaxed font-normal">
                    {description}
                  </p>
                </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-[#7E5D0A] font-bold flex items-center gap-1">
                  <span>{t('smallbeeLinked')}</span>
                  <ExternalLink size={12} />
                </span>
                <span className="text-xs sm:text-sm text-[#7E5D0A] font-extrabold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  <span>{t('viewDetails')}</span>
                  <ChevronRight size={15} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};
