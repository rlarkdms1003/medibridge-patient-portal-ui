export type VisitingHoursRow = {
  ward: string;
  weekday: string;
  weekend: string;
  note?: string;
};

export type RestrictionGroup = {
  title: string;
  items: string[];
};

export const visitationIntro = {
  lead: 'MediBridge 재활정형외과 입원 환자의 안정적인 회복을 위해 면회·병문안 안내를 드립니다.',
  leadNote:
    '감염 예방과 치료 집중을 위해 면회 시간과 인원을 준수해 주시기 바랍니다. 자세한 사항은 병동 데스크에 문의해 주세요.',
};

export const visitingHours: VisitingHoursRow[] = [
  {
    ward: '일반 입원 병동',
    weekday: '19:00 ~ 21:00',
    weekend: '10:00 ~ 12:00 / 19:00 ~ 21:00',
    note: '1회 2명 이내',
  },
  {
    ward: '수술 후 회복실',
    weekday: '14:00 ~ 15:00',
    weekend: '14:00 ~ 15:00',
    note: '짧은 면회만 가능, 1회 1명',
  },
  {
    ward: '재활치료 집중 병동',
    weekday: '19:00 ~ 20:30',
    weekend: '10:00 ~ 11:30 / 19:00 ~ 20:30',
    note: '치료 시간 중 면회 불가',
  },
];

export const restrictionGroups: RestrictionGroup[] = [
  {
    title: '병문안 제한 대상',
    items: [
      '감기·독감 등 호흡기 질환 증상이 있는 분',
      '급성 장·위장 감염 증상(설사, 구토, 복통 등)이 있는 분',
      '피부에 감염성 병변이 있는 분',
      '최근 감염성 질환자와 접촉한 분',
    ],
  },
  {
    title: '면회를 삼가해 주시는 분',
    items: [
      '임산부',
      '만 70세 이상 노약자',
      '만 12세 이하 아동',
      '면역 기능이 저하된 분(항암치료 등 지속적 치료 중)',
    ],
  },
];

export const additionalNotes = [
  {
    title: '단체 방문 제한',
    description: '친지·동문·종교단체 등 단체 방문은 사전 협의 없이는 제한됩니다.',
    icon: 'groups',
  },
  {
    title: '꽃·화분·애완동물',
    description: '감염 및 알레르기 예방을 위해 병실 내 꽃·화분·애완동물 반입을 금지합니다.',
    icon: 'local_florist',
  },
  {
    title: '간병인 안내',
    description: '간병인이 필요한 경우 입원 시 병동 데스크에 신청하실 수 있습니다. (1588-1234 내선 3번)',
    icon: 'support_agent',
  },
  {
    title: '외부 음식·용품',
    description: '환자 안전과 감염 관리를 위해 외부 음식 반입은 제한될 수 있습니다. 반입 전 간호사와 상의해 주세요.',
    icon: 'restaurant',
  },
];

export const visitationContactInfo = {
  reservationPhone: '1588-1234',
  wardDesk: '1588-1234 (내선 3번 · 병동 데스크)',
  hours: '평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00',
};

export const relatedLinks = [
  { label: '입원절차', href: '/admission/guide', icon: 'login' },
  { label: '입원생활안내', href: '/inpatient/life', icon: 'bed' },
  { label: '퇴원절차', href: '/discharge/guide', icon: 'logout' },
  { label: '오시는길', href: '/directions', icon: 'location_on' },
];
