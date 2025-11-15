---
phase: implementation
title: Plant Price Calculator - Implementation Guide
description: Ghi chú kỹ thuật, patterns, và hướng dẫn code
---

# Plant Price Calculator - Implementation Guide

## Development Setup
**Làm sao để bắt đầu?**

### Prerequisites
- Node.js v18 hoặc cao hơn
- npm hoặc yarn
- Git
- GitHub account

### Environment Setup Steps
1. **Khởi tạo React project với Vite**:
```bash
npm create vite@latest plant-price-calculator -- --template react-ts
cd plant-price-calculator
npm install
```

2. **Install dependencies**:
```bash
npm install styled-components
npm install --save-dev @types/styled-components
```

3. **Setup ESLint** (nếu chưa có):
```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

4. **Create project structure**:
```
src/
  components/
    Calculator.tsx
    PlantSelector.tsx
    WeightInput.tsx
    MutationSelector.tsx
    TraitSelector.tsx
    PriceDisplay.tsx
  data/
    plants.ts
    traits.ts
    mutations.ts
  utils/
    priceCalculator.ts
  App.tsx
  main.tsx
```

### Configuration Needed
- `vite.config.ts`: Cấu hình base path cho GitHub Pages (nếu repo không phải root)
- `package.json`: Thêm script `deploy` cho GitHub Pages
- `.gitignore`: Đảm bảo node_modules và build files được ignore

## Code Structure
**Code được tổ chức như thế nào?**

### Directory Structure
```
plant-price-calculator/
├── public/
│   └── index.html
├── src/
│   ├── components/          # React components
│   │   ├── Calculator.tsx
│   │   ├── PlantSelector.tsx
│   │   ├── WeightInput.tsx
│   │   ├── MutationSelector.tsx
│   │   ├── TraitSelector.tsx
│   │   └── PriceDisplay.tsx
│   ├── data/               # Static data
│   │   ├── plants.ts
│   │   ├── traits.ts
│   │   └── mutations.ts
│   ├── utils/              # Utility functions
│   │   └── priceCalculator.ts
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── package.json
├── vite.config.ts
└── README.md
```

### Module Organization
- **Components**: Mỗi component trong file riêng, export default
- **Data**: Export const arrays/objects
- **Utils**: Export named functions
- **Types**: Có thể tạo `src/types/index.ts` cho shared types

### Naming Conventions
- Components: PascalCase (e.g., `PlantSelector.tsx`)
- Functions: camelCase (e.g., `calculatePrice`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_TRAIT_MULTIPLIER`)
- Files: camelCase cho utils, PascalCase cho components

## Implementation Notes
**Chi tiết kỹ thuật cần nhớ:**

### Core Features

#### 1. Price Calculation Logic
**File**: `src/utils/priceCalculator.ts`

```typescript
export function calculatePrice(
  basePrice: number,
  weight: number,
  mutation: 'none' | 'gold' | 'prismatic',
  selectedTraits: string[],
  traitMultipliers: Record<string, number>
): number {
  // Validate inputs
  if (basePrice <= 0 || weight <= 0) return 0;
  
  // Calculate mutation multiplier
  const mutationMultiplier = mutation === 'prismatic' ? 50 : 
                             mutation === 'gold' ? 20 : 1;
  
  // Calculate trait multiplier (sum of selected traits, max 55)
  // If no traits selected, use 1 (not 0)
  const traitSum = selectedTraits.reduce((sum, trait) => sum + (traitMultipliers[trait] || 0), 0);
  const traitMultiplier = traitSum > 0 ? Math.min(traitSum, 55) : 1;
  
  // Final calculation
  return basePrice * Math.pow(weight, 2) * mutationMultiplier * traitMultiplier;
}

export function formatPrice(price: number): string {
  return Math.round(price).toLocaleString('en-US');
}
```

**Key Points**:
- Validate inputs trước khi tính
- Weight được bình phương
- Trait multiplier: tổng (sum) của các traits được chọn, tối đa 55
- Nếu không chọn trait nào: multiplier = 1 (không phải 0)
- Làm tròn đến số nguyên

