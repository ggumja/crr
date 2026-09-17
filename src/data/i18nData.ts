import { Language } from '../types/market';

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const EXTRA_I18N: Translations = {
  // Brand Header & Sub
  dongdaemunBadge: {
    ko: '동대문구 청량로드 · O2O 디지털게이트웨이',
    en: 'Dongdaemun Cheongnyang Road · O2O Digital Gateway',
    ja: '東大門区 清涼ロード · O2Oデジタルゲートウェイ',
    zh: '东大门区 清凉路 · O2O数字网关',
  },
  exploreMapBtn: {
    ko: '9개 시장 지도 탐색',
    en: 'Explore 9 Markets Map',
    ja: '9市場の地図を探索',
    zh: '探索9大市场地图',
  },
  statMarketsValue: {
    ko: '9개',
    en: '9',
    ja: '9市場',
    zh: '9大',
  },
  statMarketsLabel: {
    ko: '전통시장 구역',
    en: 'Traditional Markets',
    ja: '伝統市場区域',
    zh: '传统市场区域',
  },
  statStoresValue: {
    ko: '3,200+',
    en: '3,200+',
    ja: '3,200+',
    zh: '3,200+',
  },
  statStoresLabel: {
    ko: '등록 점포망',
    en: 'Registered Stores',
    ja: '登録店舗網',
    zh: '注册店铺网',
  },
  statHeritageValue: {
    ko: '66년',
    en: '66 Yrs',
    ja: '66年',
    zh: '66年',
  },
  statHeritageLabel: {
    ko: '헤리티지 아카이브',
    en: 'Heritage Archive',
    ja: 'ヘリテージアーカイブ',
    zh: '历史文化档案',
  },

  // QuickMenuGrid
  quickMenuTitle: {
    ko: '핵심 4대 탐색 퀵 메뉴',
    en: 'Core 4 Exploration Menus',
    ja: '主要4大探索クイックメニュー',
    zh: '核心4大探索快捷菜单',
  },
  quickMenuSub: {
    ko: '클릭 시 바로 이동',
    en: 'Tap to navigate',
    ja: 'タップですぐ移動',
    zh: '点击即可跳转',
  },
  quickHeritageTitle: {
    ko: '청량로드1960',
    en: 'Cheongnyang Road 1960',
    ja: '清涼ロード1960',
    zh: '清凉路1960',
  },
  quickHeritageDesc: {
    ko: '1960~2026 청량로드 아카이브',
    en: '1960~2026 Cheongnyang Road Archive',
    ja: '1960~2026 清涼ロードアーカイブ',
    zh: '1960~2026 清凉路历史档案',
  },
  quickHeritageBadge: {
    ko: '66년사',
    en: '66 Years',
    ja: '66年史',
    zh: '66年史',
  },
  quickMapTitle: {
    ko: '통합가이드맵',
    en: 'Integrated Guide Map',
    ja: '統合ガイドマップ',
    zh: '综合导览地图',
  },
  quickMapDesc: {
    ko: '4대 테마길(볼·먹·즐·밤) 지도 탐색',
    en: 'Explore 4 Theme Roads Map',
    ja: '4大テーマロード（見所・食・遊・夜）マップ',
    zh: '4大主题路（看点·美食·娱乐·夜游）地图探索',
  },
  quickMapBadge: {
    ko: '4대 테마길',
    en: '4 Themes',
    ja: '4大テーマ',
    zh: '4大主题路',
  },
  quickTourTitle: {
    ko: '가이드투어',
    en: 'Guided Tour',
    ja: 'ガイドツアー',
    zh: '导览游',
  },
  quickTourDesc: {
    ko: '힐링·맛·인생사진·밤 4대 코스',
    en: 'Healing, Taste, Photo & Night Courses',
    ja: 'ヒーリング・味覚・映え・夜景の4大コース',
    zh: '治愈·美食·摄影·夜景4大路线',
  },
  quickTourVerifiedSuffix: {
    ko: '인증',
    en: 'Verified',
    ja: '認証',
    zh: '认证',
  },
  quickStampTitle: {
    ko: '스탬프 여권',
    en: 'Stamp Passport',
    ja: 'スタンプパスポート',
    zh: '印章护照',
  },
  quickStampDesc: {
    ko: '4대 테마길 인증 스탬프 & 배지',
    en: 'Stamps & Badges for 4 Theme Roads',
    ja: '4大テーマロード認証スタンプ＆バッジ',
    zh: '4大主题路打卡印章与勋章',
  },
  quickStampAchievedSuffix: {
    ko: '개 달성',
    en: ' Collected',
    ja: '個達成',
    zh: '个达成',
  },

  // AnchorStoresRow
  anchorTitle: {
    ko: '청량로드 추천 앵커시설 & 명소',
    en: 'Featured Anchor Facilities & Landmarks',
    ja: '清涼ロード推薦アンカー施設＆名所',
    zh: '清凉路精选重点设施与景点',
  },
  anchorSub: {
    ko: '전통시장 재생과 문화가 살아 숨 쉬는 대표 거점',
    en: 'Key hubs combining market revitalization and living culture',
    ja: '伝統市場の再生と文化が息づく代表拠点',
    zh: '融合传统市场振兴与鲜活文化的代表性据点',
  },
  horizontalScroll: {
    ko: '가로 스크롤 →',
    en: 'Scroll horizontally →',
    ja: '横スクロール →',
    zh: '横向滚动 →',
  },
  smallbeeLinked: {
    ko: '스몰비 O2O 연동',
    en: 'O2O Linked',
    ja: 'O2O連携',
    zh: 'O2O互联',
  },
  viewDetails: {
    ko: '상세보기',
    en: 'Details',
    ja: '詳細を見る',
    zh: '查看详情',
  },

  // App Home O2O Notice Card
  o2oNoticeBadge: {
    ko: '디지털 로컬상생 안내',
    en: 'Digital Local Coexistence',
    ja: 'デジタル共生案内',
    zh: '数智共生指南',
  },
  o2oNoticeTag: {
    ko: 'O2O 플랫폼 연동',
    en: 'O2O Platform',
    ja: 'O2Oプラットフォーム連携',
    zh: 'O2O平台互联',
  },
  o2oNoticeTitle: {
    ko: '전통시장을 O2O기능 으로 주문, 포장, 예약, 대기 기능을 사용해보세요.',
    en: 'Experience traditional markets with O2O: Order, Pickup, Reservation & Waitlist.',
    ja: '伝統市場でO2O機能を活用：注文、テイクアウト、予約、ウェイティング。',
    zh: '利用O2O功能畅享传统市场：在线点单、打包、预约、排队。',
  },
  o2oNoticeDesc: {
    ko: '본 앱은 방문객의 오프라인 탐색, 역사 투어, QR 인증을 전담하며, 상품 장바구니와 주문·포장·예약은 각 점포의 외부 스몰비 O2O 링크를 통해 편리하게 진행됩니다.',
    en: 'This app guides your offline exploration, heritage tour, and QR stamps, while shopping carts, orders, and reservations are handled seamlessly via store O2O links.',
    ja: '本アプリはオフライン散策、歴史ツアー、QR認証を案内し、商品の注文・テイクアウト・予約は各店舗のO2Oリンクにてスムーズに行えます。',
    zh: '本应用专注提供线下探索、历史导览与扫码打卡服务，商品选购、点单及预约则通过各店铺的O2O链接便捷完成。',
  },
  o2oNoticeBtn: {
    ko: '9개 시장 가이드맵 보러가기',
    en: 'Go to 9 Markets Guide Map',
    ja: '9市場ガイドマップへ',
    zh: '查看9大市场导览地图',
  },

  // HeritageTimeline
  heritageChronology: {
    ko: 'CHRONOLOGY · 1960 ~ 2026',
    en: 'CHRONOLOGY · 1960 ~ 2026',
    ja: '歴史年表 · 1960 ~ 2026',
    zh: '历史纪年 · 1960 ~ 2026',
  },
  heritageHeaderTitle: {
    ko: '청량로드1960 · 66년의 아카이브',
    en: 'Cheongnyang Road 1960 · 66-Year Archive',
    ja: '清涼ロード1960 · 66年のアーカイブ',
    zh: '清凉路1960 · 66年历史档案',
  },
  heritageHeaderDesc: {
    ko: '피난민과 농민들이 일군 장터에서 아시아 최대 한방 클러스터, 그리고 청년과 레트로가 상생하는 오늘까지의 발자취입니다.',
    en: 'From a marketplace built by refugees and farmers to Asia’s largest herbal cluster, and today’s vibrant retro-youth coexistence.',
    ja: '避難民と農民が開いた市場からアジア最大の漢方クラスター、そして若者とレトロが共生する今日までの歩みです。',
    zh: '从难民与农民开辟的市集，到亚洲最大韩方医药集群，再到如今青年创意与复古情怀共生的岁月印记。',
  },
  relatedStorePrefix: {
    ko: '연계 명소:',
    en: 'Related Spot:',
    ja: '連携名所:',
    zh: '关联名胜:',
  },
};

