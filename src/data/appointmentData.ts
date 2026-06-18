export type Doctor = {
  id: string;
  name: string;
  title: string;
  specialty: string;
};

export const SPECIALTY_LABEL = '재활정형외과';

export const doctors: Doctor[] = [
  { id: 'kim', name: '김민수', title: '원장', specialty: '스포츠손상·관절재활' },
  { id: 'lee', name: '이서연', title: '과장', specialty: '척추·목재활' },
  { id: 'park', name: '박준호', title: '전문의', specialty: '어깨·무릎 재활' },
  { id: 'choi', name: '최지원', title: '전문의', specialty: '도수·운동치료' },
];

export const timeSlots = {
  morning: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  afternoon: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
};

export type AppointmentSlotStatus = 'available' | 'closed' | 'full';

const closedSlots: Record<string, string[]> = {
  kim: ['6'],
  lee: ['3'],
  park: ['8'],
  choi: [],
};

const fullSlots: Record<string, string[]> = {
  kim: ['9'],
  lee: [],
  park: ['5'],
  choi: ['7'],
};

export function getAppointmentSlotStatus(doctorId: string, dateIndex: number): AppointmentSlotStatus {
  if (closedSlots[doctorId]?.includes(String(dateIndex))) return 'closed';
  if (fullSlots[doctorId]?.includes(String(dateIndex))) return 'full';
  return 'available';
}

export function isSlotAvailable(doctorId: string, dateIndex: number): boolean {
  return getAppointmentSlotStatus(doctorId, dateIndex) === 'available';
}

export function getAllTimeSlots(): string[] {
  return [...timeSlots.morning, ...timeSlots.afternoon];
}

export function getCalendarDates(baseDate: Date, count = 14): Date[] {
  const dates: Date[] = [];
  const start = new Date(baseDate);
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < count; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    if (date.getDay() !== 0) dates.push(date);
  }

  return dates;
}

export function getInitialCalendarStart(): Date {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function formatDateLabel(date: Date): string {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}(${weekdays[date.getDay()]})`;
}

export function formatMonthYear(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
