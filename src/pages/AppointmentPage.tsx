import { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  SPECIALTY_LABEL,
  doctors,
  formatDate,
  formatDateLabel,
  formatMonthYear,
  getCalendarDates,
  getInitialCalendarStart,
  isSlotAvailable,
  isToday,
  timeSlots,
} from '../data/appointmentData';
import { useReservations } from '../contexts/ReservationsContext';
import { isTimeSlotTaken } from '../data/reservationHistoryData';

type TimePeriod = 'morning' | 'afternoon';

export default function AppointmentPage() {
  const { reservations, addReservation } = useReservations();
  const initialCalendarStart = useMemo(() => getInitialCalendarStart(), []);
  const [calendarStart, setCalendarStart] = useState(initialCalendarStart);
  const calendarDates = useMemo(() => getCalendarDates(calendarStart, 10), [calendarStart]);
  const isOnInitialCalendar =
    calendarStart.toDateString() === initialCalendarStart.toDateString();
  const [doctorId, setDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('morning');
  const [selectedTime, setSelectedTime] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);

  const handleSlotSelect = (nextDoctorId: string, date: Date, dateIndex: number) => {
    if (!isSlotAvailable(nextDoctorId, dateIndex)) return;

    setDoctorId(nextDoctorId);
    setSelectedDate(date);
    setSelectedTime('');
    setIsConfirmModalOpen(false);
    setIsBookingComplete(false);
  };

  const handleDoctorSelect = (nextDoctorId: string) => {
    setDoctorId(nextDoctorId);
    setSelectedDate(null);
    setSelectedTime('');
    setIsConfirmModalOpen(false);
    setIsBookingComplete(false);
  };

  const shiftCalendar = (direction: -1 | 1) => {
    const next = new Date(calendarStart);
    next.setDate(calendarStart.getDate() + direction * 7);
    setCalendarStart(next);
    setSelectedDate(null);
    setSelectedTime('');
    setIsConfirmModalOpen(false);
    setIsBookingComplete(false);
  };

  const resetCalendarToToday = () => {
    setCalendarStart(new Date(initialCalendarStart));
    setSelectedDate(null);
    setSelectedTime('');
    setIsConfirmModalOpen(false);
    setIsBookingComplete(false);
  };

  const handleOpenConfirmModal = () => {
    if (!canSubmitBooking) return;
    setIsBookingComplete(false);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    if (isBookingComplete) {
      setSelectedTime('');
    }
    setIsConfirmModalOpen(false);
    setIsBookingComplete(false);
  };

  const handleSubmitBooking = () => {
    if (!canConfirm || !selectedDoctor || !selectedDate || !selectedTime) return;

    const dateLabel = formatDate(selectedDate);
    if (isTimeSlotTaken(reservations, selectedDoctor.name, dateLabel, selectedTime)) {
      return;
    }

    addReservation({
      department: SPECIALTY_LABEL,
      doctorName: selectedDoctor.name,
      doctorTitle: selectedDoctor.title,
      specialty: selectedDoctor.specialty,
      date: formatDate(selectedDate),
      time: selectedTime,
    });
    setIsBookingComplete(true);
  };

  useEffect(() => {
    if (!isConfirmModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleCloseConfirmModal();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isConfirmModalOpen]);

  const canConfirm = Boolean(doctorId && selectedDate && selectedTime);

  const formattedSelectedDate = selectedDate ? formatDate(selectedDate) : '';

  const isSelectedTimeTaken =
    Boolean(selectedDoctor && formattedSelectedDate && selectedTime) &&
    isTimeSlotTaken(reservations, selectedDoctor!.name, formattedSelectedDate, selectedTime);

  const canSubmitBooking = canConfirm && !isSelectedTimeTaken;

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">인터넷 진료예약</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              아래 표에서 의료진과 진료 일정을 선택한 후, 진료 시간을 선택해 주세요.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[2.2fr_1fr]">
            <div className="min-w-0 space-y-gutter">
              <section className="border border-hairline bg-canvas-white p-6 md:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-headline-2 text-headline-2 text-ink-black">의료진 · 진료일정 선택</h2>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="이전 주"
                      className="flex h-9 w-9 items-center justify-center border border-hairline transition-colors hover:border-primary"
                      type="button"
                      onClick={() => shiftCalendar(-1)}
                    >
                      <Icon name="chevron_left" />
                    </button>
                    <span className="min-w-[120px] text-center font-body-md text-body-md text-ink-black">
                      {formatMonthYear(calendarDates[0] ?? calendarStart)}
                    </span>
                    <button
                      aria-label="다음 주"
                      className="flex h-9 w-9 items-center justify-center border border-hairline transition-colors hover:border-primary"
                      type="button"
                      onClick={() => shiftCalendar(1)}
                    >
                      <Icon name="chevron_right" />
                    </button>
                    <button
                      aria-label="현재 날짜로 이동"
                      className="border border-hairline px-3 py-2 font-body-sm text-body-sm text-ink-black transition-colors hover:border-primary disabled:cursor-not-allowed disabled:text-ink-muted disabled:hover:border-hairline"
                      disabled={isOnInitialCalendar}
                      type="button"
                      onClick={resetCalendarToToday}
                    >
                      오늘
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse">
                    <colgroup>
                      <col className="w-[15%]" />
                      {calendarDates.map((date) => (
                        <col key={date.toISOString()} />
                      ))}
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="sticky left-0 z-10 border border-hairline bg-surface-container-low px-2 py-2 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          의료진
                        </th>
                        {calendarDates.map((date) => {
                          const todayColumn = isToday(date);

                          return (
                            <th
                              key={date.toISOString()}
                              className={`border px-1 py-2 text-center font-body-sm text-body-sm font-semibold ${
                                todayColumn
                                  ? 'border-primary bg-primary text-on-primary'
                                  : 'border-hairline bg-surface-container-low text-ink-black'
                              }`}
                            >
                              {formatDateLabel(date)}
                              {todayColumn && (
                                <span className="mt-0.5 block font-eyebrow text-eyebrow text-primary-fixed-dim">
                                  오늘
                                </span>
                              )}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {doctors.map((doctor) => {
                        const isDoctorSelected = doctorId === doctor.id;

                        return (
                          <tr key={doctor.id}>
                            <td className="sticky left-0 z-10 border border-hairline bg-canvas-white px-2 py-2">
                              <button
                                className={`w-full text-left transition-colors ${
                                  isDoctorSelected ? 'text-primary' : 'text-ink-black hover:text-primary'
                                }`}
                                type="button"
                                onClick={() => handleDoctorSelect(doctor.id)}
                              >
                                <span className="block font-body-sm text-body-sm font-semibold leading-tight">
                                  {doctor.name}{' '}
                                  <span className="font-normal text-ink-secondary">{doctor.title}</span>
                                </span>
                                <span className="mt-0.5 block truncate font-body-sm text-body-sm text-ink-muted">
                                  {doctor.specialty}
                                </span>
                              </button>
                            </td>
                            {calendarDates.map((date, dateIndex) => {
                              const available = isSlotAvailable(doctor.id, dateIndex);
                              const isSelected =
                                doctorId === doctor.id &&
                                selectedDate?.toDateString() === date.toDateString();

                              return (
                                <td
                                  key={date.toISOString()}
                                  className="relative min-h-10 border border-hairline p-0 text-center"
                                >
                                  <button
                                    aria-label={
                                      available
                                        ? `${doctor.name} ${formatDateLabel(date)} 예약`
                                        : `${doctor.name} ${formatDateLabel(date)} 휴진`
                                    }
                                    className={`absolute inset-0 flex items-center justify-center transition-colors ${
                                      !available
                                        ? 'cursor-not-allowed bg-surface-container text-ink-muted'
                                        : isSelected
                                          ? 'bg-primary text-on-primary'
                                          : 'bg-canvas-white hover:bg-primary-fixed'
                                    }`}
                                    disabled={!available}
                                    type="button"
                                    onClick={() => handleSlotSelect(doctor.id, date, dateIndex)}
                                  >
                                    {!available && (
                                      <span className="font-body-sm text-body-sm">휴진</span>
                                    )}
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 font-body-sm text-body-sm text-ink-secondary">
                  의료진 이름을 클릭하거나, 예약 가능한 일정을 클릭하여 의료진과 날짜를 함께 선택할 수
                  있습니다.
                </p>
              </section>

              <section className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">진료시간 선택</h2>
                {doctorId && selectedDate ? (
                  <>
                    <p className="mb-4 font-body-md text-body-md text-ink-secondary">
                      <strong className="text-ink-black">{selectedDoctor?.name}</strong> ·{' '}
                      {formatDate(selectedDate)} 진료 가능 시간
                    </p>
                    <div className="mb-4 flex gap-2">
                      {(['morning', 'afternoon'] as TimePeriod[]).map((period) => (
                        <button
                          key={period}
                          className={`border px-4 py-2 font-body-sm text-body-sm transition-colors ${
                            timePeriod === period
                              ? 'border-primary bg-primary text-on-primary'
                              : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'
                          }`}
                          type="button"
                          onClick={() => setTimePeriod(period)}
                        >
                          {period === 'morning' ? '오전' : '오후'}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {timeSlots[timePeriod].map((time) => {
                        const isTaken =
                          selectedDoctor &&
                          isTimeSlotTaken(
                            reservations,
                            selectedDoctor.name,
                            formattedSelectedDate,
                            time,
                          );

                        return (
                          <button
                            key={time}
                            aria-label={
                              isTaken
                                ? `${time} 선택 불가`
                                : `${time} 선택`
                            }
                            className={`border px-3 py-3 font-body-md text-body-md transition-colors ${
                              isTaken
                                ? 'cursor-not-allowed border-hairline bg-surface-container text-ink-muted'
                                : selectedTime === time
                                  ? 'border-primary bg-primary text-on-primary'
                                  : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'
                            }`}
                            disabled={isTaken}
                            type="button"
                            onClick={() => {
                              if (isTaken) return;
                              setSelectedTime(time);
                              setIsConfirmModalOpen(false);
                              setIsBookingComplete(false);
                            }}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="font-body-md text-body-md text-ink-secondary">
                    위 표에서 의료진과 진료일을 먼저 선택해주세요.
                  </p>
                )}
              </section>
            </div>

            <aside className="h-fit border border-hairline bg-canvas-white p-6 md:p-8 lg:sticky lg:top-28">
              <h2 className="mb-6 font-headline-2 text-headline-2 text-ink-black">예약 정보</h2>
              <dl className="space-y-4 font-body-md text-body-md">
                <div>
                  <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">진료과</dt>
                  <dd className="text-ink-black">{SPECIALTY_LABEL}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">의료진</dt>
                  <dd className="text-ink-black">
                    {selectedDoctor ? `${selectedDoctor.name} ${selectedDoctor.title}` : '-'}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">진료일</dt>
                  <dd className="text-ink-black">{selectedDate ? formatDate(selectedDate) : '-'}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">진료시간</dt>
                  <dd className="text-ink-black">{selectedTime || '-'}</dd>
                </div>
              </dl>

              <button
                className="mt-6 w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!canSubmitBooking}
                type="button"
                onClick={handleOpenConfirmModal}
              >
                예약 확정하기
              </button>

              <div className="mt-6 border-t border-hairline pt-6">
                <h3 className="mb-3 flex items-center gap-2 font-body-sm text-body-sm font-semibold text-ink-black">
                  <Icon className="text-primary" name="info" />
                  예약 안내
                </h3>
                <ul className="space-y-2 font-body-sm text-body-sm text-ink-secondary">
                  <li>· 인터넷 예약은 24시간 이용 가능합니다.</li>
                  <li>· 예약 취소는 진료일 전 자정(12시)까지 가능합니다.</li>
                  <li>· 예약 변경 없이 미방문 시 서비스 이용이 제한될 수 있습니다.</li>
                  <li>· 문의: 예약센터 1588-5700</li>
                </ul>
              </div>
            </aside>
          </div>
        </PageContainer>
      </PageMain>
      <Footer />

      {isConfirmModalOpen && canSubmitBooking && selectedDoctor && selectedDate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/50 px-margin-mobile py-8"
          role="presentation"
          onClick={handleCloseConfirmModal}
        >
          <div
            aria-labelledby="appointment-confirm-title"
            aria-modal="true"
            className="w-full max-w-md border border-hairline bg-canvas-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.15)] md:p-8"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            {isBookingComplete ? (
              <>
                <div className="mb-6 text-center">
                  <Icon className="mb-4 text-5xl text-primary" name="check_circle" />
                  <h2
                    className="font-headline-1 text-headline-1 text-ink-black"
                    id="appointment-confirm-title"
                  >
                    예약이 완료되었습니다
                  </h2>
                  <p className="mt-3 font-body-md text-body-md text-ink-secondary">
                    선택하신 일정으로 진료 예약이 접수되었습니다.
                  </p>
                </div>
                <dl className="mb-8 space-y-3 border border-hairline bg-surface-container-low p-4 font-body-md text-body-md">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-secondary">진료과</dt>
                    <dd className="text-right text-ink-black">{SPECIALTY_LABEL}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-secondary">의료진</dt>
                    <dd className="text-right text-ink-black">
                      {selectedDoctor.name} {selectedDoctor.title}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-secondary">진료일</dt>
                    <dd className="text-right text-ink-black">{formatDate(selectedDate)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-secondary">진료시간</dt>
                    <dd className="text-right text-ink-black">{selectedTime}</dd>
                  </div>
                </dl>
                <button
                  className="w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90"
                  type="button"
                  onClick={handleCloseConfirmModal}
                >
                  확인
                </button>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h2
                    className="font-headline-1 text-headline-1 text-ink-black"
                    id="appointment-confirm-title"
                  >
                    예약 정보 확인
                  </h2>
                  <p className="mt-3 font-body-md text-body-md text-ink-secondary">
                    아래 예약 정보를 확인하신 후 확정해 주세요.
                  </p>
                </div>

                <dl className="mb-8 space-y-4 border border-hairline bg-surface-container-low p-4 font-body-md text-body-md">
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">진료과</dt>
                    <dd className="text-ink-black">{SPECIALTY_LABEL}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">의료진</dt>
                    <dd className="text-ink-black">
                      {selectedDoctor.name} {selectedDoctor.title}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">전문 분야</dt>
                    <dd className="text-ink-black">{selectedDoctor.specialty}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">진료일</dt>
                    <dd className="text-ink-black">{formatDateLabel(selectedDate)}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">진료시간</dt>
                    <dd className="text-ink-black">{selectedTime}</dd>
                  </div>
                </dl>

                <div className="flex gap-3">
                  <button
                    className="flex-1 border border-hairline px-6 py-4 font-button text-button text-ink-black transition-colors hover:border-primary"
                    type="button"
                    onClick={handleCloseConfirmModal}
                  >
                    취소
                  </button>
                  <button
                    className="flex-1 bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80"
                    type="button"
                    onClick={handleSubmitBooking}
                  >
                    예약 확정
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