// 청량로드 1960 타임라인 이벤트의 다국어 번역 데이터
export const HERITAGE_TRANSLATIONS: Record<string, Record<Language, {
  era: string;
  title: string;
  subtitle: string;
  story: string;
  marketName: string;
}>> = {
  '1960': {
    ko: {
      era: '태동기',
      title: '경동시장의 탄생과 청량리 장터의 시작',
      subtitle: '전쟁의 폐허를 딛고 경기·강원 농민들의 보따리가 모이다',
      story: '1960년 6월, 청량리역을 통해 경춘선과 중앙선 기차를 타고 올라온 강원도·경기도 농민들이 채소와 임산물을 직접 거래하던 공설시장으로 첫 깃발을 올렸습니다. 전국 최대의 농산물 집결지로 급성장하며 청량리 상권의 역사가 시작되었습니다.',
      marketName: '경동시장',
    },
    en: {
      era: 'Genesis',
      title: 'Birth of Gyeongdong Market & Cheongnyangni Bazaar',
      subtitle: 'Overcoming postwar ruins, farmers gathered from Gyeonggi & Gangwon',
      story: 'In June 1960, farmers traveling on the Gyeongchun and Jungang rail lines arrived at Cheongnyangni Station to trade produce, establishing a public market that grew into Korea’s largest agricultural hub.',
      marketName: 'Gyeongdong Market',
    },
    ja: {
      era: '胎動期',
      title: '京東市場の誕生と清涼里市場の幕開け',
      subtitle: '戦争の廃墟を越え、農民たちの荷物が集まる',
      story: '1960年6月、京春線・中央線の列車で清涼里駅に到着した農民たちが野菜や林産物を直接取引する市場として始まり、全国最大の農産物集散地へと発展しました。',
      marketName: '京東市場',
    },
    zh: {
      era: '初创期',
      title: '京东市场的诞生与清凉里集市的开端',
      subtitle: '战后废墟上汇聚来自京畿与江原农户的包裹',
      story: '1960年6月，乘列车抵达清凉里站的农户们在此直接交易农林产品，公设市场应运而生并迅速发展为韩国最大的农产品集散地。',
      marketName: '京东市场',
    },
  },
  '1968': {
    ko: {
      era: '성장기',
      title: '서울약령시의 형성 - 한의약의 메카로 우뚝 서다',
      subtitle: '조선 구휼기관 보제원의 인술 정신을 이어받다',
      story: '청량리역 주변으로 전국 각지의 약초 수집상과 한약재 상인들이 자연발생적으로 모여들며 지금의 약령시가 자리 잡았습니다. 오늘날 국내 한약재 유통량의 70% 이상을 책임지는 세계적인 한방 클러스터로 번영하고 있습니다.',
      marketName: '서울약령시',
    },
    en: {
      era: 'Growth',
      title: 'Formation of Seoul Yangnyeongsi - Mecca of K-Medicine',
      subtitle: 'Inheriting the benevolent spirit of Bojewon from Joseon',
      story: 'Herbal collectors from across the country naturally gathered around Cheongnyangni Station, establishing Yangnyeongsi. Today, it handles over 70% of Korea’s medicinal herbs as a world-class herbal cluster.',
      marketName: 'Seoul Yangnyeongsi',
    },
    ja: {
      era: '成長期',
      title: 'ソウル薬令市の形成 - 韓方医学のメッカへ',
      subtitle: '朝鮮時代の救恤機関・普済院の仁術を受け継ぐ',
      story: '全国各地から薬草商や生薬商人が自然発生的に集まり、現在の薬令市が築かれました。現在、国内の漢方薬材流通の70％以上を担う世界的なクラスターに成長しています。',
      marketName: 'ソウル薬令市',
    },
    zh: {
      era: '成长期',
      title: '首尔药令市形成 - 屹立于传统韩医药圣地',
      subtitle: '传承朝鲜救恤机构普济院的仁术精神',
      story: '来自全国各地的草药商自发聚集于清凉里站周边，形成了今日的药令市。如今这里承担着韩国70%以上的韩药材流通，繁荣成为享誉全球的传统医药集群。',
      marketName: '首尔药令市',
    },
  },
  '1982': {
    ko: {
      era: '노포 전성기',
      title: '광흥골목 순대국과 뚝심 있는 장인들의 노포 형성',
      subtitle: '새벽 상인들의 시린 몸과 마음을 녹여주던 뜨끈한 가마솥',
      story: '새벽 4시 청과물과 수산물 하역으로 하루를 여는 억척스런 상인들을 위해 가마솥 사골 순대국, 가마솥 통닭, 안동 손칼국수 등 뚝심 있는 노포들이 골목마다 자리 잡으며 40년을 넘나드는 미식 전통을 세웠습니다.',
      marketName: '경동광성상가 / 청량리종합시장',
    },
    en: {
      era: 'Golden Age',
      title: 'Gwangheung Alley Sundaeguk & Artisan Old Eateries',
      subtitle: 'Steaming cauldrons comforting dawn market merchants',
      story: 'For hardworking merchants opening at 4 AM, iron-cauldron pork soup, whole roast chicken, and hand-cut noodles established over 40 years of profound culinary tradition in every alley.',
      marketName: 'Gyeongdong Gwangseong / Cheongnyangni Market',
    },
    ja: {
      era: '老舗全盛期',
      title: '広興小路のスンデククと匠たちの老舗形成',
      subtitle: '早朝の商人たちの冷えた心身を温めた大釜',
      story: '午前4時の荷揚げで一日を始める商人たちのために、大釜仕込みのスンデククや丸鶏揚げ、カルグクスなどの名物老舗が誕生し、40年以上の美食文化が育まれました。',
      marketName: '京東広成商店街 / 清涼里総合市場',
    },
    zh: {
      era: '老字号黄金期',
      title: '广兴胡同米肠汤与坚韧匠人老字号群落',
      subtitle: '黎明时分以滚烫铁锅驱散商户身心严寒',
      story: '为清晨4点卸货开市的勤勉商户们，大铁锅熬制的牛骨米肠汤、古法整炸鸡、手工手擀面等质朴老字号在巷弄扎根，铸就40余年的美食传奇。',
      marketName: '京东广成商业街 / 清凉里综合市场',
    },
  },
  '2017': {
    ko: {
      era: '문화 융합기',
      title: '서울한방진흥센터 개관 및 한방 웰니스 관광화',
      subtitle: '전통 한옥의 품격 속에서 누리는 도심 힐링',
      story: '보제원의 유구한 역사 위에 고풍스러운 한옥으로 건립된 서울한방진흥센터가 문을 열었습니다. 한의약박물관, 야외 약초 족욕 체험, 한방 카페가 어우러져 내외국인 관광객이 즐겨 찾는 K-웰니스의 상징이 되었습니다.',
      marketName: '서울약령시',
    },
    en: {
      era: 'Cultural Fusion',
      title: 'Seoul K-Medicine Center & Herbal Wellness Tourism',
      subtitle: 'Urban healing amidst the elegance of traditional Hanok',
      story: 'Built in dignified Hanok architecture upon the history of Bojewon, the Seoul K-Medicine Center opened with a museum, outdoor herbal foot baths, and medicinal tea cafes, becoming an emblem of K-wellness.',
      marketName: 'Seoul Yangnyeongsi',
    },
    ja: {
      era: '文化融合期',
      title: 'ソウル韓方振興センター開館とウェルネス観光',
      subtitle: '伝統韓屋の品格の中で楽しむ都心の癒し',
      story: '普済院の歴史を受け継ぐ優美な韓屋造りのソウル韓方振興センターがオープン。博物館や足湯、韓方カフェが揃い、K-ウェルネスの象徴的名所となりました。',
      marketName: 'ソウル薬令市',
    },
    zh: {
      era: '文化融合期',
      title: '首尔韩方振兴中心开馆与草本康养旅游',
      subtitle: '在优雅传统韩屋中享受都市身心疗愈',
      story: '承载普济院悠久历史的古雅韩屋建筑——首尔韩方振兴中心正式开幕。博物馆、户外草本足浴、韩方茶饮融为一体，成为国内外游客青睐的K-健康地标。',
      marketName: '首尔药令市',
    },
  },
  '2022': {
    ko: {
      era: '상생 혁신',
      title: '스타벅스 경동1960과 청년몰의 상생 모델',
      subtitle: '1962년 옛 경동극장의 부활, 레트로와 청년의 조우',
      story: '폐관된 채 30년간 방치되었던 옛 경동극장의 건축 유산을 현대적으로 리뉴얼하여 청년몰과 스타벅스 경동1960이 문을 열었습니다. 레트로 감성을 찾는 2030 세대와 외국인이 전통시장으로 유입되며 전국적인 도시재생 성공 사례로 기록되었습니다.',
      marketName: '경동시장',
    },
    en: {
      era: 'Innovation',
      title: 'Starbucks Gyeongdong 1960 & Youth Mall',
      subtitle: 'Revival of 1962 Gyeongdong Theater: retro meets youth',
      story: 'The architectural heritage of the abandoned theater was revived into a Youth Mall and Starbucks 1960, drawing young generations and travelers as an acclaimed urban regeneration model.',
      marketName: 'Gyeongdong Market',
    },
    ja: {
      era: '共生革新',
      title: 'スターバックス京東1960と青年モールの共生モデル',
      subtitle: '1962年の旧京東劇場の復活、レトロと若者の出会い',
      story: '30年間放置されていた旧京東劇場の建築遺産をリニューアルし、青年モールとスタバ京東1960が誕生。レトロな魅力を求めて若者や観光客が訪れる都市再生の成功例となりました。',
      marketName: '京東市場',
    },
    zh: {
      era: '共赢创新',
      title: '星巴克京东1960与青年创客商场共创典范',
      subtitle: '1962年旧京东剧院新生：复古与青年的奇妙相遇',
      story: '闲置30年的废弃旧影院建筑遗产焕发新生，青年创客中心与星巴克京东1960联袂登场，吸引大批年轻群体与外国游客，成为韩国著名的都市更新典范。',
      marketName: '京东市场',
    },
  },
  '2026': {
    ko: {
      era: '테마길 도약',
      title: '1960 청량로드 4대 테마길 & 디지털게이트웨이 O2O',
      subtitle: '힐링·맛·인생사진·밤 4대 테마로드와 스마트 가이드투어',
      story: '결과보고서를 통해 실증된 힐링 로드, 맛 로드, 인생사진 로드, 밤 로드의 4대 테마길과 전문 가이드 도슨트를 디지털 플랫폼에 완벽 구현하고, 외부 스몰비(smallbee) O2O 커머스를 연결하여 전통시장 상권의 전국 확산을 완성합니다.',
      marketName: '9개 전통시장 통합',
    },
    en: {
      era: 'Theme Roads',
      title: '1960 Cheongnyang 4 Theme Roads & O2O Gateway',
      subtitle: 'Healing, Taste, Photo & Night roads with smart tours',
      story: 'The 4 validated theme roads (Healing, Taste, Photo, Night) and docent guides are digitized, seamlessly connecting to O2O mobile commerce to share traditional markets nationwide.',
      marketName: '9 Traditional Markets',
    },
    ja: {
      era: 'テーマロード',
      title: '1960清涼ロード4大テーマ＆O2Oデジタルゲートウェイ',
      subtitle: 'ヒーリング・味覚・映え・夜景の4大テーマとスマートツアー',
      story: '実証された4大テーマロードと専門ガイドをデジタル化し、外部O2Oコマースを連携させて伝統市場の魅力を全国に発信します。',
      marketName: '9伝統市場統合',
    },
    zh: {
      era: '主题路飞跃',
      title: '1960清凉路4大主题路与O2O数字网关',
      subtitle: '治愈·美食·摄影·夜景4大主题路与智能导览游',
      story: '全景数字化呈现经过实际验证的4大主题路线（治愈、美食、摄影、夜景）与专家导览，并全面接入外部O2O电商体系，助力传统市场走向全国。',
      marketName: '9大传统市场综合',
    },
  },
};

