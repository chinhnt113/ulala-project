export interface Trait {
  name: string;
  multiplier: number;
}

export const traits: Trait[] = [
  { name: "Dust", multiplier: 10 },
  { name: "Lightning", multiplier: 10 },
  { name: "Rainbow", multiplier: 10 },
  { name: "Terror", multiplier: 10 },
  { name: "Air", multiplier: 5 },
  { name: "Hazy", multiplier: 5 },
  { name: "Cold", multiplier: 3 },
  { name: "Moist", multiplier: 2 },
];

// Tổng tối đa: 10+10+10+10+5+5+3+2 = 55
export const MAX_TRAIT_MULTIPLIER = 55;

// Helper function để lấy multiplier từ trait name
export const getTraitMultiplier = (traitName: string): number => {
  const trait = traits.find((t) => t.name === traitName);
  return trait?.multiplier || 0;
};

// Helper function để tạo map trait name -> multiplier
export const traitMultipliersMap: Record<string, number> = traits.reduce(
  (acc, trait) => {
    acc[trait.name] = trait.multiplier;
    return acc;
  },
  {} as Record<string, number>
);

