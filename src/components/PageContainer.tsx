import type { ReactNode } from 'react';

export function PageMain({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <main className={`flex-1 py-12 md:py-16 ${className}`.trim()}>{children}</main>;
}

export default function PageContainer({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop ${className}`.trim()}
    >
      {children}
    </div>
  );
}
