import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Plant } from '../data/plants';
import type { MutationType } from '../data/mutations';
import { plants } from '../data/plants';
import { PlantSelector } from './PlantSelector';
import { WeightInput } from './WeightInput';
import { MutationSelector } from './MutationSelector';
import { TraitSelector } from './TraitSelector';
import { PriceDisplay } from './PriceDisplay';
import { calculatePrice } from '../utils/priceCalculator';

// Import logo to handle base path correctly
const logoUrl = `${import.meta.env.BASE_URL}logo.png`;

const CalculatorWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 767px) {
    padding: 1rem;
    border-radius: 0;
    margin: 0;
  }

  .calculator-header {
    text-align: center;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .calculator-logo {
    max-width: 300px;
    height: auto;
    margin: 0 auto;

    @media (max-width: 767px) {
      max-width: 200px;
    }
  }

  .calculator-title {
    color: #333;
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .calculator-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 200px; /* Space for sticky price on mobile */

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      padding-bottom: 0;
    }
  }

  .calculator-inputs {
    display: flex;
    flex-direction: column;
  }

  .price-container {
    @media (max-width: 767px) {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 1rem;
      background: white;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
      margin: 0;
    }
  }

  .credit-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
    color: #666;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .footer-logo {
      max-width: 150px;
      height: auto;
      opacity: 0.8;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }

    .footer-credit {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;

      &:hover {
        color: #764ba2;
        text-decoration: underline;
      }
    }
  }
`;

export const Calculator = () => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [weight, setWeight] = useState<number>(0);
  const [mutation, setMutation] = useState<MutationType>('none');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  // Auto-calculate price when any input changes
  useEffect(() => {
    if (selectedPlant && weight > 0) {
      const price = calculatePrice(
        selectedPlant.basePrice,
        weight,
        mutation,
        selectedTraits
      );
      setCalculatedPrice(price);
    } else {
      setCalculatedPrice(0);
    }
  }, [selectedPlant, weight, mutation, selectedTraits]);

  return (
    <CalculatorWrapper>
      <div className="calculator-header">
        <img src={logoUrl} alt="Ulala Idle Adventure" className="calculator-logo" />
        <h1 className="calculator-title">Plant Price Calculator</h1>
      </div>
      <div className="calculator-content">
        <div className="calculator-inputs">
          <PlantSelector
            plants={plants}
            selectedPlant={selectedPlant}
            onPlantChange={setSelectedPlant}
          />
          <WeightInput weight={weight} onWeightChange={setWeight} />
          <MutationSelector mutation={mutation} onMutationChange={setMutation} />
          <TraitSelector
            selectedTraits={selectedTraits}
            onTraitsChange={setSelectedTraits}
          />
        </div>
        <div className="price-container">
          <PriceDisplay 
            price={calculatedPrice} 
            hasValidInputs={!!selectedPlant && weight > 0}
          />
        </div>
      </div>
      <div className="credit-footer">
        <img src={logoUrl} alt="Ulala Idle Adventure" className="footer-logo" />
        <div className="footer-credit">
          Created by <a href="https://discord.com/users/.urghhh" target="_blank" rel="noopener noreferrer">@.urghhh</a>
        </div>
      </div>
    </CalculatorWrapper>
  );
};
