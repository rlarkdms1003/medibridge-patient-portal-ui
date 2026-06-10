import Icon from './Icon';
import { HEALTH_IMAGE } from '../data/homeContent';

export default function HealthCards() {
  return (
    <div className="col-span-1 grid grid-cols-1 gap-gutter md:grid-cols-2 lg:col-span-2">
      <div className="group relative flex min-h-[240px] cursor-pointer overflow-hidden border border-hairline bg-ink-black">
        <img
          alt="Health Info"
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
          src={HEALTH_IMAGE}
        />
        <div className="relative z-10 flex h-full w-full flex-col p-6">
          <div>
            <span className="mb-4 inline-block w-max rounded bg-primary px-2 py-1 font-eyebrow text-eyebrow text-white">
              건강정보
            </span>
            <h3 className="mb-2 font-headline-2 text-headline-2 text-white decoration-white underline-offset-4 group-hover:underline">
              환절기 면역력 관리를 위한 5가지 습관
            </h3>
            <p className="font-body-sm text-body-sm text-surface-container-highest">
              일교차가 큰 요즘, 감기를 예방하고 건강을 지키는 방법을 알아봅니다.
            </p>
          </div>
        </div>
      </div>

      <div className="group flex cursor-pointer flex-col justify-between border border-hairline bg-canvas-white p-6 transition-colors hover:border-primary">
        <div>
          <span className="mb-4 inline-block w-max rounded border border-primary px-2 py-1 font-eyebrow text-eyebrow text-primary">
            전문의 칼럼
          </span>
          <h3 className="mb-2 font-headline-2 text-headline-2 text-ink-black transition-colors group-hover:text-primary">
            디지털 기기 사용이 눈 건강에 미치는 영향
          </h3>
          <p className="line-clamp-3 font-body-sm text-body-sm text-ink-secondary">
            스마트폰과 모니터 사용 시간이 길어지면서 안구건조증 환자가 급증하고 있습니다. 올바른
            기기 사용법과 눈의 피로를 풀어주는 간단한 운동법을 소개합니다.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-hairline bg-surface-container-high">
            <Icon name="person" className="ml-2 mt-2 text-2xl text-ink-muted" />
          </div>
          <div>
            <p className="font-title text-sm text-ink-black">김의사 교수</p>
            <p className="font-body-sm text-xs text-ink-muted">안과 전문의</p>
          </div>
        </div>
      </div>
    </div>
  );
}
