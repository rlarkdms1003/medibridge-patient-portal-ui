import { useState } from 'react';
import Icon from './Icon';
import { HERO_IMAGE } from '../data/homeContent';

export default function Hero() {
  const [query, setQuery] = useState('');

  return (
    <section className="relative overflow-hidden bg-surface-container-low">
      <div className="absolute inset-0 z-0">
        <img
          alt="Hospital Hero"
          className="h-full w-full object-cover opacity-20"
          src={HERO_IMAGE}
        />
      </div>
      <div className="relative z-10 mx-auto flex max-w-container-max flex-col items-center gap-6 px-margin-mobile py-24 text-center md:px-margin-desktop md:py-32">
        <h1 className="max-w-2xl font-display-1 text-display-1 leading-tight text-ink-black">
          환자 중심의 의료 혁신,
          <br />
          메디브릿지가 함께합니다
        </h1>
        <p className="mt-4 max-w-xl font-body-md text-body-md text-ink-secondary">
          최고의 의료진과 첨단 시스템으로 빠르고 정확한 진료 서비스를 제공합니다.
        </p>
        <div className="mt-8 flex w-full max-w-3xl border border-primary bg-canvas-white shadow-sm">
          <div className="flex flex-grow items-center px-4">
            <Icon name="search" className="mr-3 text-ink-muted" />
            <input
              className="w-full border-none bg-transparent py-4 font-body-md text-ink-black focus:outline-none"
              placeholder="검색어를 입력해주세요."
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            className="flex items-center justify-center bg-primary px-8 font-button text-button text-white transition-colors hover:bg-tertiary"
            type="button"
          >
            검색
          </button>
        </div>
      </div>
    </section>
  );
}
