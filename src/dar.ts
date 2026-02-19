/**
 * DAR Token Economy Utilities
 * Helper functions for DAR token calculations and formatting
 */

/** DAR to EUR conversion rate (1 DAR = 0.01 EUR by default) */
const DEFAULT_DAR_EUR_RATE = 0.01;

/**
 * Convert DAR tokens to EUR value
 * @param darAmount - Amount in DAR tokens
 * @param rate - Conversion rate (DAR per EUR), default 0.01
 * @returns EUR value
 *
 * @example
 * darToEur(1000) // => 10.00
 * darToEur(500, 0.02) // => 10.00
 */
export function darToEur(darAmount: number, rate = DEFAULT_DAR_EUR_RATE): number {
  if (darAmount < 0) throw new RangeError('DAR amount must be non-negative');
  return parseFloat((darAmount * rate).toFixed(2));
}

/**
 * Convert EUR to DAR tokens
 * @param eurAmount - Amount in EUR
 * @param rate - Conversion rate (DAR per EUR), default 0.01
 * @returns DAR token amount (always integer)
 *
 * @example
 * eurToDar(10) // => 1000
 */
export function eurToDar(eurAmount: number, rate = DEFAULT_DAR_EUR_RATE): number {
  if (eurAmount < 0) throw new RangeError('EUR amount must be non-negative');
  return Math.floor(eurAmount / rate);
}

/**
 * Format DAR balance for display
 * @param amount - DAR amount
 * @param options - Formatting options
 * @returns Formatted string, e.g. "1,250 DAR" or "1.25K DAR"
 *
 * @example
 * formatDar(1250) // => "1,250 DAR"
 * formatDar(1250000, { compact: true }) // => "1.25M DAR"
 */
export function formatDar(
  amount: number,
  options: { compact?: boolean; showSymbol?: boolean } = {}
): string {
  const { compact = false, showSymbol = true } = options;
  const symbol = showSymbol ? ' DAR' : '';

  if (compact) {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M${symbol}`;
    if (amount >= 1_000) return `${(amount / 1_000).toFixed(2)}K${symbol}`;
  }

  return `${amount.toLocaleString('en-US')}${symbol}`;
}

/**
 * Calculate DAR reward for a referral based on tier
 * @param tier - Referral tier (1 = direct, 2 = second-level, etc.)
 * @param baseDar - Base DAR reward amount
 * @returns DAR reward amount for the given tier
 *
 * @example
 * calcReferralReward(1, 100) // => 100 (100%)
 * calcReferralReward(2, 100) // => 30 (30%)
 * calcReferralReward(3, 100) // => 10 (10%)
 */
export function calcReferralReward(tier: number, baseDar: number): number {
  const tierPercentages: Record<number, number> = {
    1: 1.0,   // 100%
    2: 0.30,  // 30%
    3: 0.10,  // 10%
  };

  const percentage = tierPercentages[tier] ?? 0;
  return Math.floor(baseDar * percentage);
}

/**
 * Check if a DAR balance is sufficient for an operation
 * @param balance - Current balance
 * @param required - Required amount
 * @param includeBuffer - Add 10% safety buffer
 */
export function hasSufficientDar(
  balance: number,
  required: number,
  includeBuffer = false
): boolean {
  const threshold = includeBuffer ? required * 1.1 : required;
  return balance >= threshold;
}

/**
 * Calculate campaign cost in DAR
 * @param giftCostDar - Cost per gift in DAR
 * @param estimatedLeads - Estimated number of leads
 * @param conversionRate - Expected conversion rate (0-1)
 */
export function calcCampaignBudget(
  giftCostDar: number,
  estimatedLeads: number,
  conversionRate = 0.15
): {
  minBudget: number;
  recommendedBudget: number;
  maxBudget: number;
} {
  const expectedGifts = Math.ceil(estimatedLeads * conversionRate);
  return {
    minBudget: expectedGifts * giftCostDar,
    recommendedBudget: Math.ceil(expectedGifts * giftCostDar * 1.2), // +20% buffer
    maxBudget: estimatedLeads * giftCostDar, // 100% conversion scenario
  };
}
