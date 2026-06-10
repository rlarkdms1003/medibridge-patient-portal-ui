export type NoticeCategory = 'hospital' | 'clinic' | 'facility';

export type Notice = {
  id: string;
  title: string;
  date: string;
  category: NoticeCategory;
  isPinned?: boolean;
  views: number;
  content: string;
};

export const noticeCategoryLabel: Record<NoticeCategory, string> = {
  hospital: '병원안내',
  clinic: '진료안내',
  facility: '시설안내',
};

export const noticeCategories: { id: 'all' | NoticeCategory; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'hospital', label: '병원안내' },
  { id: 'clinic', label: '진료안내' },
  { id: 'facility', label: '시설안내' },
];

export const notices: Notice[] = [
  {
    id: 'n-001',
    title: '[안내] 2024년 독감 예방접종 안내',
    date: '2024.10.15',
    category: 'clinic',
    isPinned: true,
    views: 1248,
    content: `안녕하세요. MediBridge 재활정형외과입니다.

2024년 독감 예방접종을 아래와 같이 실시합니다. 만 65세 이상 어르신, 만성질환자, 임산부 등 고위험군은 우선 접종을 권장드립니다.

■ 접종 대상: 내원 환자 및 보호자 (사전 예약 권장)
■ 접종 장소: 본관 1층 예방접종실
■ 접종 시간: 평일 09:00 ~ 16:00 (점심시간 12:30 ~ 13:30 제외)
■ 비용: 건강보험 적용 대상자는 본인부담금만 납부

접종 후 30분간 이상 반응 관찰이 필요하오니 일정에 여유를 두고 방문해 주세요.
문의: 원무과 02-1234-5678`,
  },
  {
    id: 'n-002',
    title: '신관 주차장 증축 공사에 따른 주차 안내',
    date: '2024.10.10',
    category: 'facility',
    isPinned: true,
    views: 982,
    content: `신관 주차장 증축 공사로 인해 일부 구역의 주차가 제한됩니다.

■ 공사 기간: 2024.10.15 ~ 2025.02.28
■ 제한 구역: 신관 지하 2층 B구역 전체
■ 대체 주차: 본관 지하 1~2층, 인근 공영주차장(강남구청 방향 200m)

공사 기간 중 주차 대수가 제한될 수 있으니 대중교통 이용을 권장드립니다.
만차 시 안내 데스크에서 인근 주차장 안내를 받으실 수 있습니다.`,
  },
  {
    id: 'n-003',
    title: '외래 진료 시간 변경 안내 (11월부터 적용)',
    date: '2024.10.01',
    category: 'clinic',
    views: 1563,
    content: `환자 여러분의 편의를 위해 2024년 11월 1일부터 외래 진료 시간이 일부 변경됩니다.

■ 평일 오전 진료: 09:00 ~ 12:30 (변경 없음)
■ 평일 오후 진료: 13:30 ~ 17:30 (기존 18:00에서 조정)
■ 토요일 진료: 09:00 ~ 12:00 (오후 진료 없음)

변경된 시간에 맞춰 예약을 잡아 주시기 바라며, 기존 예약 환자분께는 개별 안내 문자를 발송합니다.`,
  },
  {
    id: 'n-004',
    title: '추석 연휴 응급·외래 진료 운영 안내',
    date: '2024.09.20',
    category: 'hospital',
    views: 2104,
    content: `추석 연휴 기간 진료 운영 일정을 안내드립니다.

■ 휴진: 9월 16일(월) ~ 9월 18일(수)
■ 응급 진료: 연휴 기간 24시간 응급실 운영
■ 외래 진료: 9월 19일(목)부터 정상 진료

연휴 전후 진료 예약이 집중될 수 있으니 미리 예약해 주시기 바랍니다.`,
  },
  {
    id: 'n-005',
    title: '재활치료실 장비 점검에 따른 이용 안내',
    date: '2024.09.12',
    category: 'facility',
    views: 645,
    content: `재활치료실 장비 정기 점검으로 아래 시간 동안 일부 치료가 제한됩니다.

■ 점검 일시: 2024.09.25(수) 14:00 ~ 17:00
■ 영향 범위: 물리치료실 2번, 3번 베드
■ 대체 안내: 점검 시간 중 예약 환자는 1번·4번 베드로 순차 배정

불편을 드려 죄송하며, 안전한 치료 환경을 위한 점검에 협조 부탁드립니다.`,
  },
  {
    id: 'n-006',
    title: '비회원 인터넷 진료예약 서비스 오픈',
    date: '2024.09.05',
    category: 'hospital',
    views: 1876,
    content: `회원가입 없이도 인터넷 진료예약이 가능한 비회원 예약 서비스를 오픈했습니다.

■ 이용 방법: 홈페이지 > 인터넷 진료예약 > 비회원 예약
■ 필요 정보: 성명, 생년월일, 휴대전화번호
■ 예약 확인: 예약확인/취소 메뉴에서 예약번호로 조회

보다 편리한 진료 접수를 위해 지속적으로 서비스를 개선하겠습니다.`,
  },
  {
    id: 'n-007',
    title: '야간 무인 수납기 설치 안내',
    date: '2024.08.28',
    category: 'facility',
    views: 534,
    content: `본관 1층 로비에 야간 무인 수납기가 설치되었습니다.

■ 이용 시간: 평일 18:00 ~ 22:00, 토요일 13:00 ~ 18:00
■ 이용 대상: 당일 외래 진료 후 수납 환자
■ 결제 수단: 신용·체크카드, 간편결제

이용 중 오류 발생 시 보안실(내선 119)로 연락해 주세요.`,
  },
  {
    id: 'n-008',
    title: '건강검진 패키지 예약 접수 시작',
    date: '2024.08.15',
    category: 'clinic',
    views: 892,
    content: `2024년 하반기 건강검진 패키지 예약 접수를 시작합니다.

■ 예약 기간: 2024.08.15 ~ 2024.12.20
■ 검진 장소: 본관 3층 건강검진센터
■ 문의: 건강검진센터 02-1234-5600

정형외과·재활의학과 연계 검진 프로그램도 함께 운영합니다.`,
  },
];

export const recentNotices = notices.slice(0, 3);

export function getNoticeById(id: string): Notice | undefined {
  return notices.find((notice) => notice.id === id);
}

export function getAdjacentNotices(id: string): {
  prev: Notice | null;
  next: Notice | null;
} {
  const index = notices.findIndex((notice) => notice.id === id);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? notices[index - 1] : null,
    next: index < notices.length - 1 ? notices[index + 1] : null,
  };
}
