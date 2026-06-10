export type ProcedureStep = {
  order: number;
  text: string;
};

export type CertificateRow = {
  type: string;
  note: string;
  method: string;
};

export type RequiredDocumentRow = {
  visitor: string;
  documents: string[];
};

export type ImpossibleConsentRow = {
  case: string;
  documents: string[];
};

export const outpatientSteps: ProcedureStep[] = [
  {
    order: 1,
    text: '외래진료를 예약하여 진료 시 담당의사에게 진단서 발급을 요청합니다.',
  },
  {
    order: 2,
    text: '진료 후 수납 시 진단서를 발급받습니다.',
  },
];

export const inpatientSteps: ProcedureStep[] = [
  {
    order: 1,
    text: '담당 주치의에게 진단서 발급을 요청합니다.',
  },
  {
    order: 2,
    text: '진단서를 받아 원무과(1층 입·퇴원 수속창구)에서 직인을 받습니다.',
  },
];

export const procedureNotes = [
  '퇴원 후에는 외래 진료 시 진료의사에게 진단서 발급을 요청해서 발급받습니다.',
  '본인이 아닌 경우(가족이나 타인 방문 시)에는 발급이 불가할 수 있으니, 진료 예약 시 직원에게 발급 가능 여부와 필요한 구비 서류를 확인 후 내원하시기 바랍니다.',
];

export const kioskLocations = [
  '1층 공용 원무창구 앞',
  '1층 재활정형외과 원무창구 옆',
  '2층 공용 원무창구 앞',
];

export const otherCertificateNotes = {
  visit: '병원 방문 시 무인발급기에서 발급',
  internet:
    '증명서발급 홈페이지에서 로그인 후 발급 (진료비 계산서·영수증, 입·퇴원 확인서, 진료 사실 확인서 등)',
  severeIllness:
    '본원에서 최초로 중증 또는 산정특례 등록을 하신 경우 발급이 가능합니다. 외부 병원에서 최초 등록하신 경우 해당 병원 또는 본원 해당 진료과에 요청 후 담당 의사가 작성하여 발급합니다.',
  receiptReissue:
    '입·퇴원 진료비 계산서·영수증 재발급: 2층 원무과(입원원무) / 1층·2층 무인발급기. 진료비 상세(세부) 내역서 재발급: 2층 원무과(입원원무) 사무실',
};

export const otherCertificates: CertificateRow[] = [
  {
    type: '진료 사실 확인서',
    note: '통원 일자만 기재되어 있음',
    method: '무인발급기 · 인터넷',
  },
  {
    type: '입·퇴원사실 확인서',
    note: '입원 기간만 기재되어 있음',
    method: '무인발급기 · 인터넷',
  },
  {
    type: '연말정산용 장애인증명서',
    note: '연말정산용',
    method: '무인발급기 · 인터넷',
  },
  {
    type: '진료비 납입 확인서',
    note: '연말정산 겸용',
    method: '무인발급기 · 인터넷',
  },
  {
    type: '진료비 계산서·영수증 재발급 및 상세(세부) 내역서',
    note: '재발급·상세내역',
    method: '무인발급기 · 원무과',
  },
];

export const counterLocations = {
  outpatient: ['1층 제증명 창구', '2층 외래 제증명 창구'],
  inpatient: ['2층 입·퇴원 수속·제증명 창구'],
};

export const counterHours = [
  {
    title: '외래 환자 (1층·2층 제증명 창구)',
    hours: ['평일 08:30 – 18:00 (공휴일 제외)', '토요일 09:00 – 13:00 (공휴일 제외)'],
  },
  {
    title: '입원 환자 (2층 입·퇴원 수속·제증명 창구)',
    hours: [
      '평일 09:00 – 18:00',
      '주말 및 공휴일 09:00 – 13:00 (설·추석 당일 등 일부 휴무)',
    ],
  },
];

