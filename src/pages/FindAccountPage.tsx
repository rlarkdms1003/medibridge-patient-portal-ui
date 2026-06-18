import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Icon from '../components/Icon';
import {
  findUserIdByIdentity,
  verifyAccountForPasswordReset,
} from '../data/accountRecoveryData';

type RecoveryTab = 'id' | 'password';

function PhoneVerificationFields({
  phone,
  verificationCode,
  isCodeSent,
  isPhoneVerified,
  onPhoneChange,
  onVerificationCodeChange,
  onSendCode,
  onConfirmCode,
  phoneInputId = 'phone',
  verificationInputId = 'verificationCode',
}: {
  phone: string;
  verificationCode: string;
  isCodeSent: boolean;
  isPhoneVerified: boolean;
  onPhoneChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
  onSendCode: () => void;
  onConfirmCode: () => void;
  phoneInputId?: string;
  verificationInputId?: string;
}) {
  return (
    <>
      <div>
        <label
          className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black"
          htmlFor={phoneInputId}
        >
          휴대전화번호
        </label>
        <div className="flex gap-2">
          <input
            id={phoneInputId}
            className="min-w-0 flex-1 border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
            placeholder="휴대전화번호를 입력하세요"
            type="tel"
            value={phone}
            onChange={(event) => onPhoneChange(event.target.value)}
            autoComplete="tel"
          />
          <button
            className="w-[8.75rem] shrink-0 whitespace-nowrap border border-hairline bg-surface-container px-4 py-3 font-button text-button text-ink-black transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!phone.trim()}
            type="button"
            onClick={onSendCode}
          >
            인증번호 전송
          </button>
        </div>
      </div>

      {isCodeSent && (
        <div>
          <label
            className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black"
            htmlFor={verificationInputId}
          >
            인증번호
          </label>
          <div className="flex gap-2">
            <input
              id={verificationInputId}
              className="min-w-0 flex-1 border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
              placeholder="인증번호를 입력하세요"
              type="text"
              inputMode="numeric"
              value={verificationCode}
              onChange={(event) => onVerificationCodeChange(event.target.value)}
              autoComplete="one-time-code"
            />
            <button
              className="w-[8.75rem] shrink-0 whitespace-nowrap border border-hairline bg-surface-container px-4 py-3 font-button text-button text-ink-black transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!verificationCode.trim()}
              type="button"
              onClick={onConfirmCode}
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
    </>
  );
}

export default function FindAccountPage() {
  const [activeTab, setActiveTab] = useState<RecoveryTab>('id');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [foundUserId, setFoundUserId] = useState('');
  const [isPasswordResetComplete, setIsPasswordResetComplete] = useState(false);
  const [error, setError] = useState('');

  const resetPhoneVerification = () => {
    setIsCodeSent(false);
    setVerificationCode('');
    setIsPhoneVerified(false);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    resetPhoneVerification();
    setError('');
  };

  const resetFormState = () => {
    setName('');
    setPhone('');
    resetPhoneVerification();
    setNewPassword('');
    setConfirmPassword('');
    setFoundUserId('');
    setIsPasswordResetComplete(false);
    setError('');
  };

  const handleTabChange = (tab: RecoveryTab) => {
    setActiveTab(tab);
    resetFormState();
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

  const handleFindId = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('이름을 입력해 주세요.');
      return;
    }

    if (!phone.trim()) {
      setError('휴대전화번호를 입력해 주세요.');
      return;
    }

    if (!isPhoneVerified) {
      setError('휴대전화 인증을 완료해 주세요.');
      return;
    }

    const matchedUserId = findUserIdByIdentity(name, phone);
    if (!matchedUserId) {
      setError('입력하신 정보와 일치하는 회원을 찾을 수 없습니다.');
      return;
    }

    setFoundUserId(matchedUserId);
    setError('');
  };

  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('이름을 입력해 주세요.');
      return;
    }

    if (!phone.trim()) {
      setError('휴대전화번호를 입력해 주세요.');
      return;
    }

    if (!isPhoneVerified) {
      setError('휴대전화 인증을 완료해 주세요.');
      return;
    }

    if (!verifyAccountForPasswordReset(name, phone)) {
      setError('입력하신 정보와 일치하는 회원을 찾을 수 없습니다.');
      return;
    }

    if (newPassword.length < 4) {
      setError('새 비밀번호는 4자 이상 입력해 주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setIsPasswordResetComplete(true);
    setError('');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink-black antialiased selection:bg-primary-container selection:text-white">
      <Header />
      <main className="flex flex-1 items-center justify-center px-margin-mobile py-16 md:px-margin-desktop">
        <div className="w-full max-w-lg border border-hairline bg-canvas-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:p-10">
          <header className="mb-10 text-center">
            <h1 className="font-headline-1 text-headline-1 text-ink-black">아이디/비밀번호 찾기</h1>
            <p className="mx-auto mt-4 max-w-[18rem] font-body-sm text-body-sm leading-relaxed text-ink-secondary sm:max-w-xs">
              가입 시 등록한 정보로 본인 확인 후
              <br />
              아이디 조회 및 비밀번호 재설정이 가능합니다.
            </p>
          </header>

          <div className="mb-6 flex border-b border-hairline">
            <button
              className={`-mb-px flex-1 border-b-2 px-4 py-3 font-body-md text-body-md transition-colors ${
                activeTab === 'id'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink-secondary hover:text-ink-black'
              }`}
              type="button"
              onClick={() => handleTabChange('id')}
            >
              아이디 찾기
            </button>
            <button
              className={`-mb-px flex-1 border-b-2 px-4 py-3 font-body-md text-body-md transition-colors ${
                activeTab === 'password'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-ink-secondary hover:text-ink-black'
              }`}
              type="button"
              onClick={() => handleTabChange('password')}
            >
              비밀번호 찾기
            </button>
          </div>

          {activeTab === 'id' ? (
            foundUserId ? (
              <div className="space-y-6 text-center">
                <Icon className="mx-auto text-5xl text-primary" name="check_circle" />
                <div>
                  <p className="font-body-md text-body-md text-ink-secondary">회원님의 아이디는 아래와 같습니다.</p>
                  <p className="mt-4 font-headline-2 text-headline-2 text-ink-black">{foundUserId}</p>
                </div>
                <Link
                  className="inline-flex w-full items-center justify-center bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90"
                  to="/login"
                >
                  로그인하기
                </Link>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleFindId}>
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

                <PhoneVerificationFields
                  phone={phone}
                  verificationCode={verificationCode}
                  isCodeSent={isCodeSent}
                  isPhoneVerified={isPhoneVerified}
                  phoneInputId="findPhone"
                  verificationInputId="findVerificationCode"
                  onPhoneChange={handlePhoneChange}
                  onVerificationCodeChange={(value) => {
                    setVerificationCode(value);
                    setIsPhoneVerified(false);
                  }}
                  onSendCode={handleSendCode}
                  onConfirmCode={handleConfirmCode}
                />

                {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}

                <button
                  className="w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80"
                  type="submit"
                >
                  아이디 찾기
                </button>
              </form>
            )
          ) : isPasswordResetComplete ? (
            <div className="space-y-6 text-center">
              <Icon className="mx-auto text-5xl text-primary" name="check_circle" />
              <div>
                <p className="font-headline-2 text-headline-2 text-ink-black">비밀번호가 변경되었습니다</p>
                <p className="mt-3 font-body-md text-body-md text-ink-secondary">
                  새 비밀번호로 로그인해 주세요.
                </p>
              </div>
              <Link
                className="inline-flex w-full items-center justify-center bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90"
                to="/login"
              >
                로그인하기
              </Link>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleResetPassword}>
              <div>
                <label className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black" htmlFor="resetName">
                  이름
                </label>
                <input
                  id="resetName"
                  className="w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                  placeholder="이름을 입력하세요"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </div>

              <PhoneVerificationFields
                phone={phone}
                verificationCode={verificationCode}
                isCodeSent={isCodeSent}
                isPhoneVerified={isPhoneVerified}
                phoneInputId="resetPhone"
                verificationInputId="resetVerificationCode"
                onPhoneChange={handlePhoneChange}
                onVerificationCodeChange={(value) => {
                  setVerificationCode(value);
                  setIsPhoneVerified(false);
                }}
                onSendCode={handleSendCode}
                onConfirmCode={handleConfirmCode}
              />

              {isPhoneVerified && (
                <>
                  <div>
                    <label
                      className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black"
                      htmlFor="newPassword"
                    >
                      새 비밀번호
                    </label>
                    <input
                      id="newPassword"
                      className="w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                      placeholder="새 비밀번호를 입력하세요"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      autoComplete="new-password"
                    />
                  </div>

                  <div>
                    <label
                      className="mb-2 block font-body-sm text-body-sm font-semibold text-ink-black"
                      htmlFor="confirmPassword"
                    >
                      새 비밀번호 확인
                    </label>
                    <input
                      id="confirmPassword"
                      className="w-full border border-hairline bg-canvas-white px-4 py-3 font-body-md text-body-md text-ink-black outline-none transition-colors focus:border-primary"
                      placeholder="새 비밀번호를 다시 입력하세요"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                </>
              )}

              {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}

              {isPhoneVerified && (
                <button
                  className="w-full bg-secondary px-6 py-4 font-button text-button text-on-secondary transition-opacity hover:opacity-90 active:opacity-80"
                  type="submit"
                >
                  비밀번호 재설정
                </button>
              )}
            </form>
          )}

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
