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

export type ThemeCategory = 'sight' | 'food' | 'play' | 'nightlife'; // 볼거리 | 먹거리 | 즐길거리 | 야간놀거리
export type ThemeRoadId = 'healing' | 'taste' | 'photo' | 'night'; // 힐링 로드 | 맛 로드 | 인생사진 로드 | 밤 로드

export interface ThemeGuide {
  name: string;
  title: string;
  role: string;
  avatar: string;
  badges: string[];
  bio: string;
}

export interface ThemeRoadSpot {
  order: number;
  storeId: string;
  name: string;
  subtitle: string;
  marketName: string;
  category: ThemeCategory;
  highlight: string;
  mission: string;
  address: string;
  coordinates: { x: number; y: number };
  image: string;
  tags: string[];
  smallbeeUrl: string;
}

export interface ThemeRoadCourse {
  id: ThemeRoadId;
  title: string;
  subtitle: string;
  themeCategory: ThemeCategory;
  color: string;
  badge: string;
  concept: string;
  description: string;
  targetAudience: string;
  hashtags: string[];
  durationMinutes: number;
  estCost: string;
  guide: ThemeGuide;
  spots: ThemeRoadSpot[];
  trailCoordinates: { x: number; y: number }[]; // SVG polyline coordinates on map
  reward: {
    title: string;
    description: string;
    badgeName: string;
  };
}

export interface StoreItem {
  id: string;
  storeId: string; // used for smallbee external link: https://mobile.smallbee.co.kr/{storeid}
  name: string;
  marketId: MarketId;
  marketName: string;
  category: '맛집/식음' | '노포' | '문화/복합' | '한방/건강' | '청과/신선' | '특화상품';
  themeCategory: ThemeCategory; // 4대 테마길 기준: 볼거리 | 먹거리 | 즐길거리 | 야간놀거리
  themeRoads?: ThemeRoadId[]; // 참여하는 테마 로드
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
  tourSpotNumber?: number; // 1 to 8 if part of tour
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
