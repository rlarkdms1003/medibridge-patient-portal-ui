import Footer from '../components/Footer';
import Header from '../components/Header';
import HealthCards from '../components/HealthCards';
import Hero from '../components/Hero';
import NoticeBoard from '../components/NoticeBoard';
import QuickTaskMatrix from '../components/QuickTaskMatrix';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <main>
        <Hero />
        <QuickTaskMatrix />
        <section className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile py-24 md:px-margin-desktop lg:grid-cols-3">
          <NoticeBoard />
          <HealthCards />
        </section>
      </main>
      <Footer />
    </div>
  );
}
