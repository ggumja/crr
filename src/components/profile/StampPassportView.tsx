import React from 'react';
import { Award, QrCode, AlertCircle, Sparkles, Compass } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { TOUR_SPOTS, THEME_ROADS_DATA } from '../../data/tourData';
import { STORES_DATA } from '../../data/storesData';

export const StampPassportView: React.FC = () => {
  const { stamps, openStoreDetail, openQrScanner, setActiveTab, setActiveThemeRoad } = useMarket();

  const completedCount = stamps.length;

  return (
    <div className="space-y-4">
      {/* Stamp Passport Board */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-[#FAF6E6] border border-[#EFC548]/40 text-[#0C1326] flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
              🎖️
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-extrabold text-base text-navy-900 tracking-tight truncate">
                청량로드 스탬프 여권
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 truncate">
                현장 QR 스캔으로 스탬프를 모으고 완주 배지를 획득하세요
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
        <div className="grid grid-cols-4 gap-2 pt-1">
          {TOUR_SPOTS.map((spot) => {
            const isCompleted = stamps.includes(spot.storeId);
            return (
              <button
                key={spot.spotNumber}
                onClick={() => {
                  const store = STORES_DATA.find(s => s.storeId === spot.storeId);
                  if (store) openStoreDetail(store);
                }}
                className={`p-2 sm:p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all active:scale-95 ${
                  isCompleted
                    ? 'bg-[#FAF6E6] border-[#EFC548]/70 text-[#0C1326] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-black mb-1 shrink-0 ${
                  isCompleted
                    ? 'bg-[#EFC548] text-[#0C1326] shadow-xs'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {isCompleted ? '✓' : spot.spotNumber}
                </div>
                <span className="text-[11px] sm:text-xs font-bold truncate w-full text-navy-900 block">
                  {spot.name.replace(/^\d+\.\s*/, '')}
                </span>
                <span className={`text-[10px] font-bold mt-0.5 whitespace-nowrap ${isCompleted ? 'text-[#7E5D0A]' : 'text-slate-400'}`}>
                  {isCompleted ? '인증완료' : '미인증'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between gap-2 break-keep">
          <span className="whitespace-nowrap">스탬프: <strong>{completedCount} / {TOUR_SPOTS.length}개</strong></span>
          <span className="text-[#7E5D0A] font-extrabold text-right truncate">
            {completedCount >= TOUR_SPOTS.length ? '🎉 전 코스 완주 달성!' : `완주까지 ${TOUR_SPOTS.length - completedCount}개 남음`}
          </span>
        </div>
      </div>

      {/* 4 Theme Road Completion Badges & Souvenir Rewards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-sm sm:text-base text-navy-900 flex items-center gap-1.5">
            <Award size={18} className="text-[#EA580C]" />
            4대 테마길 완주 배지 컬렉션
          </h3>
          <span className="text-xs text-slate-400">코스별 완주 시 잠금 해제</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {THEME_ROADS_DATA.map((road) => {
            const completedRoadSpots = road.spots.filter(s => stamps.includes(s.storeId)).length;
            const isRoadCompleted = completedRoadSpots === road.spots.length;

            return (
              <div
                key={road.id}
                className={`p-4 rounded-3xl border transition-all space-y-2.5 ${
                  isRoadCompleted
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-orange-300 shadow-sm'
                    : 'bg-white border-slate-200/90 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">
                    {road.id === 'healing' && '🌿'}
                    {road.id === 'taste' && '🍖'}
                    {road.id === 'photo' && '📸'}
                    {road.id === 'night' && '🌙'}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    isRoadCompleted 
                      ? 'bg-orange-500 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isRoadCompleted ? '완주 완료' : `${completedRoadSpots}/${road.spots.length}`}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-sm text-navy-900 truncate">
                    {road.title}
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    배지: {road.reward.badgeName}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveThemeRoad(road.id);
                    setActiveTab('gourmet');
                  }}
                  className="w-full py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1"
                >
                  <Compass size={12} />
                  <span>투어 코스 보기</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Souvenir Information Banner (폴딩 캐리어 교환 안내) */}
      <div className="bg-gradient-to-br from-[#0C1326] via-[#131E3A] to-[#0A1020] text-white rounded-3xl p-5 border border-navy-700/60 shadow-md space-y-2.5">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#EFC548]" />
          <h4 className="font-black text-sm text-white">
            청량로드 테마길 공식 완주 기념품
          </h4>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          4대 테마길 코스를 완주하고 스탬프를 달성하시면 현장 종합안내소 및 서울한방진흥센터 안내데스크에서 <strong>청량로드 BI 접이식 플라스틱 폴딩 캐리어</strong>를 무료로 수령하실 수 있습니다.
        </p>
        <div className="pt-1 flex items-center justify-between text-xs text-[#FEF08A] font-bold">
          <span>수령처: 서울한방진흥센터 1층 안내데스크</span>
          <span className="font-mono text-white">현장 확인 후 증정</span>
        </div>
      </div>

      {/* Traditional Market Helpful Tips */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/80 space-y-2.5 text-xs sm:text-sm text-slate-700">
        <h4 className="font-extrabold text-sm text-navy-900 flex items-center gap-2">
          <AlertCircle size={16} className="text-[#EFC548]" />
          <span>청량로드 방문 에티켓 & 팁</span>
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside leading-relaxed">
          <li>각 테마길 스팟 입구에 비치된 공식 QR 코드를 스캔하면 스탬프가 자동으로 적립됩니다.</li>
          <li>도보 탐방 시 편안한 운동화 착용을 권장하며, 온누리상품권 및 모바일 간편결제를 지원합니다.</li>
          <li>한방진흥센터 족욕체험 및 일부 노포 식당은 현장 대기 상황에 따라 소요 시간이 변동될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default StampPassportView;
