import { reservationStatusLabel, type Reservation } from '../data/reservationHistoryData';

type ReservationDetailModalProps = {
  reservation: Reservation;
  onClose: () => void;
};

export default function ReservationDetailModal({ reservation, onClose }: ReservationDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/50 px-margin-mobile py-8"
      role="presentation"
      onClick={onClose}
    >
      <div
        aria-labelledby="reservation-detail-title"
        aria-modal="true"
        className="w-full max-w-md border border-hairline bg-canvas-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.15)] md:p-8"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-headline-1 text-headline-1 text-ink-black" id="reservation-detail-title">
          예약 상세 정보
        </h2>
        <dl className="mt-6 space-y-4 border border-hairline bg-surface-container-low p-4 font-body-md text-body-md">
          <div>
            <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">예약번호</dt>
            <dd className="text-ink-black">{reservation.id}</dd>
          </div>
          <div>
            <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">예약 상태</dt>
            <dd className="text-ink-black">{reservationStatusLabel[reservation.status]}</dd>
          </div>
          <div>
            <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">의료진</dt>
            <dd className="text-ink-black">
              {reservation.doctorName} {reservation.doctorTitle}
            </dd>
          </div>
          <div>
            <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">전문 분야</dt>
            <dd className="text-ink-black">{reservation.specialty}</dd>
          </div>
          <div>
            <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">진료일시</dt>
            <dd className="text-ink-black">
              {reservation.date} {reservation.time}
            </dd>
          </div>
          <div>
            <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">예약 접수일</dt>
            <dd className="text-ink-black">{reservation.bookedAt}</dd>
          </div>
        </dl>
        <button
          className="mt-6 w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90"
          type="button"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}
