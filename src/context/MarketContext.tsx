import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StoreItem, CouponItem, Language, ActiveTab } from '../types/market';
import { STORES_DATA } from '../data/storesData';
import { INITIAL_COUPONS } from '../data/tourData';

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
    ko: '9개 전통시장, 40년 가업 노포, 스타벅스 1960까지 손안에서 만나는 로컬 가이드',
    en: '9 traditional markets, 40-year heritage spots, and Starbucks 1960 in your hands',
    ja: '9つの伝統市場、40年の老舗、スターバックス1960まで巡るローカルガイド',
    zh: '9个传统市场、40年老字号、星巴克1960一网打尽的本地指南',
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
    ko: '맛집 보드게임',
    en: 'Gourmet Tour',
    ja: 'グルメツアー',
    zh: '美食棋盘游',
  },
  heritageNav: {
    ko: '노포 시간여행',
    en: 'Heritage 1960',
    ja: '老舗タイムライン',
    zh: '老字号时间线',
  },
  profileNav: {
    ko: '스탬프·쿠폰',
    en: 'My Stamps',
    ja: 'スタンプ・クーポン',
    zh: '我的印章卡券',
  },
  smallbeeBtn: {
    ko: '스몰비(smallbee)에서 상품 보기 & 주문',
    en: 'View & Order on SmallBee',
    ja: 'SmallBeeで商品を見る・注文',
    zh: '在SmallBee查看商品与下单',
  },
  smallbeeSub: {
    ko: '시장 특가 상품 확인 및 내일/새벽배송 주문하기',
    en: 'Market specials & dawn delivery at your door',
    ja: '市場特価商品と翌朝スピード配送の注文',
    zh: '查看市场特价商品及次日/早晨生鲜配送',
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
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  stamps: string[];
  addStamp: (storeId: string) => void;
  hasStamp: (storeId: string) => boolean;
  coupons: CouponItem[];
  useCoupon: (couponId: string) => void;
  isQrScannerOpen: boolean;
  openQrScanner: () => void;
  closeQrScanner: () => void;
  isDirectionsOpen: boolean;
  directionsStore: StoreItem | null;
  openDirections: (store: StoreItem) => void;
  closeDirections: () => void;
  t: (key: string) => string;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>('ko');
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(null);
  const [selectedMarketFilter, setSelectedMarketFilter] = useState<string>('all');
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

  const [coupons, setCoupons] = useState<CouponItem[]>(() => {
    try {
      const saved = localStorage.getItem('crl_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [directionsStore, setDirectionsStore] = useState<StoreItem | null>(null);

  useEffect(() => {
    localStorage.setItem('crl_stamps', JSON.stringify(stamps));
  }, [stamps]);

  useEffect(() => {
    localStorage.setItem('crl_coupons', JSON.stringify(coupons));
  }, [coupons]);

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

  const useCoupon = (couponId: string) => {
    setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, isUsed: true } : c));
  };

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
        searchQuery,
        setSearchQuery,
        stamps,
        addStamp,
        hasStamp,
        coupons,
        useCoupon,
        isQrScannerOpen,
        openQrScanner,
        closeQrScanner,
        isDirectionsOpen,
        directionsStore,
        openDirections,
        closeDirections,
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
