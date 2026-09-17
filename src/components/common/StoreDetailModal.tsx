import React from 'react';
import { 
  X, ExternalLink, Navigation, CheckCircle, Clock, MapPin, 
  Phone, Award, ShieldCheck, Sparkles, Share2, QrCode 
} from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const StoreDetailModal: React.FC = () => {
  const { 
    selectedStore, 
    closeStoreDetail, 
    openDirections, 
    openQrScanner, 
    hasStamp, 
    t 
  } = useMarket();

  if (!selectedStore) return null;

  const isCompleted = hasStamp(selectedStore.storeId);

  // External O2O URL (defaults to https://mobile.smallbee.co.kr/{storeid} or custom smallbeeUrl)
  const smallbeeLink = selectedStore.smallbeeUrl || `https://mobile.smallbee.co.kr/${selectedStore.storeId}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedStore.name} - 청량로드 디지털게이트웨이`,
        text: `${selectedStore.marketName}의 추천 명소 ${selectedStore.name}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('스토어 안내 링크가 복사되었습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom duration-200"
      >
        {/* Header Hero Image */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 shrink-0 overflow-hidden">
          <img 
            src={selectedStore.image} 
            alt={selectedStore.name}
            className="w-full h-full object-cover brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="px-2.5 py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
              {selectedStore.marketName}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900/80 active:scale-95 transition-all border border-white/20"
                aria-label="공유하기"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={closeStoreDetail}
                className="w-9 h-9 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900/80 active:scale-95 transition-all border border-white/20"
                aria-label="닫기"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {selectedStore.titleBadge && (
                <span className="px-2.5 py-0.5 rounded-lg bg-[#EFC548] text-[#0C1326] text-xs font-black shadow-xs">
                  {selectedStore.titleBadge}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
                {selectedStore.category}
              </span>
              {selectedStore.tourSpotNumber && (
                <span className="px-2.5 py-0.5 rounded-lg bg-[#0C1326] text-[#EFC548] border border-[#EFC548]/50 text-xs font-black flex items-center gap-1 shadow-xs">
                  <Sparkles size={13} className="text-[#EFC548]" />
                  보드게임 {selectedStore.tourSpotNumber}번 코스
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
              {selectedStore.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-5 py-5 space-y-6 divide-y divide-slate-100">
          
          {/* Quick Info Badges */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            {selectedStore.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs sm:text-sm px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Location & Operating Info */}
          <div className="pt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#A97F12] shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-navy-900 text-sm sm:text-base">{selectedStore.address}</p>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 leading-relaxed">
                  🧭 <strong className="text-slate-800">골목 도보 안내:</strong> {selectedStore.locationGuide}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock size={17} className="text-slate-400 shrink-0" />
              <span>
                <strong>영업시간:</strong> {selectedStore.businessHours} ({selectedStore.closedDay})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={17} className="text-slate-400 shrink-0" />
              <span>
                <strong>문의전화:</strong> <a href={`tel:${selectedStore.phone}`} className="text-[#7E5D0A] underline font-extrabold">{selectedStore.phone}</a>
              </span>
            </div>
          </div>

          {/* Signature Menu / Features */}
          <div className="pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Award size={15} className="text-[#A97F12]" />
              대표 메뉴 & 시그니처
            </h3>
            <div className="bg-slate-50 rounded-3xl p-4 border border-slate-200/80 space-y-2.5">
              {selectedStore.signatureMenu.map((menu, i) => (
                <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-extrabold text-navy-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EFC548] inline-block" />
                    {menu}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">현장 결제</span>
                </div>
              ))}
              <div className="pt-2.5 mt-2 border-t border-slate-200 flex justify-between text-xs sm:text-sm text-slate-600 font-medium">
                <span>가격대</span>
                <span className="font-black text-navy-900 text-sm sm:text-base">{selectedStore.priceRange}</span>
              </div>
            </div>
          </div>

          {/* Editorial Story */}
          <div className="pt-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#7E5D0A]" />
              상인 인터뷰 & 헤리티지 스토리
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 bg-slate-50/80 p-4 rounded-3xl border border-slate-200/80 font-normal">
              {selectedStore.description}
            </p>
            <div className="p-4 bg-[#FAF6E6] border-l-4 border-[#EFC548] rounded-r-3xl text-xs sm:text-sm text-[#0C1326] font-medium leading-relaxed">
              "{selectedStore.history}"
            </div>
          </div>

          {/* O2O Commerce Link Notice */}
          <div className="pt-4 pb-2">
            <div className="bg-[#FAF6E6] p-4 rounded-3xl border border-[#EFC548]/40 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0C1326] text-[#EFC548] border border-[#EFC548]/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                O2O
              </div>
              <div className="text-xs sm:text-sm">
                <p className="font-black text-navy-900">O2O 연동 서비스</p>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">
                  앱 내부에서는 상품 결제를 진행하지 않으며, O2O 플랫폼에서 주문, 포장, 예약, 대기 기능을 이용하실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sticky CTA Button Group */}
        <div className="p-4 bg-white border-t border-slate-100 space-y-2.5 shrink-0 shadow-lg">
          
          {/* PRIMARY CTA: O2O External Link */}
          <a
            href={smallbeeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex flex-col items-center justify-center py-4 px-4 rounded-2xl bg-[#EFC548] hover:bg-[#E5B730] text-[#0C1326] shadow-md active:scale-[0.99] transition-all group"
          >
            <div className="flex items-center gap-2 font-black text-base text-[#0C1326]">
              <span>{t('smallbeeBtn')}</span>
              <ExternalLink size={18} className="group-hover:translate-x-0.5 transition-transform text-[#0C1326]" />
            </div>
            <span className="text-xs text-[#533C05] font-bold mt-0.5">
              {t('smallbeeSub')}
            </span>
          </a>

          {/* Secondary Action Grid: Directions & QR Check-in */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => openDirections(selectedStore)}
              className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold active:scale-95 transition-all"
            >
              <Navigation size={15} className="text-slate-600" />
              <span>{t('directionsBtn')}</span>
            </button>

            {isCompleted ? (
              <div className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold border bg-[#FAF6E6] text-[#7E5D0A] border-[#EFC548]/50 shadow-xs">
                <CheckCircle size={15} className="text-[#7E5D0A]" />
                <span>스탬프 인증완료 ✓</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  closeStoreDetail();
                  openQrScanner();
                }}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl text-xs sm:text-sm font-black bg-[#0C1326] hover:bg-[#131E3A] text-[#EFC548] border border-[#EFC548]/40 active:scale-95 transition-all shadow-xs"
                title="현장 QR 스캔으로 자동 인증"
              >
                <QrCode size={15} className="text-[#EFC548]" />
                <span>현장 QR 스캔 인증</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
