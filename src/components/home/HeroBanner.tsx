import React from 'react';
import { QrCode, Sparkles, Compass } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const HeroBanner: React.FC = () => {
  const { openQrScanner, setActiveTab, t } = useMarket();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C1326] via-[#131E3A] to-[#0A1020] text-white p-6 shadow-xl border border-navy-700/60">
      {/* Background Subtle Gold Aura */}
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#EFC548]/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-52 h-52 rounded-full bg-[#1B2A50]/40 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-4">
        {/* Top Header Row with Emblem Logo & Pill Badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#EFC548]/30 text-[11px] font-semibold text-[#EFC548]">
            <Sparkles size={12} className="text-[#EFC548]" />
            <span>동대문구 청량로드 O2O 디지털게이트웨이</span>
          </div>
          <img
            src="./crl-logo.png"
            alt="1960 청량로드"
            className="w-12 h-12 object-contain drop-shadow-md shrink-0 ring-2 ring-[#EFC548]/30 rounded-full"
          />
        </div>

        {/* Main Modern Headline */}
        <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white">
          {t('homeHeroTitle')}
        </h1>

        <p className="text-xs text-slate-300 leading-relaxed max-w-sm font-normal">
          {t('homeHeroDesc')}
        </p>

        {/* Action Button Group */}
        <div className="pt-2 flex items-center gap-2.5 flex-wrap">
          <button
            onClick={openQrScanner}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EFC548] hover:bg-[#E5B730] active:scale-95 text-[#0C1326] text-xs font-black shadow-md transition-all"
          >
            <QrCode size={16} className="text-[#0C1326]" />
            <span>{t('qrQuickBtn')}</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold border border-white/15 backdrop-blur-sm transition-all"
          >
            <Compass size={15} />
            <span>9개 시장 지도 탐색</span>
          </button>
        </div>

        {/* Market Stats Ticker */}
        <div className="pt-4 border-t border-slate-700/60 grid grid-cols-3 gap-2 text-center text-slate-300">
          <div>
            <div className="text-base font-black text-[#EFC548]">9개</div>
            <div className="text-[10px] text-slate-400 font-medium">전통시장 구역</div>
          </div>
          <div>
            <div className="text-base font-black text-white">3,200+</div>
            <div className="text-[10px] text-slate-400 font-medium">등록 점포망</div>
          </div>
          <div>
            <div className="text-base font-black text-[#EFC548]">66년</div>
            <div className="text-[10px] text-slate-400 font-medium">헤리티지 아카이브</div>
          </div>
        </div>
      </div>
    </div>
  );
};
