import { Link } from 'react-router-dom';
import Icon from './Icon';
import { recentNotices } from '../data/noticesData';

export default function NoticeBoard() {
  return (
    <div className="col-span-1 flex flex-col border border-hairline bg-canvas-white">
      <div className="flex items-center justify-between border-b border-hairline bg-surface-container-low p-4">
        <h3 className="font-headline-2 text-headline-2 text-ink-black">공지사항</h3>
        <Link className="flex items-center font-body-sm text-body-sm text-primary hover:underline" to="/notices">
          더보기 <Icon name="chevron_right" className="ml-1 text-sm" />
        </Link>
      </div>
      <div className="flex flex-col gap-0 p-4">
        {recentNotices.map((notice, index) => (
          <Link
            key={notice.id}
            className={`group flex items-center justify-between px-2 py-3 transition-colors hover:bg-surface-container-low ${
              index < recentNotices.length - 1 ? 'border-b border-surface-container' : ''
            }`}
            to={`/notices/${notice.id}`}
          >
            <span className="mr-4 truncate font-body-sm text-body-sm text-ink-black group-hover:text-primary">
              {notice.title}
            </span>
            <span className="whitespace-nowrap font-body-sm text-body-sm text-ink-muted">
              {notice.date}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
