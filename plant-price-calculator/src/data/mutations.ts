export type MutationType = "none" | "gold" | "prismatic";

export interface Mutation {
  type: MutationType;
  name: string;
  multiplier: number;
}

export const mutations: Mutation[] = [
  { type: "none", name: "None", multiplier: 1 },
  { type: "gold", name: "Gold Mutation", multiplier: 20 },
  { type: "prismatic", name: "Prismatic Mutation", multiplier: 50 },
];

export const mutationMultipliers: Record<MutationType, number> = {
  none: 1,
  gold: 20,
  prismatic: 50,
};

// Helper function để lấy multiplier từ mutation type
export const getMutationMultiplier = (mutation: MutationType): number => {
  return mutationMultipliers[mutation] || 1;
};

