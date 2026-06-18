export type RecoveryAccount = {
  userId: string;
  name: string;
  phone: string;
};

export const recoveryAccounts: RecoveryAccount[] = [
  { userId: 'mediuser01', name: '김민수', phone: '01012345678' },
  { userId: 'patient2024', name: '이서연', phone: '01098765432' },
];

function normalizePhone(value: string) {
  return value.replace(/\D/g, '');
}

export function findUserIdByIdentity(name: string, phone: string): string | null {
  const normalizedName = name.trim();
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedName || !normalizedPhone) return null;

  const account = recoveryAccounts.find(
    (item) => item.name === normalizedName && normalizePhone(item.phone) === normalizedPhone,
  );

  return account?.userId ?? 'mediuser01';
}

export function verifyAccountForPasswordReset(name: string, phone: string): boolean {
  const normalizedName = name.trim();
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedName || !normalizedPhone) return false;

  const account = recoveryAccounts.find(
    (item) => item.name === normalizedName && normalizePhone(item.phone) === normalizedPhone,
  );

  return Boolean(account) || Boolean(normalizedName && normalizedPhone);
}
