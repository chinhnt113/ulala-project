---
phase: requirements
title: Plant Price Calculator - Requirements
description: Giao diện web đơn giản để tính toán giá hoa quả dựa trên base price, weight, mutations và traits
---

# Plant Price Calculator - Requirements

## Problem Statement
**Vấn đề cần giải quyết là gì?**

- Người chơi game cần tính toán giá của hoa quả một cách nhanh chóng và chính xác
- Hiện tại người chơi phải sử dụng Google Sheets hoặc Excel để tính toán, không tiện lợi và khó truy cập
- Công thức tính toán phức tạp với nhiều yếu tố: base price, weight, mutations, và traits
- Cần một công cụ web đơn giản, dễ sử dụng, có thể truy cập từ mọi nơi

**Ai bị ảnh hưởng?**
- Người chơi game cần tính giá hoa quả để quyết định giao dịch

**Tình trạng hiện tại/workaround?**
- Sử dụng Google Sheets/Excel với công thức tính toán thủ công
- Phải clone file và tự cập nhật

## Goals & Objectives
**Mục tiêu muốn đạt được?**

### Primary Goals
- Tạo giao diện web đơn giản, dễ sử dụng để tính giá hoa quả
- Tự động tính toán giá dựa trên công thức: `Base price * (Weight in kilograms)^2 * (50 if prismatic mutation or 20 if golden mutation or 1 if none) * (sum of selected trait multipliers, capped at 55)`
- Hiển thị danh sách cây trồng với base price
- Cho phép người dùng chọn cây, nhập weight, và chọn mutations/traits
- Deploy miễn phí trên GitHub Pages

### Secondary Goals
- Giao diện đẹp, hiện đại, responsive
- Tính toán real-time khi người dùng thay đổi input
- Format số tiền dễ đọc (có dấu phẩy ngăn cách)

### Non-goals
- Không cần backend server
- Không cần database
- Không cần authentication/user management
- Không cần lưu lịch sử tính toán

## User Stories & Use Cases
**Người dùng sẽ tương tác với giải pháp như thế nào?**

### User Story 1: Tính giá cơ bản
- **As a** người chơi game
- **I want to** chọn loại cây từ dropdown và nhập cân nặng
- **So that** tôi có thể xem giá cơ bản của hoa quả

### User Story 2: Tính giá với mutations
- **As a** người chơi game
- **I want to** chọn Gold Mutation hoặc Prismatic Mutation
- **So that** giá được tính với multiplier tương ứng (20 cho Gold, 50 cho Prismatic)

### User Story 3: Tính giá với traits
- **As a** người chơi game
- **I want to** tích chọn các traits (Dust, Lightning, Rainbow, Terror, Air, Hazy, Cold, Moist)
- **So that** giá được tính với tổng multiplier của các traits (tối đa 55)

### User Story 4: Tính toán tự động
- **As a** người chơi game
- **I want to** thay đổi bất kỳ input nào (cây, weight, mutations, traits)
- **So that** giá được tự động cập nhật ngay lập tức

### Key Workflows
1. Người dùng mở trang web
2. Chọn cây từ dropdown → Base Price tự động hiển thị
3. Nhập Weight (kg)
4. Chọn mutation (nếu có): Gold Mutation hoặc Prismatic Mutation
5. Chọn các traits (có thể chọn nhiều)
6. Giá được tính và hiển thị tự động

### Edge Cases
- Người dùng không chọn mutation nào → multiplier = 1
- Người dùng không chọn trait nào → multiplier = 1
- Người dùng nhập weight = 0 hoặc số âm → hiển thị lỗi hoặc giá = 0
- Tổng multiplier của traits vượt quá 55 → giới hạn ở 55

## Success Criteria
**Làm sao biết khi nào hoàn thành?**

### Measurable Outcomes
- Giao diện web hoạt động trên tất cả trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)
- Tính toán chính xác 100% so với công thức đã cho
- Thời gian phản hồi < 100ms khi thay đổi input
- Deploy thành công trên GitHub Pages

### Acceptance Criteria
- [ ] Dropdown hiển thị đầy đủ 20 loại cây với base price
- [ ] Input weight chấp nhận số thập phân
- [ ] Checkbox mutations hoạt động đúng (chỉ chọn 1 trong 2: Gold hoặc Prismatic, không thể chọn cả 2)
- [ ] Checkbox traits hoạt động độc lập (có thể chọn nhiều)
- [ ] Giá được tính đúng theo công thức
- [ ] Giá được format với dấu phẩy ngăn cách (ví dụ: 12,144,588)
- [ ] Giao diện responsive trên mobile và desktop
- [ ] Code sẵn sàng deploy trên GitHub Pages

### Performance Benchmarks
- Load time < 2 giây
- Tính toán real-time không có độ trễ cảm nhận được

## Constraints & Assumptions
**Giới hạn cần làm việc trong đó?**

### Technical Constraints
- Phải deploy miễn phí trên GitHub Pages (static site)
- Chỉ sử dụng frontend (ReactJS)
- Không có backend server
- Phải tương thích với các trình duyệt hiện đại

### Business Constraints
- Không có ngân sách cho hosting
- Cần deploy nhanh và đơn giản

### Time/Budget Constraints
- Không có deadline cụ thể
- Phát triển với nguồn lực tối thiểu

### Assumptions
- Người dùng có kết nối internet để truy cập GitHub Pages
- Người dùng sử dụng trình duyệt hiện đại
- Công thức tính toán đã được xác nhận chính xác
- Danh sách cây và base price có thể cần cập nhật trong tương lai (nhưng không thường xuyên)

## Questions & Open Items
**Điều gì cần làm rõ thêm?**

### Resolved Questions ✅
- **Multiplier của từng trait** (đã xác nhận):
  - Dust: 10
  - Lightning: 10
  - Rainbow: 10
  - Terror: 10
  - Air: 5
  - Hazy: 5
  - Cold: 3
  - Moist: 2
  - **Tổng tối đa**: 55 (10+10+10+10+5+5+3+2 = 55)
- **Mutation logic**: Không thể chọn cả Gold và Prismatic cùng lúc, chỉ chọn 1 trong 2
- **Không chọn mutation**: multiplier = 1
- **Không chọn trait**: multiplier = 1 (tổng = 0, nhưng dùng 1 trong công thức)
- **Format số tiền**: Làm tròn đến số nguyên (không có phần thập phân)

### Open Questions (nếu có)
- Không còn câu hỏi mở nào

### Research Needed
- Nghiên cứu cách deploy React app lên GitHub Pages
- Nghiên cứu cách format số tiền trong JavaScript
- Nghiên cứu UI/UX best practices cho calculator

