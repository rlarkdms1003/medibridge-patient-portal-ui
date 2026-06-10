import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

export default function GuestLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [patientNumber, setPatientNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      name: name.trim() || '비회원',
      patientNumber: patientNumber.trim() || undefined,
      phone: phone.trim() || undefined,
      loginType: 'guest',
    });
    navigate('/mypage');
  };

  const handleSendCode = () => {
    if (!phone.trim()) return;
    setIsCodeSent(true);
  };

  const handleConfirmCode = () => {};

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <main className="flex flex-1 items-center justify-center px-margin-mobile py-16 md:px-margin-desktop">
        <div className="w-full max-w-lg border border-hairline bg-canvas-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:p-10">
          <h1 className="mb-8 text-center font-headline-1 text-headline-1 text-ink-black">비회원 로그인</h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="name">
                이름
              </label>
              <input
                id="name"
                className="w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                placeholder="이름을 입력하세요"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </div>

            <div>
              <label
                className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black"
                htmlFor="patientNumber"
              >
                진찰권 번호(환자번호)
              </label>
              <input
                id="patientNumber"
                className="w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                placeholder="진찰권 번호(환자번호)를 입력하세요"
                type="text"
                value={patientNumber}
                onChange={(event) => setPatientNumber(event.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="phone">
                휴대전화번호
              </label>
              <div className="flex gap-2">
                <input
                  id="phone"
                  className="min-w-0 flex-1 border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                  placeholder="휴대전화번호를 입력하세요"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                />
                <button
                  className="shrink-0 border border-hairline bg-surface-container px-4 py-3 font-button text-button text-ink-black transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  onClick={handleSendCode}
                  disabled={!phone.trim()}
                >
                  인증번호 전송
                </button>
              </div>
              {isCodeSent && (
                <div className="mt-3 flex gap-2">
                  <input
                    id="verificationCode"
                    className="min-w-0 flex-1 border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                    placeholder="인증번호를 입력하세요"
                    type="text"
                    inputMode="numeric"
                    value={verificationCode}
                    onChange={(event) => setVerificationCode(event.target.value)}
                    autoComplete="one-time-code"
                  />
                  <button
                    className="shrink-0 border border-hairline bg-surface-container px-5 py-3 font-button text-button text-ink-black transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={handleConfirmCode}
                    disabled={!verificationCode.trim()}
                  >
                    인증
                  </button>
                </div>
              )}
            </div>

            <div className="rounded border border-hairline bg-surface-container-low p-4">
              <p className="mb-2 font-body-sm text-body-sm font-semibold text-ink-black">
                ※ 개인정보 수집 및 이용 고지
              </p>
              <p className="font-body-sm text-body-sm leading-relaxed text-ink-secondary">
                개인정보 보호법 제15조제1항제4호에 따라, 정보주체와 체결한 계약으로 정보주체의 동의 없이
                개인정보를 수집·이용합니다.
              </p>
              <ul className="mt-3 space-y-1 font-body-sm text-body-sm text-ink-secondary">
                <li>1. 수집/이용 목적 : 비회원 환자의 진료예약 신청, 확인 및 취소에 대한 이용기록 보관</li>
                <li>2. 수집하는 항목 : 이름, 환자등록번호(진찰권번호), 휴대전화번호</li>
                <li>
                  3. 개인정보의 보유 및 이용기간 : <span className="font-semibold text-ink-black">2년</span>
                </li>
              </ul>
            </div>

            <button
              className="w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80"
              type="submit"
            >
              비회원 로그인
            </button>
          </form>

          <div className="mt-8 border-t border-hairline pt-6 text-center">
            <Link
              className="font-body-sm text-body-sm text-ink-secondary hover:text-primary hover:underline"
              to="/login"
            >
              회원 로그인
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
