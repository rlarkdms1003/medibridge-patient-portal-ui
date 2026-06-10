export type NonCoveredFeeCategory = {
  id: string;
  label: string;
};

export type NonCoveredFeeItem = {
  id: string;
  categoryId: string;
  name: string;
  amount: number | null;
  minAmount?: number;
  maxAmount?: number;
  unit: string;
  note?: string;
};

export const nonCoveredFeeIntro = {
  lead: 'MediBridge 재활정형외과 비급여 진료비용 안내입니다.',
  leadNote:
    '아래 금액은 참고용이며, 진료·치료 내용과 환자 상태에 따라 달라질 수 있습니다. 정확한 비용은 내원 시 안내해 드립니다.',
};

export const nonCoveredFeeCategories: NonCoveredFeeCategory[] = [
  { id: 'imaging', label: '영상·검사' },
  { id: 'injection', label: '주사·처치' },
  { id: 'rehabilitation', label: '재활치료' },
  { id: 'admission', label: '입원·병실' },
  { id: 'etc', label: '기타' },
];

export const nonCoveredFeeItems: NonCoveredFeeItem[] = [
  {
    id: 'fee-001',
    categoryId: 'imaging',
    name: '근골격계 MRI (1부위)',
    amount: null,
    minAmount: 450000,
    maxAmount: 650000,
    unit: '1회',
    note: '부위·촬영 방법에 따라 상이',
  },
  {
    id: 'fee-002',
    categoryId: 'imaging',
    name: '초음파 검사 (1부위)',
    amount: null,
    minAmount: 80000,
    maxAmount: 120000,
    unit: '1회',
  },
  {
    id: 'fee-003',
    categoryId: 'imaging',
    name: 'X-ray 추가 촬영',
    amount: 30000,
    unit: '1매',
  },
  {
    id: 'fee-004',
    categoryId: 'imaging',
    name: '골밀도 검사 (DEXA)',
    amount: 70000,
    unit: '1회',
  },
  {
    id: 'fee-005',
    categoryId: 'injection',
    name: 'PRP 주사',
    amount: null,
    minAmount: 250000,
    maxAmount: 350000,
    unit: '1회',
    note: '준비·농도에 따라 상이',
  },
  {
    id: 'fee-006',
    categoryId: 'injection',
    name: '히알루론산 관절강내 주사',
    amount: null,
    minAmount: 120000,
    maxAmount: 180000,
    unit: '1회',
  },
  {
    id: 'fee-007',
    categoryId: 'injection',
    name: '프롤로 주사 (Prolotherapy)',
    amount: 80000,
    unit: '1부위',
  },
  {
    id: 'fee-008',
    categoryId: 'injection',
    name: '체외충격파 치료 (ESWT)',
    amount: null,
    minAmount: 60000,
    maxAmount: 80000,
    unit: '1회',
  },
  {
    id: 'fee-009',
    categoryId: 'rehabilitation',
    name: '도수치료',
    amount: null,
    minAmount: 80000,
    maxAmount: 100000,
    unit: '30분',
  },
  {
    id: 'fee-010',
    categoryId: 'rehabilitation',
    name: '도수치료 (집중)',
    amount: null,
    minAmount: 150000,
    maxAmount: 180000,
    unit: '60분',
  },
  {
    id: 'fee-011',
    categoryId: 'rehabilitation',
    name: '운동치료 (1:1)',
    amount: null,
    minAmount: 50000,
    maxAmount: 70000,
    unit: '30분',
  },
  {
    id: 'fee-012',
    categoryId: 'rehabilitation',
    name: '재활치료 패키지 (10회)',
    amount: 650000,
    unit: '10회',
    note: '도수·운동치료 혼합, 개인별 구성',
  },
  {
    id: 'fee-013',
    categoryId: 'rehabilitation',
    name: '전기·열 치료 (TENS/ICT 등)',
    amount: 30000,
    unit: '1회',
  },
  {
    id: 'fee-014',
    categoryId: 'admission',
    name: '1인실 입원료',
    amount: null,
    minAmount: 150000,
    maxAmount: 200000,
    unit: '1일',
    note: '식대 별도',
  },
  {
    id: 'fee-015',
    categoryId: 'admission',
    name: '2~4인실 입원료',
    amount: null,
    minAmount: 80000,
    maxAmount: 120000,
    unit: '1일',
    note: '식대 별도',
  },
  {
    id: 'fee-016',
    categoryId: 'admission',
    name: '입원 재활치료 (1일 추가)',
    amount: null,
    minAmount: 100000,
    maxAmount: 150000,
    unit: '1일',
    note: '집중 재활 프로그램 해당 시',
  },
  {
    id: 'fee-017',
    categoryId: 'etc',
    name: '진단서 (영문)',
    amount: 20000,
    unit: '1부',
  },
  {
    id: 'fee-018',
    categoryId: 'etc',
    name: '진료 사실 확인서',
    amount: 5000,
    unit: '1부',
  },
  {
    id: 'fee-019',
    categoryId: 'etc',
    name: '각종 확인서·소견서 (추가)',
    amount: 10000,
    unit: '1부',
    note: '발급 종류에 따라 상이',
  },
  {
    id: 'fee-020',
    categoryId: 'etc',
    name: '의료용 보조기·테이핑 재료',
    amount: null,
    minAmount: 10000,
    maxAmount: 50000,
    unit: '1회',
    note: '품목에 따라 상이',
  },
];

export const nonCoveredFeeNotes = [
  '비급여 항목은 건강보험 적용 대상이 아니며, 환자 본인 부담입니다.',
  '동일 항목이라도 시술·치료 범위, 사용 재료에 따라 비용이 달라질 수 있습니다.',
  '입원료에는 식대·간병비 등이 포함되지 않을 수 있습니다.',
  '비급여 항목 시행 전 의료진 설명과 동의 절차를 거칩니다.',
  '본 안내는 프로젝트용 참고 자료이며, 실제 병원과 무관한 목 데이터입니다.',
];

export const nonCoveredFeeContactInfo = {
  reservationPhone: '1588-5700',
  hours: '평일 09:00 ~ 18:00 (토·공휴일 제외)',
};

export const relatedLinks = [
  { label: '진료안내', href: '/outpatient/guide', icon: 'medical_services' },
  { label: '예약안내', href: '/reservation/guide', icon: 'event_note' },
  { label: '의료진 소개', href: '/doctors', icon: 'groups' },
  { label: 'FAQ', href: '/faq', icon: 'help' },
];

export function formatFeeAmount(item: NonCoveredFeeItem): string {
  if (item.amount !== null) {
    return `${item.amount.toLocaleString('ko-KR')}원`;
  }

  if (item.minAmount !== undefined && item.maxAmount !== undefined) {
    return `${item.minAmount.toLocaleString('ko-KR')} ~ ${item.maxAmount.toLocaleString('ko-KR')}원`;
  }

  return '-';
}

export function getCategoryLabel(categoryId: string): string {
  return nonCoveredFeeCategories.find((category) => category.id === categoryId)?.label ?? categoryId;
}
