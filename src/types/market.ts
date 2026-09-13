export type MarketId = 
  | 'gyeongdong'
  | 'cheongnyangni_total'
  | 'yaknyeongsi'
  | 'cheonggwa'
  | 'wholesale'
  | 'gwangseong'
  | 'hyundai'
  | 'dongseo'
  | 'traditional';

export interface MarketZone {
  id: MarketId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  specialty: string[];
  foundedYear: number;
  storesCount: number;
  color: string;
  x: number; // percentage coordinate on interactive map
  y: number;
  w: number;
  h: number;
}

export interface StoreItem {
  id: string;
  storeId: string; // used for smallbee external link: https://mobile.smallbee.co.kr/{storeid}
  name: string;
  marketId: MarketId;
  marketName: string;
  category: '맛집/식음' | '노포' | '문화/복합' | '한방/건강' | '청과/신선' | '특화상품';
  tags: string[];
  titleBadge?: string; // e.g. "30년 전통", "경동 랜드마크", "백년가게", "미식로드 1위"
  address: string;
  locationGuide: string; // e.g. "경동시장 신관 3층 구 극장 자리", "광흥골목 입구 도보 1분"
  coordinates: { x: number; y: number }; // percentage on map
  phone: string;
  businessHours: string;
  closedDay: string;
  image: string;
  gallery: string[];
  signatureMenu: string[];
  priceRange: string;
  description: string;
  history: string;
  smallbeeUrl: string; // https://mobile.smallbee.co.kr/{storeid}
  isAnchor: boolean;
  tourSpotNumber?: number; // 1 to 8 if part of board game tour
}

export interface TourSpot {
  spotNumber: number;
  storeId: string;
  name: string;
  marketName: string;
  shortMenu: string;
  mission: string;
  hint: string;
  isCompleted: boolean;
  x: number;
  y: number;
  image: string;
}

export interface CouponItem {
  id: string;
  title: string;
  discount: string;
  targetMarket: string;
  validDate: string;
  condition: string;
  isUsed: boolean;
  barcode: string;
  category: 'discount' | 'drink' | 'parking';
}

export interface HeritageEvent {
  year: string;
  era: string;
  title: string;
  subtitle: string;
  story: string;
  marketName: string;
  relatedStoreId?: string;
  image: string;
}

export type Language = 'ko' | 'en' | 'ja' | 'zh';
export type ActiveTab = 'home' | 'map' | 'gourmet' | 'heritage' | 'profile';
