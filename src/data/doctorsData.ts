export type DoctorProfile = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  focus: string[];
  schedule: string;
};

export const departmentInfo = {
  name: '재활정형외과',
  description:
    'MediBridge 재활정형외과 의료진을 소개합니다.\n스포츠손상, 관절·척추 질환, 수술 후 재활까지 환자 맞춤형 진료와 체계적인 재활 프로그램을 제공합니다.',
  highlights: [
    '스포츠손상·관절 클리닉',
    '척추·목·어깨·무릎 재활',
    '도수·운동치료 연계 진료',
  ],
};

export const doctorProfiles: DoctorProfile[] = [
  {
    id: 'kim',
    name: '김민수',
    title: '원장',
    specialty: '스포츠손상·관절재활',
    focus: ['스포츠손상', '어깨·무릎·발목 재활', '수술 후 재활 계획'],
    schedule: '월·수·금 오전 / 화·목 오후',
  },
  {
    id: 'lee',
    name: '이서연',
    title: '과장',
    specialty: '척추·목재활',
    focus: ['목·허리 디스크', '척추측만·자세 이상', '만성 요통·목통'],
    schedule: '월·화·목 오전 / 수·금 오후',
  },
  {
    id: 'park',
    name: '박준호',
    title: '전문의',
    specialty: '어깨·무릎 재활',
    focus: ['회전근개 손상', '무릎 인대·연골 손상', '관절 가동범위 회복'],
    schedule: '화·수·금 오전 / 월·목 오후',
  },
  {
    id: 'choi',
    name: '최지원',
    title: '전문의',
    specialty: '도수·운동치료',
    focus: ['도수치료', '운동처방', '기능적 평가·재활'],
    schedule: '월·수·목 오전 / 화·금 오후',
  },
];

export const doctorsContact = {
  reservation: '1588-5700',
  hours: '평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00',
};
