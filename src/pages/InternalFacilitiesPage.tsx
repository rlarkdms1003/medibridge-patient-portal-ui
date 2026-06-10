import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import { hospitalInfo } from '../data/directionsData';
import {
  facilityCategories,
  facilityCategoryLabel,
  facilityContact,
  facilityTips,
  floorGuide,
  internalFacilities,
  type FacilityCategory,
} from '../data/facilitiesData';

function FacilityCard({ facility }: { facility: (typeof internalFacilities)[number] }) {
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
              {facilityCategoryLabel[facility.category]}
            </span>
          </div>

          <dl className="space-y-2 font-body-sm text-body-sm">
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
            {facility.priceRange && (
              <div className="flex gap-2">
                <dt className="shrink-0 font-semibold text-ink-black">가격</dt>
                <dd className="text-ink-secondary">{facility.priceRange}</dd>
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

export default function InternalFacilitiesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | FacilityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFacilities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return internalFacilities.filter((facility) => {
      const matchesCategory = activeCategory === 'all' || facility.category === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        facility.name.toLowerCase().includes(query) ||
        facility.location.toLowerCase().includes(query) ||
        facility.menu?.toLowerCase().includes(query) ||
        facility.items?.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(
    () =>
      facilityCategories.reduce(
        (counts, category) => {
          if (category.id === 'all') {
            counts.all = internalFacilities.length;
          } else {
            counts[category.id] = internalFacilities.filter(
              (facility) => facility.category === category.id,
            ).length;
          }
          return counts;
        },
        {} as Record<'all' | FacilityCategory, number>,
      ),
    [],
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <div className="mb-8 border border-hairline bg-canvas-white p-6 md:p-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">원내 편의시설</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              {hospitalInfo.name} 내 이용 가능한 편의시설을 안내합니다. 전문 병원 규모에 맞춰
              로비 중심의 소규모 시설을 운영하고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <section className="border border-hairline bg-canvas-white">
                <div className="border-b border-hairline bg-surface-container-low p-4 md:p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {facilityCategories.map((category) => (
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
                        placeholder="시설명, 위치, 메뉴 검색"
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
                      <FacilityCard key={facility.id} facility={facility} />
                    ))
                  )}
                </div>
              </section>

              <section className="border border-hairline bg-canvas-white">
                <div className="border-b border-hairline bg-surface-container-low px-6 py-4 md:px-8">
                  <h2 className="font-headline-2 text-headline-2 text-ink-black">이용 안내</h2>
                </div>
                <ul className="space-y-2 p-6 md:p-8">
                  {facilityTips.map((tip) => (
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
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">층별 안내</h2>
                <div className="space-y-5">
                  {floorGuide.map((floor) => (
                    <div key={floor.floor}>
                      <h3 className="mb-2 font-title text-sm text-ink-black">{floor.floor}</h3>
                      <ul className="space-y-1 font-body-sm text-body-sm text-ink-secondary">
                        {floor.facilities.map((item) => (
                          <li key={item}>· {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="divide-y divide-hairline border border-hairline bg-canvas-white">
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/directions"
                >
                  오시는길
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/facilities/external"
                >
                  외부 편의시설
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
                <Link
                  className="flex items-center justify-between px-4 py-3 font-body-md text-body-md text-ink-black transition-colors hover:bg-surface-container-low md:px-6 md:py-4"
                  to="/faq"
                >
                  FAQ
                  <Icon className="text-primary" name="chevron_right" />
                </Link>
              </div>

              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">문의</h2>
                <ul className="space-y-4 font-body-sm text-body-sm text-ink-secondary">
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="call" />
                    <div>
                      <p className="font-semibold text-ink-black">원내 안내</p>
                      <p className="mt-1">{facilityContact.phone}</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    <div>
                      <p className="font-semibold text-ink-black">안내 시간</p>
                      <p className="mt-1">{facilityContact.hours}</p>
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
