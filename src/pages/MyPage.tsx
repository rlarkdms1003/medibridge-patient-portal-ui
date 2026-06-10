import { useEffect, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import ReservationDetailModal from '../components/ReservationDetailModal';
import { useAuth } from '../contexts/AuthContext';
import {
  medicalHistory,
  mypageMenus,
  mypageQuickLinks,
  type MyPageTab,
} from '../data/mypageData';
import {
  initialReservations,
  reservationStatusLabel,
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
    <div className="flex flex-col gap-3 border border-hairline p-4 md:flex-row md:items-center md:justify-between">
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
  const nextReservation = upcomingReservations[0];

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

      {nextReservation ? (
        <div>
          <h3 className="mb-4 font-headline-2 text-headline-2 text-ink-black">다가오는 예약</h3>
          <div className="border border-hairline bg-canvas-white p-6 md:p-8">
            <ReservationRow reservation={nextReservation} onDetailClick={onDetailClick} />
          </div>
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

function ProfileSection() {
  const { user } = useAuth();

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
          회원 정보 확인 및 계정 관리를 할 수 있습니다. 정보 변경은 예약센터(1588-5700) 또는 내원 시
          가능합니다.
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
          <button
            className="flex-1 border border-outline bg-surface-container-lowest px-6 py-3 text-center font-button text-button text-ink-black transition-colors hover:bg-surface-container-low sm:flex-none"
            type="button"
          >
            비밀번호 변경
          </button>
          <button
            className="flex-1 bg-primary px-6 py-3 text-center font-button text-button text-canvas-white shadow-sm transition-colors hover:bg-tertiary sm:flex-none"
            type="button"
          >
            회원정보 수정
          </button>
        </div>
      </div>
    </div>
  );
}

function parseTabParam(tab: string | null): MyPageTab {
  if (tab === 'history' || tab === 'profile') return tab;
  return 'home';
}

export default function MyPage() {
  const { isLoggedIn, user } = useAuth();
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

  const upcomingReservations = initialReservations.filter((item) => item.status === 'scheduled');
  const userName = user.name;

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">마이페이지</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              예약·진료이력·회원정보를 한곳에서 확인하고 관리하실 수 있습니다.
            </p>
          </div>

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
