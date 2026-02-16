/**
 * Utility functions for shop functionality
 */

/**
 * Check if the shop feature is enabled
 * @returns boolean - true if shop is enabled, false otherwise
 */
export function isShopEnabled(): boolean {
  // Check if SHOP_ENABLED environment variable is truthy
  const shopEnabled = process.env.NEXT_PUBLIC_SHOP_ENABLED;

  // Return true only if explicitly set to 'true'
  return shopEnabled === 'true';
}
