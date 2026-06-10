import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AdmissionGuidePage from './pages/AdmissionGuidePage';
import AppointmentPage from './pages/AppointmentPage';
import DischargeGuidePage from './pages/DischargeGuidePage';
import DirectionsPage from './pages/DirectionsPage';
import OutpatientGuidePage from './pages/OutpatientGuidePage';
import ReservationGuidePage from './pages/ReservationGuidePage';
import ReservationConfirmPage from './pages/ReservationConfirmPage';
import DiagnosisCertificatePage from './pages/DiagnosisCertificatePage';
import DoctorsPage from './pages/DoctorsPage';
import ExternalFacilitiesPage from './pages/ExternalFacilitiesPage';
import FaqPage from './pages/FaqPage';
import GuestLoginPage from './pages/GuestLoginPage';
import HomePage from './pages/HomePage';
import InternalFacilitiesPage from './pages/InternalFacilitiesPage';
import LoginPage from './pages/LoginPage';
import NoticeDetailPage from './pages/NoticeDetailPage';
import NoticesPage from './pages/NoticesPage';
import MyPage from './pages/MyPage';
import SignupPage from './pages/SignupPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reservation" element={<AppointmentPage />} />
      <Route path="/reservation/guide" element={<ReservationGuidePage />} />
      <Route path="/outpatient/guide" element={<OutpatientGuidePage />} />
      <Route path="/admission/guide" element={<AdmissionGuidePage />} />
      <Route path="/discharge/guide" element={<DischargeGuidePage />} />
      <Route path="/reservation/confirm" element={<ReservationConfirmPage />} />
      <Route path="/directions" element={<DirectionsPage />} />
      <Route path="/notices" element={<NoticesPage />} />
      <Route path="/notices/:id" element={<NoticeDetailPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/documents/diagnosis" element={<DiagnosisCertificatePage />} />
      <Route path="/facilities/internal" element={<InternalFacilitiesPage />} />
      <Route path="/facilities/external" element={<ExternalFacilitiesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/guest" element={<GuestLoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}
