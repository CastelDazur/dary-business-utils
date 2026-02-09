# 🛠️ DARY Business Utils

[![npm version](https://badge.fury.io/js/dary-business-utils.svg)](https://badge.fury.io/js/dary-business-utils)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Essential business utilities and helper functions for [DARY Platform](https://github.com/CastelDazur/dary-platform)

## 📌 Overview

A comprehensive collection of utility functions specifically designed for DARY Platform's business logic, including validation, formatting, calculations, and data conversions.

---

## ✨ Features

- ✅ **Validation Utilities** - Email, phone, business data validation
- 💰 **Currency Formatting** - Multi-currency support with localization
- 📅 **Date/Time Helpers** - Timezone-aware date operations
- 📊 **Business Calculations** - ROI, conversion rates, gift value
- 🔄 **Data Transformers** - Object mapping and normalization
- 🌐 **Localization** - i18n support for multiple languages
- 🛡️ **Type Safety** - Full TypeScript definitions
- ⚡ **Zero Dependencies** - Lightweight and fast

---

## 📦 Installation

```bash
npm install dary-business-utils
# or
yarn add dary-business-utils
```

---

## 🚀 Usage

### Validation

```typescript
import { validateEmail, validatePhone, validateBusiness } from 'dary-business-utils';

// Email validation
const isValid = validateEmail('user@company.com'); // true

// Phone validation with country code
const phoneValid = validatePhone('+33612345678', 'FR'); // true

// Business data validation
const businessData = {
  name: 'Acme Corp',
  siret: '12345678901234',
  vat: 'FR12345678901'
};
const validation = validateBusiness(businessData); // { valid: true }
```

### Currency Formatting

```typescript
import { formatCurrency, convertCurrency } from 'dary-business-utils';

// Format with locale
const formatted = formatCurrency(1234.56, 'EUR', 'fr-FR');
// "1 234,56 €"

// Currency conversion
const converted = await convertCurrency(100, 'USD', 'EUR');
// { amount: 92.50, rate: 0.925, timestamp: Date }
```

### Date & Time

```typescript
import { formatDate, calculateBusinessDays, addBusinessDays } from 'dary-business-utils';

// Format with timezone
const formatted = formatDate(new Date(), 'Europe/Paris', 'long');
// "15 janvier 2025 14:30"

// Calculate business days between dates
const days = calculateBusinessDays(
  new Date('2025-01-01'),
  new Date('2025-01-15')
); // 10

// Add business days (skip weekends)
const futureDate = addBusinessDays(new Date(), 5);
```

### Business Calculations

```typescript
import { calculateROI, calculateConversionRate, calculateGiftValue } from 'dary-business-utils';

// ROI calculation
const roi = calculateROI({
  investment: 10000,
  revenue: 15000,
  timeframe: 'monthly'
}); // { roi: 0.5, percentage: '50%' }

// Conversion rate
const rate = calculateConversionRate({
  leads: 1000,
  conversions: 150
}); // { rate: 0.15, percentage: '15%' }

// Gift value calculation
const giftValue = calculateGiftValue({
  leadValue: 500,
  conversionProbability: 0.3,
  giftCost: 50
}); // { expectedValue: 150, roi: 3.0 }
```

### Data Transformers

```typescript
import { normalizePhone, sanitizeEmail, slugify, camelToSnake } from 'dary-business-utils';

// Normalize phone number
const phone = normalizePhone('+33 6 12 34 56 78'); 
// "+33612345678"

// Sanitize email
const email = sanitizeEmail('  User@COMPANY.COM  ');
// "user@company.com"

// Create URL-friendly slug
const slug = slugify('Héllo Wôrld!');
// "hello-world"

// Convert naming conventions
const snakeCase = camelToSnake('firstName');
// "first_name"
```

---

## 📚 API Reference

### Validation

| Function | Description | Returns |
|----------|-------------|----------|
| `validateEmail(email)` | Validates email format | `boolean` |
| `validatePhone(phone, country?)` | Validates phone number | `boolean` |
| `validateVAT(vat, country)` | Validates VAT number | `boolean` |
| `validateSIRET(siret)` | Validates French SIRET | `boolean` |
| `validateBusiness(data)` | Validates business data | `ValidationResult` |

### Currency

| Function | Description | Returns |
|----------|-------------|----------|
| `formatCurrency(amount, currency, locale?)` | Formats currency | `string` |
| `convertCurrency(amount, from, to)` | Converts currency | `Promise<ConversionResult>` |
| `parseCurrency(formatted)` | Parses formatted currency | `number` |

### Date & Time

| Function | Description | Returns |
|----------|-------------|----------|
| `formatDate(date, timezone?, format?)` | Formats date | `string` |
| `calculateBusinessDays(start, end)` | Calculates business days | `number` |
| `addBusinessDays(date, days)` | Adds business days | `Date` |
| `isBusinessDay(date)` | Checks if business day | `boolean` |

### Calculations

| Function | Description | Returns |
|----------|-------------|----------|
| `calculateROI(params)` | Calculates ROI | `ROIResult` |
| `calculateConversionRate(params)` | Calculates conversion | `ConversionResult` |
| `calculateGiftValue(params)` | Calculates gift value | `GiftValueResult` |

---

## 🔧 Configuration

```typescript
import { configure } from 'dary-business-utils';

configure({
  defaultCurrency: 'EUR',
  defaultLocale: 'fr-FR',
  defaultTimezone: 'Europe/Paris',
  exchangeRateAPI: 'https://api.exchangerate.host/latest'
});
```

---

## 🌍 Localization

Supported locales:
- 🇫🇷 French (`fr-FR`)
- 🇬🇧 English (`en-GB`, `en-US`)
- 🇩🇪 German (`de-DE`)
- 🇪🇸 Spanish (`es-ES`)
- 🇮🇹 Italian (`it-IT`)

```typescript
import { setLocale, t } from 'dary-business-utils';

setLocale('fr-FR');
console.log(t('validation.email.invalid'));
// "Email invalide"
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 📝 Examples

Check out the `/examples` directory:

- [Validation Examples](examples/validation.ts)
- [Currency Examples](examples/currency.ts)
- [Date/Time Examples](examples/datetime.ts)
- [Calculations Examples](examples/calculations.ts)
- [Data Transformation](examples/transformers.ts)

---

## 🔗 Related Packages

- [dary-api-client](https://github.com/CastelDazur/dary-api-client) - DARY Platform API SDK
- [react-dary-components](https://github.com/CastelDazur/react-dary-components) - React UI Components
- [dary-platform](https://github.com/CastelDazur/dary-platform) - Main DARY Platform

---

## 👥 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file

---

## ❤️ Author

**Dmytro Romanov**
- GitHub: [@CastelDazur](https://github.com/CastelDazur)
- LinkedIn: [casteldazur](https://linkedin.com/in/casteldazur)
- Email: casteldazur@gmail.com

---

<p align="center">
  <i>Part of the DARY Platform ecosystem</i>
</p>
