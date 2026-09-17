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
import { StampPassportView } from './components/profile/StampPassportView';
import { StoreDetailModal } from './components/common/StoreDetailModal';
import { QrScannerModal } from './components/common/QrScannerModal';
import { DirectionsModal } from './components/common/DirectionsModal';
import { ChevronRight, CheckCircle2, X } from 'lucide-react';

const QrAutoStampToast: React.FC = () => {
  const { qrToastMessage, dismissQrToast, setActiveTab } = useMarket();

  if (!qrToastMessage) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm animate-in slide-in-from-top duration-300">
      <div className="bg-[#0C1326] text-white px-4 py-3.5 rounded-2xl shadow-2xl border border-[#EFC548]/50 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#EFC548] text-[#0C1326] flex items-center justify-center shrink-0 font-bold mt-0.5">
          <CheckCircle2 size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-100 leading-snug">
            {qrToastMessage}
          </p>
          <button
            onClick={() => {
              dismissQrToast();
              setActiveTab('profile');
            }}
            className="text-[11px] text-[#FEF08A] font-extrabold hover:underline mt-1.5 flex items-center gap-0.5"
          >
            <span>스탬프 여권 확인하기</span>
            <ChevronRight size={12} />
          </button>
        </div>
        <button
          onClick={dismissQrToast}
          className="text-slate-400 hover:text-white shrink-0 p-1"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, t } = useMarket();

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
                {t('o2oNoticeBadge')}
              </span>
              <span className="text-xs text-slate-400 font-medium">{t('o2oNoticeTag')}</span>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-navy-900 tracking-tight leading-snug">
              {t('o2oNoticeTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t('o2oNoticeDesc')}
            </p>
            <div className="pt-2 flex items-center justify-between text-sm text-[#7E5D0A] font-bold">
              <button onClick={() => setActiveTab('map')} className="hover:underline flex items-center gap-1.5 py-1">
                <span>{t('o2oNoticeBtn')}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {activeTab === 'map' && <MarketMapCanvas />}
      {activeTab === 'gourmet' && <BoardGameView />}
      {activeTab === 'heritage' && <HeritageTimeline />}
      {activeTab === 'profile' && <StampPassportView />}
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
          <QrAutoStampToast />
        </div>
      </div>
    </MarketProvider>
  );
};

export default App;
