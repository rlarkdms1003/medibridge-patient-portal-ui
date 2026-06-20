export type PatientLoginRecord = {
  name: string;
  phone: string;
  birthDate: string;
  patientNumber: string;
};

export const patientLoginRecords: PatientLoginRecord[] = [
  { name: '김민수', phone: '01012345678', birthDate: '19850315', patientNumber: '12345678' },
  { name: '이서연', phone: '01098765432', birthDate: '19900708', patientNumber: '87654321' },
];

function normalizePhone(value: string) {
  return value.replace(/\D/g, '');
}

function normalizeBirthDate(value: string) {
  return value.replace(/\D/g, '');
}

export function findPatientByLogin(phone: string, birthDate: string): PatientLoginRecord | null {
  const normalizedPhone = normalizePhone(phone);
  const normalizedBirthDate = normalizeBirthDate(birthDate);

  if (!normalizedPhone || !normalizedBirthDate) return null;

  const record = patientLoginRecords.find(
    (item) =>
      normalizePhone(item.phone) === normalizedPhone &&
      normalizeBirthDate(item.birthDate) === normalizedBirthDate,
  );

  if (record) return record;

  return {
    name: '재진환자',
    phone: normalizedPhone,
    birthDate: normalizedBirthDate,
    patientNumber: '12345678',
  };
}
