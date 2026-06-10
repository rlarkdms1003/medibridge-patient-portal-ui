import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  additionalNotes,
  relatedLinks,
  restrictionGroups,
  visitationContactInfo,
  visitationIntro,
  visitingHours,
} from '../data/visitationGuideData';

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

export default function VisitationGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">문병안내</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">{visitationIntro.lead}</p>
            <p className="mt-2 font-body-md text-body-md text-ink-secondary">{visitationIntro.leadNote}</p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[2fr_1fr]">
            <div className="space-y-gutter">
              <SectionCard id="hours" title="문병 시간">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low">
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          병동
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          평일
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          토·일·공휴일
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          비고
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitingHours.map((row) => (
                        <tr key={row.ward}>
                          <td className="border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black">
                            {row.ward}
                          </td>
                          <td className="border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black">
                            {row.weekday}
                          </td>
                          <td className="border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black">
                            {row.weekend}
                          </td>
                          <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-secondary">
                            {row.note ?? '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 font-body-sm text-body-sm text-ink-muted">
                  ※ 면회 시간은 병원·병동 사정에 따라 변경될 수 있습니다.
                </p>
              </SectionCard>

              {restrictionGroups.map((group) => (
                <SectionCard key={group.title} title={group.title}>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2 font-body-md text-body-md text-ink-secondary">
                        <Icon className="mt-0.5 shrink-0 text-primary" name="block" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </SectionCard>
              ))}

              <SectionCard title="기타 안내">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {additionalNotes.map((note) => (
                    <article key={note.title} className="flex gap-4 border border-hairline p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-on-primary">
                        <Icon className="text-xl" name={note.icon} />
                      </div>
                      <div>
                        <h3 className="font-title text-title text-ink-black">{note.title}</h3>
                        <p className="mt-1 font-body-sm text-body-sm text-ink-secondary">
                          {note.description}
                        </p>
                      </div>
                    </article>
                  ))}
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
                      <p className="mt-1">{visitationContactInfo.reservationPhone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="support_agent" />
                    <div>
                      <p className="font-semibold text-ink-black">병동 데스크</p>
                      <p className="mt-1">{visitationContactInfo.wardDesk}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">상담 시간</p>
                      <p className="mt-1">{visitationContactInfo.hours}</p>
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
