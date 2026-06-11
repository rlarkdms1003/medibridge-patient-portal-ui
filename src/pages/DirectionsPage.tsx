import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import PageContainer, { PageMain } from '../components/PageContainer';
import {
  busRoutes,
  carRoutes,
  hospitalInfo,
  parkingInfo,
  subwayRoutes,
  transportTabs,
  type TransportTab,
} from '../data/directionsData';

export default function DirectionsPage() {
  const [activeTab, setActiveTab] = useState<TransportTab>('subway');

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <PageMain>
        <PageContainer>
          <header className="mb-8">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">오시는길</h1>
            <p className="mt-3 font-body-md text-body-md text-ink-secondary">
              MediBridge 재활정형외과로 오시는 길과 교통·주차 안내를 확인하실 수 있습니다.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <div className="space-y-gutter lg:col-span-2">
              <section className="overflow-hidden border border-hairline bg-canvas-white">
                <div className="border-b border-hairline bg-surface-container-low px-6 py-4">
                  <h2 className="font-headline-2 text-headline-2 text-ink-black">위치 안내</h2>
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[linear-gradient(180deg,#e7eef8_0%,#f3f4f5_55%,#edeeef_100%)] md:aspect-[21/9]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        'linear-gradient(#dce1ff 1px, transparent 1px), linear-gradient(90deg, #dce1ff 1px, transparent 1px)',
                      backgroundSize: '48px 48px',
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
                      <Icon className="text-4xl" name="location_on" />
                    </div>
                    <p className="font-headline-2 text-headline-2 text-ink-black">{hospitalInfo.name}</p>
                    <p className="mt-2 max-w-lg font-body-md text-body-md text-ink-secondary">
                      {hospitalInfo.address}
                    </p>
                    <p className="mt-3 font-body-sm text-body-sm text-ink-muted">
                      아래 버튼을 눌러 상세 지도에서 경로를 확인하세요.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 border-t border-hairline px-6 py-4">
                  <a
                    className="inline-flex items-center gap-2 border border-hairline px-4 py-2 font-body-sm text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(hospitalInfo.address)}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon className="text-primary" name="map" />
                    네이버 지도
                  </a>
                  <a
                    className="inline-flex items-center gap-2 border border-hairline px-4 py-2 font-body-sm text-body-sm text-ink-black transition-colors hover:border-primary hover:text-primary"
                    href={`https://map.kakao.com/link/search/${encodeURIComponent(hospitalInfo.address)}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon className="text-primary" name="location_on" />
                    카카오맵
                  </a>
                </div>
              </section>

              <section className="border border-hairline bg-canvas-white p-6 md:p-8">
                <div className="mb-6 flex flex-wrap gap-2 border-b border-hairline">
                  {transportTabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-3 font-body-md text-body-md transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-ink-secondary hover:text-ink-black'
                      }`}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <Icon name={tab.icon} />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === 'subway' && (
                  <div className="space-y-4">
                    {subwayRoutes.map((route) => (
                      <article key={route.station} className="border border-hairline p-5">
                        <h3 className="font-title text-title text-ink-black">{route.station}</h3>
                        <p className="mt-2 font-body-md text-body-md text-primary">{route.exit}</p>
                        <p className="mt-1 font-body-md text-body-md text-ink-black">{route.walk}</p>
                        <p className="mt-2 font-body-sm text-body-sm text-ink-secondary">{route.detail}</p>
                      </article>
                    ))}
                  </div>
                )}

                {activeTab === 'bus' && (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low">
                          <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                            정류장
                          </th>
                          <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                            버스번호
                          </th>
                          <th className="border border-hairline px-4 py-3 text-left font-body-sm text-body-sm font-semibold text-ink-black">
                            안내
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {busRoutes.map((route) => (
                          <tr key={route.stop}>
                            <td className="border border-hairline px-4 py-4 font-body-md text-body-md text-ink-black">
                              {route.stop}
                            </td>
                            <td className="border border-hairline px-4 py-4 font-body-sm text-body-sm text-ink-secondary">
                              {route.buses.join(', ')}
                            </td>
                            <td className="border border-hairline px-4 py-4 font-body-sm text-body-sm text-ink-secondary">
                              {route.direction}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'car' && (
                  <div className="space-y-4">
                    {carRoutes.map((route) => (
                      <article key={route.from} className="border border-hairline p-5">
                        <h3 className="font-title text-title text-ink-black">{route.from}</h3>
                        <p className="mt-2 font-body-md text-body-md text-ink-secondary">{route.route}</p>
                      </article>
                    ))}
                  </div>
                )}

                {activeTab === 'parking' && (
                  <div className="space-y-5">
                    <p className="mb-8 flex gap-2 font-body-md text-body-md font-semibold text-ink-black">
                      <Icon className="shrink-0 text-primary" name="info" />
                      {parkingInfo.notice}
                    </p>
                    <dl className="space-y-4 font-body-md text-body-md">
                      <div>
                        <dt className="mb-1 font-body-sm text-body-sm font-semibold text-ink-black">주차장 위치</dt>
                        <dd className="text-ink-secondary">{parkingInfo.location}</dd>
                      </div>
                      <div>
                        <dt className="mb-1 font-body-sm text-body-sm font-semibold text-ink-black">이용 시간</dt>
                        <dd className="text-ink-secondary">{parkingInfo.hours}</dd>
                      </div>
                      <div>
                        <dt className="mb-1 font-body-sm text-body-sm font-semibold text-ink-black">요금 안내</dt>
                        <dd className="text-ink-secondary">{parkingInfo.fee}</dd>
                      </div>
                    </dl>
                    <ul className="space-y-2 border-t border-hairline pt-4 font-body-sm text-body-sm text-ink-secondary">
                      {parkingInfo.tips.map((tip) => (
                        <li key={tip}>· {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </div>

            <aside className="h-fit space-y-gutter lg:sticky lg:top-28">
              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">병원 정보</h2>
                <dl className="space-y-4 font-body-md text-body-md">
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">병원명</dt>
                    <dd className="text-ink-black">{hospitalInfo.name}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">주소</dt>
                    <dd className="text-ink-black">
                      ({hospitalInfo.zipCode}) {hospitalInfo.address}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">대표전화</dt>
                    <dd className="text-ink-black">{hospitalInfo.phone}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 font-body-sm text-body-sm text-ink-secondary">팩스</dt>
                    <dd className="text-ink-black">{hospitalInfo.fax}</dd>
                  </div>
                </dl>
              </div>

              <div className="border border-hairline bg-canvas-white p-6 md:p-8">
                <h2 className="mb-4 font-headline-2 text-headline-2 text-ink-black">이용 안내</h2>
                <ul className="space-y-3 font-body-sm text-body-sm text-ink-secondary">
                  <li className="flex gap-2">
                    <Icon className="shrink-0 text-primary" name="info" />
                    대중교통 이용을 권장합니다.
                  </li>
                  <li className="flex gap-2">
                    <Icon className="shrink-0 text-primary" name="schedule" />
                    외래 진료: 평일 09:00 ~ 18:00 / 토요일 09:00 ~ 13:00
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
