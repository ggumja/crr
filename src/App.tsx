import React, { useState } from 'react';
import { MarketProvider, useMarket } from './context/MarketContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HeroBanner } from './components/home/HeroBanner';
import { QuickMenuGrid } from './components/home/QuickMenuGrid';
import { AnchorStoresRow } from './components/home/AnchorStoresRow';
import { MarketMapCanvas } from './components/map/MarketMapCanvas';
import { BoardGameView } from './components/tour/BoardGameView';
import { HeritageTimeline } from './components/heritage/HeritageTimeline';
import { StampCouponView } from './components/profile/StampCouponView';
import { StoreDetailModal } from './components/common/StoreDetailModal';
import { QrScannerModal } from './components/common/QrScannerModal';
import { DirectionsModal } from './components/common/DirectionsModal';
import { Smartphone, Monitor, ChevronRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useMarket();

  return (
    <main className="px-4 py-4 space-y-6 pb-24">
      {activeTab === 'home' && (
        <>
          <HeroBanner />
          <QuickMenuGrid />
          <AnchorStoresRow />
          
            {/* Quick Notice on SmallBee Integration */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF6E6] text-[#7E5D0A] border border-[#EFC548]/40">
                  디지털 로컬상생 안내
                </span>
                <span className="text-[11px] text-slate-400 font-medium">O2O 플랫폼 연동</span>
              </div>
              <h3 className="font-bold text-xs text-navy-900 tracking-tight">
                전통시장 상품은 공식 스몰비(smallbee)에서 편리하게 배송받으세요
              </h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                본 앱은 방문객의 오프라인 탐색, 역사 투어, QR 인증을 전담하며, 상품 장바구니와 결제는 각 점포 상세 페이지의 외부 스몰비 링크를 통해 안전하고 편리하게 진행됩니다.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs text-[#7E5D0A] font-bold">
                <button onClick={() => setActiveTab('map')} className="hover:underline flex items-center gap-1">
                  <span>9개 시장 가이드맵 보러가기</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'map' && <MarketMapCanvas />}
        {activeTab === 'gourmet' && <BoardGameView />}
        {activeTab === 'heritage' && <HeritageTimeline />}
        {activeTab === 'profile' && <StampCouponView />}
      </main>
    );
  };

  export const App: React.FC = () => {
    const [isDesktopMock, setIsDesktopMock] = useState(false);

    return (
      <MarketProvider>
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-slate-900">
          
          {/* Desktop View Mode Switcher (Visible only on lg screens) */}
          <div className="hidden lg:flex items-center justify-between w-full max-w-4xl px-4 py-2 text-xs text-slate-600 border-b border-slate-200">
            <span className="font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#EFC548]" />
              1960 청량로드 디지털게이트웨이 데모 (Mobile-First Prototype)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDesktopMock(!isDesktopMock)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-300 font-medium hover:bg-slate-50 shadow-xs"
              >
                {isDesktopMock ? <Monitor size={14} /> : <Smartphone size={14} />}
                <span>{isDesktopMock ? '태블릿/데스크톱 뷰' : '모바일 프레임 뷰 (390px)'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Device Container Shell */}
          <div 
            className={`w-full min-h-screen bg-white transition-all flex flex-col relative ${
            isDesktopMock
              ? 'max-w-md my-6 rounded-[40px] shadow-2xl border-[8px] border-stone-800 overflow-hidden ring-1 ring-black/10'
              : 'max-w-md sm:max-w-lg shadow-warm border-x border-trad-border/60'
          }`}
        >
          {/* GNB Header */}
          <Header />

          {/* Main Views */}
          <div className="flex-1">
            <MainContent />
          </div>

          {/* Fixed Bottom Dock Navigation */}
          <BottomNav />

          {/* Global Modals */}
          <StoreDetailModal />
          <QrScannerModal />
          <DirectionsModal />
        </div>
      </div>
    </MarketProvider>
  );
};

export default App;
