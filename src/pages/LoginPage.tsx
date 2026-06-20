import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import { useAuth } from '../contexts/AuthContext';
import { findPatientByLogin } from '../data/patientLoginData';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setIsCodeSent(false);
    setVerificationCode('');
    setIsPhoneVerified(false);
    setError('');
  };

  const handleSendCode = () => {
    if (!phone.trim()) return;
    setIsCodeSent(true);
    setVerificationCode('');
    setIsPhoneVerified(false);
    setError('');
  };

  const handleConfirmCode = () => {
    if (!verificationCode.trim()) {
      setError('인증번호를 입력해 주세요.');
      return;
    }
    setIsPhoneVerified(true);
    setError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!phone.trim()) {
      setError('휴대전화번호를 입력해 주세요.');
      return;
    }

    if (!isPhoneVerified) {
      setError('휴대전화 인증을 완료해 주세요.');
      return;
    }

    if (!birthDate.trim()) {
      setError('생년월일을 입력해 주세요.');
      return;
    }

    const patient = findPatientByLogin(phone, birthDate);
    if (!patient) {
      setError('입력하신 정보와 일치하는 재진 환자를 찾을 수 없습니다.');
      return;
    }

    login({
      name: patient.name,
      patientNumber: patient.patientNumber,
      phone: phone.trim(),
      birthDate: birthDate.trim(),
    });
    navigate('/mypage');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <main className="flex flex-1 items-center justify-center px-margin-mobile py-16 md:px-margin-desktop">
        <div className="w-full max-w-md border border-hairline bg-canvas-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:p-10">
          <header className="mb-8 text-center">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">로그인</h1>
            <p className="mx-auto mt-4 max-w-xs font-body-sm text-body-sm leading-relaxed text-ink-secondary">
              MediBridge 환자 포털은
              <br />
              <span className="font-semibold text-ink-black">본원 재진 환자</span>를 위한 서비스입니다.
            </p>
          </header>

          <div className="mb-6 border border-hairline bg-surface-container-low p-4">
            <p className="flex items-start gap-2 font-body-sm text-body-sm leading-relaxed text-ink-secondary">
              <Icon className="mt-0.5 shrink-0 text-base text-primary" name="info" />
              초진·미등록 환자는 내원 후 환자 등록을 완료하신 뒤 이용해 주세요.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                  onChange={(event) => handlePhoneChange(event.target.value)}
                  autoComplete="tel"
                />
                <button
                  className="w-[8.75rem] shrink-0 whitespace-nowrap border border-hairline bg-surface-container px-4 py-3 font-button text-button text-ink-black transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!phone.trim()}
                  type="button"
                  onClick={handleSendCode}
                >
                  인증번호 전송
                </button>
              </div>
            </div>

            {isCodeSent && (
              <div>
                <label
                  className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black"
                  htmlFor="verificationCode"
                >
                  인증번호
                </label>
                <div className="flex gap-2">
                  <input
                    id="verificationCode"
                    className="min-w-0 flex-1 border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                    placeholder="인증번호를 입력하세요"
                    type="text"
                    inputMode="numeric"
                    value={verificationCode}
                    onChange={(event) => {
                      setVerificationCode(event.target.value);
                      setIsPhoneVerified(false);
                    }}
                    autoComplete="one-time-code"
                  />
                  <button
                    className="w-[8.75rem] shrink-0 whitespace-nowrap border border-hairline bg-surface-container px-4 py-3 font-button text-button text-ink-black transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!verificationCode.trim()}
                    type="button"
                    onClick={handleConfirmCode}
                  >
                    인증
                  </button>
                </div>
              </div>
            )}

            {isPhoneVerified && (
              <p className="flex items-center gap-1 font-body-sm text-body-sm text-primary">
                <Icon className="text-base" name="check_circle" />
                휴대전화 인증이 완료되었습니다.
              </p>
            )}

            <div>
              <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="birthDate">
                생년월일
              </label>
              <input
                id="birthDate"
                className="w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                placeholder="YYYYMMDD (예: 19900101)"
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value.replace(/\D/g, '').slice(0, 8))}
                autoComplete="bday"
              />
            </div>

            {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}

            <button
              className="w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isPhoneVerified}
              type="submit"
            >
              로그인
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
