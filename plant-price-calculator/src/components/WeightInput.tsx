import { useState } from 'react';
import styled from 'styled-components';

interface WeightInputProps {
  weight: number;
  onWeightChange: (weight: number) => void;
}

const WeightInputWrapper = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.75rem;
    color: #333;
    font-size: 1.1rem;
  }

  .weight-input {
    width: 100%;
    max-width: 300px;
    padding: 0.875rem 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background-color: #fff;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    &.error {
      border-color: #e74c3c;
      background-color: #fff5f5;
    }
  }

  .error-message {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    font-weight: 500;
  }
`;

export const WeightInput = ({ weight, onWeightChange }: WeightInputProps) => {
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseFloat(value);

    if (value === '') {
      onWeightChange(0);
      setError('');
      return;
    }

    if (isNaN(numValue)) {
      setError('Please enter a valid number');
      return;
    }

    if (numValue <= 0) {
      setError('Weight must be greater than 0');
      onWeightChange(0);
      return;
    }

    setError('');
    onWeightChange(numValue);
  };

  return (
    <WeightInputWrapper>
      <label htmlFor="weight-input">
        <h3>Weight (kg)</h3>
      </label>
      <input
        id="weight-input"
        type="number"
        step="0.01"
        min="0"
        value={weight || ''}
        onChange={handleChange}
        className={`weight-input ${error ? 'error' : ''}`}
        placeholder="Enter weight"
      />
      {error && <div className="error-message">{error}</div>}
    </WeightInputWrapper>
  );
};

