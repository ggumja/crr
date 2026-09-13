import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Globe, ChevronDown } from 'lucide-react';
import { useMarket } from '../../context/MarketContext';
import { Language } from '../../types/market';

export const Header: React.FC = () => {
  const { language, setLanguage, openQrScanner, setActiveTab, t } = useMarket();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ko', label: '한국어', flag: 'KR' },
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'ja', label: '日本語', flag: 'JP' },
    { code: 'zh', label: '中文', flag: 'CN' },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 transition-all duration-200">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-[0.98]"
        >
          <img
            src="./crl-logo.png"
            alt="1960 청량로드 로고"
            className="w-10 h-10 object-contain rounded-full shadow-sm ring-1 ring-amber-400/40"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-navy-900 group-hover:text-amber-600 transition-colors">
                {t('serviceTitle')}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#FAF6E6] text-[#7E5D0A] border border-[#EFC548]/50">
                O2O
              </span>
            </div>
            <p className="text-[11px] text-slate-500 tracking-tight font-medium flex items-center gap-1">
              <span>9개 전통시장 통합</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 inline-block"></span>
              <span>{t('serviceSub')}</span>
            </p>
          </div>
        </button>

        {/* Action Buttons: Language & QR */}
        <div className="flex items-center gap-1.5">
          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-xs font-semibold text-slate-700 shadow-xs transition-all"
              aria-label="언어 변경"
            >
              <Globe size={14} className="text-slate-400" />
              <span>{language.toUpperCase()}</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50 transition-colors ${
                      language === item.code ? 'font-bold text-[#7E5D0A] bg-[#FAF6E6]' : 'text-slate-700'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick QR Scanner CTA */}
          <button
            onClick={openQrScanner}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EFC548] hover:bg-[#E5B730] active:scale-95 text-[#0C1326] text-xs font-bold shadow-xs transition-all"
            title="QR 코드 빠른 스캔"
          >
            <QrCode size={15} className="text-[#0C1326]" />
            <span className="hidden xs:inline">QR 스캔</span>
          </button>
        </div>
      </div>
    </header>
  );
};
