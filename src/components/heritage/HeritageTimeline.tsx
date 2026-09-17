import React from 'react';
import { History, Sparkles, ChevronRight } from 'lucide-react';
import { HERITAGE_TIMELINE } from '../../data/tourData';
import { useMarket } from '../../context/MarketContext';
import { STORES_DATA } from '../../data/storesData';
import { HERITAGE_TRANSLATIONS } from '../../data/i18nData';

export const HeritageTimeline: React.FC = () => {
  const { openStoreDetail, language, t } = useMarket();

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0C1326] via-[#131E3A] to-[#0A1020] text-white rounded-3xl p-5 border border-navy-700/60 shadow-xl">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#EFC548]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#EFC548] text-xs font-bold uppercase tracking-wider mb-1.5">
            <History size={16} />
            <span>{t('heritageChronology')}</span>
          </div>
          <h2 className="font-black text-xl tracking-tight text-white leading-snug">
            {t('heritageHeaderTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed font-normal">
            {t('heritageHeaderDesc')}
          </p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {HERITAGE_TIMELINE.map((item, idx) => {
          const store = item.relatedStoreId ? STORES_DATA.find(s => s.storeId === item.relatedStoreId) : null;
          const translated = HERITAGE_TRANSLATIONS[item.year]?.[language];
          const era = translated?.era || item.era;
          const title = translated?.title || item.title;
          const subtitle = translated?.subtitle || item.subtitle;
          const story = translated?.story || item.story;
          const marketName = translated?.marketName || item.marketName;

          return (
            <div key={idx} className="relative group">
              {/* Timeline Pin Node */}
              <div className="absolute -left-6 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#EFC548] flex items-center justify-center text-[#EFC548] font-black group-hover:scale-125 transition-transform shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#EFC548]" />
              </div>

              {/* Event Card */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3">
                {/* Era & Year Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#0C1326] text-[#EFC548] text-xs font-mono font-black border border-[#EFC548]/30">
                      {item.year}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                      {era}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {marketName}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-extrabold text-base text-navy-900">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#7E5D0A] mt-1">
                    {subtitle}
                  </p>
                </div>

                {/* Photo */}
                <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Editorial Story */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 font-normal">
                  {story}
                </p>

                {/* Connected Store CTA if any */}
                {store && (
                  <button
                    onClick={() => openStoreDetail(store)}
                    className="w-full py-3 px-4 rounded-2xl bg-[#FAF6E6] hover:bg-[#F5ECBF] border border-[#EFC548]/50 text-[#0C1326] text-xs sm:text-sm font-bold flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={15} className="text-[#7E5D0A]" />
                      <span>{t('relatedStorePrefix')} <strong>{store.name}</strong></span>
                    </span>
                    <ChevronRight size={16} className="text-[#7E5D0A]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
