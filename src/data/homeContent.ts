export type NavSubItem = {
  label: string;
  href: string;
};

export type NavChildItem = {
  label: string;
  href: string;
  children?: NavSubItem[];
};

export type NavMenuItem = {
  label: string;
  href: string;
  children?: NavChildItem[];
};

export const navMenus: NavMenuItem[] = [
  {
    label: '진료예약',
    href: '#',
    children: [
      { label: '인터넷 진료예약', href: '/reservation' },
      { label: '진료내역 조회', href: '/mypage?tab=history' },
      { label: '예약 확인 / 취소', href: '/reservation/confirm' },
    ],
  },
  {
    label: '진료안내',
    href: '#',
    children: [
      {
        label: '의료진',
        href: '/doctors',
        children: [{ label: '의료진 소개', href: '/doctors' }],
      },
      {
        label: '외래진료안내',
        href: '#',
        children: [
          { label: '예약안내', href: '/reservation/guide' },
          { label: '진료안내', href: '/outpatient/guide' },
          { label: '비급여 진료비용', href: '#' },
        ],
      },
      {
        label: '입/퇴원안내',
        href: '#',
        children: [
          { label: '입원절차', href: '#' },
          { label: '퇴원절차', href: '#' },
          { label: '입원생활안내', href: '#' },
        ],
      },
    ],
  },
  {
    label: '이용안내',
    href: '#',
    children: [
      { label: '오시는길', href: '/directions' },
      { label: '공지사항', href: '/notices' },
      {
        label: '편의시설',
        href: '/facilities/internal',
        children: [
          { label: '원내 편의시설', href: '/facilities/internal' },
          { label: '외부 편의시설', href: '/facilities/external' },
        ],
      },
      {
        label: '신청/발급안내',
        href: '/documents/diagnosis',
        children: [
          { label: '진단서발급', href: '/documents/diagnosis' },
          { label: '진료비계산서', href: '#' },
          { label: '처방전', href: '#' },
          { label: '의무기록 및 영상검사 사본 발급', href: '#' },
        ],
      },
      { label: '문병안내', href: '#' },
      { label: '위임장/동의서안내', href: '#' },
      { label: 'FAQ(통합)', href: '/faq' },
      { label: '증명서발급사이트', href: 'https://sdoc.snuh.org/main.do' },
    ],
  },
];

export const quickTasks = [
  {
    id: 'appointment',
    title: '인터넷 진료예약',
    description: '원하시는 시간에\n빠르게 예약하세요',
    icon: 'calendar_month',
    href: '/reservation',
  },
  {
    id: 'confirm',
    title: '예약확인/취소',
    description: '나의 예약 내역을\n확인하고 관리하세요',
    icon: 'event_available',
    href: '/reservation/confirm',
  },
  {
    id: 'documents',
    title: '신청/발급안내',
    description: '진단서 및 제증명\n발급 안내입니다',
    icon: 'description',
    href: '/documents/diagnosis',
  },
  {
    id: 'directions',
    title: '오시는길',
    description: '병원 위치와\n교통편을 안내합니다',
    icon: 'location_on',
    href: '/directions',
  },
];

export const footerLinks = [
  { label: '개인정보처리방침', href: '#' },
  { label: '이용약관', href: '#' },
  { label: '환자의권리와의무', href: '#' },
  { label: '찾아오시는길', href: '/directions' },
];

export const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCi4NFcYD_kTBhqSptl3Ng7WrEJJPmJq6hnjyKwlIXjhZhH4dmOasIKyih_6-S20xpUIA7rcXoBcUM11KI3pMCpxQ8Ofckf0zQqj6G1xDLImCr0FcjzcoqUZZ_Os3KRNvuy7OhERSHXCIL0UTKP9g6ws4MTyywwq8f29gY5gUg-z3706-l2quxAHUGmh2Su1LYVbsfUFIZ__7vTEBLBZ8S2wUL6088OpW8MT_vAcJaFIn_qUQm4ZrUiWdqDoYX7jPXNIFD-mAD2w0Xh';

export const HEALTH_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAWqAgpYWIgRbcQa_ET-jlmC_OEOc3S85oMAfgdw6no-QwOC5I4SQotjedLOL9x7DU47ybSV-VnRwCnqzWbmh4el09QZLrVUHm3qsmaAUtfvq8aKxDOpgPRIqvhGrbMvu60klkCWzMAyuptfw0jGy7NkLjVob6SZiXPTTCfxC2tC2vL7iYBIYfvRvnM76geQ_H0AvomByhhpm3N2TqLVJ39AQtYANOevKJ0xM9SI3lG4GtgxthvIjrsKolExnZ6eJ-eIauWWHJ8QQpK';
