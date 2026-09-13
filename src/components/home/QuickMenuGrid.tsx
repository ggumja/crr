import React from 'react';
import { Map, UtensilsCrossed, History, Ticket, ArrowUpRight } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { ActiveTab } from '../../types/market';

export const QuickMenuGrid: React.FC = () => {
  const { setActiveTab, stamps, coupons } = useMarket();

  const menus: {
    tab: ActiveTab;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
    badge?: string;
  }[] = [
    {
      tab: 'map',
      title: '통합 가이드맵',
      subtitle: '9개 시장 구역 & 골목 탐색',
      icon: Map,
      badge: '9개 구역',
    },
    {
      tab: 'gourmet',
      title: '맛집 보드게임',
      subtitle: '주사위 굴리고 8대 미식 스탬프',
      icon: UtensilsCrossed,
      badge: `${stamps.length}/8 완료`,
    },
    {
      tab: 'heritage',
      title: '노포 시간여행',
      subtitle: '1960~2026 청량로드 아카이브',
      icon: History,
      badge: '60년사',
    },
    {
      tab: 'profile',
      title: '스탬프 & 쿠폰함',
      subtitle: '적립 리워드 및 할인쿠폰 3종',
      icon: Ticket,
      badge: `${coupons.filter(c => !c.isUsed).length}장 보유`,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-extrabold text-base tracking-tight text-navy-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFC548] inline-block shadow-xs" />
          핵심 4대 탐색 퀵 메뉴
        </h2>
        <span className="text-xs text-slate-400 font-medium">클릭 시 바로 이동</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-3xl bg-white border border-slate-200/90 hover:border-[#EFC548] text-left flex flex-col justify-between transition-all active:scale-[0.98] shadow-xs hover:shadow-md group"
            >
              <div className="flex items-start justify-between w-full mb-3.5">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold bg-[#FAF6E6] text-[#7E5D0A] group-hover:bg-[#EFC548] group-hover:text-[#0C1326] transition-colors shadow-xs">
                  <Icon size={21} />
                </div>
                {item.badge && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60">
                    {item.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-extrabold text-navy-900 group-hover:text-[#7E5D0A] tracking-tight transition-colors">
                    {item.title}
                  </h3>
                  <ArrowUpRight size={15} className="text-slate-400 group-hover:text-[#7E5D0A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug font-normal">
                  {item.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
