export type MyPageTab = 'home' | 'history' | 'profile';

export type MyPageMenuItem = {
  id: MyPageTab;
  label: string;
  icon: string;
  description: string;
};

export const mypageMenus: MyPageMenuItem[] = [
  {
    id: 'home',
    label: '마이페이지',
    icon: 'home',
    description: '예약·진료 요약을 한눈에 확인합니다.',
  },
  {
    id: 'history',
    label: '진료이력',
    icon: 'clinical_notes',
    description: '과거 진료 내역을 조회합니다.',
  },
  {
    id: 'profile',
    label: '회원정보',
    icon: 'person',
    description: '회원 정보를 확인하고 관리합니다.',
  },
];

export type MyPageQuickLink = {
  label: string;
  description: string;
  icon: string;
  href: string;
};

export const mypageQuickLinks: MyPageQuickLink[] = [
  {
    label: '인터넷 진료예약',
    description: '새 진료 예약',
    icon: 'calendar_month',
    href: '/reservation',
  },
  {
    label: '예약확인/취소',
    description: '예약 변경·취소',
    icon: 'event_available',
    href: '/reservation/confirm',
  },
  {
    label: '신청/발급안내',
    description: '증명서·동의서',
    icon: 'description',
    href: '/documents/diagnosis',
  },
  {
    label: 'FAQ',
    description: '자주 묻는 질문',
    icon: 'help',
    href: '/faq',
  },
];

export type MedicalHistoryItem = {
  id: string;
  date: string;
  doctorName: string;
  doctorTitle: string;
  diagnosis: string;
  visitType: '외래' | '입원' | '검진';
};

export const medicalHistory: MedicalHistoryItem[] = [
  {
    id: 'visit-001',
    date: '2026.03.12',
    doctorName: '박준호',
    doctorTitle: '전문의',
    diagnosis: '어깨 회전근개 손상 — 도수치료 및 운동처방',
    visitType: '외래',
  },
  {
    id: 'visit-002',
    date: '2026.01.28',
    doctorName: '이서연',
    doctorTitle: '과장',
    diagnosis: '경추 디스크 — 보존적 치료 및 재활 상담',
    visitType: '외래',
  },
  {
    id: 'visit-003',
    date: '2025.11.05',
    doctorName: '김민수',
    doctorTitle: '원장',
    diagnosis: '무릎 반월상연골 손상 — MRI 검사 및 치료 계획',
    visitType: '외래',
  },
];
