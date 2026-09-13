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
      
      {/* 1. Top Left Badge (동대문구 청량로드 O2O 디지털게이트웨이) - 사용자 요청: 왼쪽 상단 배치 */}
      <div className="relative z-20 flex items-center justify-start mb-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#EFC548]/40 text-xs font-bold text-[#EFC548] shadow-sm">
          <Sparkles size={13} className="text-[#EFC548]" />
          <span>동대문구 청량로드 · O2O 디지털게이트웨이</span>
        </div>
      </div>

      {/* 2. Prominent 1960 Cheongnyang Road Circular Logo Emblem */}
      <div className="relative z-10 flex justify-center my-2">
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full p-1 bg-gradient-to-b from-[#EFC548]/30 to-transparent shadow-2xl">
          <img
            src="./crl-logo.png"
            alt="1960 청량로드 공식 로고"
            className="w-full h-full object-contain rounded-full drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="relative z-10 space-y-3.5 text-left">
        {/* Main Modern Headline */}
        <h1 className="text-2xl font-black tracking-tight leading-snug text-white">
          {t('homeHeroTitle')}
        </h1>

        <p className="text-sm text-slate-200 leading-relaxed font-normal">
          {t('homeHeroDesc')}
        </p>

        {/* Action Button Group - Stacked full width for mobile touch ergonomics */}
        <div className="pt-2 space-y-2.5">
          <button
            onClick={openQrScanner}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#EFC548] hover:bg-[#E5B730] active:scale-98 text-[#0C1326] text-sm sm:text-base font-black shadow-md transition-all"
          >
            <QrCode size={19} className="text-[#0C1326]" />
            <span>{t('qrQuickBtn')}</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-98 text-white text-sm sm:text-base font-bold border border-white/20 backdrop-blur-sm transition-all"
          >
            <Compass size={18} />
            <span>9개 시장 지도 탐색</span>
          </button>
        </div>

        {/* Market Stats Ticker */}
        <div className="pt-4 border-t border-slate-700/60 grid grid-cols-3 gap-2 text-center text-slate-200">
          <div>
            <div className="text-xl font-black text-[#EFC548]">9개</div>
            <div className="text-xs text-slate-300 font-semibold mt-0.5">전통시장 구역</div>
          </div>
          <div>
            <div className="text-xl font-black text-white">3,200+</div>
            <div className="text-xs text-slate-300 font-semibold mt-0.5">등록 점포망</div>
          </div>
          <div>
            <div className="text-xl font-black text-[#EFC548]">66년</div>
            <div className="text-xs text-slate-300 font-semibold mt-0.5">헤리티지 아카이브</div>
          </div>
        </div>
      </div>
    </div>
  );
};
