import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import { hospitalInfo } from '../data/directionsData';
import {
  cautions,
  certificateContacts,
  consentImpossibleDocuments,
  consentImpossibleNote,
  consentPossibleDocuments,
  counterHours,
  counterLocations,
  formDownloads,
  inpatientSteps,
  kioskLocations,
  nonReissuableDocuments,
  nonReissuableNote,
  otherCertificateNotes,
  otherCertificates,
  outpatientSteps,
  procedureNotes,
} from '../data/diagnosisCertificateData';

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

function ProcedureList({ title, steps }: { title: string; steps: { order: number; text: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 font-title text-title text-ink-black">{title}</h3>
      <ol className="space-y-3">
        {steps.map((step) => (
          <li key={step.order} className="flex gap-3 font-body-md text-body-md text-ink-secondary">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-primary font-body-sm text-body-sm text-white">
              {step.order}
            </span>
            <span className="pt-0.5">{step.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function DiagnosisCertificatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">진단서발급</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              진단서·소견서 및 제증명 발급 절차, 창구 위치, 구비 서류를 안내합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <SectionCard title="진단서, 소견서 및 입원 사실 증명서(병명기재) 발급 절차 안내">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <ProcedureList title="외래환자인 경우" steps={outpatientSteps} />
                  <ProcedureList title="입원환자인 경우" steps={inpatientSteps} />
                </div>
                <div className="mt-6 space-y-2 border-t border-hairline pt-6">
                  {procedureNotes.map((note) => (
                    <p key={note} className="font-body-sm text-body-sm text-ink-secondary">
                      ※ {note}
                    </p>
                  ))}
                  <p className="font-body-sm text-body-sm text-primary">
                    진료예약 문의 : {certificateContacts.reservation}
                  </p>
                </div>
              </SectionCard>

              <SectionCard title="그외 제증명 발급 안내">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-title text-title text-ink-black">병원 방문</h3>
                    <p className="font-body-md text-body-md text-ink-secondary">
                      {otherCertificateNotes.visit}
                    </p>
                    <p className="mt-3 mb-2 font-body-sm text-body-sm font-semibold text-ink-black">
                      무인 발급기 위치
                    </p>
                    <ul className="space-y-1 font-body-sm text-body-sm text-ink-secondary">
                      {kioskLocations.map((location) => (
                        <li key={location}>· {location}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 font-title text-title text-ink-black">인터넷</h3>
                    <p className="font-body-md text-body-md text-ink-secondary">
                      {otherCertificateNotes.internet}
                    </p>
                    <p className="mt-2 font-body-sm text-body-sm text-ink-secondary">
                      {otherCertificateNotes.severeIllness}
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-title text-title text-ink-black">
                      외래 진료비 계산서·영수증 재발급 및 상세(세부) 내역서
                    </h3>
                    <p className="font-body-sm text-body-sm text-ink-secondary">
                      {otherCertificateNotes.receiptReissue}
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] border-collapse border border-hairline text-left">
                      <thead>
                        <tr className="bg-surface-container-low">
                          <th className="border border-hairline px-4 py-3 font-body-sm text-body-sm font-semibold text-ink-black">
                            제증명 종류
                          </th>
                          <th className="border border-hairline px-4 py-3 font-body-sm text-body-sm font-semibold text-ink-black">
                            확인 사항
                          </th>
                          <th className="border border-hairline px-4 py-3 font-body-sm text-body-sm font-semibold text-ink-black">
                            발급 방법
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {otherCertificates.map((row) => (
                          <tr key={row.type} className="hover:bg-surface-container-low/60">
                            <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-black">
                              {row.type}
                            </td>
                            <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-secondary">
                              {row.note}
                            </td>
                            <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-secondary">
                              {row.method}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="제증명 창구 위치">
                <dl className="space-y-4 font-body-md text-body-md">
                  <div>
                    <dt className="mb-1 font-semibold text-ink-black">외래 환자</dt>
                    <dd className="text-ink-secondary">
                      {counterLocations.outpatient.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-semibold text-ink-black">입원 환자</dt>
                    <dd className="text-ink-secondary">{counterLocations.inpatient.join(', ')}</dd>
                  </div>
                </dl>
              </SectionCard>

              <SectionCard title="제증명 창구 업무 시간">
                <div className="space-y-6">
                  {counterHours.map((block) => (
                    <div key={block.title}>
                      <h3 className="mb-2 font-title text-title text-ink-black">{block.title}</h3>
                      <ul className="space-y-1 font-body-sm text-body-sm text-ink-secondary">
                        {block.hours.map((hour) => (
                          <li key={hour}>· {hour}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard id="documents" title="제증명 재발급 시 구비 서류">
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 font-title text-title text-ink-black">
                      가. 환자의 동의가 가능한 경우
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[560px] border-collapse border border-hairline text-left">
                        <thead>
                          <tr className="bg-surface-container-low">
                            <th className="w-[28%] border border-hairline px-4 py-3 font-body-sm text-body-sm font-semibold text-ink-black">
                              방문자
                            </th>
                            <th className="border border-hairline px-4 py-3 font-body-sm text-body-sm font-semibold text-ink-black">
                              구비 서류
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {consentPossibleDocuments.map((row) => (
                            <tr key={row.visitor} className="align-top hover:bg-surface-container-low/60">
                              <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-black">
                                {row.visitor}
                              </td>
                              <td className="border border-hairline px-4 py-3">
                                <ul className="space-y-1 font-body-sm text-body-sm text-ink-secondary">
                                  {row.documents.map((doc) => (
                                    <li key={doc}>· {doc}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 font-title text-title text-ink-black">
                      나. 환자의 동의가 불가능한 경우
                    </h3>
                    <p className="mb-4 font-body-sm text-body-sm text-ink-secondary">
                      {consentImpossibleNote}
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[560px] border-collapse border border-hairline text-left">
                        <thead>
                          <tr className="bg-surface-container-low">
                            <th className="w-[28%] border border-hairline px-4 py-3 font-body-sm text-body-sm font-semibold text-ink-black">
                              구분
                            </th>
                            <th className="border border-hairline px-4 py-3 font-body-sm text-body-sm font-semibold text-ink-black">
                              구비 서류
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {consentImpossibleDocuments.map((row) => (
                            <tr key={row.case} className="align-top hover:bg-surface-container-low/60">
                              <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-black">
                                {row.case}
                              </td>
                              <td className="border border-hairline px-4 py-3">
                                <ul className="space-y-1 font-body-sm text-body-sm text-ink-secondary">
                                  {row.documents.map((doc) => (
                                    <li key={doc}>· {doc}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {formDownloads.map((form) => (
                      <button
                        key={form.label}
                        className="inline-flex items-center gap-2 border border-hairline px-4 py-2 font-body-sm text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                        type="button"
                      >
                        <Icon className="text-primary" name={form.icon} />
                        {form.label}
                      </button>
                    ))}
                  </div>
                  <p className="font-body-sm text-body-sm text-ink-muted">
                    동의서·위임장·확인서 양식은 원무과 또는 위임장/동의서 안내에서 다운로드할 수
                    있습니다.
                  </p>
                </div>
              </SectionCard>

              <SectionCard title="주의">
                <ul className="space-y-2">
                  {cautions.map((caution) => (
                    <li key={caution} className="flex gap-2 font-body-sm text-body-sm text-ink-secondary">
                      <Icon className="mt-0.5 shrink-0 text-primary" name="info" />
                      {caution}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard title="재발급이 불가능한 서류">
                <ul className="mb-4 space-y-1 font-body-sm text-body-sm text-ink-secondary">
                  {nonReissuableDocuments.map((doc) => (
                    <li key={doc}>· {doc}</li>
                  ))}
                </ul>
                <p className="font-body-sm text-body-sm text-ink-secondary">※ {nonReissuableNote}</p>
                <div className="mt-4 space-y-1 border-t border-hairline pt-4 font-body-sm text-body-sm text-ink-secondary">
                  <p>진료 예약 문의 : {certificateContacts.reservation}</p>
                  <p>제증명 재발급 관련 문의 (외래) : {certificateContacts.outpatient}</p>
                  <p>제증명 재발급 관련 문의 (외래) : {certificateContacts.outpatientAlt}</p>
                  <p>제증명 재발급 관련 문의 (입원) : {certificateContacts.inpatient}</p>
                </div>
              </SectionCard>
            </div>

            <aside className="h-fit space-y-gutter lg:sticky lg:top-28">
              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">빠른 안내</h2>
                <ul className="space-y-3 font-body-sm text-body-sm text-ink-secondary">
                  <li className="flex gap-2">
                    <Icon className="shrink-0 text-primary" name="medical_information" />
                    병명이 기재된 진단서는 진료 후 의사 요청·수납 시 발급
                  </li>
                  <li className="flex gap-2">
                    <Icon className="shrink-0 text-primary" name="print" />
                    일부 제증명은 무인발급기·인터넷 발급 가능
                  </li>
                  <li className="flex gap-2">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    재발급은 발급일로부터 3년 이내 (채용신체검사서 1년)
                  </li>
                </ul>
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
                <a
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  href="https://sdoc.snuh.org/main.do"
                  rel="noreferrer"
                  target="_blank"
                >
                  증명서발급 사이트
                  <Icon className="text-primary" name="open_in_new" />
                </a>
              </div>

              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">문의</h2>
                <ul className="space-y-4 font-body-sm text-body-sm text-ink-secondary">
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="call" />
                    <div>
                      <p className="font-semibold text-ink-black">예약센터</p>
                      <p className="mt-1">{certificateContacts.reservation}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="location_on" />
                    <div>
                      <p className="font-semibold text-ink-black">{hospitalInfo.name}</p>
                      <p className="mt-1">{hospitalInfo.address}</p>
                    </div>
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
