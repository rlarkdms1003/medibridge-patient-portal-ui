import { useEffect, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import ReservationDetailModal from '../components/ReservationDetailModal';
import { useAuth } from '../contexts/AuthContext';
import { useReservations } from '../contexts/ReservationsContext';
import {
  medicalHistory,
  mypageMenus,
  mypageQuickLinks,
  type MyPageTab,
} from '../data/mypageData';
import {
  reservationStatusLabel,
  sortScheduledReservations,
  type Reservation,
} from '../data/reservationHistoryData';

function maskPatientNumber(value?: string) {
  if (!value) return '-';
  if (value.length <= 4) return value;
  return `${value.slice(0, 2)}${'*'.repeat(value.length - 4)}${value.slice(-2)}`;
}

function maskPhone(value?: string) {
  if (!value) return '-';
  const parts = value.replace(/[^\d]/g, '');
  if (parts.length < 8) return value;
  return `${parts.slice(0, 3)}-****-${parts.slice(-4)}`;
}

function ReservationRow({
  reservation,
  onDetailClick,
}: {
  reservation: Reservation;
  onDetailClick: (reservation: Reservation) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border border-hairline bg-canvas-white p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
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
          <span className="font-body-sm text-body-sm text-ink-muted">예약번호 {reservation.id}</span>
        </div>
        <p className="font-body-md text-body-md font-semibold text-ink-black">
          {reservation.date} {reservation.time}
        </p>
        <p className="mt-1 font-body-sm text-body-sm text-ink-secondary">
          {reservation.department} · {reservation.doctorName} {reservation.doctorTitle}
        </p>
      </div>
      {reservation.status === 'scheduled' && (
        <button
          className="inline-flex items-center gap-1 font-body-sm text-body-sm text-primary hover:underline"
          type="button"
          onClick={() => onDetailClick(reservation)}
        >
          상세보기
          <Icon className="text-base" name="chevron_right" />
        </button>
      )}
    </div>
  );
}

function HomeSection({
  upcomingReservations,
  userName,
  onDetailClick,
}: {
  upcomingReservations: Reservation[];
  userName: string;
  onDetailClick: (reservation: Reservation) => void;
}) {
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const hasMoreUpcoming = upcomingReservations.length > 2;
  const upcomingToShow = showAllUpcoming
    ? upcomingReservations
    : upcomingReservations.slice(0, 2);

  return (
    <div className="space-y-gutter">
      <div className="border border-hairline bg-canvas-white p-6 md:p-8">
        <h2 className="font-headline-2 text-headline-2 text-ink-black">
          {userName}님, 안녕하세요
        </h2>
        <p className="mt-2 font-body-md text-body-md text-ink-secondary">
          예약 현황과 진료 정보를 확인하고, 필요한 서비스를 바로 이용하실 수 있습니다.
        </p>
      </div>

      {upcomingToShow.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-headline-2 text-headline-2 text-ink-black">다가오는 예약</h3>
            {hasMoreUpcoming && (
              <button
                className="inline-flex shrink-0 items-center gap-1 font-body-sm text-body-sm text-primary hover:underline"
                type="button"
                onClick={() => setShowAllUpcoming((prev) => !prev)}
              >
                {showAllUpcoming ? '접기' : '전체 보기'}
                <Icon className="text-base" name={showAllUpcoming ? 'expand_less' : 'chevron_right'} />
              </button>
            )}
          </div>
          {upcomingToShow.map((reservation) => (
            <ReservationRow
              key={reservation.id}
              reservation={reservation}
              onDetailClick={onDetailClick}
            />
          ))}
        </div>
      ) : (
        <div className="border border-hairline bg-canvas-white p-8 text-center">
          <Icon className="mb-3 text-4xl text-ink-muted" name="event_busy" />
          <p className="font-body-md text-body-md text-ink-secondary">예정된 예약이 없습니다.</p>
          <Link
            className="mt-4 inline-block font-body-md text-body-md text-primary hover:underline"
            to="/reservation"
          >
            인터넷 진료예약 바로가기
          </Link>
        </div>
      )}

      <div>
        <h3 className="mb-4 font-headline-2 text-headline-2 text-ink-black">빠른 메뉴</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-gutter">
          {mypageQuickLinks.map((item) =>
            item.href.startsWith('/') ? (
              <Link
                key={item.label}
                className="group flex flex-col border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary hover:bg-primary"
                to={item.href}
              >
                <Icon
                  className="mb-3 text-3xl text-primary transition-colors group-hover:text-on-primary"
                  name={item.icon}
                />
                <span className="font-title text-title text-ink-black transition-colors group-hover:text-white">
                  {item.label}
                </span>
                <span className="mt-1 font-body-sm text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim">
                  {item.description}
                </span>
              </Link>
            ) : (
              <a
                key={item.label}
                className="group flex flex-col border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary hover:bg-primary"
                href={item.href}
              >
                <Icon
                  className="mb-3 text-3xl text-primary transition-colors group-hover:text-on-primary"
                  name={item.icon}
                />
                <span className="font-title text-title text-ink-black transition-colors group-hover:text-white">
                  {item.label}
                </span>
                <span className="mt-1 font-body-sm text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim">
                  {item.description}
                </span>
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function HistorySection() {
  return (
    <div className="space-y-gutter">
      <div className="border border-hairline bg-canvas-white p-6 md:p-8">
        <h2 className="font-headline-2 text-headline-2 text-ink-black">진료이력</h2>
        <p className="mt-2 font-body-md text-body-md text-ink-secondary">
          본원에서 받으신 외래·입원·검진 진료 이력을 조회할 수 있습니다. 상세 검사 결과는 내원 시
          안내드립니다.
        </p>
      </div>

      <div className="hidden overflow-x-auto border border-hairline bg-canvas-white md:block">
        <table className="w-full min-w-[640px] table-fixed border-collapse">
          <colgroup>
            <col className="w-[18%]" />
            <col className="w-[22%]" />
            <col className="w-[14%]" />
            <col className="w-[46%]" />
          </colgroup>
          <thead>
            <tr className="bg-surface-container-low">
              <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                진료일
              </th>
              <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                의료진
              </th>
              <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                구분
              </th>
              <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                진료내용
              </th>
            </tr>
          </thead>
          <tbody>
            {medicalHistory.map((visit) => (
              <tr key={visit.id} className="hover:bg-surface-container-low/60">
                <td className="border-b border-hairline px-4 py-4 font-body-sm text-body-sm text-ink-black">
                  {visit.date}
                </td>
                <td className="border-b border-hairline px-4 py-4 font-body-sm text-body-sm text-ink-black">
                  {visit.doctorName} {visit.doctorTitle}
                </td>
                <td className="border-b border-hairline px-4 py-4 font-body-sm text-body-sm text-ink-secondary whitespace-nowrap">
                  {visit.visitType}
                </td>
                <td className="border-b border-hairline px-4 py-4 font-body-sm text-body-sm text-ink-secondary">
                  {visit.diagnosis}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {medicalHistory.map((visit) => (
          <article key={visit.id} className="border border-hairline bg-canvas-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-body-sm text-body-sm font-semibold text-ink-black">{visit.date}</span>
              <span className="bg-surface-container-high px-2 py-1 font-eyebrow text-eyebrow text-ink-secondary">
                {visit.visitType}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-ink-black">
              {visit.doctorName} {visit.doctorTitle}
            </p>
            <p className="mt-2 font-body-sm text-body-sm text-ink-secondary">{visit.diagnosis}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProfileModal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/50 px-margin-mobile py-8"
      role="presentation"
      onClick={onClose}
    >
      <div
        aria-labelledby="profile-modal-title"
        aria-modal="true"
        className="w-full max-w-md border border-hairline bg-canvas-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.15)] md:p-8"
        role="dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-headline-1 text-headline-1 text-ink-black" id="profile-modal-title">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

const profileInputClassName =
  'w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary';

function PasswordChangeModal({ onClose }: { onClose: () => void }) {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = changePassword({ currentPassword, newPassword, confirmPassword });
    if (!result.success) {
      setError(result.message);
      return;
    }
    setError('');
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <ProfileModal title="비밀번호 변경" onClose={onClose}>
        <div className="mt-6 text-center">
          <Icon className="mb-4 text-5xl text-primary" name="check_circle" />
          <p className="font-body-md text-body-md text-ink-secondary">비밀번호가 변경되었습니다.</p>
        </div>
        <button
          className="mt-8 w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90"
          type="button"
          onClick={onClose}
        >
          확인
        </button>
      </ProfileModal>
    );
  }

  return (
    <ProfileModal title="비밀번호 변경" onClose={onClose}>
      <p className="mt-3 font-body-md text-body-md text-ink-secondary">
        현재 비밀번호를 입력한 후 새 비밀번호를 설정해 주세요.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="currentPassword">
            현재 비밀번호
          </label>
          <input
            autoComplete="current-password"
            className={profileInputClassName}
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="newPassword">
            새 비밀번호
          </label>
          <input
            autoComplete="new-password"
            className={profileInputClassName}
            id="newPassword"
            minLength={4}
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div>
          <label
            className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black"
            htmlFor="confirmPassword"
          >
            새 비밀번호 확인
          </label>
          <input
            autoComplete="new-password"
            className={profileInputClassName}
            id="confirmPassword"
            minLength={4}
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 border border-hairline px-6 py-4 font-button text-button text-ink-black transition-colors hover:border-primary"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="flex-1 bg-primary px-6 py-4 font-button text-button text-canvas-white transition-opacity hover:opacity-90"
            type="submit"
          >
            변경하기
          </button>
        </div>
      </form>
    </ProfileModal>
  );
}

function ProfileEditModal({ onClose }: { onClose: () => void }) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [error, setError] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  if (!user) return null;

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setIsCodeSent(false);
    setVerificationCode('');
    setIsPhoneVerified(false);
  };

  const handleSendCode = () => {
    if (!phone.trim()) return;
    setIsCodeSent(true);
    setVerificationCode('');
    setIsPhoneVerified(false);
    setError('');
  };

  const handleConfirmCode = () => {
    if (!verificationCode.trim()) {
      setError('인증번호를 입력해 주세요.');
      return;
    }
    setIsPhoneVerified(true);
    setError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('이름을 입력해 주세요.');
      return;
    }

    if (!phone.trim()) {
      setError('휴대전화번호를 입력해 주세요.');
      return;
    }

    if (!isPhoneVerified) {
      setError('휴대전화 인증을 완료해 주세요.');
      return;
    }

    updateUser({
      name: name.trim(),
      phone: phone.trim(),
    });
    setError('');
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <ProfileModal title="회원정보 수정" onClose={onClose}>
        <div className="mt-6 text-center">
          <Icon className="mb-4 text-5xl text-primary" name="check_circle" />
          <p className="font-body-md text-body-md text-ink-secondary">회원정보가 수정되었습니다.</p>
        </div>
        <button
          className="mt-8 w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90"
          type="button"
          onClick={onClose}
        >
          확인
        </button>
      </ProfileModal>
    );
  }

  return (
    <ProfileModal title="회원정보 수정" onClose={onClose}>
      <p className="mt-3 font-body-md text-body-md text-ink-secondary">
        변경할 정보를 입력하고 휴대전화 인증을 완료한 후 저장해 주세요.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="editName">
            이름
          </label>
          <input
            autoComplete="name"
            className={profileInputClassName}
            id="editName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="editPhone">
            휴대전화
          </label>
          <div className="flex gap-2">
            <input
              autoComplete="tel"
              className="min-w-0 flex-1 border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
              id="editPhone"
              placeholder="휴대전화번호를 입력하세요"
              type="tel"
              value={phone}
              onChange={(event) => handlePhoneChange(event.target.value)}
            />
            <button
              className="shrink-0 border border-hairline bg-surface-container px-4 py-3 font-button text-button text-ink-black transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!phone.trim()}
              type="button"
              onClick={handleSendCode}
            >
              인증번호 전송
            </button>
          </div>
          {isCodeSent && (
            <div className="mt-3 flex gap-2">
              <input
                autoComplete="one-time-code"
                className="min-w-0 flex-1 border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                id="editVerificationCode"
                inputMode="numeric"
                placeholder="인증번호를 입력하세요"
                type="text"
                value={verificationCode}
                onChange={(event) => {
                  setVerificationCode(event.target.value);
                  setIsPhoneVerified(false);
                }}
              />
              <button
                className="shrink-0 border border-hairline bg-surface-container px-5 py-3 font-button text-button text-ink-black transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!verificationCode.trim()}
                type="button"
                onClick={handleConfirmCode}
              >
                인증
              </button>
            </div>
          )}
          {isPhoneVerified && (
            <p className="mt-2 flex items-center gap-1 font-body-sm text-body-sm text-primary">
              <Icon className="text-base" name="check_circle" />
              휴대전화 인증이 완료되었습니다.
            </p>
          )}
        </div>
        {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 border border-hairline px-6 py-4 font-button text-button text-ink-black transition-colors hover:border-primary"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="flex-1 bg-primary px-6 py-4 font-button text-button text-canvas-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isPhoneVerified}
            type="submit"
          >
            저장
          </button>
        </div>
      </form>
    </ProfileModal>
  );
}

function ProfileSection() {
  const { user } = useAuth();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  if (!user) return null;

  const infoRows = [
    { label: '이름', value: user.name },
    { label: '회원구분', value: user.loginType === 'member' ? '정회원' : '비회원' },
    { label: '아이디', value: user.userId ?? '-' },
    { label: '환자번호', value: maskPatientNumber(user.patientNumber ?? '12345678') },
    { label: '휴대전화', value: maskPhone(user.phone ?? '01012345678') },
  ];

  return (
    <div className="space-y-gutter">
      <div className="border border-hairline bg-canvas-white p-6 md:p-8">
        <h2 className="font-headline-2 text-headline-2 text-ink-black">회원정보</h2>
        <p className="mt-2 font-body-md text-body-md text-ink-secondary">
          회원 정보 확인 및 계정 관리를 할 수 있습니다.
        </p>
      </div>

      <div className="border border-hairline bg-canvas-white p-6 md:p-8">
        <dl className="divide-y divide-hairline">
          {infoRows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 md:flex-row md:gap-4">
              <dt className="w-full shrink-0 font-body-sm text-body-sm font-semibold text-ink-secondary md:w-36">
                {row.label}
              </dt>
              <dd className="font-body-md text-body-md text-ink-black">{row.value}</dd>
            </div>
          ))}
        </dl>
        <hr className="my-6 border-0 border-t border-hairline" />
        <div className="flex w-full gap-4 sm:w-auto">
          {user.loginType === 'member' && (
            <button
              className="flex-1 border border-outline bg-surface-container-lowest px-6 py-3 text-center font-button text-button text-ink-black transition-colors hover:bg-surface-container-low sm:flex-none"
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              비밀번호 변경
            </button>
          )}
          <button
            className="flex-1 bg-primary px-6 py-3 text-center font-button text-button text-canvas-white shadow-sm transition-colors hover:bg-tertiary sm:flex-none"
            type="button"
            onClick={() => setIsProfileModalOpen(true)}
          >
            회원정보 수정
          </button>
        </div>
      </div>

      {isPasswordModalOpen && <PasswordChangeModal onClose={() => setIsPasswordModalOpen(false)} />}
      {isProfileModalOpen && <ProfileEditModal onClose={() => setIsProfileModalOpen(false)} />}
    </div>
  );
}

function parseTabParam(tab: string | null): MyPageTab {
  if (tab === 'history' || tab === 'profile') return tab;
  return 'home';
}

export default function MyPage() {
  const { isLoggedIn, user } = useAuth();
  const { reservations } = useReservations();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<MyPageTab>(() => parseTabParam(searchParams.get('tab')));
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openDetailModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReservation(null);
  };

  useEffect(() => {
    setActiveTab(parseTabParam(searchParams.get('tab')));
  }, [searchParams]);

  useEffect(() => {
    if (!isDetailModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetailModal();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDetailModalOpen]);

  if (!isLoggedIn || !user) {
    return <Navigate replace to="/login" />;
  }

  const upcomingReservations = sortScheduledReservations(reservations);
  const userName = user.name;

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">마이페이지</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              예약·진료이력·회원정보를 한곳에서 확인하고 관리하실 수 있습니다.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="h-fit space-y-1 border border-hairline bg-canvas-white p-3 lg:sticky lg:top-28">
              {mypageMenus.map((menu) => (
                <button
                  key={menu.id}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === menu.id
                      ? 'bg-primary text-on-primary'
                      : 'text-ink-black hover:bg-surface-container-low'
                  }`}
                  type="button"
                  onClick={() => setActiveTab(menu.id)}
                >
                  <Icon
                    className={activeTab === menu.id ? 'text-on-primary' : 'text-primary'}
                    name={menu.icon}
                  />
                  <span className="font-body-md text-body-md">{menu.label}</span>
                </button>
              ))}
            </aside>

            <div>
              {activeTab === 'home' && (
                <HomeSection
                  upcomingReservations={upcomingReservations}
                  userName={userName}
                  onDetailClick={openDetailModal}
                />
              )}
              {activeTab === 'history' && <HistorySection />}
              {activeTab === 'profile' && <ProfileSection />}
            </div>
          </div>
        </PageContainer>
      </PageMain>
      <Footer />

      {isDetailModalOpen && selectedReservation && (
        <ReservationDetailModal reservation={selectedReservation} onClose={closeDetailModal} />
      )}
    </div>
  );
}
