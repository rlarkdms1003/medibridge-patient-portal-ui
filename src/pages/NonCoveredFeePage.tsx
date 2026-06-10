import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  formatFeeAmount,
  getCategoryLabel,
  nonCoveredFeeCategories,
  nonCoveredFeeContactInfo,
  nonCoveredFeeIntro,
  nonCoveredFeeItems,
  nonCoveredFeeNotes,
  relatedLinks,
} from '../data/nonCoveredFeeData';

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border border-hairline bg-canvas-white">
      <div className="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
        <h2 className="font-headline-2 text-headline-2 text-ink-black">{title}</h2>
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </section>
  );
}

export default function NonCoveredFeePage() {
  const [activeCategory, setActiveCategory] = useState<'all' | string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return nonCoveredFeeItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        getCategoryLabel(item.categoryId).toLowerCase().includes(normalizedQuery) ||
        item.note?.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">비급여 진료비용</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">{nonCoveredFeeIntro.lead}</p>
            <p className="mt-2 font-body-md text-body-md text-ink-secondary">{nonCoveredFeeIntro.leadNote}</p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <SectionCard title="비급여 항목 조회">
                <div className="mb-6">
                  <div className="overflow-x-auto">
                    <div className="inline-flex min-w-max flex-col gap-4">
                      <div className="relative w-full">
                        <Icon
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                          name="search"
                        />
                        <input
                          className="w-full border border-hairline py-3 pl-10 pr-4 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                          placeholder="항목명 검색"
                          type="search"
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          className={`shrink-0 whitespace-nowrap border px-3 py-2 font-body-sm text-body-sm transition-colors ${
                            activeCategory === 'all'
                              ? 'border-primary bg-primary text-on-primary'
                              : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'
                          }`}
                          type="button"
                          onClick={() => setActiveCategory('all')}
                        >
                          전체
                        </button>
                        {nonCoveredFeeCategories.map((category) => (
                          <button
                            key={category.id}
                            className={`shrink-0 whitespace-nowrap border px-3 py-2 font-body-sm text-body-sm transition-colors ${
                              activeCategory === category.id
                                ? 'border-primary bg-primary text-on-primary'
                                : 'border-hairline bg-canvas-white text-ink-black hover:border-primary'
                            }`}
                            type="button"
                            onClick={() => setActiveCategory(category.id)}
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 font-body-sm text-body-sm text-ink-secondary">
                    총 {filteredItems.length}건
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low">
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          분류
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          항목
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          비용
                        </th>
                        <th className="border border-hairline px-4 py-3 text-center font-body-sm text-body-sm font-semibold text-ink-black">
                          단위
                        </th>
                        <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          비고
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                          <tr key={item.id} className="hover:bg-surface-container-low/60">
                            <td className="whitespace-nowrap border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-secondary">
                              {getCategoryLabel(item.categoryId)}
                            </td>
                            <td className="border border-hairline px-4 py-3 font-body-md text-body-md text-ink-black">
                              {item.name}
                            </td>
                            <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-black">
                              {formatFeeAmount(item)}
                            </td>
                            <td className="border border-hairline px-4 py-3 text-center font-body-sm text-body-sm text-ink-secondary">
                              {item.unit}
                            </td>
                            <td className="border border-hairline px-4 py-3 font-body-sm text-body-sm text-ink-secondary">
                              {item.note ?? '-'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            className="border border-hairline px-4 py-12 text-center font-body-md text-body-md text-ink-secondary"
                            colSpan={5}
                          >
                            검색 결과가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </SectionCard>

              <SectionCard title="안내 사항">
                <ul className="space-y-3">
                  {nonCoveredFeeNotes.map((note) => (
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
                      <p className="mt-1">{nonCoveredFeeContactInfo.reservationPhone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">상담 시간</p>
                      <p className="mt-1">{nonCoveredFeeContactInfo.hours}</p>
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
