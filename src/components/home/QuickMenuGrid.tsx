import React from 'react';
import { Map, Compass, History, Award, ArrowUpRight } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { ActiveTab } from '../../types/market';

export const QuickMenuGrid: React.FC = () => {
  const { setActiveTab, stamps, t } = useMarket();

  const menus: {
    tab: ActiveTab;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
    badge?: string;
  }[] = [
    {
      tab: 'heritage',
      title: t('quickHeritageTitle'),
      subtitle: t('quickHeritageDesc'),
      icon: History,
      badge: t('quickHeritageBadge'),
    },
    {
      tab: 'map',
      title: t('quickMapTitle'),
      subtitle: t('quickMapDesc'),
      icon: Map,
      badge: t('quickMapBadge'),
    },
    {
      tab: 'gourmet',
      title: t('quickTourTitle'),
      subtitle: t('quickTourDesc'),
      icon: Compass,
      badge: `${stamps.length}/8 ${t('quickTourVerifiedSuffix')}`,
    },
    {
      tab: 'profile',
      title: t('quickStampTitle'),
      subtitle: t('quickStampDesc'),
      icon: Award,
      badge: `${stamps.length}${t('quickStampAchievedSuffix')}`,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-extrabold text-base tracking-tight text-navy-900 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFC548] inline-block shadow-xs" />
          {t('quickMenuTitle')}
        </h2>
        <span className="text-xs text-slate-400 font-medium">{t('quickMenuSub')}</span>
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
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold bg-[#EFC548] text-[#0C1326] group-hover:bg-[#E5B730] transition-all shadow-xs group-hover:scale-105">
                  <Icon size={21} />
                </div>
                {item.badge && (
                  <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 whitespace-nowrap shrink-0">
                    {item.badge}
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-navy-900 group-hover:text-[#7E5D0A] tracking-tight transition-colors break-keep truncate">
                    {item.title}
                  </h3>
                  <ArrowUpRight size={15} className="text-slate-400 group-hover:text-[#7E5D0A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-snug font-normal line-clamp-2 break-keep">
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
