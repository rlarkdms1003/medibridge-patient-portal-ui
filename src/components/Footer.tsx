import { footerLinks } from '../data/homeContent';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-hairline bg-surface-container-low dark:bg-inverse-surface">
      <div className="mx-auto flex w-full max-w-container-max flex-col gap-4 px-margin-mobile py-12 md:flex-row md:items-center md:justify-between md:px-margin-desktop">
        <div className="font-body-sm text-body-sm text-ink-muted">
          <p>
            서울특별시 강남구 테헤란로 123 메디브릿지 빌딩 | 대표전화: 1588-1234 | 팩스: 02-123-4567
          </p>
          <p>© 2024 MediBridge Medical Center. All Rights Reserved.</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-4 font-body-sm text-body-sm">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="text-ink-muted underline hover:text-primary"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
