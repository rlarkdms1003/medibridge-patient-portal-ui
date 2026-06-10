type MediBridgeLogoProps = {
  className?: string;
};

export default function MediBridgeLogo({ className = 'h-8 w-8' }: MediBridgeLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="16" y="7" width="8" height="26" rx="2" fill="#dce1ff" />
      <rect x="9" y="16.5" width="22" height="7" rx="2" fill="#dce1ff" />
    </svg>
  );
}
