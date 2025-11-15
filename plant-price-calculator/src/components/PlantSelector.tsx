import styled from 'styled-components';
import type { Plant } from '../data/plants';

interface PlantSelectorProps {
  plants: Plant[];
  selectedPlant: Plant | null;
  onPlantChange: (plant: Plant) => void;
}

const PlantSelectorWrapper = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.75rem;
    color: #333;
    font-size: 1.1rem;
  }

  .plant-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #fafafa;
  }

  .plant-button {
    padding: 0.6rem 1.2rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    font-weight: 500;

    &:hover {
      border-color: #667eea;
      background-color: #f0f4ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
    }

    &.selected {
      border-color: #667eea;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  }

`;

export const PlantSelector = ({ plants, selectedPlant, onPlantChange }: PlantSelectorProps) => {
  return (
    <PlantSelectorWrapper>
      <h3>Choose your plant</h3>
      <div className="plant-buttons">
        {plants.map((plant) => (
          <button
            key={plant.name}
            type="button"
            className={`plant-button ${selectedPlant?.name === plant.name ? 'selected' : ''}`}
            onClick={() => onPlantChange(plant)}
          >
            {plant.name}
          </button>
        ))}
      </div>
    </PlantSelectorWrapper>
  );
};

