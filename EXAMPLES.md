# Usage Examples

Practical examples for `dary-business-utils` functions.

## Validation

### Email Validation

```typescript
import { isValidEmail, isValidBusinessEmail } from 'dary-business-utils';

// Basic email validation
console.log(isValidEmail('user@example.com')); // true
console.log(isValidEmail('invalid-email'));     // false

// Block free email providers (for B2B lead quality)
console.log(isValidBusinessEmail('ceo@nike.com'));      // true
console.log(isValidBusinessEmail('user@gmail.com'));    // false
```

### Campaign Budget Validation

```typescript
import { validateCampaignBudget } from 'dary-business-utils';

const result = validateCampaignBudget({
  totalBudget: 5000,
  tokenPrice: 0.10,
  referralBonus: 20,
  minParticipants: 100,
});

if (result.valid) {
  console.log(`Max participants: ${result.maxParticipants}`);
  console.log(`Estimated reach: ${result.estimatedReach}`);
} else {
  console.error(result.errors);
}
```

## Formatting

### Currency Formatting

```typescript
import { formatDAR, formatEUR, formatCurrency } from 'dary-business-utils';

// DAR token formatting
formatDAR(1234.567);          // "1,234.57 DAR"
formatDAR(1234.567, 4);       // "1,234.5670 DAR"

// EUR formatting
formatEUR(9990);              // "€9,990.00"
formatEUR(9990, 'fr-FR');     // "9 990,00 €" (French locale)

// Generic with locale
formatCurrency(500, 'USD', 'en-US');  // "$500.00"
formatCurrency(500, 'EUR', 'de-DE');  // "500,00 €"
```

### Date Formatting

```typescript
import { formatCampaignDate, formatRelativeTime, getTimeRemaining } from 'dary-business-utils';

// Campaign-friendly date format
formatCampaignDate(new Date('2026-06-30'));  // "June 30, 2026"
formatCampaignDate(new Date('2026-06-30'), 'fr');  // "30 juin 2026"

// Relative time for feeds
formatRelativeTime(new Date(Date.now() - 3600000));  // "1 hour ago"
formatRelativeTime(new Date(Date.now() - 86400000)); // "yesterday"

// Countdown for campaign expiry
const remaining = getTimeRemaining(new Date('2026-12-31'));
console.log(remaining); // { days: 314, hours: 6, minutes: 22, expired: false }
```

## Calculations

### Referral Viral Coefficient

```typescript
import { calculateViralCoefficient, projectGrowth } from 'dary-business-utils';

// K-factor calculation
const kFactor = calculateViralCoefficient({
  invitesSentPerUser: 3,
  conversionRate: 0.35,  // 35% of invited users sign up
});
console.log(kFactor); // 1.05 (viral if > 1)

// Project user growth over N cycles
const growth = projectGrowth({
  initialUsers: 100,
  viralCoefficient: 1.05,
  cycles: 10,
});
console.log(growth);
// [100, 205, 420, 861, 1765, 3619, 7420, 15211, 31183, 63925, 131046]
```

### Token Economics

```typescript
import { calculateTokenomics } from 'dary-business-utils';

const tokenomics = calculateTokenomics({
  campaignBudgetEUR: 2000,
  tokenPriceEUR: 0.10,
  referralBonusTokens: 50,
  activationRewardTokens: 100,
});

console.log(tokenomics);
// {
//   totalTokens: 20000,
//   maxActivations: 133,
//   maxReferrals: 200,
//   platformFeeEUR: 200,
//   netBudgetEUR: 1800,
//   roi: { breakEvenLeads: 20, costPerLead: 15.04 }
// }
```

### Commission Calculations

```typescript
import { calculateCommission } from 'dary-business-utils';

const commission = calculateCommission({
  transactionAmount: 5000,
  tier: 'premium',  // 'starter' | 'growth' | 'premium'
  currency: 'EUR',
});

console.log(commission);
// { rate: 0.08, amount: 400, netAmount: 4600, currency: 'EUR' }
```

## Conversions

### Lead Score Conversion

```typescript
import { scoreToTier, tierToColor } from 'dary-business-utils';

// Convert numeric score to tier label
scoreToTier(92);  // 'hot'
scoreToTier(67);  // 'warm'
scoreToTier(34);  // 'cold'
scoreToTier(12);  // 'dead'

// Get display color for UI badges
tierToColor('hot');   // '#ef4444'
tierToColor('warm');  // '#f59e0b'
tierToColor('cold');  // '#3b82f6'
tierToColor('dead');  // '#6b7280'
```

### Unit Conversions

```typescript
import { darToEUR, eurToDAR, formatTokenAmount } from 'dary-business-utils';

// Token <-> EUR conversion
darToEUR(1000, 0.10);  // 100 (EUR)
eurToDAR(50, 0.10);    // 500 (DAR tokens)

// Human-readable token amounts
formatTokenAmount(1234567);  // "1.23M DAR"
formatTokenAmount(12345);    // "12.3K DAR"
formatTokenAmount(123);      // "123 DAR"
```

## Utilities

### Slug Generation

```typescript
import { generateCampaignSlug, generateReferralCode } from 'dary-business-utils';

// URL-safe campaign slugs
generateCampaignSlug('Summer Sale 2026!');  // "summer-sale-2026"
generateCampaignSlug('Nike x DARY');        // "nike-x-dary"

// Random referral codes
generateReferralCode();            // "X7K2-M9PQ"
generateReferralCode(6);           // "A3FG8H"
generateReferralCode(8, 'upper'); // "TQZR4WNB"
```

### Pagination

```typescript
import { paginate, getPaginationMeta } from 'dary-business-utils';

// Paginate an array
const items = Array.from({ length: 100 }, (_, i) => i + 1);
const page = paginate(items, { page: 3, perPage: 10 });
console.log(page.data);      // [21, 22, ..., 30]
console.log(page.total);     // 100
console.log(page.lastPage);  // 10

// Build pagination meta for API responses
const meta = getPaginationMeta(100, 3, 10);
// { currentPage: 3, perPage: 10, total: 100, lastPage: 10,
//   from: 21, to: 30, hasNext: true, hasPrev: true }
```

---

*For full API documentation, see [README.md](./README.md)*
