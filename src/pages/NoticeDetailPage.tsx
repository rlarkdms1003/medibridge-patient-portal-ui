import { Link, Navigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  getAdjacentNotices,
  getNoticeById,
  noticeCategoryLabel,
} from '../data/noticesData';

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const notice = id ? getNoticeById(id) : undefined;

  if (!notice) {
    return <Navigate replace to="/notices" />;
  }

  const { prev, next } = getAdjacentNotices(notice.id);

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <Link
            className="mb-6 inline-flex items-center font-body-sm text-body-sm text-ink-secondary transition-colors hover:text-primary"
            to="/notices"
          >
            <Icon className="mr-1 text-base" name="arrow_back" />
            공지사항 목록
          </Link>

          <article className="border border-hairline bg-canvas-white">
            <header className="border-b border-hairline px-6 py-8 md:px-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {notice.isPinned && (
                  <span className="bg-primary px-2 py-1 font-eyebrow text-eyebrow text-on-primary">중요</span>
                )}
                <span className="border border-hairline px-2 py-1 font-eyebrow text-eyebrow text-ink-secondary">
                  {noticeCategoryLabel[notice.category]}
                </span>
              </div>
              <h1 className="font-headline-1 text-headline-1 text-ink-black">{notice.title}</h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-body-sm text-body-sm text-ink-muted">
                <span>등록일 {notice.date}</span>
                <span>조회 {notice.views.toLocaleString()}</span>
              </div>
            </header>

            <div className="px-6 py-8 md:px-8">
              {notice.content.split('\n\n').map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-4 whitespace-pre-line font-body-md text-body-md leading-relaxed text-ink-black last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <footer className="border-t border-hairline">
              {prev && (
                <Link
                  className="group flex items-center justify-between gap-4 border-b border-hairline px-6 py-4 transition-colors hover:bg-surface-container-low md:px-8"
                  to={`/notices/${prev.id}`}
                >
                  <span className="shrink-0 font-body-sm text-body-sm text-ink-muted">이전글</span>
                  <span className="truncate font-body-md text-body-md text-ink-black group-hover:text-primary">
                    {prev.title}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-surface-container-low md:px-8"
                  to={`/notices/${next.id}`}
                >
                  <span className="shrink-0 font-body-sm text-body-sm text-ink-muted">다음글</span>
                  <span className="truncate font-body-md text-body-md text-ink-black group-hover:text-primary">
                    {next.title}
                  </span>
                </Link>
              )}
            </footer>
          </article>

          <div className="mt-6 flex justify-center">
            <Link
              className="inline-flex items-center border border-hairline bg-canvas-white px-6 py-3 font-body-md text-body-md text-ink-black transition-colors hover:border-primary hover:text-primary"
              to="/notices"
            >
              목록으로
            </Link>
          </div>
        </PageContainer>
      </PageMain>
      <Footer />
    </div>
  );
}
