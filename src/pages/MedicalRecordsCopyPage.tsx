import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  documentRequirementSections,
  formDownloads,
  issuanceInfo,
  medicalRecordsContactInfo,
  medicalRecordsFaq,
  medicalRecordsIntro,
  relatedLinks,
  submissionNotes,
} from '../data/medicalRecordsCopyData';

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

function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-hairline">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-surface-container-low md:px-6"
        type="button"
        onClick={onToggle}
      >
        <span className="font-body-md text-body-md text-ink-black">{question}</span>
        <Icon className="shrink-0 text-ink-muted" name={isOpen ? 'expand_less' : 'expand_more'} />
      </button>
      {isOpen && (
        <div className="border-t border-hairline bg-surface-container-low px-4 py-4 md:px-6">
          <p className="font-body-md text-body-md text-ink-secondary">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function MedicalRecordsCopyPage() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(medicalRecordsFaq[0]?.id ?? null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">
              의무기록 및 영상검사 사본발급
            </h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">{medicalRecordsIntro.lead}</p>
            <p className="mt-2 font-body-md text-body-md text-ink-secondary">
              {medicalRecordsIntro.procedureNote}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <SectionCard title="발급 안내">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse">
                    <tbody>
                      {issuanceInfo.map((row) => (
                        <tr key={row.label}>
                          <th className="w-[28%] border border-hairline bg-surface-container-low px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                            {row.label}
                          </th>
                          <td className="whitespace-pre-line border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-secondary">
                            {row.content}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>

              <SectionCard title="신청 시 구비서류 안내">
                <p className="mb-6 font-body-md text-body-md text-ink-secondary">
                  의무기록 및 영상검사 사본 발급 신청 시 의료법 제21조 및 동법 시행규칙 제13조의3에
                  따라 아래 서류를 준비해 주세요.
                </p>
                <div className="space-y-8">
                  {documentRequirementSections.map((section) => (
                    <div key={section.id}>
                      <h3 className="mb-4 font-title text-title text-ink-black">{section.title}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] border-collapse">
                          <thead>
                            <tr className="bg-surface-container-low">
                              <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                                신청자
                              </th>
                              <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                                구비서류
                              </th>
                              <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                                비고
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.rows.map((row) => (
                              <tr key={row.applicant}>
                                <td className="border border-hairline px-4 py-3 align-top font-body-sm text-body-sm text-ink-black">
                                  {row.applicant}
                                </td>
                                <td className="border border-hairline px-4 py-3 align-top font-body-sm text-body-sm text-ink-secondary">
                                  <ul className="space-y-1">
                                    {row.documents.map((doc) => (
                                      <li key={doc}>· {doc}</li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="border border-hairline px-4 py-3 align-top font-body-sm text-body-sm text-ink-secondary">
                                  {row.note ?? '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="서류 제출 시 유의사항">
                <ul className="space-y-3">
                  {submissionNotes.map((note) => (
                    <li key={note} className="flex gap-2 font-body-md text-body-md text-ink-secondary">
                      <Icon className="mt-0.5 shrink-0 text-primary" name="info" />
                      {note}
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard title="관련 서식">
                <p className="mb-4 font-body-md text-body-md text-ink-secondary">
                  동의서·위임장은 의료법 시행규칙에 지정된 별지 서식을 사용해야 합니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  {formDownloads.map((form) => (
                    <a
                      key={form.href}
                      className="inline-flex items-center gap-2 border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                      download={form.downloadName}
                      href={form.href}
                    >
                      <Icon className="text-primary" name={form.icon} />
                      {form.label}
                    </a>
                  ))}
                </div>
                <p className="mt-4 font-body-sm text-body-sm text-ink-muted">
                  ※ 다운로드한 양식은 인쇄 후 작성하여 발급 창구에 제출해 주세요.
                </p>
              </SectionCard>

              <SectionCard title="자주하는 질문 (FAQ)">
                <div className="space-y-3">
                  {medicalRecordsFaq.map((item) => (
                    <FaqAccordionItem
                      key={item.id}
                      answer={item.answer}
                      isOpen={openFaqId === item.id}
                      question={item.question}
                      onToggle={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                    />
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
                      <p className="mt-1">{medicalRecordsContactInfo.phone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">발급 시간</p>
                      <p className="mt-1">{medicalRecordsContactInfo.hours}</p>
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
