export type ReservationStatus = 'scheduled' | 'completed' | 'cancelled';

export type Reservation = {
  id: string;
  department: string;
  doctorName: string;
  doctorTitle: string;
  specialty: string;
  date: string;
  time: string;
  status: ReservationStatus;
  bookedAt: string;
  canCancel: boolean;
};

function formatOffsetDate(dayOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

function formatBookedAt(dayOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export const initialReservations: Reservation[] = [
  {
    id: 'rsv-001',
    department: '재활정형외과',
    doctorName: '김민수',
    doctorTitle: '원장',
    specialty: '스포츠손상·관절재활',
    date: formatOffsetDate(3),
    time: '10:00',
    status: 'scheduled',
    bookedAt: formatBookedAt(-2),
    canCancel: true,
  },
  {
    id: 'rsv-002',
    department: '재활정형외과',
    doctorName: '이서연',
    doctorTitle: '과장',
    specialty: '척추·목재활',
    date: formatOffsetDate(7),
    time: '14:30',
    status: 'scheduled',
    bookedAt: formatBookedAt(-1),
    canCancel: true,
  },
  {
    id: 'rsv-003',
    department: '재활정형외과',
    doctorName: '박준호',
    doctorTitle: '전문의',
    specialty: '어깨·무릎 재활',
    date: formatOffsetDate(-5),
    time: '09:30',
    status: 'completed',
    bookedAt: formatBookedAt(-12),
    canCancel: false,
  },
  {
    id: 'rsv-004',
    department: '재활정형외과',
    doctorName: '최지원',
    doctorTitle: '전문의',
    specialty: '도수·운동치료',
    date: formatOffsetDate(-14),
    time: '11:00',
    status: 'cancelled',
    bookedAt: formatBookedAt(-20),
    canCancel: false,
  },
];

export const reservationStatusLabel: Record<ReservationStatus, string> = {
  scheduled: '예약완료',
  completed: '진료완료',
  cancelled: '예약취소',
};

export type ReservationTab = 'scheduled' | 'completed' | 'cancelled';

export const reservationTabs: { id: ReservationTab; label: string }[] = [
  { id: 'scheduled', label: '예정 예약' },
  { id: 'completed', label: '지난 예약' },
  { id: 'cancelled', label: '취소 내역' },
];