// 앵커 시설 및 주요 명소의 다국어 번역 데이터
export const STORE_TRANSLATIONS: Record<string, Record<Language, {
  name: string;
  description: string;
  titleBadge?: string;
  marketName?: string;
}>> = {
  'sb_kmedicine_center': {
    ko: {
      name: '서울한방진흥센터',
      marketName: '서울약령시',
      titleBadge: '한방 웰니스 랜드마크',
      description: '고풍스러운 한옥 누각 아래 따뜻한 약초 족욕을 즐기고, 조선시대 보제원의 전통 의복을 입어보며 몸과 마음을 치유하는 서울 최고의 웰니스 힐링 랜드마크입니다.',
    },
    en: {
      name: 'Seoul K-Medicine Center',
      marketName: 'Seoul Yangnyeongsi',
      titleBadge: 'Herbal Wellness Landmark',
      description: 'Seoul’s premier herbal wellness landmark where you can enjoy outdoor herbal foot baths under elegant Hanok pavilions and experience traditional healing culture.',
    },
    ja: {
      name: 'ソウル韓方振興センター',
      marketName: 'ソウル薬令市',
      titleBadge: '韓方ウェルネス名所',
      description: '優雅な韓屋の楼閣の下で温かい薬草足湯を楽しみ、伝統衣装体験などを通じて心身を癒すソウル屈指のウェルネス名所です。',
    },
    zh: {
      name: '首尔韩方振兴中心',
      marketName: '首尔药令市',
      titleBadge: '韩方康养地标',
      description: '在典雅韩屋楼阁下享受户外草本足浴，体验传统医事文化，舒缓身心的首尔代表性康养文旅地标。',
    },
  },
  'sb_geochang_museum': {
    ko: {
      name: '거창박물관 약초전시관',
      marketName: '서울약령시',
      titleBadge: '민속 약초 박물관',
      description: '수백 년 전통의 자연산 산삼, 진귀한 희귀 약재 표본과 옛 한의학 유물을 감상할 수 있는 약령시의 숨은 보물창고입니다.',
    },
    en: {
      name: 'Geochang Herbal Museum',
      marketName: 'Seoul Yangnyeongsi',
      titleBadge: 'Folk Herb Museum',
      description: 'A hidden treasure trove in Yangnyeongsi showcasing rare wild ginseng, ancient medical artifacts, and precious herb specimens.',
    },
    ja: {
      name: '居昌薬草展示館',
      marketName: 'ソウル薬令市',
      titleBadge: '民俗薬草博物館',
      description: '数百年の歴史を持つ山参や希少な生薬標本、古くからの韓医学遺物を鑑賞できる薬令市の隠れた名所です。',
    },
    zh: {
      name: '居昌草药博物馆',
      marketName: '首尔药令市',
      titleBadge: '民俗药草博物馆',
      description: '展示数百年野山参、稀有中草药标本及古代韩医药文物的药令市宝藏博览馆。',
    },
  },
  'sb_damiga': {
    ko: {
      name: '약선 한식당 다미가',
      marketName: '서울약령시',
      titleBadge: '약선 건강 밥상',
      description: '서울약령시의 최상급 약재를 우려낸 육수로 지은 약선 영양솥밥과 건강한 나물 한상을 대접하는 약선 미식의 정점입니다.',
    },
    en: {
      name: 'Damiga Herbal Dining',
      marketName: 'Seoul Yangnyeongsi',
      titleBadge: 'Herbal Pot Rice',
      description: 'The pinnacle of medicinal gastronomy, serving nutritious herbal pot rice and fresh seasonal greens simmered in premium herb broth.',
    },
    ja: {
      name: '薬膳料理 多味家',
      marketName: 'ソウル薬令市',
      titleBadge: '薬膳健康定食',
      description: '最上級の韓方生薬で丁寧に煮出した出汁で炊き上げる薬膳釜飯と、旬のナムルを味わえる薬膳美食の名店です。',
    },
    zh: {
      name: '药膳韩餐馆 多味家',
      marketName: '首尔药令市',
      titleBadge: '草本药膳营养餐',
      description: '以优质草药高汤精心焖煮的药膳营养石锅饭，搭配健康时令山野菜的食疗美馔胜地。',
    },
  },
  'sb_yeontan_galbi': {
    ko: {
      name: '경동연탄돼지갈비',
      marketName: '경동시장',
      titleBadge: '연탄직화 돼지갈비 명가',
      description: '가게 앞 붉게 타오르는 연탄불 화덕에서 쉴 새 없이 구워내는 불향 가득 돼지갈비. 40년 전통의 시장 골목을 대표하는 미식 랜드마크입니다.',
    },
    en: {
      name: 'Gyeongdong Yeontan Pork Ribs',
      marketName: 'Gyeongdong Market',
      titleBadge: 'Briquette Grilled Ribs',
      description: 'Smoky, savory pork ribs grilled to perfection over glowing briquette stoves. A 40-year traditional market culinary legend.',
    },
    ja: {
      name: '京東練炭豚カルビ',
      marketName: '京東市場',
      titleBadge: '練炭直火焼き名家',
      description: '店先の真っ赤な練炭火で香ばしく焼き上げる秘伝タレの豚カルビ。40年の伝統を誇る市場路地を代表する美食スポットです。',
    },
    zh: {
      name: '京东蜂窝煤烤猪排',
      marketName: '京东市场',
      titleBadge: '炭火现烤猪排世家',
      description: '在店门口旺盛的蜂窝煤火炉上现烤的香气扑鼻猪排骨，积淀40年市场市井风味的标志性美食名店。',
    },
  },
  'sb_starbucks1960': {
    ko: {
      name: '스타벅스 경동1960점',
      marketName: '경동시장',
      titleBadge: '헤리티지 폐극장 카페',
      description: '1962년 설립된 옛 경동극장의 웅장한 목조 트러스와 관람석 구조를 원형 보존하여 재탄생시킨 전 세계 유일무이한 헤리티지 랜드마크입니다.',
    },
    en: {
      name: 'Starbucks Gyeongdong 1960',
      marketName: 'Gyeongdong Market',
      titleBadge: 'Theater Heritage Cafe',
      description: 'A globally unique heritage landmark preserving the massive wooden trusses and seating structure of the historic 1962 Gyeongdong Theater.',
    },
    ja: {
      name: 'スターバックス 京東1960店',
      marketName: '京東市場',
      titleBadge: '劇場ヘリテージカフェ',
      description: '1962年に建てられた旧京東劇場の木造トラスと観客席構造をそのまま活かして再生された、世界屈指のヘリテージカフェです。',
    },
    zh: {
      name: '星巴克 京东1960店',
      marketName: '京东市场',
      titleBadge: '旧剧院遗产空间',
      description: '完整保留1962年旧京东剧院壮丽木制梁桁与阶梯坐席结构的全球独特文脉再生地标咖啡厅。',
    },
  },
  'sb_tongdak_namwon': {
    ko: {
      name: '청량리 남원통닭',
      marketName: '청량리종합시장',
      titleBadge: '가마솥 바삭 통닭 골목 4호',
      description: '무쇠 가마솥에 갓 튀겨낸 바삭한 통닭과 함께 튀겨내는 알싸한 꽈리고추·고구마·떡 튀김이 어우러진 통닭골목의 전설적인 노포입니다.',
    },
    en: {
      name: 'Cheongnyangni Namwon Fried Chicken',
      marketName: 'Cheongnyangni Market',
      titleBadge: 'Cauldron Fried Chicken',
      description: 'Legendary eatery serving whole chicken fried in iron cauldrons alongside crispy shishito peppers, sweet potatoes, and rice cakes.',
    },
    ja: {
      name: '清涼里 南原トンタッ',
      marketName: '清涼里総合市場',
      titleBadge: '大釜丸鶏揚げ名店',
      description: '大釜で豪快に揚げたサクサクの丸鶏と、シシトウ・サツマイモ・トッポッキの揚げ物が絶妙に調和する名物店です。',
    },
    zh: {
      name: '清凉里 南原炸鸡',
      marketName: '清凉里综合市场',
      titleBadge: '大铁锅现炸脆皮整鸡',
      description: '在大铁锅中现炸的金黄酥脆整鸡，佐以清香微辣的尖椒、红薯与年糕天妇罗的胡同老字号名号。',
    },
  },
  'sb_cafe_cheongnyang': {
    ko: {
      name: '카페 청량',
      marketName: '청량리청과물시장',
      titleBadge: '생과일 디저트 카페',
      description: '청과물시장에서 갓 수확한 신선한 계절 과일을 듬뿍 올린 수제 파르페와 제철 생과일주스를 즐기는 청량리의 과일 디저트 성지입니다.',
    },
    en: {
      name: 'Cafe Cheongnyang',
      marketName: 'Cheongnyangni Fruit Market',
      titleBadge: 'Fresh Fruit Dessert Cafe',
      description: 'A dessert sanctuary featuring freshly harvested seasonal fruits from the fruit market atop handmade parfaits and fresh fruit juices.',
    },
    ja: {
      name: 'カフェ 清涼',
      marketName: '清涼里青果市場',
      titleBadge: '生フルーツデザートカフェ',
      description: '青果市場で仕入れた新鮮な旬の果物を贅沢に使った手作りパフェや生搾りジュースが人気のデザートカフェです。',
    },
    zh: {
      name: '清凉咖啡馆',
      marketName: '清凉里青果市场',
      titleBadge: '鲜果轻食甜品店',
      description: '采用青果市场当天到货的鲜嫩时令水果，精心制作芭菲与现榨纯果汁的果香甜品名店。',
    },
  },
  'sb_the_willow': {
    ko: {
      name: '문화예술공간 더윌로',
      marketName: '경동시장',
      titleBadge: '네온 & 감성 포토존',
      description: '전통시장 건물 안에 숨겨진 트렌디한 네온 조명과 감각적인 현대 미술 작품이 어우러져 젊은 층의 감성 인증샷을 부르는 복합문화예술 라운지입니다.',
    },
    en: {
      name: 'The Willow Art Lounge',
      marketName: 'Gyeongdong Market',
      titleBadge: 'Neon & Photo Space',
      description: 'A contemporary art and culture lounge hidden inside the market, combining trendy neon art and photo zones that draw creative youth.',
    },
    ja: {
      name: '文化芸術空間 THE WILLOW',
      marketName: '京東市場',
      titleBadge: 'ネオン＆フォトスポット',
      description: '伝統市場の建物内に広がるネオンアートと感性豊かな現代美術が調和した、若者に人気の複合アートラウンジです。',
    },
    zh: {
      name: '文化艺术空间 THE WILLOW',
      marketName: '京东市场',
      titleBadge: '霓虹光影与潮拍艺术展',
      description: '隐藏于传统市场深处的现代文化艺术沙龙，前卫霓虹灯饰与当代艺术作品相映成趣的潮流拍照打卡胜地。',
    },
  },
  'sb_gyeongdong_station': {
    ko: {
      name: '수제맥주 펍 경동역',
      marketName: '경동시장',
      titleBadge: '시장 골목 수제맥주',
      description: '옛 청량리 기차역의 감성을 모티브로 한 로컬 수제맥주 펍. 신선한 에일 맥주와 시장 야채 튀김 안주가 어우러져 청량리의 밤을 밝힙니다.',
    },
    en: {
      name: 'Craft Beer Pub Gyeongdong Station',
      marketName: 'Gyeongdong Market',
      titleBadge: 'Alley Craft Beer',
      description: 'A craft beer pub inspired by the nostalgia of the old train station, pairing fresh local ales with crispy market fritters under warm night lights.',
    },
    ja: {
      name: 'クラフトビール 京東駅',
      marketName: '京東市場',
      titleBadge: '路地裏クラフトビール',
      description: '昔の清涼里駅の旅情をモチーフにした手作りビールパブ。芳醇なクラフトビールと市場特製おつまみで清涼里の夜を楽しめます。',
    },
    zh: {
      name: '精酿啤酒馆 京东站',
      marketName: '京东市场',
      titleBadge: '巷弄精酿小酒馆',
      description: '以怀旧清凉里老火车站为主题的街区精酿酒吧，精酿麦酒搭配市场特色佐酒炸物，点亮老市集璀璨夜生活。',
    },
  },
  'sb_jjanggu_night': {
    ko: {
      name: '짱구네 심야식당',
      marketName: '경동시장',
      titleBadge: '심야 실내포차',
      description: '자정 무렵 문을 열어 새벽까지 이어지는 시장 상인들의 소박한 사랑방. 신선한 당일 해산물과 얼큰한 알탕으로 청량리 밤의 정취를 만끽할 수 있습니다.',
    },
    en: {
      name: 'Jjanggu Midnight Diner',
      marketName: 'Gyeongdong Market',
      titleBadge: 'Late Night Market Pocha',
      description: 'A cozy midnight tent diner operating until dawn, famous for spicy seafood stew and the warmth of nighttime market merchants.',
    },
    ja: {
      name: 'チャングネ 深夜食堂',
      marketName: '京東市場',
      titleBadge: '深夜の室内ポチャ',
      description: '深夜から朝方まで営業する市場商人たちの憩いの場。新鮮な魚介と熱々の辛口鍋で清涼里の夜情を満喫できます。',
    },
    zh: {
      name: '小新深夜食堂',
      marketName: '京东市场',
      titleBadge: '深夜市集大排档',
      description: '午夜营业至黎明的暖心室内大排档，以每日新鲜海产锅物与辣鱼子汤慰藉夜间市场商客与饕客。',
    },
  },
  'sb_rooftop1960': {
    ko: {
      name: '청년몰 1960 루프탑',
      marketName: '경동시장',
      titleBadge: '루프탑 야시장 & 버스킹',
      description: '경동시장 신관 옥상에서 펼쳐지는 탁 트인 야간 파티 라운지. 감성 조명 아래에서 시원한 맥주와 라이브 버스킹 음악을 즐기며 청량로드 투어의 대미를 장식합니다.',
    },
    en: {
      name: 'Youth Mall 1960 Rooftop',
      marketName: 'Gyeongdong Market',
      titleBadge: 'Rooftop Night Market',
      description: 'An open-air evening lounge atop Gyeongdong Market featuring live busking, craft beverages, and night views under twinkling string lights.',
    },
    ja: {
      name: '青年モール1960 ルーフトップ',
      marketName: '京東市場',
      titleBadge: '屋上夜市＆バスキング',
      description: '京東市場の屋上に広がる開放的なナイトラウンジ。情緒ある照明の下、生ビールとライブ音楽を楽しみながらツアーのフィナーレを飾れます。',
    },
    zh: {
      name: '青年创客商场1960 天台夜市',
      marketName: '京东市场',
      titleBadge: '天台夜市与现场音乐会',
      description: '位于京东市场新馆楼顶的开阔天台派对空间，在星光串灯与现场民谣乐声中畅饮啤酒，为清凉路之旅画上难忘句号。',
    },
  },
};
