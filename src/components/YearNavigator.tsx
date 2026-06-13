import Icon from './Icon';

type YearNavigatorProps = {
  year: number;
  onYearChange: (year: number) => void;
};

export function getCurrentYear() {
  return new Date().getFullYear();
}

export default function YearNavigator({ year, onYearChange }: YearNavigatorProps) {
  const currentYear = getCurrentYear();
  const isCurrentYear = year === currentYear;

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="이전 연도"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-canvas-white transition-colors hover:border-primary"
        type="button"
        onClick={() => onYearChange(year - 1)}
      >
        <Icon name="chevron_left" />
      </button>
      <span className="min-w-[80px] text-center font-body-md text-body-md font-semibold text-ink-black">
        {year}년
      </span>
      <button
        aria-label="다음 연도"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline bg-canvas-white transition-colors hover:border-primary"
        type="button"
        onClick={() => onYearChange(year + 1)}
      >
        <Icon name="chevron_right" />
      </button>
      <button
        aria-label="올해로 이동"
        className="rounded-lg border border-primary/20 bg-secondary-fixed px-3 py-2 font-body-sm text-body-sm text-primary transition-colors hover:border-primary disabled:cursor-not-allowed disabled:border-hairline disabled:bg-canvas-white disabled:text-ink-muted"
        disabled={isCurrentYear}
        type="button"
        onClick={() => onYearChange(currentYear)}
      >
        오늘
      </button>
    </div>
  );
}
