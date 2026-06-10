export type FacilityCategory = 'food' | 'shop' | 'service' | 'finance';

export type FacilityItem = {
  id: string;
  category: FacilityCategory;
  name: string;
  icon: string;
  hours: string;
  location: string;
  phone?: string;
  menu?: string;
  items?: string;
  notes?: string[];
};

export type FloorGuide = {
  floor: string;
  facilities: string[];
};

export const facilityCategories: { id: 'all' | FacilityCategory; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'food', label: '식당·카페' },
  { id: 'shop', label: '매장' },
  { id: 'service', label: '편의·대여' },
  { id: 'finance', label: '금융' },
];

export const facilityCategoryLabel: Record<FacilityCategory, string> = {
  food: '식당·카페',
  shop: '매장',
  service: '편의·대여',
  finance: '금융',
};

export const internalFacilities: FacilityItem[] = [
  {
    id: 'cafe-lobby',
    category: 'food',
    name: '로비 카페',
    icon: 'local_cafe',
    hours: '평일 08:00 ~ 17:00 / 토요일 08:30 ~ 12:30 (일·공휴일 휴무)',
    location: '1층 외래 대기실 옆',
    menu: '커피, 차, 샌드위치, 간단한 도시락',
    notes: ['진료 시간에 맞춰 운영하며, 좌석은 20석 내외입니다.'],
  },
  {
    id: 'lobby-shop',
    category: 'shop',
    name: '로비 매점',
    icon: 'store',
    hours: '평일 08:30 ~ 18:00 / 토요일 09:00 ~ 13:00',
    location: '1층 원무 접수 데스크 옆',
    items: '음료, 간식, 생수, 위생용품, 간단한 의료소모품',
    notes: ['24시간 편의점은 원내에 없습니다.'],
  },
  {
    id: 'wheelchair',
    category: 'service',
    name: '휠체어·지팡이 대여',
    icon: 'accessible',
    hours: '평일·토요일 진료 시간 (당일 반납)',
    location: '1층 원무·안내 데스크',
    notes: [
      '성함과 연락처를 작성 후 무료 대여',
      '정형·재활 진료 환자분께 우선 제공',
    ],
  },
  {
    id: 'rest-area',
    category: 'service',
    name: '외래 대기실 휴게·충전',
    icon: 'weekend',
    hours: '진료 시간과 동일',
    location: '1층·2층 외래 대기실',
    items: '휴게 좌석, 무료 휴대폰 충전 콘센트, 정수기',
  },
  {
    id: 'atm',
    category: 'finance',
    name: 'ATM',
    icon: 'atm',
    hours: '24시간',
    location: '1층 로비 (정문 입구 우측)',
    notes: ['입·출금 이용 가능'],
  },
];

export const floorGuide: FloorGuide[] = [
  {
    floor: '1층',
    facilities: [
      '원무·접수·수납',
      '재활정형외과 외래',
      '외래 대기실',
      '로비 카페·매점',
      '약제부 (처방 조제)',
      'ATM',
    ],
  },
  {
    floor: '2층',
    facilities: ['재활치료실 (물리·도수·운동치료)', '영상검사실', '외래 진료실'],
  },
  {
    floor: '지하 1층',
    facilities: ['주차장·주차 정산'],
  },
];

export const facilityTips = [
  '본원은 정형·재활 전문 병원으로, 대형 병원 수준의 식당·매장 시설은 갖추고 있지 않습니다.',
  '식사가 필요하시면 로비 카페를 이용하시거나, 인근 상가(강남역 일대)를 이용해 주세요.',
  '운영 시간은 병원 진료 일정에 따라 변경될 수 있습니다.',
];

export const facilityContact = {
  phone: '1588-5700',
  hours: '평일 09:00 ~ 18:00 (토·공휴일 제외)',
};

export type ExternalFacilityCategory = 'food' | 'shop' | 'pharmacy' | 'bank' | 'parking';

export type ExternalFacilityItem = {
  id: string;
  category: ExternalFacilityCategory;
  name: string;
  icon: string;
  hours: string;
  location: string;
  walkTime: string;
  area: string;
  phone?: string;
  menu?: string;
  items?: string;
  notes?: string[];
};

export type AreaGuide = {
  area: string;
  description: string;
  spots: string[];
};

