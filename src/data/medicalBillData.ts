export type ReissueLocationRow = {
  category: string;
  location: string;
  note?: string;
};

export const medicalBillIntro = {
  lead: 'MediBridge 재활정형외과 진료비 계산서·영수증 발급 및 재발급 안내입니다.',
  leadNote:
    '외래·입원 진료비 문의, 계산서 재발급, 입원 중 중간 진료비 안내를 확인하실 수 있습니다.',
};

export const billingContactPhone = '1588-1234';

export const reissueLocations: ReissueLocationRow[] = [
  {
    category: '외래',
    location: '1층 원무과 제증명 창구',
    note: '평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00',
  },
  {
    category: '입원',
    location: '2층 원무과 창구, 입·퇴원 수속 앞 키오스크',
    note: '평일 09:00 ~ 18:00',
  },
  {
    category: '인터넷',
    location: '마이페이지에서 진료비 내역 조회 및 영수증 출력',
    note: '회원 로그인 후 이용 가능',
  },
];

export const reissueNotes = [
  '재발급 신청 시 필요 서류는 의무기록 사본발급 기준을 준용합니다.',
  '대리인 신청 시 위임장·동의서 등 구비 서류가 필요할 수 있습니다.',
  '현금영수증 자진발급분은 국세청 홈택스(www.hometax.go.kr)에서 「자진발급분 소비자 등록」 메뉴로 조회·등록할 수 있습니다.',
];

export const interimBillInfo = {
  title: '입원 중 중간진료비 계산서',
  description:
    '입원 치료 기간 중 발생한 진료비를 확인하실 수 있도록 중간진료비 계산서를 발급해 드립니다.',
  items: [
    '2층 원무과 창구 또는 입·퇴원 수속 앞 키오스크에서 발급 가능합니다.',
    '재활치료·수술 후 입원 등 장기 입원 환자에게 해당될 수 있습니다.',
  ],
};

export const medicalBillContactInfo = {
  phone: '1588-1234',
  hours: '평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00',
};

export const relatedLinks = [
  { label: '진단서발급', href: '/documents/diagnosis', icon: 'description' },
  { label: '의무기록 및 영상검사 사본발급', href: '/documents/medical-records', icon: 'folder_open' },
  { label: '비급여 진료비용', href: '/outpatient/fees', icon: 'payments' },
  { label: '입원절차', href: '/admission/guide', icon: 'login' },
];
