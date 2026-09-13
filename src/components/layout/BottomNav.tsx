import React from 'react';
import { Home, Map, UtensilsCrossed, History, Ticket } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { ActiveTab } from '../../types/market';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, stamps, coupons, t } = useMarket();

  const unusedCouponsCount = coupons.filter(c => !c.isUsed).length;

  const navItems: { tab: ActiveTab; label: string; icon: React.ComponentType<{ size: number; className?: string }>; badge?: number }[] = [
    { tab: 'home', label: '홈', icon: Home },
    { tab: 'map', label: t('mapNav'), icon: Map },
    { tab: 'gourmet', label: t('gourmetNav'), icon: UtensilsCrossed, badge: stamps.length },
    { tab: 'heritage', label: t('heritageNav'), icon: History },
    { tab: 'profile', label: t('profileNav'), icon: Ticket, badge: unusedCouponsCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-2 transition-all shadow-lg">
      <div className="w-full max-w-md mx-auto grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? 'text-navy-900 font-black'
                  : 'text-slate-400 hover:text-slate-700 font-semibold'
              }`}
            >
              <div className="relative">
                <Icon size={22} className={isActive ? 'stroke-[2.5px] text-[#0C1326]' : 'stroke-[1.9px]'} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] flex items-center justify-center font-black shadow-xs ${
                    isActive ? 'bg-[#EFC548] text-[#0C1326]' : 'bg-slate-700 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 tracking-tight ${isActive ? 'font-black text-[#0C1326]' : 'text-slate-500 font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-2 h-1 rounded-full bg-[#EFC548] mt-0.5 shadow-xs" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