export const externalFacilityCategories: { id: 'all' | ExternalFacilityCategory; label: string }[] =
  [
    { id: 'all', label: '전체' },
    { id: 'food', label: '식당·카페' },
    { id: 'shop', label: '매장' },
    { id: 'pharmacy', label: '약국' },
    { id: 'bank', label: '은행' },
    { id: 'parking', label: '주차' },
  ];

export const externalFacilityCategoryLabel: Record<ExternalFacilityCategory, string> = {
  food: '식당·카페',
  shop: '매장',
  pharmacy: '약국',
  bank: '은행',
  parking: '주차',
};

export const externalFacilities: ExternalFacilityItem[] = [
  {
    id: 'gangnam-food',
    category: 'food',
    name: '강남역 지하상가 식당가',
    icon: 'restaurant',
    hours: '대부분 10:00 ~ 21:00 (매장별 상이)',
    location: '강남역 지하쇼핑센터 B1',
    walkTime: '도보 약 5분',
    area: '강남역 방면',
    menu: '한식, 분식, 면류, 패스트푸드',
    notes: ['12번 출구 방향으로 이동', '점심 시간(11:30~13:00) 혼잡'],
  },
  {
    id: 'teheran-cafe',
    category: 'food',
    name: '테헤란로 카페',
    icon: 'local_cafe',
    hours: '07:00 ~ 22:00',
    location: '테헤란로 123 인근 (병원 건물 1·2층 상가)',
    walkTime: '도보 1~2분',
    area: '테헤란로 상권',
    menu: '커피, 베이커리',
  },
  {
    id: 'gs-gangnam',
    category: 'shop',
    name: 'GS25 강남역점',
    icon: 'store',
    hours: '24시간',
    location: '강남대로 396 (강남역 12번 출구 인근)',
    walkTime: '도보 약 4분',
    area: '강남역 방면',
    items: '음료, 간식, 도시락, 일용잡화',
  },
  {
    id: 'pharmacy-24',
    category: 'pharmacy',
    name: '강남24시약국',
    icon: 'local_pharmacy',
    hours: '24시간 (연중무휴)',
    location: '테헤란로 152, 1층',
    walkTime: '도보 약 6분',
    area: '테헤란로 상권',
    phone: '02-555-1234',
    items: '일반의약품, 영양제, 의약외품',
    notes: ['처방전 조제 가능 여부는 약국에 문의'],
  },
  {
    id: 'medical-shop-ext',
    category: 'shop',
    name: '메디칼 보조기구 상점',
    icon: 'medical_services',
    hours: '평일 09:30 ~ 19:00 / 토요일 10:00 ~ 15:00',
    location: '역삼동 테헤란로 134, 2층',
    walkTime: '도보 약 8분',
    area: '역삼·테헤란로',
    items: '목·허리 보조기, 지팡이, 재활 용품',
    notes: ['의사 처방·상담 후 구매를 권장합니다.'],
  },
  {
    id: 'kb-bank',
    category: 'bank',
    name: 'KB국민은행 강남역지점',
    icon: 'account_balance',
    hours: '평일 09:00 ~ 16:00 (ATM 24시간)',
    location: '강남대로 382, KB강남타워 1층',
    walkTime: '도보 약 5분',
    area: '강남역 방면',
    phone: '1588-9999',
  },
  {
    id: 'public-parking',
    category: 'parking',
    name: '강남공영주차장',
    icon: 'local_parking',
    hours: '24시간',
    location: '강남대로 310 일대',
    walkTime: '도보 약 7분',
    area: '강남역 방면',
    notes: [
      '병원 주차장 만차 시 이용',
      '요금·할인은 현장 안내 확인',
    ],
  },
];

export const externalAreaGuide: AreaGuide[] = [
  {
    area: '테헤란로 상권',
    description: '병원 바로 인근, 도보 1~5분',
    spots: ['카페·베이커리', '소규모 음식점', '약국'],
  },
  {
    area: '강남역 방면',
    description: '12번 출구 기준 도보 5~7분',
    spots: ['지하상가 식당가', '편의점', '은행', '공영주차장'],
  },
  {
    area: '역삼·테헤란로',
    description: '병원에서 테헤란로 따라 역삼 방향',
    spots: ['의료기기·보조기구 상점'],
  },
];

export const externalFacilityTips = [
  '외부 시설 정보는 참고용이며, 운영 시간·폐점 여부는 방문 전 확인해 주세요.',
  '병원과 제휴·운영 관계가 없는 민간 상가입니다.',
  '식사·주차는 가능하면 병원 로비 시설 또는 대중교통 이용을 권장합니다.',
];
