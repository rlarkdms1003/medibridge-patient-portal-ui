export type OutpatientStep = {
  order: number;
  title: string;
  description: string;
};

export type OutpatientHoursRow = {
  label: string;
  time: string;
  note?: string;
};

export const outpatientIntro = {
  lead: 'MediBridge 재활정형외과는 스포츠손상, 관절·척추 질환, 수술 후 재활을 전문으로 하는 정형외과·재활 전문병원입니다.',
  leadNote:
    '외래 진료는 예약 후 내원하시면 됩니다. 초진·재진 모두 신분증 또는 환자 카드를 지참해 주세요.',
};

export const outpatientHours: OutpatientHoursRow[] = [
  { label: '평일', time: '오전 9시 ~ 오후 6시', note: '점심시간 12:30 ~ 13:30' },
  { label: '토요일', time: '오전 9시 ~ 오후 1시' },
  { label: '일·공휴일', time: '휴진', note: '응급 상황은 가까운 응급실을 이용해 주세요.' },
];

export const visitGuide = {
  initial: {
    title: '초진',
    icon: 'person_add',
    items: [
      '인터넷·전화·방문 중 편한 방법으로 예약 후 내원해 주세요.',
      '신분증 또는 환자 카드를 지참해 주세요.',
      '기존 타 병원 검사 자료·영상 CD·처방전이 있으면 함께 가져오시면 진료에 도움이 됩니다.',
      '증상 부위와 불편한 동작, 통증 시작 시기 등을 간단히 정리해 오시면 상담이 원활합니다.',
    ],
  },
  followUp: {
    title: '재진',
    icon: 'event_repeat',
    items: [
      '예약된 진료 시간 10~15분 전까지 접수 데스크에서 접수해 주세요.',
      '환자 카드 또는 신분증을 지참해 주세요.',
      '약·주사 처방, 재활치료 연장 등이 필요하면 진료 시 의료진과 상담해 주세요.',
      '진료 결과에 따라 도수치료·운동치료 일정이 별도로 안내될 수 있습니다.',
    ],
  },
};

export const outpatientFlow: OutpatientStep[] = [
  {
    order: 1,
    title: '예약',
    description: '인터넷, 전화, 방문 중 편한 방법으로 진료를 예약합니다.',
  },
  {
    order: 2,
    title: '접수',
    description: '예약 시간에 맞춰 1층 원무과 / 외래 접수 데스크에서 접수합니다.',
  },
  {
    order: 3,
    title: '진료',
    description: '대기실에서 안내에 따라 진료실로 이동해 의료진 진료를 받습니다.',
  },
  {
    order: 4,
    title: '검사·처치',
    description: '필요 시 X-ray, 초음파 등 검사 또는 주사·처치를 진행합니다.',
  },
  {
    order: 5,
    title: '재활치료·수납',
    description: '도수·운동치료 예약 안내 후 수납 창구에서 진료비를 정산합니다.',
  },
];

export const rehabilitationGuide = {
  title: '재활치료 안내',
  description:
    '본원은 정형외과 진료와 함께 도수치료, 운동치료 등 재활 프로그램을 연계해 운영합니다.',
  items: [
    {
      title: '도수치료',
      description: '관절 가동 범위 회복, 자세 교정, 통증 완화를 위한 1:1 치료입니다.',
    },
    {
      title: '운동치료',
      description: '근력·유연성 강화, 기능 회복을 위한 맞춤형 운동 프로그램입니다.',
    },
    {
      title: '치료 전 준비',
      description: '편한 운동복, 운동화, 수건을 지참해 주세요. 치료실 안내에 따라 준비합니다.',
    },
  ],
};

export const outpatientNotes = [
  '예약 시간을 지키시면 원활한 진료 진행에 도움이 됩니다.',
  '진료 변경·취소는 예약안내를 참고해 주시고, 당일 변경은 예약센터로 문의해 주세요.',
  '재활치료는 별도 예약이 필요할 수 있으며, 치료실 일정에 따라 대기 시간이 발생할 수 있습니다.',
  '만 14세 미만 소아 환자는 보호자 동반이 필요합니다.',
  '감염 예방을 위해 마스크 착용을 권장합니다.',
];

export const outpatientContactInfo = {
  reservationPhone: '1588-5700',
  hours: '평일 09:00 ~ 18:00 (토·공휴일 제외)',
};

export const relatedLinks = [
  { label: '예약안내', href: '/reservation/guide', icon: 'event_note' },
  { label: '예약 확인 / 취소', href: '/reservation/confirm', icon: 'event_available' },
  { label: '의료진 소개', href: '/doctors', icon: 'groups' },
  { label: '외래진료 FAQ', href: '/faq', icon: 'help' },
];
