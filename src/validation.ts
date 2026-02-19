/**
 * Validation utilities for DARY Platform
 * B2B form and data validation helpers
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate business email (rejects free providers)
 * @param email - Email address to validate
 * @param allowFreeProviders - Allow Gmail, Yahoo etc (default: false for B2B)
 */
export function validateBusinessEmail(
  email: string,
  allowFreeProviders = false
): ValidationResult {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !email.trim()) {
    return { valid: false, error: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (!allowFreeProviders) {
    const freeProviders = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
      'live.com', 'icloud.com', 'protonmail.com', 'yandex.ru',
      'mail.ru', 'aol.com', 'gmx.com', 'zoho.com'
    ];

    const domain = email.toLowerCase().split('@')[1];
    if (freeProviders.includes(domain)) {
      return { valid: false, error: 'Please use your business email address' };
    }
  }

  return { valid: true };
}

/**
 * Validate French SIRET number (14 digits with Luhn checksum)
 * @param siret - SIRET number (with or without spaces)
 */
export function validateSiret(siret: string): ValidationResult {
  const cleaned = siret.replace(/\s/g, '');

  if (!/^\d{14}$/.test(cleaned)) {
    return { valid: false, error: 'SIRET must be 14 digits' };
  }

  // Luhn algorithm for SIRET
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(cleaned[i], 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  if (sum % 10 !== 0) {
    return { valid: false, error: 'Invalid SIRET checksum' };
  }

  return { valid: true };
}

/**
 * Validate French VAT number (TVA)
 * Format: FR + 2 chars (letters or digits) + 9 digit SIREN
 * @param vat - VAT number (e.g. FR12345678901)
 */
export function validateFrenchVAT(vat: string): ValidationResult {
  const cleaned = vat.replace(/\s/g, '').toUpperCase();
  const vatRegex = /^FR[A-Z0-9]{2}\d{9}$/;

  if (!vatRegex.test(cleaned)) {
    return {
      valid: false,
      error: 'Invalid French VAT format. Expected: FR + 2 chars + 9 digits (e.g. FR12345678901)'
    };
  }

  return { valid: true };
}

/**
 * Validate campaign date range
 * @param startsAt - Campaign start date
 * @param endsAt - Campaign end date
 * @param minDurationDays - Minimum campaign duration in days (default: 1)
 * @param maxDurationDays - Maximum campaign duration in days (default: 365)
 */
export function validateCampaignDates(
  startsAt: Date | string,
  endsAt: Date | string,
  minDurationDays = 1,
  maxDurationDays = 365
): ValidationResult {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const now = new Date();

  if (isNaN(start.getTime())) return { valid: false, error: 'Invalid start date' };
  if (isNaN(end.getTime())) return { valid: false, error: 'Invalid end date' };

  if (start < now) return { valid: false, error: 'Start date cannot be in the past' };
  if (end <= start) return { valid: false, error: 'End date must be after start date' };

  const durationDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  if (durationDays < minDurationDays) {
    return { valid: false, error: `Campaign must run for at least ${minDurationDays} day(s)` };
  }

  if (durationDays > maxDurationDays) {
    return { valid: false, error: `Campaign cannot exceed ${maxDurationDays} days` };
  }

  return { valid: true };
}

/**
 * Validate DAR budget amount
 * @param amount - Budget in DAR tokens
 * @param minAmount - Minimum allowed amount (default: 100 DAR)
 * @param maxAmount - Maximum allowed amount (default: 10,000,000 DAR)
 */
export function validateDarBudget(
  amount: number,
  minAmount = 100,
  maxAmount = 10_000_000
): ValidationResult {
  if (!Number.isInteger(amount)) {
    return { valid: false, error: 'DAR amount must be a whole number' };
  }
  if (amount < minAmount) {
    return { valid: false, error: `Minimum budget is ${minAmount} DAR` };
  }
  if (amount > maxAmount) {
    return { valid: false, error: `Maximum budget is ${maxAmount.toLocaleString()} DAR` };
  }
  return { valid: true };
}
