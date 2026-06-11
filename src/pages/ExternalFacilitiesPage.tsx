import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import { hospitalInfo } from '../data/directionsData';
import {
  externalAreaGuide,
  externalFacilities,
  externalFacilityCategories,
  externalFacilityCategoryLabel,
  externalFacilityTips,
  facilityContact,
  type ExternalFacilityCategory,
  type ExternalFacilityItem,
} from '../data/facilitiesData';

function ExternalFacilityCard({ facility }: { facility: ExternalFacilityItem }) {
  return (
    <article className="border border-hairline bg-canvas-white p-5 transition-colors hover:border-primary md:p-6">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary/10 text-primary">
          <Icon className="text-2xl" name={facility.icon} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="font-title text-title text-ink-black">{facility.name}</h3>
            <span className="border border-primary px-2 py-0.5 font-eyebrow text-eyebrow text-primary">
              {externalFacilityCategoryLabel[facility.category]}
            </span>
            <span className="font-body-sm text-body-sm text-ink-muted">{facility.area}</span>
          </div>

          <dl className="space-y-2 font-body-sm text-body-sm">
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-ink-black">병원에서</dt>
              <dd className="text-ink-secondary">{facility.walkTime}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-ink-black">운영시간</dt>
              <dd className="text-ink-secondary">{facility.hours}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-ink-black">위치</dt>
              <dd className="text-ink-secondary">{facility.location}</dd>
            </div>
            {facility.phone && (
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-ink-black">전화</dt>
                <dd className="text-ink-secondary">{facility.phone}</dd>
              </div>
            )}
            {facility.menu && (
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-ink-black">메뉴</dt>
                <dd className="text-ink-secondary">{facility.menu}</dd>
              </div>
            )}
            {facility.items && (
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-ink-black">취급품목</dt>
                <dd className="text-ink-secondary">{facility.items}</dd>
              </div>
            )}
          </dl>

          {facility.notes && facility.notes.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-hairline pt-3 font-body-sm text-body-sm text-ink-muted">
              {facility.notes.map((note) => (
                <li key={note}>※ {note}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ExternalFacilitiesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | ExternalFacilityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFacilities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return externalFacilities.filter((facility) => {
      const matchesCategory = activeCategory === 'all' || facility.category === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        facility.name.toLowerCase().includes(query) ||
        facility.location.toLowerCase().includes(query) ||
        facility.area.toLowerCase().includes(query) ||
        facility.menu?.toLowerCase().includes(query) ||
        facility.items?.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(
    () =>
      externalFacilityCategories.reduce(
        (counts, category) => {
          if (category.id === 'all') {
            counts.all = externalFacilities.length;
          } else {
            counts[category.id] = externalFacilities.filter(
              (facility) => facility.category === category.id,
            ).length;
          }
          return counts;
        },
        {} as Record<'all' | ExternalFacilityCategory, number>,
      ),
    [],
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">외부 편의시설</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              {hospitalInfo.name} 주변(강남역·테헤란로 일대)에서 이용 가능한 식당, 매장, 약국 등을
              안내합니다. 병원과 무관한 인근 상가 정보입니다.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <section className="border border-hairline bg-canvas-white">
                <div className="border-b border-hairline bg-surface-container-low p-4 md:p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {externalFacilityCategories.map((category) => (
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

                    <label className="relative block">
                      <Icon
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
                        name="search"
                      />
                      <input
                        className="w-full border border-hairline bg-canvas-white py-3 pl-11 pr-4 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                        placeholder="시설명, 지역, 위치 검색"
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-4 p-4 md:p-6">
                  {filteredFacilities.length === 0 ? (
                    <p className="py-12 text-center font-body-md text-body-md text-ink-muted">
                      검색 조건에 맞는 편의시설이 없습니다.
                    </p>
                  ) : (
                    filteredFacilities.map((facility) => (
                      <ExternalFacilityCard key={facility.id} facility={facility} />
                    ))
                  )}
                </div>
              </section>

              <section className="border border-hairline bg-canvas-white">
                <div className="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
                  <h2 className="font-headline-2 text-headline-2 text-ink-black">이용 안내</h2>
                </div>
                <ul className="space-y-2 p-6 md:p-8">
                  {externalFacilityTips.map((tip) => (
                    <li
                      key={tip}
                      className="flex gap-2 font-body-sm text-body-sm text-ink-secondary"
                    >
                      <Icon className="mt-0.5 shrink-0 text-primary" name="info" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="h-fit space-y-gutter lg:sticky lg:top-28">
              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">지역별 안내</h2>
                <div className="space-y-5">
                  {externalAreaGuide.map((guide) => (
                    <div key={guide.area}>
                      <h3 className="mb-1 font-title text-sm text-ink-black">{guide.area}</h3>
                      <p className="mb-2 font-body-sm text-body-sm text-ink-muted">
                        {guide.description}
                      </p>
                      <ul className="space-y-1 font-body-sm text-body-sm text-ink-secondary">
                        {guide.spots.map((spot) => (
                          <li key={spot}>· {spot}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-hairline border border-hairline bg-canvas-white">
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/facilities/internal"
                >
                  원내 편의시설
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/directions"
                >
                  오시는길
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
                <a
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(hospitalInfo.address)}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  네이버 지도
                  <Icon className="text-primary" name="open_in_new" />
                </a>
              </div>

              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">문의</h2>
                <ul className="space-y-4 font-body-sm text-body-sm text-ink-secondary">
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="call" />
                    <div>
                      <p className="font-semibold text-ink-black">병원 안내</p>
                      <p className="mt-1">{facilityContact.phone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="location_on" />
                    <div>
                      <p className="font-semibold text-ink-black">병원 주소</p>
                      <p className="mt-1">{hospitalInfo.address}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </PageContainer>
      </PageMain>
      <Footer />
    </div>
  );
}
