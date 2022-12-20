import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormatService {
  formatCurrency(value: number, options?: ICurrencyFormatOptions) {
    return new Intl.NumberFormat(
      options?.locale || this.defaultCurrencyOption.locale,
      {
        style: 'currency',
        currency: options?.currency || this.defaultCurrencyOption.currency,
        minimumFractionDigits:
          options?.minimumFractionDigits ||
          this.defaultCurrencyOption.minimumFractionDigits,
        maximumFractionDigits:
          options?.maximumFractionDigits ||
          this.defaultCurrencyOption.maximumFractionDigits,
      }
    ).format(value);
  }

  formatPercent(value: number, options?: ICurrencyFormatOptions) {
    return new Intl.NumberFormat(
      options?.locale || this.defaultCurrencyOption.locale,
      {
        style: 'percent',
        currency: options?.currency || this.defaultCurrencyOption.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(value / 100);
  }

  get defaultCurrencyOption(): ICurrencyFormatOptions {
    return {
      locale: 'es-CO',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
  }

  get defaultPercentOption(): ICurrencyFormatOptions {
    return {
      locale: 'es-CO',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
  }
}

export type currency = 'COP';

export interface ICurrencyFormatOptions {
  locale: string;
  currency: currency;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}
