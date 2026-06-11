import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import { SPECIALTY_LABEL } from '../data/appointmentData';
import {
  departmentInfo,
  doctorProfiles,
  doctorsContact,
  type DoctorProfile,
} from '../data/doctorsData';

function DoctorCard({ doctor }: { doctor: DoctorProfile }) {
  return (
    <article className="border border-hairline bg-canvas-white">
      <div className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
        <div className="flex shrink-0 flex-col items-center md:w-40">
          <div className="h-28 w-28 overflow-hidden rounded-full border border-hairline bg-surface-container-high">
            <img
              alt={`${doctor.name} ${doctor.title} 프로필`}
              className="h-full w-full object-cover object-top"
              src={doctor.image}
            />
          </div>
          <p className="mt-4 text-center font-headline-2 text-headline-2 text-ink-black">
            {doctor.name}
          </p>
          <p className="mt-1 text-center font-body-sm text-body-sm text-primary">
            {doctor.title}
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-4">
            <h3 className="mb-2 font-title text-sm text-ink-black">전문 분야</h3>
            <p className="font-body-sm text-body-sm text-ink-secondary">{doctor.specialty}</p>
          </div>
          <div>
            <h3 className="mb-2 font-title text-sm text-ink-black">진료 분야</h3>
            <ul className="flex flex-wrap gap-2">
              {doctor.focus.map((item) => (
                <li
                  key={item}
                  className="border border-hairline px-3 py-1 font-body-sm text-body-sm text-ink-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-hairline pt-5">
            <p className="font-body-sm text-body-sm text-ink-secondary">
              <span className="font-semibold text-ink-black">외래 진료</span> {doctor.schedule}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DoctorsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <p className="mb-2 font-eyebrow text-eyebrow text-primary">{SPECIALTY_LABEL}</p>
            <h1 className="font-headline-1 text-headline-1 text-ink-black">의료진 소개</h1>
            <p className="mt-3 whitespace-pre-line font-body-md text-body-md text-ink-secondary">
              {departmentInfo.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {departmentInfo.highlights.map((item) => (
                <li
                  key={item}
                  className="border border-hairline px-3 py-1 font-body-sm text-body-sm text-ink-secondary"
                >
                  {item}
                </li>
              ))}
            </ul>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <section className="space-y-gutter">
                {doctorProfiles.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </section>
            </div>

            <aside className="h-fit space-y-gutter lg:sticky lg:top-28">
              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">진료 안내</h2>
                <dl className="space-y-4 font-body-sm text-body-sm">
                  <div>
                    <dt className="mb-1 text-ink-secondary">의료진</dt>
                    <dd className="text-ink-black">{doctorProfiles.length}명</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-ink-secondary">외래 진료</dt>
                    <dd className="text-ink-black">{doctorsContact.hours}</dd>
                  </div>
                </dl>
              </div>

              <div className="divide-y divide-hairline border border-hairline bg-canvas-white">
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/reservation"
                >
                  인터넷 진료예약
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/faq"
                >
                  FAQ
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/directions"
                >
                  오시는길
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
              </div>

              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">예약 문의</h2>
                <ul className="space-y-4 font-body-sm text-body-sm text-ink-secondary">
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="call" />
                    <div>
                      <p className="font-semibold text-ink-black">예약센터</p>
                      <p className="mt-1">{doctorsContact.reservation}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="info" />
                    <p>
                      의료진별 진료 요일은 변동될 수 있습니다. 예약 시 가능한 일정을 확인해 주세요.
                    </p>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </PageContainer>
      </PageMain>
      <Footer />
    </div>
  );
}
