import styled from 'styled-components';
import { formatPrice } from '../utils/priceCalculator';

interface PriceDisplayProps {
  price: number;
  hasValidInputs: boolean;
}

const PriceDisplayWrapper = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  text-align: center;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 2px solid #e0e0e0;

  @media (max-width: 767px) {
    margin-top: 0;
    border-radius: 16px 16px 0 0;
    min-height: 120px;
    padding: 1.5rem;
  }

  .price-label {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
  }

  .price-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #e74c3c;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 767px) {
      font-size: 2rem;
    }
  }

  .placeholder-message {
    font-size: 1rem;
    color: #999;
    font-style: italic;
    padding: 1rem;
  }
`;

export const PriceDisplay = ({ price, hasValidInputs }: PriceDisplayProps) => {
  if (!hasValidInputs) {
    return (
      <PriceDisplayWrapper>
        <div className="placeholder-message">
          Please select a plant and enter weight to calculate price
        </div>
      </PriceDisplayWrapper>
    );
  }

  return (
    <PriceDisplayWrapper>
      <div className="price-label">Price</div>
      <div className="price-value">{formatPrice(price)}</div>
    </PriceDisplayWrapper>
  );
};