export const consentPossibleDocuments: RequiredDocumentRow[] = [
  {
    visitor: '본인',
    documents: ['본인 신분증'],
  },
  {
    visitor: '배우자 및 직계 가족',
    documents: [
      '환자 신분증 사본',
      '친족 관계임을 확인할 수 있는 서류 (가족관계증명서, 주민등록등본 등)',
      '환자가 자필 서명한 동의서',
      '방문자 신분증',
    ],
  },
  {
    visitor: '환자가 지정하는 대리인 (형제, 자매, 자부, 사위, 보험회사 직원 등)',
    documents: [
      '환자 신분증 사본',
      '환자가 자필 서명한 동의서',
      '환자가 자필 서명한 위임장',
      '방문자 신분증',
    ],
  },
  {
    visitor: '환자가 14세 미만인 경우',
    documents: [
      '방문자 신분증',
      '환자의 부모(법정 대리인) 신분증 사본',
      '친족 관계임을 확인할 수 있는 서류 (가족관계증명서, 주민등록등본 등)',
      '부모(법정 대리인)가 서명한 동의서',
      '부모(법정 대리인)가 서명한 위임장',
    ],
  },
];

export const consentImpossibleDocuments: ImpossibleConsentRow[] = [
  {
    case: '환자가 사망한 경우',
    documents: [
      '방문자 신분증',
      '친족 관계임을 확인할 수 있는 서류 (가족관계증명서, 주민등록등본 등)',
      '사망 사실을 확인할 수 있는 서류 (가족관계증명서, 제적등본, 사망진단서 등)',
    ],
  },
  {
    case: '환자가 자필 서명을 할 수 없는 경우 (의식불명, 중증 질환 및 부상)',
    documents: [
      '방문자 신분증',
      '친족 관계임을 확인할 수 있는 서류 (가족관계증명서, 주민등록등본 등)',
      '환자가 자필 서명할 수 없음을 확인할 수 있는 진단서',
    ],
  },
  {
    case: '환자가 행방불명인 경우',
    documents: [
      '방문자 신분증',
      '친족 관계임을 확인할 수 있는 서류 (가족관계증명서, 주민등록등본 등)',
      '행방불명 사실을 확인할 수 있는 서류 (주민등록표 등본, 법원의 실종선고 결정문 사본 등)',
    ],
  },
  {
    case: '환자가 의사무능력자인 경우',
    documents: [
      '방문자 신분증',
      '친족 관계임을 확인할 수 있는 서류 (가족관계증명서, 주민등록등본 등)',
      '법원의 금치산 선고 결정문 사본 또는 의사무능력자임을 증명하는 정신과 전문의의 진단서',
    ],
  },
];

export const consentImpossibleNote =
  '환자의 동의가 불가능한 경우에는 직계 가족만 신청이 가능합니다. 배우자 및 직계 존속·비속, 배우자의 직계 존속이 모두 없는 경우에는 형제·자매가 신청 가능하며, 상황을 인식할 수 있는 자료(제적등본 등)를 함께 제출하여야 합니다. (관련 근거: 의료법 제21조)';

export const cautions = [
  '의료법 제21조와 의료법 시행규칙 제13조의3에 의거하여 구비 서류를 확인하고 있습니다.',
  '진단서 재발급은 발급일로부터 3년 이내의 서류만 가능합니다. (의료법 시행규칙 제15조)',
  '예외로 「채용신체검사서」의 재발급은 발급일로부터 1년 이내만 가능하며, 본인 방문 시에만 재발급이 가능합니다.',
  '제증명 서류 발급 유무는 개인정보보호법에 의해 유선으로 확인하실 수 없습니다.',
];

export const nonReissuableDocuments = [
  '장기요양의사소견서',
  '방문간호지시서',
  '장애진단서(주민센터 제출용)',
  '국민연금·공무원연금·사학연금 장애심사용 진단서',
  '근로능력평가용 진단서',
  '산재서류',
  '외부 양식의 서류 등',
];

export const nonReissuableNote =
  '재발급이 불가능한 서류가 다시 필요하신 경우에는 진료 예약을 하시어 진료 시 서류를 새로 작성받아 발급받으시면 됩니다.';

export const formDownloads = [
  { label: '동의서 양식', icon: 'description' as const },
  { label: '위임장 양식', icon: 'assignment' as const },
  { label: '확인서 양식', icon: 'fact_check' as const },
];

export const certificateContacts = {
  reservation: '1588-5700',
  outpatient: '02-2072-2071 (외래 제증명 창구)',
  outpatientAlt: '02-2072-1341 (1층 제증명 창구)',
  inpatient: '02-2072-2272 (입·퇴원 수속·제증명 창구)',
};