**Trait Multipliers (đã xác nhận)**:
- Dust: 10
- Lightning: 10
- Rainbow: 10
- Terror: 10
- Air: 5
- Hazy: 5
- Cold: 3
- Moist: 2
- Tổng tối đa: 55 (khi chọn tất cả)

#### 2. Calculator Component
**File**: `src/components/Calculator.tsx`

**State Management**:
```typescript
const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
const [weight, setWeight] = useState<number>(0);
const [mutation, setMutation] = useState<'none' | 'gold' | 'prismatic'>('none');
const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
```

**Auto-calculation với useEffect**:
```typescript
useEffect(() => {
  if (selectedPlant && weight > 0) {
    const price = calculatePrice(
      selectedPlant.basePrice,
      weight,
      mutation,
      selectedTraits,
      traitMultipliers
    );
    setCalculatedPrice(price);
  } else {
    setCalculatedPrice(0);
  }
}, [selectedPlant, weight, mutation, selectedTraits]);
```

#### 3. Styled Components Pattern
**Theo user rules**: Sử dụng styled-components với ít wrapper, children có className.

**Example**:
```typescript
const CalculatorWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  .plant-selector {
    margin-bottom: 1rem;
  }
  
  .weight-input {
    margin-bottom: 1rem;
  }
`;

// Usage
<CalculatorWrapper>
  <PlantSelector className="plant-selector" />
  <WeightInput className="weight-input" />
</CalculatorWrapper>
```

### Patterns & Best Practices

#### 1. Controlled Components
Tất cả inputs phải là controlled components:
```typescript
<input
  type="number"
  value={weight}
  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
/>
```

#### 2. Type Safety
Sử dụng TypeScript cho type safety:
```typescript
interface Plant {
  name: string;
  basePrice: number;
}
```

#### 3. Data Validation
Validate inputs trong calculation function và component level:
```typescript
if (weight <= 0) {
  return; // Don't calculate
}
```

#### 4. Component Composition
Tách nhỏ components để dễ test và maintain:
- PlantSelector: chỉ handle plant selection
- WeightInput: chỉ handle weight input
- Calculator: orchestrate và tính toán

## Integration Points
**Các phần kết nối như thế nào?**

### Component Communication
- **Parent to Child**: Props
- **Child to Parent**: Callback functions
- **State Management**: useState trong Calculator component

### Data Flow
```
User Input → Component State → useEffect → Calculation → Display
```

### No External APIs
- Không có API calls
- Tất cả data là static
- Calculation là pure function

## Error Handling
**Xử lý lỗi như thế nào?**

### Input Validation
- Weight: phải là số dương
- Plant: phải chọn ít nhất 1
- Mutation: optional (default 'none')
- Traits: optional (default empty array)

### Error States
- Weight = 0 hoặc không hợp lệ → Price = 0
- Không chọn plant → Hiển thị message hoặc disable calculation

### User Feedback
- Validation errors: hiển thị inline message
- Invalid input: highlight input field
- Empty state: hiển thị placeholder text

## Performance Considerations
**Làm sao giữ cho nó nhanh?**

### Optimization Strategies
1. **Memoization**: Sử dụng `useMemo` cho calculated price nếu cần
2. **Component Memoization**: `React.memo` cho child components nếu re-render nhiều
3. **Code Splitting**: Không cần (app nhỏ)

### Calculation Optimization
- Calculation function là pure function → dễ optimize
- Không có expensive operations
- Real-time calculation không ảnh hưởng performance

### Bundle Size
- Tree shaking tự động với Vite
- Chỉ import những gì cần
- styled-components có thể code-split

## Security Notes
**Biện pháp bảo mật nào được áp dụng?**

### Input Sanitization
- Weight input: chỉ chấp nhận số (type="number")
- React tự động escape XSS
- Không có user-generated content

### No Sensitive Data
- Không có API keys
- Không có user data
- Không có authentication

### Best Practices
- Không eval() hoặc dangerouslySetInnerHTML
- Validate tất cả inputs
- TypeScript giúp catch type errors

