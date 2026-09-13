import React from 'react';
import { X, Navigation, MapPin, Footprints, ExternalLink } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';

export const DirectionsModal: React.FC = () => {
  const { isDirectionsOpen, closeDirections, directionsStore } = useMarket();

  if (!isDirectionsOpen || !directionsStore) return null;

  const steps = [
    {
      title: '청량리역 1호선 / 수인분당선 1번 출구 출발',
      detail: '1번 출구 앞 광장에서 고산자로 방면으로 도보 80m 직진',
      time: '1분',
    },
    {
      title: `${directionsStore.marketName} 진입`,
      detail: `시장 정문 게이트 통과 후 아케이드 진입로 확인`,
      time: '2분',
    },
    {
      title: '골목 상세 안내',
      detail: directionsStore.locationGuide,
      time: '1분',
    },
    {
      title: `도착: ${directionsStore.name}`,
      detail: directionsStore.address,
      time: '도착',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EFC548] text-[#0C1326] flex items-center justify-center shadow-xs font-bold">
              <Navigation size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-tight text-navy-900">
                전통시장 골목 도보 길안내
              </h3>
              <p className="text-[11px] text-slate-500">
                {directionsStore.marketName} · {directionsStore.name}
              </p>
            </div>
          </div>
          <button
            onClick={closeDirections}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200"
          >
            <X size={16} />
          </button>
        </div>

        {/* Total Time & Distance Summary */}
        <div className="my-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Footprints className="text-[#A97F12]" size={20} />
            <div>
              <span className="text-xs text-slate-400">청량리역 출발 기준</span>
              <p className="text-sm font-extrabold text-navy-900">도보 약 4~5분 소요 (320m)</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#FAF6E6] text-[#7E5D0A] text-xs font-bold border border-[#EFC548]/40">
            평지 코스
          </span>
        </div>

        {/* Step by Step Timeline */}
        <div className="space-y-4 my-4 pl-2">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-3">
              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="absolute left-3.5 top-6 bottom-0 w-0.5 bg-slate-200 -mb-2" />
              )}

              {/* Pin icon */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                idx === steps.length - 1 
                  ? 'bg-[#EFC548] text-[#0C1326] font-black' 
                  : 'bg-white border-2 border-[#EFC548] text-navy-900 font-bold text-xs'
              }`}>
                {idx === steps.length - 1 ? <MapPin size={14} className="text-[#0C1326]" /> : idx + 1}
              </div>

              {/* Text */}
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-navy-900">{step.title}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{step.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* External Map Integration Simulator */}
        <div className="pt-2 flex gap-2">
          <a
            href={`https://map.naver.com/v5/search/${encodeURIComponent(directionsStore.address + ' ' + directionsStore.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
          >
            <span>네이버 지도에서 보기</span>
            <ExternalLink size={13} />
          </a>
          <a
            href={`https://map.kakao.com/link/search/${encodeURIComponent(directionsStore.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
          >
            <span>카카오맵에서 보기</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
