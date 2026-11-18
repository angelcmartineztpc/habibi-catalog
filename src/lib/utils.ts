import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import moment from 'moment';

/**
 * Deterministic className composition using clsx + tailwind-merge
 * (Per project constitution: CSS Modules + CSS variables, no Tailwind utility classes).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export type CurrencyCode = 'MXN' | 'USD' | 'EUR';

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  MXN: 1,
  USD: 0.055,
  EUR: 0.051,
};

/**
 * Formats a base MXN price into the selected currency matching Figma format:
 * e.g. "$690.00 MXN" or "$0.00" (when includeCode is false).
 */
export function formatPrice(
  amountMxn: number,
  currency: CurrencyCode = 'MXN',
  includeCode = true,
): string {
  const rate = EXCHANGE_RATES[currency] ?? 1;
  const converted = amountMxn * rate;
  const formatted = `$${converted.toFixed(2)}`;
  return includeCode ? `${formatted} ${currency}` : formatted;
}

/**
 * Date helpers using date-fns and moment (legacy compatibility)
 */
export function formatCatalogDate(date: Date | string = new Date()): string {
  return format(new Date(date), 'yyyy-MM-dd');
}

export function formatLegacyTimestamp(date: Date | string = new Date()): string {
  return moment(date).format('DD/MM/YYYY HH:mm');
}
