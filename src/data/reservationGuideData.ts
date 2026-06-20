export type ReservationMethod = {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
  links?: { label: string; href: string; external?: boolean }[];
};

export const reservationIntro = {
  lead: '진료예약은 방문, 전화, 인터넷을 통해 하실 수 있습니다.',
  leadNote: '보다 빠른 예약을 위해 환자 카드 또는 주민등록증을 지참하여 주십시오.',
};

export const reservationMethods: ReservationMethod[] = [
  {
    id: 'visit',
    title: '방문예약',
    icon: 'storefront',
    description:
      '신분증을 지참하고 내원하시어, 진료신청서 작성 후 원무과에 제출하시면 됩니다.',
    details: ['평일: 오전 9시 ~ 오후 6시', '토요일·공휴일: 미운영', '접수 위치: 1층 원무과 / 외래 접수 데스크'],
  },
  {
    id: 'phone',
    title: '전화예약',
    icon: 'call',
    description: 'MediBridge 예약센터(1588-5700)에서 진료 일정을 안내해 드립니다.',
    details: ['평일: 오전 9시 ~ 오후 6시', '토요일·공휴일: 미운영'],
  },
  {
    id: 'internet',
    title: '인터넷예약',
    icon: 'language',
    description:
      '본원 재진 환자는 휴대전화 인증과 생년월일로 로그인한 뒤 인터넷 예약을 이용하실 수 있습니다.',
    details: ['인터넷 예약은 24시간 이용 가능합니다.'],
    links: [{ label: '인터넷 예약하기', href: '/reservation' }],
  },
];

export const cancellationGuide = {
  title: '예약취소',
  notes: [
    '인터넷 예약자는 전화 예약하신 분들도 홈페이지에서 간편하게 예약을 취소하실 수 있습니다.',
    '인터넷을 통한 예약 취소는 진료일 전 자정(24:00)까지만 가능합니다.',
    '진료와 함께 검사가 예약되어 있거나 진료비를 사전에 수납하신 경우 인터넷 예약 취소가 불가하오니 예약센터(1588-5700)로 전화해 주시기 바랍니다.',
    '소중한 진료 시간이 다른 분께 양보될 수 있도록 가능한 빨리 취소 의사를 밝혀 주십시오.',
    '예약 변경·취소 없이 진료를 받지 않을 경우 홈페이지 진료 예약 서비스 이용이 제한될 수 있습니다.',
  ],
};

export const reservationContactInfo = {
  reservationPhone: '1588-5700',
  hours: '평일 09:00 ~ 18:00 (토·공휴일 제외)',
};

export const relatedLinks = [
  { label: '예약 확인 / 취소', href: '/reservation/confirm', icon: 'event_available' },
  { label: '의료진 소개', href: '/doctors', icon: 'groups' },
  { label: '진료예약 FAQ', href: '/faq', icon: 'help' },
];
