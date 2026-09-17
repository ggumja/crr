import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StoreItem, Language, ActiveTab, ThemeRoadId } from '../types/market';
import { STORES_DATA } from '../data/storesData';
import { extractStoreIdFromQr } from '../utils/qrHelper';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const I18N: Translations = {
  serviceTitle: {
    ko: '1960 청량로드',
    en: '1960 Cheongnyang Road',
    ja: '1960 清涼ロード',
    zh: '1960 清凉路',
  },
  serviceSub: {
    ko: '디지털게이트웨이',
    en: 'Digital Gateway',
    ja: 'デジタルゲートウェイ',
    zh: '数字网关',
  },
  homeHeroTitle: {
    ko: '1960년의 온기와 청량리의 오늘을 잇다',
    en: 'Bridging the warmth of 1960 with modern Cheongnyangni',
    ja: '1960年の温もりと現代の清涼里をつなぐ',
    zh: '连接1960年的温情与今日清凉里',
  },
  homeHeroDesc: {
    ko: '4대 테마길(볼거리·먹거리·즐길거리·야간놀거리)과 전문 가이드투어로 만나는 청량리 로컬 매력',
    en: 'Experience Cheongnyangni through 4 theme roads and official guided tours',
    ja: '4大テーマロードと公式ガイドツアーで巡る清涼里のローカルな魅力',
    zh: '通过4大主题路与专业导览游体验清凉里的本土魅力',
  },
  qrQuickBtn: {
    ko: 'QR 현장 인증 시뮬레이터',
    en: 'QR Stamp Simulator',
    ja: 'QR現場認証シミュレーター',
    zh: 'QR现场认证模拟器',
  },
  mapNav: {
    ko: '통합 가이드맵',
    en: 'Market Map',
    ja: '統合マップ',
    zh: '综合地图',
  },
  gourmetNav: {
    ko: '가이드투어',
    en: 'Guide Tour',
    ja: 'ガイドツアー',
    zh: '导览游',
  },
  heritageNav: {
    ko: '청량로드1960',
    en: 'Cheongnyang Road 1960',
    ja: '清涼ロード1960',
    zh: '清凉路1960',
  },
  profileNav: {
    ko: '스탬프',
    en: 'Stamps',
    ja: 'スタンプ',
    zh: '印章',
  },
  smallbeeBtn: {
    ko: 'O2O 서비스 이용하기',
    en: 'Use O2O Service',
    ja: 'O2Oサービスを利用する',
    zh: '使用O2O服务',
  },
  smallbeeSub: {
    ko: '주문, 포장, 예약, 대기 기능 사용하러가기',
    en: 'Order, Pickup, Reservation & Waitlist',
    ja: '注文・テイクアウト・予約・ウェイティング機能へ',
    zh: '前往点单、打包、预约、排队功能',
  },
  directionsBtn: {
    ko: '현재 위치에서 골목 길찾기',
    en: 'Walking Directions',
    ja: '現在地からの道案内',
    zh: '从当前位置步行导航',
  },
  checkinBtn: {
    ko: '방문 QR 인증하기 (스탬프)',
    en: 'Verify Visit (Stamp)',
    ja: '訪問QR認証 (スタンプ)',
    zh: '扫码验证到访 (打卡印章)',
  },
};

interface MarketContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedStore: StoreItem | null;
  openStoreDetail: (storeOrId: StoreItem | string) => void;
  closeStoreDetail: () => void;
  selectedMarketFilter: string;
  setSelectedMarketFilter: (filter: string) => void;
  activeThemeRoad: ThemeRoadId;
  setActiveThemeRoad: (road: ThemeRoadId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  stamps: string[];
  addStamp: (storeId: string) => void;
  hasStamp: (storeId: string) => boolean;
  isQrScannerOpen: boolean;
  openQrScanner: () => void;
  closeQrScanner: () => void;
  isDirectionsOpen: boolean;
  directionsStore: StoreItem | null;
  openDirections: (store: StoreItem) => void;
  closeDirections: () => void;
  qrToastMessage: string | null;
  dismissQrToast: () => void;
  t: (key: string) => string;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>('ko');
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(null);
  const [selectedMarketFilter, setSelectedMarketFilter] = useState<string>('all');
  const [activeThemeRoad, setActiveThemeRoad] = useState<ThemeRoadId>('healing');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Stored state in localStorage for persistent demo experience
  const [stamps, setStamps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('crl_stamps');
      return saved ? JSON.parse(saved) : ['sb_starbucks1960']; // default 1 completed for delight
    } catch {
      return ['sb_starbucks1960'];
    }
  });

  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [directionsStore, setDirectionsStore] = useState<StoreItem | null>(null);
  const [qrToastMessage, setQrToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('crl_stamps', JSON.stringify(stamps));
  }, [stamps]);

  // 현장 QR 스캔 URL 접속 시 (?stamp=... 또는 ?qr=...) 자동 스탬프 발급
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detectedStoreId = extractStoreIdFromQr(window.location.href);
    if (detectedStoreId) {
      const store = STORES_DATA.find(s => s.storeId === detectedStoreId);
      if (store) {
        addStamp(detectedStoreId);
        setQrToastMessage(`🎉 [${store.marketName}] ${store.name} 현장 QR 인증 성공! 스탬프가 자동으로 찍혔습니다.`);
        setSelectedStore(store);

        // 브라우저 주소창 깔끔하게 정리 (URL query parameter 제거)
        try {
          const cleanUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, document.title, cleanUrl);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const dismissQrToast = () => setQrToastMessage(null);

  const t = (key: string): string => {
    if (I18N[key] && I18N[key][language]) {
      return I18N[key][language];
    }
    return key;
  };

  const openStoreDetail = (storeOrId: StoreItem | string) => {
    if (typeof storeOrId === 'string') {
      const found = STORES_DATA.find(s => s.id === storeOrId || s.storeId === storeOrId);
      if (found) setSelectedStore(found);
    } else {
      setSelectedStore(storeOrId);
    }
  };

  const closeStoreDetail = () => setSelectedStore(null);

  const addStamp = (storeId: string) => {
    if (!stamps.includes(storeId)) {
      setStamps(prev => [...prev, storeId]);
      
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C84B28', '#D97706', '#2D6A4F', '#FAF5EE']
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const hasStamp = (storeId: string) => stamps.includes(storeId);

  const openQrScanner = () => setIsQrScannerOpen(true);
  const closeQrScanner = () => setIsQrScannerOpen(false);

  const openDirections = (store: StoreItem) => {
    setDirectionsStore(store);
    setIsDirectionsOpen(true);
  };
  const closeDirections = () => {
    setIsDirectionsOpen(false);
    setDirectionsStore(null);
  };

  return (
    <MarketContext.Provider
      value={{
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        selectedStore,
        openStoreDetail,
        closeStoreDetail,
        selectedMarketFilter,
        setSelectedMarketFilter,
        activeThemeRoad,
        setActiveThemeRoad,
        searchQuery,
        setSearchQuery,
        stamps,
        addStamp,
        hasStamp,
        isQrScannerOpen,
        openQrScanner,
        closeQrScanner,
        isDirectionsOpen,
        directionsStore,
        openDirections,
        closeDirections,
        qrToastMessage,
        dismissQrToast,
        t,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};
