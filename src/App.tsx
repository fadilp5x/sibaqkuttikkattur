import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { SiteProvider } from './lib/site';
import { ThemeProvider } from './lib/theme';
import ErrorBoundary from './components/ErrorBoundary';
import Preloader from './components/Preloader';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import FloatingPlay from './components/FloatingPlay';
import Home from './pages/Home';
import About from './pages/About';
import PartnersPage from './pages/PartnersPage';
import GamePage from './pages/GamePage';
import BookFestPage from './pages/BookFestPage';
import TeamPage from './pages/TeamPage';
import MediaPage from './pages/MediaPage';
import DonationPage from './pages/DonationPage';
import PromotePage from './pages/PromotePage';
import SponsorsPage from './pages/SponsorsPage';
import NotFound from './pages/NotFound';
import AdminApp from './admin/AdminApp';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <>
      {!isAdmin && <SiteHeader />}
      <main>{children}</main>
      {!isAdmin && <SiteFooter />}
      {!isAdmin && <FloatingPlay />}
    </>
  );
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SiteProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Preloader onDone={() => setPreloaderDone(true)} />
          <div 
            className={preloaderDone ? '' : 'h-[100svh] overflow-hidden opacity-0 pointer-events-none select-none'} 
            {...(!preloaderDone ? { inert: '' } : {})}
          >
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/edumart-book-fest" element={<BookFestPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/donation" element={<DonationPage />} />
                <Route path="/promote" element={<PromotePage />} />
                <Route path="/sponsors" element={<SponsorsPage />} />
                <Route path="/admin/*" element={<AdminApp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </div>
        </BrowserRouter>
      </SiteProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
