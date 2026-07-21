const AZ_COUNTRY_CODE = "994";
const AZ_LOCAL_DIGITS = 9;

export function getAzerbaijaniPhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function getAzerbaijaniPhoneLocalDigits(value: string): string {
  const digits = getAzerbaijaniPhoneDigits(value);

  if (digits.startsWith(AZ_COUNTRY_CODE)) {
    return digits.slice(AZ_COUNTRY_CODE.length, AZ_COUNTRY_CODE.length + AZ_LOCAL_DIGITS);
  }

  if (digits.startsWith("0")) {
    return digits.slice(1, 1 + AZ_LOCAL_DIGITS);
  }

  return digits.slice(0, AZ_LOCAL_DIGITS);
}

export function normalizeAzerbaijaniPhone(value: string): string {
  const digits = getAzerbaijaniPhoneDigits(value);

  if (!digits) {
    return "";
  }

  if (digits.startsWith(AZ_COUNTRY_CODE)) {
    const localDigits = digits.slice(AZ_COUNTRY_CODE.length, AZ_COUNTRY_CODE.length + AZ_LOCAL_DIGITS);

    if (localDigits.length === AZ_LOCAL_DIGITS) {
      return `+${AZ_COUNTRY_CODE}${localDigits}`;
    }

    return value.trim();
  }

  const localDigits = digits.startsWith("0") ? digits.slice(1) : digits;

  if (localDigits.length === AZ_LOCAL_DIGITS) {
    return `+${AZ_COUNTRY_CODE}${localDigits}`;
  }

  return value.trim();
}

export function buildAzerbaijaniPhoneInputValue(value: string): string {
  const localDigits = getAzerbaijaniPhoneLocalDigits(value);

  if (!localDigits) {
    return "";
  }

  return `+${AZ_COUNTRY_CODE}${localDigits}`;
}

export function isAzerbaijaniPhone(value: string): boolean {
  const normalized = normalizeAzerbaijaniPhone(value);
  const digits = getAzerbaijaniPhoneDigits(normalized);

  return normalized.startsWith(`+${AZ_COUNTRY_CODE}`) && digits.length === 12;
}

export function formatAzerbaijaniPhone(value: string): string {
  const normalized = normalizeAzerbaijaniPhone(value);
  const digits = getAzerbaijaniPhoneDigits(normalized);

  if (!normalized || !digits.startsWith(AZ_COUNTRY_CODE) || digits.length !== 12) {
    return normalized || value;
  }

  return `+994 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
}
