---
phase: planning
title: Plant Price Calculator - Project Planning
description: Phân tích công việc thành các task cụ thể và ước tính timeline
---

# Plant Price Calculator - Project Planning

## Milestones
**Các mốc quan trọng là gì?**

- [ ] **Milestone 1: Project Setup** - Khởi tạo React project, setup GitHub repo, cấu hình build
- [ ] **Milestone 2: Core Features** - Implement tính toán và UI components
- [ ] **Milestone 3: Polish & Deploy** - Styling, testing, deploy lên GitHub Pages

## Task Breakdown
**Công việc cụ thể cần làm là gì?**

### Phase 1: Foundation & Setup
- [ ] **Task 1.1**: Khởi tạo React project với Vite hoặc Create React App
  - Tạo project structure
  - Setup TypeScript (nếu dùng)
  - Cấu hình ESLint theo project rules
  - Setup styled-components

- [ ] **Task 1.2**: Setup GitHub repository
  - Tạo repo mới
  - Setup GitHub Pages branch (gh-pages)
  - Cấu hình GitHub Actions cho auto-deploy (nếu cần)
  - Tạo README.md

- [ ] **Task 1.3**: Tạo data files
  - `src/data/plants.ts`: Danh sách 20 cây với base price
  - `src/data/traits.ts`: Danh sách traits với multipliers (cần xác nhận giá trị)
  - `src/data/mutations.ts`: Mutation types và multipliers

### Phase 2: Core Features Implementation
- [ ] **Task 2.1**: Implement price calculation logic
  - Tạo `src/utils/priceCalculator.ts`
  - Implement function `calculatePrice()`
  - Implement function `formatPrice()`
  - Unit tests cho calculation logic

- [ ] **Task 2.2**: Implement PlantSelector component
  - Dropdown component với danh sách cây
  - Hiển thị base price khi chọn
  - Styled với styled-components

- [ ] **Task 2.3**: Implement WeightInput component
  - Number input với validation
  - Handle decimal numbers
  - Styled với styled-components

- [ ] **Task 2.4**: Implement MutationSelector component
  - Checkboxes hoặc radio buttons cho Gold/Prismatic
  - Logic chỉ chọn 1 (hoặc cả 2 nếu được xác nhận)
  - Styled với styled-components

- [ ] **Task 2.5**: Implement TraitSelector component
  - Grid layout với checkboxes cho 8 traits
  - Có thể chọn nhiều
  - Styled với styled-components

- [ ] **Task 2.6**: Implement PriceDisplay component
  - Hiển thị giá đã tính
  - Format với dấu phẩy
  - Styled màu đỏ (theo design gốc)

- [ ] **Task 2.7**: Implement Calculator main component
  - Combine tất cả components
  - State management với useState
  - Auto-calculate khi state thay đổi
  - Layout responsive

### Phase 3: Integration & Polish
- [ ] **Task 3.1**: Styling & UI/UX improvements
  - Apply modern, beautiful design
  - Responsive layout (mobile & desktop)
  - Hover effects, transitions
  - Color scheme phù hợp

- [ ] **Task 3.2**: Error handling & validation
  - Validate weight input (không âm, không rỗng)
  - Handle edge cases (weight = 0, không chọn cây)
  - Error messages (nếu cần)

- [ ] **Task 3.3**: Testing
  - Unit tests cho calculation logic
  - Component tests cho các components chính
  - Manual testing checklist
  - Cross-browser testing

- [ ] **Task 3.4**: Documentation
  - Update README với hướng dẫn sử dụng
  - Code comments cho complex logic
  - Deployment instructions

- [ ] **Task 3.5**: GitHub Pages deployment
  - Build production bundle
  - Deploy lên GitHub Pages
  - Test trên production URL
  - Verify tính năng hoạt động

## Dependencies
**Cần làm gì theo thứ tự nào?**

### Task Dependencies
- Task 1.1 → Task 1.3 (cần project setup trước khi tạo data files)
- Task 1.3 → Task 2.1 (cần data trước khi implement calculation)
- Task 2.1 → Task 2.2-2.7 (cần calculation logic trước khi build UI)
- Task 2.2-2.7 → Task 2.7 (cần tất cả sub-components trước khi combine)
- Task 2.7 → Task 3.1-3.5 (cần core features trước khi polish)

### External Dependencies
- GitHub account để tạo repo và deploy
- Node.js và npm/yarn để build project
- Internet connection để deploy

### Team/Resource Dependencies
- Cần xác nhận multiplier của traits từ stakeholder
- Không cần team members khác (solo project)

## Timeline & Estimates
**Khi nào sẽ hoàn thành?**

### Phase 1: Foundation (2-3 giờ)
- Task 1.1: 30 phút
- Task 1.2: 30 phút
- Task 1.3: 1-2 giờ (bao gồm xác nhận data)

### Phase 2: Core Features (4-6 giờ)
- Task 2.1: 1 giờ
- Task 2.2: 30 phút
- Task 2.3: 30 phút
- Task 2.4: 30 phút
- Task 2.5: 1 giờ
- Task 2.6: 30 phút
- Task 2.7: 1-2 giờ

### Phase 3: Polish & Deploy (2-3 giờ)
- Task 3.1: 1-2 giờ
- Task 3.2: 30 phút
- Task 3.3: 1 giờ
- Task 3.4: 30 phút
- Task 3.5: 30 phút

### Total Estimate
- **Optimistic**: 8 giờ
- **Realistic**: 10-12 giờ
- **Pessimistic**: 15 giờ (bao gồm debugging và refinement)

### Buffer for Unknowns
- Xác nhận multiplier traits: +1 giờ
- Styling refinement: +1-2 giờ
- Bug fixes: +1-2 giờ

## Risks & Mitigation
**Điều gì có thể xảy ra sai sót?**

### Technical Risks
1. **Risk**: Multiplier của traits chưa được xác nhận
   - **Impact**: Không thể implement calculation chính xác
   - **Mitigation**: Tạo placeholder values, implement logic với config dễ thay đổi

2. **Risk**: GitHub Pages deployment issues
   - **Impact**: Không deploy được
   - **Mitigation**: Follow official docs, test với simple build trước

3. **Risk**: Styled-components conflicts với existing styles
   - **Impact**: Styling không đúng
   - **Mitigation**: Use CSS reset, scope styles properly

### Resource Risks
1. **Risk**: Không có thời gian để hoàn thành
   - **Impact**: Project không hoàn thành
   - **Mitigation**: Prioritize core features, defer nice-to-have

### Dependency Risks
1. **Risk**: Công thức tính toán thay đổi
   - **Impact**: Cần refactor code
   - **Mitigation**: Tách calculation logic ra utility function, dễ update

## Resources Needed
**Cần gì để thành công?**

### Team Members and Roles
- Developer: 1 người (full-stack, frontend focus)

### Tools and Services
- **Development**:
  - Node.js (v18+)
  - npm hoặc yarn
  - Code editor (VS Code recommended)
  - Git

- **Deployment**:
  - GitHub account
  - GitHub Pages (free)

### Infrastructure
- Không cần infrastructure (static site)

### Documentation/Knowledge
- React documentation
- styled-components documentation
- GitHub Pages deployment guide
- Project requirements và design docs

