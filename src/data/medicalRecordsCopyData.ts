export type IssuanceInfoRow = {
  label: string;
  content: string;
};

export type DocumentRequirementRow = {
  applicant: string;
  documents: string[];
  note?: string;
};

export type DocumentRequirementSection = {
  id: string;
  title: string;
  rows: DocumentRequirementRow[];
};

export type MedicalRecordsFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const medicalRecordsIntro = {
  lead: 'MediBridge 재활정형외과 의무기록 및 영상검사 사본 발급 안내입니다.',
  procedureNote:
    '진료 예약이 없어도 구비 서류를 지참하고 의무기록·영상발급 창구를 방문하시면 신청하실 수 있습니다.',
};

export const issuanceInfo: IssuanceInfoRow[] = [
  {
    label: '발급 시간',
    content:
      '평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00\n※ 발급 신청 마감: 업무 종료 30분 전\n※ 공휴일 및 병원 휴무일은 미운영',
  },
  {
    label: '발급 장소',
    content: '1층 원무과 · 의무기록 / 영상(CD) 발급 창구',
  },
  {
    label: '발급 수수료',
    content:
      '의무기록: 1~5장 장당 1,000원, 6장부터 장당 100원\n영상: CD 1장당 10,000원 / DVD 1장당 20,000원\n※ 보건복지부 고시 기준에 따름',
  },
  {
    label: '문의처',
    content: '1588-5700 / 의무기록·영상발급 창구 02-1234-5681',
  },
];

export const documentRequirementSections: DocumentRequirementSection[] = [
  {
    id: 'self-guardian',
    title: '환자 본인 / 만 19세 미만 환자의 친권자',
    rows: [
      {
        applicant: '환자 본인',
        documents: ['본인 신분증'],
        note: '만 10세 이상(의사능력이 있는 경우) 환자 본인이 신분증을 지참하여 직접 신청 가능',
      },
      {
        applicant: '만 19세 미만 환자의 친권자',
        documents: ['친권자 신분증', '친권자임을 확인할 수 있는 서류'],
        note: '대리인 신청 시: 대리인·친권자 신분증, 친권 확인 서류, 친권자 자필 동의서·위임장',
      },
    ],
  },
  {
    id: 'with-consent',
    title: '환자의 동의를 받은 경우',
    rows: [
      {
        applicant: '친족 (배우자, 직계존속·비속, 배우자의 직계존속)',
        documents: [
          '신청자 신분증',
          '가족관계증명서 등 친족관계 확인서',
          '환자 자필 서명 동의서 (만 14세 미만 미성년자 제외)',
        ],
      },
      {
        applicant: '대리인 (형제·자매, 지인, 보험회사 직원 등)',
        documents: [
          '환자 신분증 사본',
          '신청자 신분증',
          '환자 자필 서명 동의서',
          '환자 자필 서명 위임장',
        ],
        note: '만 17세 미만 주민등록 미발급자: 여권, 학생증, 가족관계증명서, 주민등록초본 등',
      },
    ],
  },
  {
    id: 'without-consent',
    title: '환자의 동의를 받을 수 없는 경우',
    rows: [
      {
        applicant: '환자 사망·의식불명·중증질환·행방불명·의사무능력자',
        documents: [
          '신청자 신분증',
          '가족관계증명서 등 친족관계 확인서',
          '사망·의식불명·행방불명·의사무능력 등 사실 확인 서류',
        ],
        note: '친족이 대리인에게 위임하는 경우 위임장 및 대리인 신분증 추가',
      },
    ],
  },
];

export const submissionNotes = [
  '가족관계증명서, 주민등록표 등본 등 관공서 발행 서류는 발급일로부터 3개월 이내만 유효합니다.',
  '신분증은 주민등록증, 운전면허증, 여권 등 국가 발급 신분증만 인정됩니다.',
  '동의서·위임장은 의료법 시행규칙 별지 서식을 사용하며, 환자 본인의 자필 서명만 인정됩니다. (도장·지장 불인)',
  '동의서에는 동의 내용, 날짜, 범위가 명확히 기재되어 있어야 합니다.',
];

export type FormDownloadItem = {
  label: string;
  icon: string;
  href: string;
  downloadName: string;
};

export const formDownloads: FormDownloadItem[] = [
  {
    label: '진료기록 열람 및 사본발급 위임장',
    icon: 'description',
    href: '/forms/medical-records-attorney.hwp',
    downloadName: '진료기록_열람_사본발급_위임장.hwp',
  },
  {
    label: '진료기록 열람 및 사본발급 동의서',
    icon: 'description',
    href: '/forms/medical-records-consent.hwp',
    downloadName: '진료기록_열람_사본발급_동의서.hwp',
  },
  {
    label: '진료기록 열람 및 사본발급 확인서',
    icon: 'description',
    href: '/forms/medical-records-confirmation.hwp',
    downloadName: '진료기록_열람_사본발급_확인서.hwp',
  },
];

export const medicalRecordsFaq: MedicalRecordsFaqItem[] = [
  {
    id: 'mr-faq-001',
    question: '차트 복사나 검사 결과, 영상 자료는 어떻게 발급받나요?',
    answer:
      '의무기록·영상발급 창구에 구비 서류를 제출하신 후 발급받으실 수 있습니다. 발급 범위와 수수료는 접수 시 안내해 드립니다.',
  },
  {
    id: 'mr-faq-002',
    question: '보험회사 제출용 서류는 무엇이 필요한가요?',
    answer:
      '보험회사·기관마다 필요 서류가 다릅니다. 가입하신 보험회사에 문의하신 후 발급을 신청해 주세요.',
  },
  {
    id: 'mr-faq-003',
    question: '수술 확인서는 어떻게 발급되나요?',
    answer:
      '별도 수술확인서 대신 수술 날짜·수술명·수술 내용이 기재된 수술기록지 사본으로 확인하실 수 있습니다.',
  },
  {
    id: 'mr-faq-004',
    question: '진단명이나 질병코드가 적힌 서류를 발급받고 싶어요.',
    answer:
      '진단서·소견서·입퇴원확인서는 진단명·질병코드가 기재되며, 의사 면담 후 원무과에서 발급합니다. 약 처방전에는 질병코드가 기재될 수 있습니다.',
  },
];

export const medicalRecordsContactInfo = {
  phone: '1588-5700',
  hours: '평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00',
};

export const relatedLinks = [
  { label: '진단서발급', href: '/documents/diagnosis', icon: 'medical_information' },
  { label: '비급여 진료비용', href: '/outpatient/fees', icon: 'payments' },
  { label: '오시는길', href: '/directions', icon: 'location_on' },
  { label: 'FAQ', href: '/faq', icon: 'help' },
];
