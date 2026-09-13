import React from 'react';
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
import { ChevronRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useMarket();

  return (
    <main className="px-4 py-4 space-y-6 pb-28">
      {activeTab === 'home' && (
        <>
          <HeroBanner />
          <QuickMenuGrid />
          <AnchorStoresRow />
          
          {/* Quick Notice on SmallBee Integration */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF6E6] text-[#7E5D0A] border border-[#EFC548]/40">
                디지털 로컬상생 안내
              </span>
              <span className="text-xs text-slate-400 font-medium">O2O 플랫폼 연동</span>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-navy-900 tracking-tight leading-snug">
              전통시장 상품은 공식 스몰비(smallbee)에서 편리하게 배송받으세요
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              본 앱은 방문객의 오프라인 탐색, 역사 투어, QR 인증을 전담하며, 상품 장바구니와 결제는 각 점포 상세 페이지의 외부 스몰비 링크를 통해 안전하고 편리하게 진행됩니다.
            </p>
            <div className="pt-2 flex items-center justify-between text-sm text-[#7E5D0A] font-bold">
              <button onClick={() => setActiveTab('map')} className="hover:underline flex items-center gap-1.5 py-1">
                <span>9개 시장 가이드맵 보러가기</span>
                <ChevronRight size={16} />
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
  return (
    <MarketProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start text-slate-900 antialiased selection:bg-[#EFC548] selection:text-[#0C1326]">
        {/* Mobile-Only Dedicated App Shell (Full width on mobile, centered max-w-md on desktop) */}
        <div className="w-full max-w-md min-h-screen bg-white flex flex-col relative shadow-sm border-x border-slate-200/60">
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
