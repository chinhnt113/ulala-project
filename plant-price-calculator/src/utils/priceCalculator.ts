import type { MutationType } from '../data/mutations';
import { getMutationMultiplier } from '../data/mutations';
import { traitMultipliersMap, MAX_TRAIT_MULTIPLIER } from '../data/traits';

/**
 * Tính giá hoa quả dựa trên công thức:
 * Price = Base price * (Weight in kilograms)^2 * Mutation multiplier * Trait multiplier
 * 
 * @param basePrice - Giá cơ bản của cây
 * @param weight - Cân nặng (kg)
 * @param mutation - Loại mutation (none, gold, prismatic)
 * @param selectedTraits - Mảng tên các traits được chọn
 * @returns Giá đã tính (số thập phân, chưa format)
 */
export function calculatePrice(
  basePrice: number,
  weight: number,
  mutation: MutationType,
  selectedTraits: string[]
): number {
  // Validate inputs
  if (basePrice <= 0 || weight <= 0) {
    return 0;
  }

  // Calculate mutation multiplier
  const mutationMultiplier = getMutationMultiplier(mutation);

  // Calculate trait multiplier (sum of selected traits, max 55)
  // If no traits selected, use 1 (not 0)
  const traitSum = selectedTraits.reduce(
    (sum, traitName) => sum + (traitMultipliersMap[traitName] || 0),
    0
  );
  const traitMultiplier = traitSum > 0 ? Math.min(traitSum, MAX_TRAIT_MULTIPLIER) : 1;

  // Final calculation: Base price * Weight^2 * Mutation multiplier * Trait multiplier
  return basePrice * Math.pow(weight, 2) * mutationMultiplier * traitMultiplier;
}

/**
 * Format giá tiền với dấu phẩy ngăn cách và làm tròn đến số nguyên
 * 
 * @param price - Giá tiền (số thập phân)
 * @returns Chuỗi giá đã format (ví dụ: "12,144,588")
 */
export function formatPrice(price: number): string {
  return Math.round(price).toLocaleString('en-US');
}

