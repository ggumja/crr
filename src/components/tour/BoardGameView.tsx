import React, { useState } from 'react';
import { 
  Dices, Sparkles, CheckCircle2, ChevronRight, 
  Gift, RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOUR_SPOTS } from '../../data/tourData';
import { useMarket } from '../../context/MarketContext';
import { STORES_DATA } from '../../data/storesData';

export const BoardGameView: React.FC = () => {
  const { addStamp, hasStamp, openStoreDetail, setActiveTab } = useMarket();
  
  const [currentDice, setCurrentDice] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [activePlayerPos, setActivePlayerPos] = useState<number>(1);
  const [diceMessage, setDiceMessage] = useState<string>('주사위를 굴려 미식 보드게임 투어를 시작하세요!');

  const completedCount = TOUR_SPOTS.filter(s => hasStamp(s.storeId)).length;
  const progressPercent = Math.round((completedCount / TOUR_SPOTS.length) * 100);

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setDiceMessage('주사위가 굴러가는 중...');

    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 3) + 1; // 1 to 3 steps for board gameplay
      setCurrentDice(rolled);
      setIsRolling(false);

      const nextPos = Math.min(8, activePlayerPos + rolled);
      setActivePlayerPos(nextPos);

      const targetSpot = TOUR_SPOTS.find(s => s.spotNumber === nextPos);
      if (targetSpot) {
        setDiceMessage(`주사위 ${rolled}! [${targetSpot.name}]에 도착했습니다!`);
      }

      if (nextPos === 8) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D97706', '#C84B28', '#2D6A4F']
        });
      }
    }, 700);
  };

  const handleSpotClick = (spotStoreId: string) => {
    const store = STORES_DATA.find(s => s.storeId === spotStoreId);
    if (store) {
      openStoreDetail(store);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Gamification Scoreboard */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0C1326] via-[#131E3A] to-[#0A1020] rounded-3xl p-5 text-white shadow-xl border border-navy-700/60">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#EFC548]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-[#EFC548]/40 flex items-center justify-center font-bold text-lg text-[#EFC548]">
              🎲
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight text-white">
                청량로드 맛집 보드게임 투어
              </h2>
              <p className="text-[11px] text-slate-300">
                START에서 8대 골목 미식을 완주하고 리워드를 받으세요
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#EFC548] font-bold tracking-wider">도장 달성률</span>
            <p className="text-lg font-black font-mono text-white">{completedCount} / 8</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 mt-4">
          <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full bg-[#EFC548] rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-300 mt-1.5 font-medium">
            <span>START</span>
            <span className="text-[#EFC548] font-bold">3개 완료시 (2,000원 쿠폰)</span>
            <span>8개 완주 (명예 뱃지)</span>
          </div>
        </div>
      </div>

      {/* Interactive Dice Roller Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleRollDice}
            disabled={isRolling}
            className={`w-12 h-12 rounded-2xl bg-[#EFC548] text-[#0C1326] flex items-center justify-center shadow-md active:scale-90 transition-all font-black ${
              isRolling ? 'animate-dice' : 'hover:bg-[#E5B730]'
            }`}
            title="주사위 굴리기"
          >
            {currentDice ? (
              <span className="font-black text-2xl">{currentDice}</span>
            ) : (
              <Dices size={24} className="text-[#0C1326]" />
            )}
          </button>
          <div>
            <span className="text-[10px] font-bold text-[#7E5D0A] uppercase tracking-wider">
              {isRolling ? 'ROLLING...' : 'DICE CONTROLLER'}
            </span>
            <p className="text-xs font-bold text-navy-900 leading-tight">
              {diceMessage}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setActivePlayerPos(1);
            setCurrentDice(null);
            setDiceMessage('보드판 출발점으로 리셋되었습니다.');
          }}
          className="p-2 text-slate-400 hover:text-slate-700 active:scale-95 transition-all"
          title="처음으로 리셋"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Visual Board Game Circuit Track */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-extrabold text-xs text-navy-900 flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#EFC548]" />
            순환형 8대 미식 보드판 트랙
          </h3>
          <span className="text-[10px] text-slate-400">스팟 클릭 시 상세/스탬프 인증</span>
        </div>

        <div className="space-y-2">
          {TOUR_SPOTS.map((spot) => {
            const isCompleted = hasStamp(spot.storeId);
            const isCurrentPos = activePlayerPos === spot.spotNumber;

            return (
              <div
                key={spot.spotNumber}
                onClick={() => handleSpotClick(spot.storeId)}
                className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center justify-between ${
                  isCompleted
                    ? 'bg-[#FAF6E6] border-[#EFC548]/70'
                    : isCurrentPos
                    ? 'bg-slate-50 border-[#EFC548] ring-2 ring-[#EFC548]/30'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Left spot order & badge */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-xs ${
                      isCompleted 
                        ? 'bg-[#EFC548] text-[#0C1326]' 
                        : isCurrentPos
                        ? 'bg-navy-900 text-[#EFC548] animate-bounce'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {spot.spotNumber}
                    </div>

                    {isCurrentPos && (
                      <span className="absolute -top-2 -right-2 text-[9px] bg-[#0C1326] text-[#EFC548] px-1.5 py-0.2 rounded-full font-bold shadow-xs border border-[#EFC548]/50">
                        말
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                        {spot.marketName}
                      </span>
                      {isCompleted ? (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#FAF6E6] text-[#7E5D0A] font-bold flex items-center gap-0.5 border border-[#EFC548]/40">
                          <CheckCircle2 size={10} />
                          도장 완료
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-100 text-slate-700 font-semibold">
                          도전하기
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-xs text-navy-900 mt-0.5">
                      {spot.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {spot.shortMenu}
                    </p>
                  </div>
                </div>

                {/* Right Arrow / Quick action */}
                <div className="flex items-center gap-1.5 pl-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addStamp(spot.storeId);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all active:scale-95 ${
                      isCompleted
                        ? 'bg-[#FAF6E6] text-[#7E5D0A] border border-[#EFC548]/40'
                        : 'bg-[#EFC548] text-[#0C1326] hover:bg-[#E5B730] shadow-xs'
                    }`}
                  >
                    {isCompleted ? '완료됨' : '도장 찍기'}
                  </button>
                  <ChevronRight size={14} className="text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Reward Callout */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF6E6] text-[#7E5D0A] border border-[#EFC548]/30 flex items-center justify-center">
            <Gift size={20} />
          </div>
          <div>
            <h4 className="font-bold text-xs text-navy-900">
              나의 쿠폰함 확인하기
            </h4>
            <p className="text-[11px] text-slate-500">
              스탬프 3개 달성 시 '쌍화차 1잔 무료 쿠폰' 지급!
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('profile')}
          className="px-3 py-1.5 rounded-xl bg-[#0C1326] text-[#EFC548] border border-[#EFC548]/40 text-xs font-bold hover:bg-[#131E3A] transition-colors shrink-0"
        >
          쿠폰함
        </button>
      </div>
    </div>
  );
};
