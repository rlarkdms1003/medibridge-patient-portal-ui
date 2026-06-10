export type DailyScheduleRow = {
  time: string;
  activity: string;
  note?: string;
};

export type WardFacility = {
  title: string;
  description: string;
  icon: string;
};

export const inpatientLifeIntro = {
  lead: 'MediBridge 재활정형외과 입원 생활은 재활 치료와 편안한 회복을 위해 안내해 드립니다.',
  leadNote:
    '병동 생활, 식사, 면회, 재활치료 일정 등 입원 중 궁금하신 사항을 미리 확인해 주세요.',
};

export const dailySchedule: DailyScheduleRow[] = [
  { time: '07:00 ~ 08:00', activity: '기상·세면', note: '개인 위생용품은 병실 내 사용' },
  { time: '08:00 ~ 09:00', activity: '아침 식사' },
  { time: '09:00 ~ 12:00', activity: '회진·재활치료·검사', note: '치료 일정은 개인별로 상이' },
  { time: '12:30 ~ 13:30', activity: '점심 식사' },
  { time: '14:00 ~ 17:00', activity: '재활치료·처치·휴식' },
  { time: '17:30 ~ 18:30', activity: '저녁 식사' },
  { time: '19:00 ~ 21:00', activity: '자유 시간·면회', note: '면회 시간 준수' },
  { time: '21:00 이후', activity: '취침 준비', note: '정숙한 병동 분위기 유지' },
];

export const wardFacilities: WardFacility[] = [
  {
    title: '병실',
    icon: 'bed',
    description: '2~4인실로 운영되며, 침대·옷장·개인 수납 공간이 제공됩니다.',
  },
  {
    title: '화장실·샤워실',
    icon: 'shower',
    description: '병동 내 공용 및 병실 내 부속 시설을 이용하실 수 있습니다.',
  },
  {
    title: '재활치료실',
    icon: 'fitness_center',
    description: '도수치료·운동치료 등 입원 재활 프로그램이 진행됩니다.',
  },
  {
    title: '휴게 공간',
    icon: 'weekend',
    description: '병동 로비 및 휴게 공간에서 가벼운 휴식이 가능합니다.',
  },
];

export const mealGuide = {
  title: '식사 안내',
  description: '입원 환자 식사는 영양사가 구성한 식단에 따라 제공됩니다.',
  items: [
    '아침 08:00 / 점심 12:30 / 저녁 17:30 (시간은 병동 상황에 따라 조정될 수 있음)',
    '알레르기·특정 식품 제한이 있는 경우 입원 시 간호사에게 알려 주세요.',
    '외부 음식 반입은 감염·알레르기 예방을 위해 제한될 수 있습니다.',
  ],
};

export const visitingGuide = {
  title: '면회·병문안 안내',
  items: [
    '면회 시간: 평일 19:00 ~ 21:00 / 토·일·공휴일 10:00 ~ 12:00, 19:00 ~ 21:00',
    '1회 면회 인원은 2명 이내를 권장합니다.',
    '감염 예방을 위해 발열·호흡기 증상이 있는 분은 면회를 자제해 주세요.',
    '면회 시 마스크 착용을 권장하며, 병동 내 정숙을 지켜 주세요.',
    '소아·노약자 면회는 간호사와 상의 후 가능합니다.',
  ],
};

export const rehabilitationDuringStay = {
  title: '입원 중 재활치료',
  description: '재활정형외과 입원의 핵심은 체계적인 재활 치료입니다.',
  items: [
    {
      title: '치료 일정',
      description: '담당 의료진·치료사가 정한 일정에 따라 도수·운동치료를 받습니다.',
    },
    {
      title: '치료 준비',
      description: '운동복, 운동화, 수건을 준비해 주세요. 치료 전후 충분한 휴식이 필요합니다.',
    },
    {
      title: '협조 요청',
      description: '치료사 안내에 적극 협조해 주시면 회복에 도움이 됩니다.',
    },
  ],
};

export const wardRules = [
  '병동 내 흡연·음주는 금지입니다.',
  '전열기·전기장판 등 개인 전열기 사용은 화재 예방을 위해 제한됩니다.',
  '귀중품은 본인이 관리해 주시고, 분실 시 병원에서 책임지지 않습니다.',
  '다른 환자의 휴식을 방해하지 않도록 통화·대화 시 소음에 유의해 주세요.',
  '응급 상황 시 병실 호출벨 또는 간호사실로 연락해 주세요.',
];

export const inpatientLifeContactInfo = {
  reservationPhone: '1588-5700',
  wardDesk: '02-1234-5680',
  hours: '평일 09:00 ~ 18:00 (토·공휴일 제외)',
};

export const relatedLinks = [
  { label: '문병안내', href: '/visitation', icon: 'groups' },
  { label: '입원절차', href: '/admission/guide', icon: 'bed' },
  { label: '퇴원절차', href: '/discharge/guide', icon: 'logout' },
  { label: '진료안내', href: '/outpatient/guide', icon: 'medical_services' },
  { label: '입·퇴원 FAQ', href: '/faq', icon: 'help' },
];
