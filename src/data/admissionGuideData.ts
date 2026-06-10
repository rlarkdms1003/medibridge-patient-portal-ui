export type AdmissionStep = {
  order: number;
  title: string;
  description: string;
};

export const admissionIntro = {
  lead: 'MediBridge 재활정형외과 입원은 외래 진료 후 담당 의료진의 판단에 따라 안내됩니다.',
  leadNote:
    '수술 후 재활, 집중 도수·운동치료 등 치료 목적에 맞게 입원 일정과 병실을 배정해 드립니다.',
};

export const admissionFlow: AdmissionStep[] = [
  {
    order: 1,
    title: '외래 진료 및 입원 결정',
    description:
      '외래 진료 후 입원 치료가 필요하다고 판단되면 담당 의료진이 입원 필요성과 치료 계획을 설명해 드립니다.',
  },
  {
    order: 2,
    title: '입원 예약·병실 안내',
    description:
      '입원 예정일과 병실을 안내받습니다. 입원 일정 변경이 필요하면 입원 안내 데스크로 연락해 주세요.',
  },
  {
    order: 3,
    title: '입원 전 안내',
    description:
      '금식 여부, 복용 약 조정, 준비물 등 입원 전 유의사항을 안내해 드립니다. 필요 시 입원 안내 코디네이터가 별도 연락을 드릴 수 있습니다.',
  },
  {
    order: 4,
    title: '입원 수속',
    description:
      '입원 당일 신분증, 건강보험증(또는 보험 확인 서류)을 지참하고 1층 입원 수속 창구에서 등록합니다.',
  },
  {
    order: 5,
    title: '병동 입실·치료 시작',
    description:
      '병동 간호사의 안내에 따라 병실에 입실하고, 입원 기록 작성 후 재활·치료 일정에 따라 진료가 시작됩니다.',
  },
];

export const admissionDocuments = {
  title: '입원 수속 시 필요 서류',
  items: [
    '신분증(주민등록증, 운전면허증 등)',
    '건강보험증 또는 보험 자격 확인 서류',
    '환자 카드(재진 환자)',
    '기존 검사 자료·영상 CD(해당 시)',
  ],
};

export const admissionEssentials = {
  title: '입원 준비물',
  categories: [
    {
      title: '필수',
      items: ['세면도구, 수건', '슬리퍼', '개인 복용약(의료진 확인 후)', '편한 실내 복장·속옷'],
    },
    {
      title: '재활치료 시',
      items: ['운동화', '운동복', '수건', '물병'],
    },
    {
      title: '기타',
      items: ['안경·보청기 등 개인 보조기구', '휴지, 물티슈 등 개인 위생용품'],
    },
  ],
  note: '귀중품은 가급적 가져오지 않으시고, 필요 시 병원 보관함 이용을 권장합니다.',
};

export const admissionNotes = [
  '입원 일정은 병실 상황과 치료 계획에 따라 변경될 수 있습니다.',
  '입원 전 금식·약 복용 중단 여부는 의료진 안내에 따라 주세요.',
  '면회 시간·병문안 규정은 입원생활안내를 참고해 주세요.',
  '입원 관련 문의는 입원 안내 데스크 또는 예약센터로 연락해 주세요.',
];

export const admissionContactInfo = {
  reservationPhone: '1588-5700',
  admissionDesk: '02-1234-5679',
  hours: '평일 09:00 ~ 18:00 (토·공휴일 제외)',
};

export const relatedLinks = [
  { label: '입원생활안내', href: '/inpatient/life', icon: 'hotel' },
  { label: '퇴원절차', href: '/discharge/guide', icon: 'logout' },
  { label: '진료안내', href: '/outpatient/guide', icon: 'medical_services' },
  { label: '예약안내', href: '/reservation/guide', icon: 'event_note' },
  { label: '입·퇴원 FAQ', href: '/faq', icon: 'help' },
  { label: '오시는길', href: '/directions', icon: 'location_on' },
];
