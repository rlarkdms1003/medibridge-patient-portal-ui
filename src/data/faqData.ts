export type FaqCategory = 'reservation' | 'outpatient' | 'admission' | 'documents' | 'etc';

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const faqCategories: { id: 'all' | FaqCategory; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'reservation', label: '진료예약' },
  { id: 'outpatient', label: '외래진료' },
  { id: 'admission', label: '입·퇴원' },
  { id: 'documents', label: '증명서·발급' },
  { id: 'etc', label: '기타' },
];

export const faqCategoryLabel: Record<FaqCategory, string> = {
  reservation: '진료예약',
  outpatient: '외래진료',
  admission: '입·퇴원',
  documents: '증명서·발급',
  etc: '기타',
};

export const faqItems: FaqItem[] = [
  {
    id: 'faq-001',
    category: 'reservation',
    question: '인터넷 진료예약은 어떻게 하나요?',
    answer:
      '홈페이지 상단 [진료예약] > [인터넷 진료예약]에서 의료진·진료일·시간을 선택해 예약할 수 있습니다. 재진 환자 로그인 후 이용 가능하며, 24시간 예약이 가능합니다. 예약이 어려우신 경우 예약센터(1588-5700)로 문의해 주세요.',
  },
  {
    id: 'faq-002',
    category: 'reservation',
    question: '예약 취소는 언제까지 가능한가요?',
    answer:
      '인터넷 예약 취소는 진료일 전 자정(24:00)까지 가능합니다. 당일 취소나 긴급 변경이 필요하신 경우 예약센터(1588-5700)로 연락해 주시기 바랍니다. 예약 없이 미방문하실 경우 이후 예약 서비스 이용이 제한될 수 있습니다.',
  },
  {
    id: 'faq-003',
    category: 'reservation',
    question: '초진 환자도 이용할 수 있나요?',
    answer:
      '본 포털은 본원 재진 환자를 위한 서비스입니다. 초진·미등록 환자는 내원 후 환자 등록을 완료하신 뒤 휴대전화 인증과 생년월일로 로그인하여 이용해 주세요.',
  },
  {
    id: 'faq-004',
    category: 'reservation',
    question: '예약 확인은 어디서 하나요?',
    answer:
      '[진료예약] > [예약 확인 / 취소] 또는 마이페이지에서 예정·완료·취소된 예약 내역을 확인할 수 있습니다. 로그인 후 이용하시면 더 편리합니다.',
  },
  {
    id: 'faq-005',
    category: 'outpatient',
    question: '초진 환자는 어떻게 진료받나요?',
    answer:
      '신분증을 지참하고 내원하시면 접수가 가능합니다. 인터넷·전화 예약 후 내원하시거나, 방문 접수를 이용해 주세요. 자세한 사항은 예약안내를 참고하시거나 예약센터로 문의해 주세요.',
  },
  {
    id: 'faq-006',
    category: 'outpatient',
    question: '진료 당일 지참해야 할 서류가 있나요?',
    answer:
      '신분증, 진찰권(환자번호) 확인이 가능한 자료, 기존 검사 CD·의무기록 사본 등을 준비해 주세요. 재활치료·도수치료 예약이 있는 경우 운동복·수건을 지참하시면 편리합니다.',
  },
  {
    id: 'faq-007',
    category: 'outpatient',
    question: '외래 진료 시간은 어떻게 되나요?',
    answer:
      '평일 오전·오후 외래 진료를 운영하며, 토요일은 오전 진료만 시행합니다. 공휴일 진료는 병원 공지사항을 확인해 주세요. 정확한 진료 시간은 진료과·의료진별로 상이할 수 있습니다.',
  },
  {
    id: 'faq-008',
    category: 'admission',
    question: '입원 절차는 어떻게 되나요?',
    answer:
      '외래 진료 후 입원이 필요하다고 판단되면 담당 의료진이 입원 안내를 드립니다. 입원 예약·병실 배정 후 입원 수속 창구에서 등록 절차를 진행합니다. 입원 전 준비물·금식 여부 등은 입원 안내 코디네이터에게 별도 안내받으실 수 있습니다.',
  },
  {
    id: 'faq-009',
    category: 'admission',
    question: '퇴원 후 재활 치료는 외래에서 받을 수 있나요?',
    answer:
      '네, 퇴원 시 담당 의료진이 외래 재활 치료 계획을 안내해 드립니다. 재활정형외과 외래에서 도수·운동치료 등을 이어 받으실 수 있으며, 인터넷 예약 또는 전화 예약을 이용해 주세요.',
  },
  {
    id: 'faq-010',
    category: 'documents',
    question: '진단서·소견서는 어떻게 발급받나요?',
    answer:
      '외래 접수 창구 또는 증명서 발급 창구에서 신청하실 수 있습니다. 본인 확인 후 발급되며, 일부 서류는 의료진 작성·확인 시간이 필요해 당일 수령이 어려울 수 있습니다. [이용안내] > [신청/발급안내]에서 준비 서류·수수료를 확인해 주세요.',
  },
  {
    id: 'faq-011',
    category: 'documents',
    question: '의무기록(진료기록) 사본 발급은 어디서 하나요?',
    answer:
      '의무기록 사본은 환자 본인 또는 법정 대리인이 신청할 수 있습니다. 신분증·위임장(대리인 시)을 지참하시고 창구를 방문해 신청해 주세요. 발급 소요 기간은 신청 건수에 따라 3~7일 정도 소요될 수 있습니다.',
  },
  {
    id: 'faq-012',
    category: 'etc',
    question: '주차는 어떻게 이용하나요?',
    answer:
      '병원 지하·옥외 주차장을 이용하실 수 있습니다. 진료 접수 시 차량번호를 등록하시면 할인 혜택이 적용될 수 있습니다. 자세한 위치·요금은 [이용안내] > [오시는길]에서 확인해 주세요.',
  },
  {
    id: 'faq-013',
    category: 'etc',
    question: '병원 이용 중 불편·건의 사항은 어디에 말씀드리면 되나요?',
    answer:
      '고객상담실(02-2072-2002) 또는 원내 안내 데스크로 연락해 주시면 접수·처리해 드립니다. 진료·예약 관련 문의는 예약센터(1588-5700)를 이용해 주세요.',
  },
];

export const faqContactInfo = {
  reservationPhone: '1588-5700',
  hours: '평일 09:00 ~ 18:00 (토·공휴일 제외)',
};
