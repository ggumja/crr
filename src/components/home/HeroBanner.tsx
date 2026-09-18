import React from 'react';
import { QrCode, Sparkles, Compass } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const HeroBanner: React.FC = () => {
  const { openQrScanner, setActiveTab, t } = useMarket();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C1326] via-[#131E3A] to-[#0A1020] text-white p-5 sm:p-6 shadow-xl border border-navy-700/60">
      {/* Background Subtle Gold Aura */}
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#EFC548]/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-52 h-52 rounded-full bg-[#1B2A50]/40 blur-3xl pointer-events-none" />
      
      {/* 1. Top Left Badge (동대문구 청량로드 O2O 디지털게이트웨이) */}
      <div className="relative z-20 flex items-center justify-start mb-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#EFC548]/40 text-[11px] sm:text-xs font-bold text-[#EFC548] shadow-xs">
          <Sparkles size={12} className="text-[#EFC548] shrink-0" />
          <span className="whitespace-nowrap">{t('dongdaemunBadge')}</span>
        </div>
      </div>

      {/* 2. Prominent 1960 Cheongnyang Road Circular Logo Emblem */}
      <div className="relative z-10 flex justify-center my-1.5">
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-1 bg-gradient-to-b from-[#EFC548]/30 to-transparent shadow-2xl">
          <img
            src="./crl-logo.png"
            alt="1960 청량로드 공식 로고"
            className="w-full h-full object-contain rounded-full drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="relative z-10 space-y-3 text-left">
        {/* Main Modern Headline */}
        <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white break-keep">
          {t('homeHeroTitle')}
        </h1>

        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal break-keep">
          {t('homeHeroDesc')}
        </p>

        {/* Action Button Group */}
        <div className="pt-1.5 space-y-2">
          <button
            onClick={openQrScanner}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#EFC548] hover:bg-[#E5B730] active:scale-98 text-[#0C1326] text-sm sm:text-base font-black shadow-md transition-all whitespace-nowrap"
          >
            <QrCode size={18} className="text-[#0C1326] shrink-0" />
            <span>{t('qrQuickBtn')}</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 text-white text-sm sm:text-base font-bold border border-white/20 backdrop-blur-sm transition-all whitespace-nowrap"
          >
            <Compass size={17} className="shrink-0" />
            <span>{t('exploreMapBtn')}</span>
          </button>
        </div>

        {/* Market Stats Ticker */}
        <div className="pt-3.5 border-t border-slate-700/60 grid grid-cols-3 gap-1.5 text-center text-slate-200">
          <div className="px-1">
            <div className="text-lg sm:text-xl font-black text-[#EFC548]">{t('statMarketsValue')}</div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5 whitespace-nowrap break-keep">{t('statMarketsLabel')}</div>
          </div>
          <div className="px-1">
            <div className="text-lg sm:text-xl font-black text-white">{t('statStoresValue')}</div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5 whitespace-nowrap break-keep">{t('statStoresLabel')}</div>
          </div>
          <div className="px-1">
            <div className="text-lg sm:text-xl font-black text-[#EFC548]">{t('statHeritageValue')}</div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5 whitespace-nowrap break-keep">{t('statHeritageLabel')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
