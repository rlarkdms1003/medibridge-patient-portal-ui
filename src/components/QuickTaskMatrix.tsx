import { Link } from 'react-router-dom';
import Icon from './Icon';
import { quickTasks } from '../data/homeContent';

function isInternalRoute(href: string) {
  return href.startsWith('/');
}

export default function QuickTaskMatrix() {
  return (
    <section className="relative z-20 mx-auto mt-8 max-w-container-max px-margin-mobile md:px-margin-desktop">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-gutter">
        {quickTasks.map((task) => {
          const className =
            'group flex flex-col items-center border border-hairline bg-canvas-white p-6 text-center text-ink-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary md:p-8';
          const content = (
            <>
              <Icon
                name={task.icon}
                className="mb-4 text-4xl text-primary transition-colors group-hover:text-on-primary"
              />
              <h3 className="mb-2 font-title text-title transition-colors group-hover:text-white">
                {task.title}
              </h3>
              <p className="hidden whitespace-pre-line font-body-sm text-body-sm text-ink-secondary transition-colors group-hover:text-primary-fixed-dim md:block">
                {task.description}
              </p>
            </>
          );

          return isInternalRoute(task.href) ? (
            <Link key={task.id} className={className} to={task.href}>
              {content}
            </Link>
          ) : (
            <a key={task.id} className={className} href={task.href}>
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
