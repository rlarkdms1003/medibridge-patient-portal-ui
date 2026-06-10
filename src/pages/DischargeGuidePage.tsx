import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  dischargeContactInfo,
  dischargeDocuments,
  dischargeFlow,
  dischargeIntro,
  dischargeNotes,
  outpatientFollowUp,
  relatedLinks,
} from '../data/dischargeGuideData';

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

export default function DischargeGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">퇴원절차</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">{dischargeIntro.lead}</p>
            <p className="mt-2 font-body-md text-body-md text-ink-secondary">{dischargeIntro.leadNote}</p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <SectionCard title="퇴원 절차">
                <ol className="space-y-4">
                  {dischargeFlow.map((step) => (
                    <li key={step.order} className="flex gap-4 border border-hairline p-4 md:p-5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-primary font-body-sm text-body-sm text-on-primary">
                        {step.order}
                      </span>
                      <div>
                        <h3 className="font-title text-title text-ink-black">{step.title}</h3>
                        <p className="mt-1 font-body-md text-body-md text-ink-secondary">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </SectionCard>

              <SectionCard title={dischargeDocuments.title}>
                <ul className="space-y-2">
                  {dischargeDocuments.items.map((item) => (
                    <li key={item} className="flex gap-2 font-body-md text-body-md text-ink-secondary">
                      <Icon className="mt-0.5 shrink-0 text-primary" name="check_circle" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard title={outpatientFollowUp.title}>
                <p className="font-body-md text-body-md text-ink-secondary">
                  {outpatientFollowUp.description}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {outpatientFollowUp.items.map((item) => (
                    <article key={item.title} className="border border-hairline bg-surface-container-low p-4">
                      <h3 className="font-title text-title text-ink-black">{item.title}</h3>
                      <p className="mt-2 font-body-sm text-body-sm text-ink-secondary">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    className="inline-flex items-center gap-2 border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:border-primary hover:text-primary"
                    to="/reservation"
                  >
                    외래 진료 예약하기
                    <Icon className="text-primary" name="chevron_right" />
                  </Link>
                </div>
              </SectionCard>

              <SectionCard title="유의사항">
                <ul className="space-y-3">
                  {dischargeNotes.map((note) => (
                    <li key={note} className="flex gap-2 font-body-md text-body-md text-ink-secondary">
                      <Icon className="mt-0.5 shrink-0 text-primary" name="info" />
                      {note}
                    </li>
                  ))}
                </ul>
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
                      <p className="mt-1">{dischargeContactInfo.reservationPhone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="support_agent" />
                    <div>
                      <p className="font-semibold text-ink-black">입·퇴원 안내 데스크</p>
                      <p className="mt-1">{dischargeContactInfo.admissionDesk}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">상담 시간</p>
                      <p className="mt-1">{dischargeContactInfo.hours}</p>
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
