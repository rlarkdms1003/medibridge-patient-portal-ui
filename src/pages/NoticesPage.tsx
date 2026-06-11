import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  noticeCategories,
  noticeCategoryLabel,
  notices,
  type NoticeCategory,
} from '../data/noticesData';

export default function NoticesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | NoticeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return notices.filter((notice) => {
      const matchesCategory = activeCategory === 'all' || notice.category === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        notice.title.toLowerCase().includes(query) ||
        notice.content.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(
    () =>
      noticeCategories.reduce(
        (counts, category) => {
          if (category.id === 'all') {
            counts.all = notices.length;
          } else {
            counts[category.id] = notices.filter((notice) => notice.category === category.id).length;
          }
          return counts;
        },
        {} as Record<'all' | NoticeCategory, number>,
      ),
    [],
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">공지사항</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              병원 운영, 진료, 시설 관련 소식을 확인하실 수 있습니다.
            </p>
          </header>

          <section className="border border-hairline bg-canvas-white">
            <div className="border-b border-hairline bg-surface-container-low p-4 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {noticeCategories.map((category) => (
                    <button
                      key={category.id}
                      className={`border px-4 py-2 font-body-sm text-body-sm transition-colors ${
                        activeCategory === category.id
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-hairline bg-canvas-white text-ink-secondary hover:border-primary hover:text-primary'
                      }`}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.label}
                      <span className="ml-1 opacity-80">({categoryCounts[category.id]})</span>
                    </button>
                  ))}
                </div>

                <label className="relative w-full md:max-w-xs">
                  <Icon
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                    name="search"
                  />
                  <input
                    className="w-full border border-hairline bg-canvas-white py-2.5 pl-10 pr-4 font-body-sm text-body-sm text-ink-black outline-none transition-colors placeholder:text-ink-muted focus:border-primary"
                    placeholder="제목 또는 내용 검색"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </label>
              </div>
            </div>

            {filteredNotices.length > 0 ? (
              <>
                <div className="divide-y divide-hairline md:hidden">
                  {filteredNotices.map((notice) => (
                    <Link
                      key={notice.id}
                      className="group block px-4 py-4 transition-colors hover:bg-surface-container-low"
                      to={`/notices/${notice.id}`}
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        {notice.isPinned && (
                          <span className="bg-primary px-2 py-0.5 font-eyebrow text-eyebrow text-on-primary">
                            중요
                          </span>
                        )}
                        <span className="border border-hairline px-2 py-0.5 font-eyebrow text-eyebrow text-ink-secondary">
                          {noticeCategoryLabel[notice.category]}
                        </span>
                        <span className="font-body-sm text-body-sm text-ink-muted">{notice.date}</span>
                      </div>
                      <p className="font-body-md text-body-md text-ink-black group-hover:text-primary">
                        {notice.title}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[760px] border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low">
                        <th className="w-16 border-b border-hairline px-4 py-3 text-center font-body-sm text-body-sm font-semibold text-ink-black">
                          번호
                        </th>
                        <th className="w-28 border-b border-hairline px-4 py-3 text-center font-body-sm text-body-sm font-semibold text-ink-black">
                          분류
                        </th>
                        <th className="border-b border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                          제목
                        </th>
                        <th className="w-28 border-b border-hairline px-4 py-3 text-center font-body-sm text-body-sm font-semibold text-ink-black">
                          등록일
                        </th>
                        <th className="w-20 border-b border-hairline px-4 py-3 text-center font-body-sm text-body-sm font-semibold text-ink-black">
                          조회
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNotices.map((notice, index) => (
                        <tr key={notice.id} className="transition-colors hover:bg-surface-container-low">
                          <td className="border-b border-hairline px-4 py-4 text-center font-body-sm text-body-sm text-ink-muted">
                            {notice.isPinned ? (
                              <Icon className="text-primary" name="push_pin" />
                            ) : (
                              filteredNotices.length - index
                            )}
                          </td>
                          <td className="border-b border-hairline px-4 py-4 text-center">
                            <span className="inline-block border border-hairline px-2 py-1 font-eyebrow text-eyebrow text-ink-secondary">
                              {noticeCategoryLabel[notice.category]}
                            </span>
                          </td>
                          <td className="border-b border-hairline px-4 py-4">
                            <Link
                              className="group inline-flex max-w-full items-center gap-2 font-body-md text-body-md text-ink-black hover:text-primary"
                              to={`/notices/${notice.id}`}
                            >
                              {notice.isPinned && (
                                <span className="shrink-0 bg-primary px-2 py-0.5 font-eyebrow text-eyebrow text-on-primary">
                                  중요
                                </span>
                              )}
                              <span className="truncate">{notice.title}</span>
                            </Link>
                          </td>
                          <td className="border-b border-hairline px-4 py-4 text-center font-body-sm text-body-sm text-ink-muted">
                            {notice.date}
                          </td>
                          <td className="border-b border-hairline px-4 py-4 text-center font-body-sm text-body-sm text-ink-muted">
                            {notice.views.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <Icon className="mb-4 text-5xl text-ink-muted" name="campaign" />
                <p className="font-headline-2 text-headline-2 text-ink-black">검색 결과가 없습니다</p>
                <p className="mt-2 font-body-sm text-body-sm text-ink-secondary">
                  다른 검색어나 분류를 선택해 주세요.
                </p>
              </div>
            )}
          </section>
        </PageContainer>
      </PageMain>
      <Footer />
    </div>
  );
}
