export type DischargeStep = {
  order: number;
  title: string;
  description: string;
};

export const dischargeIntro = {
  lead: 'MediBridge 재활정형외과 퇴원은 담당 의료진의 진료 결과와 치료 경과에 따라 안내됩니다.',
  leadNote:
    '퇴원 후에도 외래 재활 치료를 이어 받으실 수 있도록 치료 계획과 주의사항을 안내해 드립니다.',
};

export const dischargeFlow: DischargeStep[] = [
  {
    order: 1,
    title: '퇴원 결정 및 안내',
    description:
      '담당 의료진이 퇴원 가능 여부를 판단하고, 퇴원 예정일과 이후 치료 계획을 설명해 드립니다.',
  },
  {
    order: 2,
    title: '퇴원 전 점검',
    description:
      '간호사가 퇴원 전 상태를 확인하고, 복용 약·재활 운동 방법 등 퇴원 후 관리 사항을 안내합니다.',
  },
  {
    order: 3,
    title: '퇴원 서류·약 수령',
    description:
      '퇴원 요약지, 처방전, 퇴원 약 등 필요 서류와 약을 수령합니다. 추가 발급이 필요하면 안내 데스크에 문의해 주세요.',
  },
  {
    order: 4,
    title: '퇴원 수속·비용 정산',
    description:
      '1층 입·퇴원 수속 창구에서 퇴원 수속을 진행하고, 입원 진료비를 정산합니다.',
  },
  {
    order: 5,
    title: '귀가 및 외래 재활 연계',
    description:
      '귀가 후 외래 재활 치료가 필요한 경우 일정을 안내받습니다. 인터넷·전화 예약으로 외래 진료를 이어가실 수 있습니다.',
  },
];

export const dischargeDocuments = {
  title: '퇴원 시 안내·수령 사항',
  items: [
    '퇴원 요약지(진료 경과·주의사항)',
    '퇴원 처방전 및 복용 약',
    '외래 재활 치료 일정 안내(해당 시)',
    '진료비 계산서·영수증',
    '진단서·소견서(신청 시)',
  ],
};

export const outpatientFollowUp = {
  title: '퇴원 후 외래 재활 안내',
  description:
    '재활정형외과 특성상 퇴원 후에도 도수치료·운동치료 등 외래 재활 프로그램을 이어 받으실 수 있습니다.',
  items: [
    {
      title: '외래 진료 예약',
      description: '퇴원 시 안내받은 일정에 맞춰 외래 진료를 예약해 주세요.',
    },
    {
      title: '재활치료',
      description: '도수·운동치료는 별도 예약이 필요할 수 있으며, 치료실 일정에 따라 안내됩니다.',
    },
    {
      title: '증상 변화',
      description: '통증 악화, 염증·발열 등 이상 증상이 있으면 즉시 내원하거나 예약센터로 문의해 주세요.',
    },
  ],
};

export const dischargeNotes = [
  '퇴원 약은 의료진 안내에 따라 정해진 용법·용량으로 복용해 주세요.',
  '퇴원 후 운동·일상생활 제한 사항은 담당 의료진·치료사 안내를 따라 주세요.',
  '외래 진료 예약 없이 장기간 경과를 방치하지 않도록 정기적으로 내원해 주세요.',
  '퇴원 관련 문의는 입원 안내 데스크 또는 예약센터로 연락해 주세요.',
];

export const dischargeContactInfo = {
  reservationPhone: '1588-5700',
  admissionDesk: '02-1234-5679',
  hours: '평일 09:00 ~ 18:00 (토·공휴일 제외)',
};

export const relatedLinks = [
  { label: '입원절차', href: '/admission/guide', icon: 'bed' },
  { label: '입원생활안내', href: '/inpatient/life', icon: 'hotel' },
  { label: '진료안내', href: '/outpatient/guide', icon: 'medical_services' },
  { label: '입·퇴원 FAQ', href: '/faq', icon: 'help' },
];
