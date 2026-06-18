import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({
      name: userId.trim() || '회원',
      userId: userId.trim() || undefined,
      loginType: 'member',
    }, password);
    navigate('/mypage');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <main className="flex flex-1 items-center justify-center px-margin-mobile py-16 md:px-margin-desktop">
        <div className="w-full max-w-md border border-hairline bg-canvas-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:p-10">
          <h1 className="mb-8 text-center font-headline-1 text-headline-1 text-ink-black">로그인</h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
              <input
                id="password"
                className="w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                placeholder="비밀번호를 입력하세요"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              className="w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80"
              type="submit"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between font-body-sm text-body-sm">
            <Link className="text-primary hover:underline" to="/signup">
              회원가입
            </Link>
            <Link className="text-ink-secondary hover:text-primary hover:underline" to="/login/find-account">
              아이디/비밀번호 찾기
            </Link>
          </div>

          <div className="mt-6">
            <div className="mb-4 flex items-center">
              <div className="flex-grow border-t border-hairline" />
              <span className="mx-4 shrink-0 font-body-sm text-body-sm font-semibold text-ink-black">
                간편 로그인
              </span>
              <div className="flex-grow border-t border-hairline" />
            </div>
            <div className="flex items-center justify-center gap-5">
              <a
                aria-label="네이버 로그인"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#03C75A] text-sm font-bold text-white transition-opacity hover:opacity-90"
                href="#"
              >
                N
              </a>
              <a
                aria-label="카카오 로그인"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEE500] text-sm font-bold text-[#191919] transition-opacity hover:opacity-90"
                href="#"
              >
                K
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              className="font-body-sm text-body-sm text-ink-secondary hover:text-primary hover:underline"
              to="/login/guest"
            >
              비회원 로그인
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
