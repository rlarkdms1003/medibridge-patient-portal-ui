import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  billingContactPhone,
  interimBillInfo,
  medicalBillContactInfo,
  medicalBillIntro,
  relatedLinks,
  reissueLocations,
  reissueNotes,
} from '../data/medicalBillData';

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

export default function MedicalBillPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">진료비계산서</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">{medicalBillIntro.lead}</p>
            <p className="mt-2 font-body-md text-body-md text-ink-secondary">{medicalBillIntro.leadNote}</p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[2fr_1fr]">
            <div className="space-y-gutter">
              <SectionCard title="1. 진료비에 대한 문의는?">
                <p className="font-body-md text-body-md text-ink-secondary">
                  진료비 관련 문의는{' '}
                  <span className="font-semibold text-ink-black">원무과 {billingContactPhone}</span>
                  로 연락해 주세요.
                </p>
              </SectionCard>

              <SectionCard title="2. 진료비계산서·영수증 재발급은 어디서 하나요?">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low">
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          구분
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          발급 장소
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          비고
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reissueLocations.map((row) => (
                        <tr key={row.category}>
                          <td className="border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black">
                            {row.category}
                          </td>
                          <td className="border border-hairline px-4 py-3 font-body-md text-body-md text-ink-secondary">
                            {row.category === '인터넷' ? (
                              <Link className="text-primary underline-offset-2 hover:underline" to="/mypage">
                                {row.location}
                              </Link>
                            ) : (
                              row.location
                            )}
                          </td>
                          <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-secondary">
                            {row.note ?? '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="mt-6 space-y-2 border-t border-hairline pt-6">
                  {reissueNotes.map((note) => (
                    <li key={note} className="font-body-sm text-body-sm text-ink-secondary">
                      ※{' '}
                      {note.startsWith('재발급 신청 시 필요 서류') ? (
                        <>
                          재발급 신청 시 필요 서류는{' '}
                          <Link
                            className="text-primary underline-offset-2 hover:underline"
                            to="/documents/medical-records"
                          >
                            의무기록 사본발급
                          </Link>{' '}
                          기준을 준용합니다.
                        </>
                      ) : (
                        note
                      )}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard title="3. 입원 중에 중간진료비 계산서가 발급되나요?">
                <p className="font-body-md text-body-md text-ink-secondary">{interimBillInfo.description}</p>
                <ul className="mt-4 space-y-3">
                  {interimBillInfo.items.map((item) => (
                    <li key={item} className="flex gap-2 font-body-md text-body-md text-ink-secondary">
                      <Icon className="mt-0.5 shrink-0 text-primary" name="receipt_long" />
                      {item}
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
                      <p className="font-semibold text-ink-black">원무과</p>
                      <p className="mt-1">{medicalBillContactInfo.phone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">창구 운영</p>
                      <p className="mt-1">{medicalBillContactInfo.hours}</p>
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
