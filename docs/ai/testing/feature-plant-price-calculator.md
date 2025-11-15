---
phase: testing
title: Plant Price Calculator - Testing Strategy
description: Định nghĩa cách tiếp cận testing, test cases, và đảm bảo chất lượng
---

# Plant Price Calculator - Testing Strategy

## Test Coverage Goals
**Mức độ testing nhắm đến là gì?**

- **Unit test coverage target**: 100% cho calculation logic và utility functions
- **Component test scope**: Critical user interactions và state changes
- **End-to-end test scenarios**: Key user flows (chọn cây, nhập weight, chọn mutations/traits, xem kết quả)
- **Alignment với requirements**: Tất cả acceptance criteria phải được test

## Unit Tests
**Các component/module riêng lẻ cần test gì?**

### priceCalculator.ts Module
- [ ] **Test case 1**: Tính giá cơ bản với weight = 1, không mutation, không traits
  - Input: basePrice=5, weight=1, mutation='none', traits=[]
  - Expected: 5 * 1^2 * 1 * 1 = 5

- [ ] **Test case 2**: Tính giá với Gold Mutation
  - Input: basePrice=5, weight=2, mutation='gold', traits=[]
  - Expected: 5 * 2^2 * 20 * 1 = 400

- [ ] **Test case 3**: Tính giá với Prismatic Mutation
  - Input: basePrice=5, weight=2, mutation='prismatic', traits=[]
  - Expected: 5 * 2^2 * 50 * 1 = 1000

- [ ] **Test case 4**: Tính giá với traits (tổng < 55)
  - Input: basePrice=5, weight=1, mutation='none', traits=['Dust', 'Rainbow']
  - Expected: 5 * 1^2 * 1 * (10 + 10) = 100

- [ ] **Test case 5**: Tính giá với tất cả traits (tổng = 55, đạt max)
  - Input: basePrice=5, weight=1, mutation='none', traits=['Dust', 'Lightning', 'Rainbow', 'Terror', 'Air', 'Hazy', 'Cold', 'Moist']
  - Expected: 5 * 1^2 * 1 * 55 = 275
  - Note: 10+10+10+10+5+5+3+2 = 55

- [ ] **Test case 5b**: Tính giá với traits (không chọn trait nào)
  - Input: basePrice=5, weight=1, mutation='none', traits=[]
  - Expected: 5 * 1^2 * 1 * 1 = 5 (multiplier = 1 khi không chọn trait)

- [ ] **Test case 6**: Edge case - weight = 0
  - Input: basePrice=5, weight=0, mutation='none', traits=[]
  - Expected: 0

- [ ] **Test case 7**: Edge case - basePrice = 0
  - Input: basePrice=0, weight=1, mutation='none', traits=[]
  - Expected: 0

- [ ] **Test case 8**: Edge case - weight là số thập phân
  - Input: basePrice=5, weight=1.5, mutation='none', traits=[]
  - Expected: 5 * 1.5^2 * 1 * 1 = 11.25 (sau khi làm tròn: 11)

- [ ] **Test case 8b**: Tính giá với mutation và traits kết hợp
  - Input: basePrice=4.17, weight=38.16, mutation='prismatic', traits=['Dust', 'Rainbow', 'Terror', 'Air', 'Cold', 'Moist']
  - Trait sum: 10+10+10+5+3+2 = 40
  - Expected: 4.17 * 38.16^2 * 50 * 40 = 12,144,588 (làm tròn)

- [ ] **Test case 9**: Format price với số lớn
  - Input: 12144588
  - Expected: "12,144,588"

- [ ] **Test case 10**: Format price với số nhỏ
  - Input: 123
  - Expected: "123"

### formatPrice Function
- [ ] **Test case 1**: Format số nguyên
  - Input: 1000
  - Expected: "1,000"

- [ ] **Test case 2**: Format số thập phân (làm tròn)
  - Input: 1234.56
  - Expected: "1,235"

- [ ] **Test case 3**: Format số 0
  - Input: 0
  - Expected: "0"

## Integration Tests
**Làm sao test tương tác giữa các components?**

### Calculator Component Integration
- [ ] **Integration scenario 1**: Chọn cây → Base price hiển thị đúng
  - Action: Select plant từ dropdown
  - Verify: Base price field hiển thị đúng giá trị

- [ ] **Integration scenario 2**: Nhập weight → Price tự động tính
  - Action: Nhập weight = 10
  - Verify: Price được tính và hiển thị ngay lập tức

- [ ] **Integration scenario 3**: Chọn mutation → Price cập nhật
  - Action: Chọn Gold Mutation
  - Verify: Price được tính lại với multiplier 20

- [ ] **Integration scenario 4**: Chọn nhiều traits → Price cập nhật
  - Action: Chọn Dust (10), Rainbow (10), Terror (10)
  - Verify: Price được tính với tổng multiplier = 30 (10+10+10)

- [ ] **Integration scenario 5**: Thay đổi tất cả inputs → Price cập nhật đúng
  - Action: Chọn cây khác, thay đổi weight, mutation, traits
  - Verify: Price được tính lại với tất cả inputs mới

