import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  dailySchedule,
  inpatientLifeContactInfo,
  inpatientLifeIntro,
  mealGuide,
  relatedLinks,
  rehabilitationDuringStay,
  visitingGuide,
  wardFacilities,
  wardRules,
} from '../data/inpatientLifeGuideData';

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

export default function InpatientLifeGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">입원생활안내</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">{inpatientLifeIntro.lead}</p>
            <p className="mt-2 font-body-md text-body-md text-ink-secondary">{inpatientLifeIntro.leadNote}</p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <SectionCard title="병동 일과">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low">
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          시간
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          내용
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          비고
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailySchedule.map((row) => (
                        <tr key={row.time}>
                          <td className="border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black">
                            {row.time}
                          </td>
                          <td className="border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black">
                            {row.activity}
                          </td>
                          <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-secondary">
                            {row.note ?? '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>

              <SectionCard title="병동 시설">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {wardFacilities.map((facility) => (
                    <article key={facility.title} className="flex gap-4 border border-hairline p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                        <Icon className="text-xl" name={facility.icon} />
                      </div>
                      <div>
                        <h3 className="font-title text-title text-ink-black">{facility.title}</h3>
                        <p className="mt-1 font-body-sm text-body-sm text-ink-secondary">
                          {facility.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title={mealGuide.title}>
                <p className="font-body-md text-body-md text-ink-secondary">{mealGuide.description}</p>
                <ul className="mt-4 space-y-2">
                  {mealGuide.items.map((item) => (
                    <li key={item} className="flex gap-2 font-body-sm text-body-sm text-ink-secondary">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard id="visiting" title={visitingGuide.title}>
                <ul className="space-y-3">
                  {visitingGuide.items.map((item) => (
                    <li key={item} className="flex gap-2 font-body-md text-body-md text-ink-secondary">
                      <Icon className="mt-0.5 shrink-0 text-primary" name="groups" />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard title={rehabilitationDuringStay.title}>
                <p className="font-body-md text-body-md text-ink-secondary">
                  {rehabilitationDuringStay.description}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {rehabilitationDuringStay.items.map((item) => (
                    <article key={item.title} className="border border-hairline bg-surface-container-low p-4">
                      <h3 className="font-title text-title text-ink-black">{item.title}</h3>
                      <p className="mt-2 font-body-sm text-body-sm text-ink-secondary">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="병동 생활 수칙">
                <ul className="space-y-3">
                  {wardRules.map((rule) => (
                    <li key={rule} className="flex gap-2 font-body-md text-body-md text-ink-secondary">
                      <Icon className="mt-0.5 shrink-0 text-primary" name="info" />
                      {rule}
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
                      <p className="mt-1">{inpatientLifeContactInfo.reservationPhone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="support_agent" />
                    <div>
                      <p className="font-semibold text-ink-black">병동 데스크</p>
                      <p className="mt-1">{inpatientLifeContactInfo.wardDesk}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">상담 시간</p>
                      <p className="mt-1">{inpatientLifeContactInfo.hours}</p>
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
