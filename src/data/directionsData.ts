export type TransportTab = 'subway' | 'bus' | 'car' | 'parking';

export const hospitalInfo = {
  name: 'MediBridge 재활정형외과',
  address: '서울특별시 강남구 테헤란로 123 메디브릿지 빌딩',
  zipCode: '06234',
  phone: '1588-1234',
  fax: '02-123-4567',
  mapLat: 37.5012,
  mapLng: 127.0396,
};

export const transportTabs: { id: TransportTab; label: string; icon: string }[] = [
  { id: 'subway', label: '지하철', icon: 'subway' },
  { id: 'bus', label: '버스', icon: 'directions_bus' },
  { id: 'car', label: '자가용', icon: 'directions_car' },
  { id: 'parking', label: '주차', icon: 'local_parking' },
];

export const subwayRoutes = [
  {
    station: '2호선 · 신분당선 강남역',
    exit: '12번 출구',
    walk: '도보 약 5분 (테헤란로 방향 직진)',
    detail: '12번 출구로 나와 테헤란로를 따라 메디브릿지 빌딩까지 이동합니다.',
  },
  {
    station: '9호선 신논현역',
    exit: '4번 출구',
    walk: '도보 약 10분',
    detail: '4번 출구에서 강남역 방향으로 이동 후 테헤란로에서 병원을 찾을 수 있습니다.',
  },
];

export const busRoutes = [
  {
    stop: '강남역.강남역사거리',
    buses: ['146', '341', '360', '740', 'N13', 'N61'],
    direction: '강남역 방향 하차 후 도보 3분',
  },
  {
    stop: '역삼역',
    buses: ['1100', '1700', '2000', '6001'],
    direction: '역삼역 하차 후 테헤란로 방향 도보 8분',
  },
  {
    stop: '테헤란로입구',
    buses: ['402', '472', '641'],
    direction: '테헤란로입구 하차 후 도보 2분',
  },
];

export const carRoutes = [
  {
    from: '강남대로 방면',
    route: '강남역 사거리 → 테헤란로 진입 → 메디브릿지 빌딩 (병원 주차장 B1)',
  },
  {
    from: '올림픽대로 방면',
    route: '영동대로 → 테헤란로 진입 → 강남역 방향 직진 약 500m',
  },
  {
    from: '경부고속도로 방면',
    route: '서초IC → 강남대로 → 테헤란로 진입',
  },
];

export const parkingInfo = {
  notice: '병원 전용 주차장은 진료 환자 및 보호자에 한해 이용 가능합니다. 만차 시 인근 공영주차장을 이용해 주세요.',
  location: '메디브릿지 빌딩 지하 1~2층 (입구 안내 표지판 참고)',
  hours: '평일 07:00 ~ 20:00 / 토요일 07:00 ~ 13:00',
  fee: '최초 30분 무료, 이후 10분당 1,000원 (진료 환자 2시간 할인)',
  tips: [
    '출퇴근 시간대(08:00~10:00)에는 주차 대기가 발생할 수 있습니다.',
    '대중교통 이용을 권장드립니다.',
    '장애인·임산부 전용 주차구역이 지하 1층에 마련되어 있습니다.',
  ],
};
