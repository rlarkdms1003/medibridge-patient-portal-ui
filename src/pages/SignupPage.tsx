import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          <h1 className="mb-8 text-center font-headline-1 text-headline-1 text-ink-black">회원가입</h1>

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
              <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="userId">
                아이디
              </label>
              <input
                id="userId"
                className="w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                placeholder="아이디를 입력하세요"
                type="text"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                autoComplete="username"
              />
            </div>

            <div>
              <label
                className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black"
                htmlFor="password"
              >
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="w-full border border-hairline bg-canvas-white px-4 py-3 pr-12 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                  placeholder="비밀번호를 입력하세요"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                />
                <button
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted transition-colors hover:text-primary"
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} />
                </button>
              </div>
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

            <button
              className="w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80"
              type="submit"
            >
              회원가입
            </button>
          </form>

          <div className="mt-8 border-t border-hairline pt-6 text-center">
            <Link
              className="font-body-sm text-body-sm text-ink-secondary hover:text-primary hover:underline"
              to="/login"
            >
              로그인
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
