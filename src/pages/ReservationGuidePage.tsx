import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  cancellationGuide,
  relatedLinks,
  reservationContactInfo,
  reservationIntro,
  reservationMethods,
} from '../data/reservationGuideData';

function SectionCard({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="border border-hairline bg-canvas-white" id={id}>
      <div className="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
        <h2 className="font-headline-2 text-headline-2 text-ink-black">{title}</h2>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </section>
  );
}

export default function ReservationGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">예약안내</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">{reservationIntro.lead}</p>
            <p className="mt-2 font-body-md text-body-md text-ink-secondary">{reservationIntro.leadNote}</p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <SectionCard title="예약 방법">
                <div className="space-y-6">
                  {reservationMethods.map((method) => (
                    <article key={method.id} className="border border-hairline p-5 md:p-6">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
                          <Icon className="text-2xl" name={method.icon} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-title text-title text-ink-black">{method.title}</h3>
                          <p className="mt-2 font-body-md text-body-md text-ink-secondary">
                            {method.description}
                          </p>
                          <ul className="mt-4 space-y-1.5">
                            {method.details.map((detail) => (
                              <li
                                key={detail}
                                className="flex gap-2 font-body-sm text-body-sm text-ink-secondary"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                          {method.links && method.links.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {method.links.map((link) =>
                                link.external ? (
                                  <a
                                    key={link.label}
                                    className="inline-flex items-center gap-1 border border-primary bg-primary px-4 py-2 font-body-sm text-body-sm text-on-primary transition-opacity hover:opacity-90"
                                    href={link.href}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    {link.label}
                                    <Icon className="text-base" name="open_in_new" />
                                  </a>
                                ) : (
                                  <Link
                                    key={link.label}
                                    className="inline-flex items-center gap-1 border border-primary bg-primary px-4 py-2 font-body-sm text-body-sm text-on-primary transition-opacity hover:opacity-90"
                                    to={link.href}
                                  >
                                    {link.label}
                                    <Icon className="text-base" name="chevron_right" />
                                  </Link>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </SectionCard>

              <SectionCard id="cancellation" title={cancellationGuide.title}>
                <ul className="space-y-3">
                  {cancellationGuide.notes.map((note) => (
                    <li key={note} className="flex gap-2 font-body-md text-body-md text-ink-secondary">
                      <Icon className="mt-0.5 shrink-0 text-primary" name="info" />
                      {note}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    className="inline-flex items-center gap-2 border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:border-primary hover:text-primary"
                    to="/reservation/confirm"
                  >
                    예약 확인 / 취소 바로가기
                    <Icon className="text-primary" name="chevron_right" />
                  </Link>
                </div>
              </SectionCard>
            </div>

            <aside className="h-fit space-y-gutter lg:sticky lg:top-28">
              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">문의 안내</h2>
                <ul className="space-y-4 font-body-sm text-body-sm text-ink-secondary">
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="call" />
                    <div>
                      <p className="font-semibold text-ink-black">예약센터</p>
                      <p className="mt-1">{reservationContactInfo.reservationPhone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">상담 시간</p>
                      <p className="mt-1">{reservationContactInfo.hours}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="divide-y divide-hairline border border-hairline bg-canvas-white">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                    to={link.href}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="text-primary" name={link.icon} />
                      {link.label}
                    </span>
                    <Icon className="text-primary" name="chevron_right" />
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </PageContainer>
      </PageMain>
      <Footer />
    </div>
  );
}
