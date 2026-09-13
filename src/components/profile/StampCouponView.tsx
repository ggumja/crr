import React from 'react';
import { Gift, QrCode, AlertCircle, Barcode } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { TOUR_SPOTS } from '../../data/tourData';
import { STORES_DATA } from '../../data/storesData';

export const StampCouponView: React.FC = () => {
  const { stamps, coupons, useCoupon, openStoreDetail, openQrScanner } = useMarket();

  const completedCount = stamps.length;
  const unusedCoupons = coupons.filter(c => !c.isUsed);
  const usedCoupons = coupons.filter(c => c.isUsed);

  return (
    <div className="space-y-4">
      {/* Stamp Passport Board */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF6E6] border border-[#EFC548]/40 text-[#0C1326] flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
              🎟️
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-extrabold text-base text-navy-900 tracking-tight truncate">
                1960 청량로드 스탬프 여권
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                방문 QR 스캔으로 스탬프를 모으고 쿠폰을 획득하세요
              </p>
            </div>
          </div>
          <button
            onClick={openQrScanner}
            className="shrink-0 whitespace-nowrap px-3.5 py-2.5 rounded-2xl bg-[#0C1326] text-[#EFC548] border border-[#EFC548]/40 text-xs sm:text-sm font-black hover:bg-[#131E3A] active:scale-95 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <QrCode size={16} className="text-[#EFC548] shrink-0" />
            <span className="whitespace-nowrap">스캔 인증</span>
          </button>
        </div>

        {/* 8 Stamp Slots Grid */}
        <div className="grid grid-cols-4 gap-2.5 pt-1">
          {TOUR_SPOTS.map((spot) => {
            const isCompleted = stamps.includes(spot.storeId);
            return (
              <button
                key={spot.spotNumber}
                onClick={() => {
                  const store = STORES_DATA.find(s => s.storeId === spot.storeId);
                  if (store) openStoreDetail(store);
                }}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all active:scale-95 ${
                  isCompleted
                    ? 'bg-[#FAF6E6] border-[#EFC548]/70 text-[#0C1326] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black mb-1.5 ${
                  isCompleted
                    ? 'bg-[#EFC548] text-[#0C1326] shadow-xs'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {isCompleted ? '✓' : spot.spotNumber}
                </div>
                <span className="text-xs font-bold line-clamp-1 text-navy-900">
                  {spot.name.replace(/^\d+\.\s*/, '')}
                </span>
                <span className={`text-[11px] font-bold mt-0.5 ${isCompleted ? 'text-[#7E5D0A]' : 'text-slate-400'}`}>
                  {isCompleted ? '인증완료' : '미인증'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
          <span>스탬프 현황: <strong>{completedCount}개 적립 완료</strong></span>
          <span className="text-[#7E5D0A] font-extrabold">다음 리워드까지 {Math.max(0, 3 - completedCount)}개</span>
        </div>
      </div>

      {/* Mobile Coupon Wallet */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-sm sm:text-base text-navy-900 flex items-center gap-1.5">
            <Gift size={16} className="text-[#7E5D0A]" />
            나의 모바일 할인 쿠폰 ({unusedCoupons.length}장 사용 가능)
          </h3>
          <span className="text-xs text-slate-400">현장 결제 시 제시</span>
        </div>

        {/* Unused Coupons */}
        <div className="space-y-3">
          {unusedCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="relative bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all p-5"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FAF6E6] text-[#7E5D0A] border border-[#EFC548]/40">
                    {coupon.targetMarket}
                  </span>
                  <h4 className="font-black text-base text-navy-900 mt-2">
                    {coupon.title}
                  </h4>
                </div>
                <span className="font-black text-lg text-[#7E5D0A]">
                  {coupon.discount}
                </span>
              </div>

              {/* Condition & Expiration */}
              <p className="text-xs text-slate-600 mt-1.5 font-medium">
                {coupon.condition} (유효기간: {coupon.validDate})
              </p>

              {/* Barcode Simulator & Use Action */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Barcode size={32} className="text-slate-800" />
                  <span className="text-xs font-mono text-slate-500 font-bold">{coupon.barcode}</span>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`'${coupon.title}' 쿠폰을 사용 처리하시겠습니까? (현장 결제 시 점원 확인)`)) {
                      useCoupon(coupon.id);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0C1326] hover:bg-[#131E3A] text-[#EFC548] border border-[#EFC548]/40 text-xs sm:text-sm font-black shadow-xs active:scale-95 transition-all"
                >
                  사용하기
                </button>
              </div>
            </div>
          ))}

          {/* Used Coupons History */}
          {usedCoupons.length > 0 && (
            <div className="pt-2 space-y-2 opacity-60">
              <span className="text-xs font-bold text-slate-400 uppercase px-1">
                사용 완료된 쿠폰 ({usedCoupons.length})
              </span>
              {usedCoupons.map((c) => (
                <div key={c.id} className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
                  <span className="line-through text-slate-400 font-medium">{c.title}</span>
                  <span className="text-xs bg-slate-200 px-2.5 py-1 rounded-md text-slate-600 font-bold">사용완료</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Traditional Market Helpful Tips */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/80 space-y-2.5 text-xs sm:text-sm text-slate-700">
        <h4 className="font-extrabold text-sm text-navy-900 flex items-center gap-2">
          <AlertCircle size={16} className="text-[#EFC548]" />
          알아두면 유용한 청량리 장보기 팁
        </h4>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          <li><strong>모바일 온누리상품권:</strong> 9개 시장 전 구역에서 최대 10% 할인 혜택으로 결제 가능합니다.</li>
          <li><strong>무인 짐보관함:</strong> 청량리역 1호선 지하 1층 및 경동시장 신관 1층 안내데스크에 위치합니다.</li>
          <li><strong>주차 안내:</strong> 경동시장 제1공영주차장, 청량리역 환승센터 지하주차장을 이용하실 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
};
