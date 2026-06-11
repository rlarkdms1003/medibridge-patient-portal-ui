import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import ReservationDetailModal from '../components/ReservationDetailModal';
import {
  reservationStatusLabel,
  reservationTabs,
  type Reservation,
  type ReservationTab,
} from '../data/reservationHistoryData';
import { useReservations } from '../contexts/ReservationsContext';

export default function ReservationConfirmPage() {
  const { reservations, cancelReservation } = useReservations();
  const [activeTab, setActiveTab] = useState<ReservationTab>('scheduled');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelComplete, setIsCancelComplete] = useState(false);

  const filteredReservations = useMemo(
    () => reservations.filter((reservation) => reservation.status === activeTab),
    [activeTab, reservations],
  );

  const tabCounts = useMemo(
    () =>
      reservationTabs.reduce(
        (counts, tab) => {
          counts[tab.id] = reservations.filter((reservation) => reservation.status === tab.id).length;
          return counts;
        },
        {} as Record<ReservationTab, number>,
      ),
    [reservations],
  );

  const openDetailModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReservation(null);
  };

  const openCancelModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsCancelComplete(false);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setIsCancelComplete(false);
    setSelectedReservation(null);
  };

  const handleCancelReservation = () => {
    if (!selectedReservation) return;

    cancelReservation(selectedReservation.id);
    setIsCancelComplete(true);
  };

  useEffect(() => {
    const isModalOpen = isDetailModalOpen || isCancelModalOpen;
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isCancelModalOpen) closeCancelModal();
        else closeDetailModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCancelModalOpen, isDetailModalOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">예약확인/취소</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              예약하신 진료 일정을 확인하고, 필요 시 예약을 취소할 수 있습니다.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <section className="border border-hairline bg-canvas-white p-6 md:p-8">
                <div className="mb-6 flex flex-wrap gap-2 border-b border-hairline">
                  {reservationTabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`-mb-px border-b-2 px-4 py-3 font-body-md text-body-md transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-ink-secondary hover:text-ink-black'
                      }`}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                      <span className="ml-2 font-body-sm text-body-sm text-ink-muted">({tabCounts[tab.id]})</span>
                    </button>
                  ))}
                </div>

                {filteredReservations.length > 0 ? (
                  <>
                  <div className="space-y-4 md:hidden">
                    {filteredReservations.map((reservation) => (
                      <article
                        key={reservation.id}
                        className="border border-hairline p-5 transition-colors hover:border-primary/60"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-block px-2 py-1 font-eyebrow text-eyebrow ${
                                  reservation.status === 'scheduled'
                                    ? 'bg-primary text-on-primary'
                                    : reservation.status === 'completed'
                                      ? 'bg-surface-container-high text-ink-secondary'
                                      : 'bg-surface-container text-ink-muted'
                                }`}
                              >
                                {reservationStatusLabel[reservation.status]}
                              </span>
                              <span className="font-body-sm text-body-sm text-ink-muted">
                                예약번호 {reservation.id}
                              </span>
                            </div>
                            <p className="font-headline-2 text-headline-2 text-ink-black">
                              {reservation.date} {reservation.time}
                            </p>
                            <p className="mt-2 font-body-md text-body-md text-ink-black">
                              {reservation.doctorName} {reservation.doctorTitle} · {reservation.department}
                            </p>
                            <p className="mt-1 font-body-sm text-body-sm text-ink-secondary">
                              {reservation.specialty}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <button
                              className="border border-hairline px-4 py-2 font-body-sm text-body-sm text-ink-black transition-colors hover:border-primary"
                              type="button"
                              onClick={() => openDetailModal(reservation)}
                            >
                              상세보기
                            </button>
                            {reservation.status === 'scheduled' && reservation.canCancel && (
                              <button
                                className="border border-hairline px-4 py-2 font-body-sm text-body-sm text-error transition-colors hover:border-error"
                                type="button"
                                onClick={() => openCancelModal(reservation)}
                              >
                                예약취소
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[720px] border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low">
                          <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                            진료일시
                          </th>
                          <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                            진료과
                          </th>
                          <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                            의료진
                          </th>
                          <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                            상태
                          </th>
                          <th className="border-b border-hairline px-4 py-3 text-center font-body-sm text-body-sm font-semibold text-ink-black">
                            관리
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReservations.map((reservation) => (
                          <tr key={`table-${reservation.id}`} className="hover:bg-surface-container-low/60">
                            <td className="border-b border-hairline px-4 py-4 font-body-md text-body-md text-ink-black">
                              {reservation.date}
                              <span className="ml-2 text-ink-secondary">{reservation.time}</span>
                            </td>
                            <td className="border-b border-hairline px-4 py-4 font-body-md text-body-md text-ink-black">
                              {reservation.department}
                            </td>
                            <td className="border-b border-hairline px-4 py-4 font-body-md text-body-md text-ink-black">
                              {reservation.doctorName} {reservation.doctorTitle}
                            </td>
                            <td className="border-b border-hairline px-4 py-4 font-body-sm text-body-sm text-ink-secondary">
                              {reservationStatusLabel[reservation.status]}
                            </td>
                            <td className="border-b border-hairline px-4 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  className="font-body-sm text-body-sm text-primary hover:underline"
                                  type="button"
                                  onClick={() => openDetailModal(reservation)}
                                >
                                  상세
                                </button>
                                {reservation.status === 'scheduled' && reservation.canCancel && (
                                  <button
                                    className="font-body-sm text-body-sm text-error hover:underline"
                                    type="button"
                                    onClick={() => openCancelModal(reservation)}
                                  >
                                    취소
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  </>
                ) : (
                  <div className="py-16 text-center">
                    <Icon className="mb-4 text-5xl text-ink-muted" name="event_busy" />
                    <p className="font-body-md text-body-md text-ink-secondary">
                      {activeTab === 'scheduled' && '예정된 예약 내역이 없습니다.'}
                      {activeTab === 'completed' && '지난 예약 내역이 없습니다.'}
                      {activeTab === 'cancelled' && '취소된 예약 내역이 없습니다.'}
                    </p>
                    {activeTab === 'scheduled' && (
                      <Link
                        className="mt-4 inline-block font-body-md text-body-md text-primary hover:underline"
                        to="/reservation"
                      >
                        인터넷 진료예약 바로가기
                      </Link>
                    )}
                  </div>
                )}
              </section>
            </div>

            <aside className="h-fit space-y-gutter lg:sticky lg:top-28">
              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">예약 취소 안내</h2>
                <ul className="space-y-3 font-body-sm text-body-sm text-ink-secondary">
                  <li>· 인터넷 예약 취소는 진료일 전 자정(12시)까지 가능합니다.</li>
                  <li>· 검사가 함께 예약된 경우 인터넷 취소가 제한될 수 있습니다.</li>
                  <li>· 예약 변경 없이 미방문 시 예약 서비스 이용이 제한될 수 있습니다.</li>
                  <li>· 긴급 변경·취소는 예약센터(1588-5700)로 문의해 주세요.</li>
                </ul>
              </div>

              <Link
                className="flex items-center justify-between border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:border-primary md:px-6 md:py-4"
                to="/reservation"
              >
                인터넷 진료예약
                <Icon className="text-primary" name="chevron_right" />
              </Link>
            </aside>
          </div>
        </PageContainer>
      </PageMain>
      <Footer />

      {isDetailModalOpen && selectedReservation && (
        <ReservationDetailModal reservation={selectedReservation} onClose={closeDetailModal} />
      )}

      {isCancelModalOpen && selectedReservation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/50 px-margin-mobile py-8"
          role="presentation"
          onClick={closeCancelModal}
        >
          <div
            aria-labelledby="reservation-cancel-title"
            aria-modal="true"
            className="w-full max-w-md border border-hairline bg-canvas-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.15)] md:p-8"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            {isCancelComplete ? (
              <>
                <div className="text-center">
                  <Icon className="mb-4 text-5xl text-primary" name="check_circle" />
                  <h2 className="font-headline-1 text-headline-1 text-ink-black" id="reservation-cancel-title">
                    예약이 취소되었습니다
                  </h2>
                  <p className="mt-3 font-body-md text-body-md text-ink-secondary">
                    {selectedReservation.date} {selectedReservation.time} 예약이 정상적으로 취소되었습니다.
                  </p>
                </div>
                <button
                  className="mt-8 w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90"
                  type="button"
                  onClick={closeCancelModal}
                >
                  확인
                </button>
              </>
            ) : (
              <>
                <h2 className="font-headline-1 text-headline-1 text-ink-black" id="reservation-cancel-title">
                  예약 취소 확인
                </h2>
                <p className="mt-3 font-body-md text-body-md text-ink-secondary">
                  아래 예약을 취소하시겠습니까? 취소 후에는 동일 시간대 예약이 제한될 수 있습니다.
                </p>
                <dl className="mt-6 space-y-3 border border-hairline bg-surface-container-low p-4 font-body-md text-body-md">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-secondary">진료일시</dt>
                    <dd className="text-right text-ink-black">
                      {selectedReservation.date} {selectedReservation.time}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-secondary">의료진</dt>
                    <dd className="text-right text-ink-black">
                      {selectedReservation.doctorName} {selectedReservation.doctorTitle}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-secondary">진료과</dt>
                    <dd className="text-right text-ink-black">{selectedReservation.department}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex gap-3">
                  <button
                    className="flex-1 border border-hairline px-6 py-4 font-button text-button text-ink-black transition-colors hover:border-primary"
                    type="button"
                    onClick={closeCancelModal}
                  >
                    닫기
                  </button>
                  <button
                    className="flex-1 bg-error px-6 py-4 font-button text-button text-on-error transition-opacity hover:opacity-90"
                    type="button"
                    onClick={handleCancelReservation}
                  >
                    예약 취소
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