- [ ] **Integration scenario 6**: Reset tất cả → Price về 0
  - Action: Bỏ chọn cây, set weight = 0
  - Verify: Price = 0 hoặc không hiển thị

## End-to-End Tests
**Các user flows cần validation là gì?**

### User Flow 1: Tính giá cơ bản
- [ ] Mở trang web
- [ ] Chọn cây "Bluebell" từ dropdown
- [ ] Verify: Base price hiển thị 4.17
- [ ] Nhập weight = 38.16
- [ ] Verify: Price được tính và hiển thị

### User Flow 2: Tính giá với mutations và traits
- [ ] Chọn cây "Bluebell"
- [ ] Nhập weight = 38.16
- [ ] Chọn Prismatic Mutation
- [ ] Chọn các traits: Dust (10), Rainbow (10), Terror (10), Air (5), Cold (3), Moist (2)
- [ ] Verify: Price được tính đúng với tổng multiplier = 40 (10+10+10+5+3+2)
- [ ] Verify: Price = 4.17 * 38.16^2 * 50 * 40 ≈ 12,144,588

### User Flow 3: Thay đổi inputs và verify tính toán
- [ ] Chọn cây "Sakura" (basePrice=5)
- [ ] Nhập weight = 10
- [ ] Ghi nhận price 1
- [ ] Thay đổi weight = 20
- [ ] Verify: Price tăng gấp 4 lần (vì weight^2)

### User Flow 4: Edge cases
- [ ] Nhập weight = 0
- [ ] Verify: Price = 0 hoặc error message
- [ ] Nhập weight = -5
- [ ] Verify: Price = 0 hoặc error message
- [ ] Không chọn cây, nhập weight
- [ ] Verify: Price không tính hoặc = 0

## Test Data
**Dữ liệu test sử dụng là gì?**

### Test Fixtures
```typescript
// plants.test.ts
export const testPlants = [
  { name: "Sakura", basePrice: 5 },
  { name: "Bluebell", basePrice: 4.17 },
  { name: "Dandelion", basePrice: 5000 },
];

// traits.test.ts
export const testTraits = [
  { name: "Dust", multiplier: 10 },
  { name: "Lightning", multiplier: 10 },
  { name: "Rainbow", multiplier: 10 },
  { name: "Terror", multiplier: 10 },
  { name: "Air", multiplier: 5 },
  { name: "Hazy", multiplier: 5 },
  { name: "Cold", multiplier: 3 },
  { name: "Moist", multiplier: 2 },
];
```

### Mock Data
- Mock plants data cho component tests
- Mock trait multipliers cho calculation tests
- Mock user interactions cho integration tests

## Test Reporting & Coverage
**Làm sao verify và communicate test results?**

### Coverage Commands
```bash
# Run tests with coverage
npm run test -- --coverage

# Coverage threshold: 100% cho utils, 80% cho components
```

### Coverage Gaps
- Files/functions dưới 100% và lý do:
  - Component tests có thể không cover 100% (UI interactions)
  - Focus vào calculation logic phải đạt 100%

### Test Reports
- Coverage report: `coverage/lcov-report/index.html`
- Test results: Console output khi chạy tests

## Manual Testing
**Điều gì cần validation thủ công?**

### UI/UX Testing Checklist
- [ ] Giao diện đẹp, hiện đại
- [ ] Responsive trên mobile (iPhone, Android)
- [ ] Responsive trên desktop (1920x1080, 1366x768)
- [ ] Dropdown hoạt động mượt mà
- [ ] Input fields dễ sử dụng
- [ ] Checkboxes dễ click
- [ ] Price hiển thị rõ ràng, dễ đọc
- [ ] Loading states (nếu có)
- [ ] Error states hiển thị đúng

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Accessibility Testing
- [ ] Keyboard navigation hoạt động
- [ ] Screen reader đọc đúng labels
- [ ] Color contrast đạt WCAG AA
- [ ] Focus indicators rõ ràng
- [ ] ARIA labels đầy đủ

### Smoke Tests After Deployment
- [ ] Trang web load được trên GitHub Pages URL
- [ ] Tất cả tính năng hoạt động trên production
- [ ] Không có console errors
- [ ] Performance acceptable (< 2s load time)

## Performance Testing
**Làm sao validate performance?**

### Load Testing Scenarios
- Không cần (static site, không có server load)

### Performance Benchmarks
- [ ] Initial load < 2 giây
- [ ] Calculation time < 100ms
- [ ] Time to Interactive < 3 giây
- [ ] Bundle size < 500KB (gzipped)

### Tools
- Chrome DevTools Lighthouse
- React DevTools Profiler
- Network tab để check bundle size

## Bug Tracking
**Làm sao quản lý issues?**

### Issue Tracking Process
- Sử dụng GitHub Issues
- Label: bug, enhancement, question
- Priority: low, medium, high, critical

### Bug Severity Levels
- **Critical**: Calculation sai → Fix ngay
- **High**: UI không hoạt động → Fix trong 1 ngày
- **Medium**: Styling issues → Fix trong 1 tuần
- **Low**: Nice-to-have improvements → Backlog

### Regression Testing Strategy
- Trước mỗi release: Chạy lại tất cả tests
- Manual smoke test checklist
- Verify không có breaking changes

