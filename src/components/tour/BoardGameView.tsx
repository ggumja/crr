import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Gift, 
  Compass, 
  Clock, 
  Coins, 
  Award, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Dices,
  Navigation,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { THEME_ROADS_DATA } from '../../data/tourData';
import { useMarket } from '../../context/MarketContext';
import { STORES_DATA } from '../../data/storesData';

export const BoardGameView: React.FC = () => {
  const { 
    hasStamp, 
    openStoreDetail, 
    openDirections, 
    setActiveTab,
    activeThemeRoad,
    setActiveThemeRoad,
    openQrScanner
  } = useMarket();

  const [expandedSpotOrder, setExpandedSpotOrder] = useState<number | null>(1);
  const [isRolling, setIsRolling] = useState(false);
  const [currentDice, setCurrentDice] = useState<number | null>(null);
  const [diceMessage, setDiceMessage] = useState<string>('주사위를 굴려 추천 스팟으로 순간이동하세요!');

  // 현재 활성화된 테마 로드
  const currentRoad = THEME_ROADS_DATA.find(r => r.id === activeThemeRoad) || THEME_ROADS_DATA[0];

  // 도장 달성률 계산 (현재 테마 로드의 스팟 중 스탬프를 찍은 개수)
  const completedSpotsCount = currentRoad.spots.filter(s => hasStamp(s.storeId)).length;
  const isAllCompleted = completedSpotsCount === currentRoad.spots.length;
  const progressPercent = Math.round((completedSpotsCount / currentRoad.spots.length) * 100);

  // 주사위 시뮬레이터 (코스 탐험 게이미피케이션)
  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setDiceMessage('주사위가 힘차게 굴러가는 중...');

    setTimeout(() => {
      const rolled = Math.floor(Math.random() * currentRoad.spots.length) + 1;
      setCurrentDice(rolled);
      setIsRolling(false);
      setExpandedSpotOrder(rolled);

      const spot = currentRoad.spots.find(s => s.order === rolled);
      if (spot) {
        setDiceMessage(`주사위 ${rolled}! [${spot.name}]에 도착했습니다!`);
      }

      if (rolled === currentRoad.spots.length) {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#EA580C', '#EFC548', '#2D6A4F']
        });
      }
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* 1. Header & 4대 테마길 코스 탭 셀렉터 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0C1326] via-[#131E3A] to-[#0A1020] rounded-3xl p-5 text-white shadow-xl border border-navy-700/60">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#EA580C]/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#EA580C] flex items-center justify-center font-bold text-white shadow-md">
              <Compass size={22} className="stroke-[2.5px]" />
            </div>
            <div>
              <h2 className="font-black text-lg text-white tracking-tight leading-tight">
                청량로드 가이드투어
              </h2>
              <p className="text-xs text-slate-300 font-normal">
                공식 결과보고서 인증 4대 테마길 맞춤 해설 코스
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] font-extrabold text-[#FEF08A] block">인증 스탬프</span>
            <p className="text-xl font-black font-mono text-white">
              {completedSpotsCount} <span className="text-xs text-slate-400 font-normal">/ {currentRoad.spots.length}</span>
            </p>
          </div>
        </div>

        {/* 4대 테마 로드 탭 전환 버튼들 */}
        <div className="relative z-10 grid grid-cols-4 gap-1.5 p-1 bg-black/30 rounded-2xl border border-white/10">
          {THEME_ROADS_DATA.map((road) => {
            const isSelected = activeThemeRoad === road.id;
            return (
              <button
                key={road.id}
                onClick={() => {
                  setActiveThemeRoad(road.id);
                  setExpandedSpotOrder(1);
                }}
                className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center text-center ${
                  isSelected
                    ? 'bg-[#EA580C] text-white font-black shadow-md ring-1 ring-white/40 scale-102'
                    : 'text-slate-300 hover:text-white hover:bg-white/10 font-bold'
                }`}
              >
                <span className="text-xs tracking-tight truncate w-full">
                  {road.id === 'healing' && '🌿 힐링'}
                  {road.id === 'taste' && '🍖 맛'}
                  {road.id === 'photo' && '📸 사진'}
                  {road.id === 'night' && '🌙 밤'}
                </span>
                <span className="text-[10px] opacity-75 mt-0.5">로드</span>
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 mt-3.5 space-y-1.5">
          <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-[#EA580C] to-[#EFC548] rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span>START</span>
            <span className="text-[#FEF08A] font-extrabold">
              {isAllCompleted ? '🎉 전 코스 완주 달성!' : `${currentRoad.spots.length - completedSpotsCount}곳 남음`}
            </span>
            <span>완주 배지 & 기념품</span>
          </div>
        </div>
      </div>

      {/* 2. 현재 선택된 테마 로드 상세 카드 & 전문 가이드 배너 */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-100 text-orange-800">
                {currentRoad.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">공식 테마 코스</span>
            </div>
            <h3 className="text-lg font-black text-navy-900 tracking-tight">
              {currentRoad.title}
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              {currentRoad.concept}
            </p>
          </div>
        </div>

        {/* 코스 스펙 태그들 (소요시간, 예상비용, 추천대상) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
          <div className="bg-slate-50 rounded-xl p-2.5 flex items-center gap-2 border border-slate-100">
            <Clock size={16} className="text-[#EA580C] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">소요 시간</span>
              <span className="font-extrabold text-navy-900">{currentRoad.durationMinutes}분 (도보)</span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 flex items-center gap-2 border border-slate-100">
            <Coins size={16} className="text-[#EA580C] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">예상 비용</span>
              <span className="font-extrabold text-navy-900">{currentRoad.estCost}</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-slate-50 rounded-xl p-2.5 flex items-center gap-2 border border-slate-100">
            <Award size={16} className="text-[#EA580C] shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold">완주 기념품</span>
              <span className="font-extrabold text-navy-900 truncate block">청량 폴딩 캐리어</span>
            </div>
          </div>
        </div>

        {/* 공식 전문 가이드 스토리텔링 배너 (정지태 관장 / 장영수 큐레이터) */}
        <div className="bg-gradient-to-r from-slate-900 to-navy-900 text-white rounded-2xl p-3.5 flex items-center gap-3 shadow-md">
          <img
            src={currentRoad.guide.avatar}
            alt={currentRoad.guide.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#EFC548] shrink-0 shadow-sm"
          />
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-white">{currentRoad.guide.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-[#FEF08A] font-bold">
                공식 가이드
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate font-normal">
              {currentRoad.guide.title}
            </p>
            <p className="text-[11px] text-[#FEF08A] font-medium line-clamp-1 italic">
              "{currentRoad.guide.bio}"
            </p>
          </div>
        </div>

        {/* 해시태그 목록 */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {currentRoad.hashtags.map((tag, idx) => (
            <span key={idx} className="text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3. 주사위 굴리기 시뮬레이터 (게이미피케이션 탐험) */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-3.5 border border-orange-200/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-[#EA580C] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
            {isRolling ? '...' : currentDice ? `⚄` : '🎲'}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-black text-orange-800 uppercase tracking-wider block">
              가이드투어 탐험 시뮬레이터
            </span>
            <p className="text-xs text-navy-900 font-bold truncate">
              {diceMessage}
            </p>
          </div>
        </div>

        <button
          onClick={handleRollDice}
          disabled={isRolling}
          className="shrink-0 px-4 py-2 rounded-xl bg-[#0C1326] hover:bg-slate-800 active:scale-95 text-[#FEF08A] text-xs font-black shadow-sm transition-all flex items-center gap-1.5"
        >
          <Dices size={14} />
          <span>{isRolling ? '굴리는 중' : '주사위 굴리기'}</span>
        </button>
      </div>

      {/* 4. 단계별 코스 타임라인 & 스팟 미션 카드 목록 (사용자 지도 노선 반영) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="font-extrabold text-sm text-navy-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
            <span>공식 노선 순서별 코스 ({currentRoad.spots.length}개 스팟)</span>
          </h4>
          <button
            onClick={() => setActiveTab('map')}
            className="text-xs text-orange-600 hover:underline font-bold flex items-center gap-1"
          >
            <span>지도에서 동선 보기</span>
            <Navigation size={12} />
          </button>
        </div>

        <div className="space-y-2.5">
          {currentRoad.spots.map((spot) => {
            const isCompleted = hasStamp(spot.storeId);
            const isExpanded = expandedSpotOrder === spot.order;

            return (
              <div 
                key={spot.storeId}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                  isCompleted 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : isExpanded 
                    ? 'border-[#EA580C]/80 ring-2 ring-[#EA580C]/20 shadow-md' 
                    : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Spot Header Row */}
                <div 
                  onClick={() => setExpandedSpotOrder(isExpanded ? null : spot.order)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Step Number Badge */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-500 text-white shadow-xs' 
                        : isExpanded 
                        ? 'bg-[#EA580C] text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isCompleted ? <CheckCircle2 size={16} /> : spot.order}
                    </div>

                    {/* Spot Name & Subtitle */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {spot.marketName}
                        </span>
                        <h5 className="font-bold text-sm text-navy-900 truncate">
                          {spot.name}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {spot.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Stamp Status or QR Scanner Action */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isCompleted ? (
                      <span className="px-2.5 py-1.5 rounded-xl text-xs font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        <span>인증완료</span>
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQrScanner();
                        }}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-black bg-[#0C1326] hover:bg-[#131E3A] active:scale-95 text-[#EFC548] border border-[#EFC548]/40 shadow-xs flex items-center gap-1 transition-all"
                        title="현장 QR 스캔으로 자동 인증"
                      >
                        <QrCode size={13} className="text-[#EFC548]" />
                        <span>QR 스캔</span>
                      </button>
                    )}

                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Spot Details */}
                {isExpanded && (
                  <div className="px-3.5 pb-4 pt-1 space-y-3 border-t border-slate-100">
                    {/* Spot Image & Highlight */}
                    <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-inner">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                        <span className="text-[10px] font-black text-[#FEF08A] uppercase tracking-wider">
                          가이드 하이라이트
                        </span>
                        <p className="text-xs font-bold text-white line-clamp-2 mt-0.5">
                          {spot.highlight}
                        </p>
                      </div>
                    </div>

                    {/* Mission Box */}
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                        <Award size={14} className="text-amber-600" />
                        <span>현장 투어 미션</span>
                      </div>
                      <p className="text-xs text-amber-800 leading-relaxed font-normal">
                        {spot.mission}
                      </p>
                    </div>

                    {/* Action Buttons: Store Detail, Directions, Smallbee O2O */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => {
                          const store = STORES_DATA.find(s => s.storeId === spot.storeId);
                          if (store) openDirections(store);
                        }}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Navigation size={13} />
                        <span>길찾기</span>
                      </button>

                      <button
                        onClick={() => {
                          const store = STORES_DATA.find(s => s.storeId === spot.storeId);
                          if (store) openStoreDetail(store);
                        }}
                        className="py-2 px-3 rounded-xl bg-[#0C1326] hover:bg-slate-800 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>상세정보</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>

                    {/* External O2O Link Banner */}
                    <a
                      href={spot.smallbeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#FAF6E6] text-[#7E5D0A] border border-[#EFC548]/50 hover:bg-[#F5EECD] text-xs font-bold transition-colors"
                    >
                      <span className="truncate">모바일 주문·포장·예약 바로가기</span>
                      <ExternalLink size={13} className="shrink-0 ml-1" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. 투어 완주 리워드 안내 카드 */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200 shadow-sm space-y-2.5">
        <div className="flex items-center gap-2">
          <Gift size={18} className="text-[#EA580C]" />
          <h4 className="font-black text-sm text-navy-900">
            {currentRoad.reward.title}
          </h4>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {currentRoad.reward.description}
        </p>
        <div className="pt-1 flex items-center justify-between">
          <span className="text-xs font-bold text-orange-700">
            획득 가능 배지: <strong className="font-black">[{currentRoad.reward.badgeName}]</strong>
          </span>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-xs font-black text-navy-900 hover:underline flex items-center gap-1"
          >
            <span>내 스탬프 보기</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardGameView;
