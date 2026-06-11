import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  faqCategories,
  faqContactInfo,
  faqItems,
  type FaqCategory,
} from '../data/faqData';

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
    <div className="border-b border-hairline last:border-b-0">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-container-low/60 md:px-8"
        type="button"
        onClick={onToggle}
      >
        <span className="font-body-md text-body-md font-semibold text-ink-black">
          <span className="mr-2 text-primary">Q.</span>
          {question}
        </span>
        <Icon
          className="mt-0.5 shrink-0 text-ink-secondary"
          name={isOpen ? 'expand_less' : 'expand_more'}
        />
      </button>
      {isOpen && (
        <div className="border-t border-hairline bg-surface-container-low/40 px-6 pb-6 pt-4 md:px-8">
          <p className="whitespace-pre-line font-body-md text-body-md text-ink-secondary">
            <span className="mr-2 font-semibold text-primary">A.</span>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | FaqCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(
    () =>
      faqCategories.reduce(
        (counts, category) => {
          if (category.id === 'all') {
            counts.all = faqItems.length;
          } else {
            counts[category.id] = faqItems.filter((item) => item.category === category.id).length;
          }
          return counts;
        },
        {} as Record<'all' | FaqCategory, number>,
      ),
    [],
  );

  const handleToggle = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">FAQ</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              진료·예약·발급 등 자주 문의하시는 내용을 안내해 드립니다. 원하시는 답변을 찾지 못하신
              경우 예약센터로 문의해 주세요.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <section className="border border-hairline bg-canvas-white">
                <div className="border-b border-hairline bg-surface-container-low p-4 md:p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {faqCategories.map((category) => (
                        <button
                          key={category.id}
                          className={`border px-4 py-2 font-body-sm text-body-sm transition-colors ${
                            activeCategory === category.id
                              ? 'border-primary bg-primary text-on-primary'
                              : 'border-hairline bg-canvas-white text-ink-secondary hover:border-primary hover:text-primary'
                          }`}
                          type="button"
                          onClick={() => {
                            setActiveCategory(category.id);
                            setOpenItemId(null);
                          }}
                        >
                          {category.label}
                          <span className="ml-1 opacity-80">({categoryCounts[category.id]})</span>
                        </button>
                      ))}
                    </div>

                    <label className="relative">
                      <Icon
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
                        name="search"
                      />
                      <input
                        className="w-full border border-hairline bg-canvas-white py-3 pl-11 pr-4 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                        placeholder="궁금한 내용을 검색해 보세요"
                        type="search"
                        value={searchQuery}
                        onChange={(event) => {
                          setSearchQuery(event.target.value);
                          setOpenItemId(null);
                        }}
                      />
                    </label>
                  </div>
                </div>

                {filteredItems.length > 0 ? (
                  <div>
                    {filteredItems.map((item) => (
                      <FaqAccordionItem
                        key={item.id}
                        answer={item.answer}
                        isOpen={openItemId === item.id}
                        question={item.question}
                        onToggle={() => handleToggle(item.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <Icon className="mb-4 text-5xl text-ink-muted" name="help" />
                    <p className="font-headline-2 text-headline-2 text-ink-black">검색 결과가 없습니다</p>
                    <p className="mt-2 font-body-sm text-body-sm text-ink-secondary">
                      다른 키워드로 검색하거나 카테고리를 변경해 보세요.
                    </p>
                  </div>
                )}
              </section>
            </div>

            <aside className="h-fit space-y-gutter lg:sticky lg:top-28">
              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">문의 안내</h2>
                <ul className="space-y-4 font-body-sm text-body-sm text-ink-secondary">
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="call" />
                    <div>
                      <p className="font-semibold text-ink-black">예약센터</p>
                      <p className="mt-1">{faqContactInfo.reservationPhone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">상담 시간</p>
                      <p className="mt-1">{faqContactInfo.hours}</p>
                    </div>
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
                  to="/reservation/confirm"
                >
                  예약 확인 / 취소
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/notices"
                >
                  공지사항
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
              </div>
            </aside>
          </div>
        </PageContainer>
      </PageMain>
      <Footer />
    </div>
  );
}
