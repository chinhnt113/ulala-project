import styled from 'styled-components';
import { traits } from '../data/traits';

interface TraitSelectorProps {
  selectedTraits: string[];
  onTraitsChange: (traits: string[]) => void;
}

const TraitSelectorWrapper = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.75rem;
    color: #333;
    font-size: 1.1rem;
  }

  .trait-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }

  .trait-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.75rem;
    border-radius: 6px;
    transition: all 0.2s ease;
    background-color: #fff;
    border: 1px solid transparent;

    &:hover {
      background-color: #f0f4ff;
      border-color: #667eea;
      transform: translateY(-1px);
    }

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: #667eea;
    }

    label {
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      color: #333;
    }

  }

  .selected-count {
    margin-top: 0.75rem;
    padding: 0.5rem;
    background-color: #e3f2fd;
    border-radius: 6px;
    color: #1976d2;
    font-weight: 600;
    font-size: 0.875rem;
  }
`;

export const TraitSelector = ({ selectedTraits, onTraitsChange }: TraitSelectorProps) => {
  const handleTraitToggle = (traitName: string) => {
    if (selectedTraits.includes(traitName)) {
      onTraitsChange(selectedTraits.filter((t) => t !== traitName));
    } else {
      onTraitsChange([...selectedTraits, traitName]);
    }
  };

  return (
    <TraitSelectorWrapper>
      <h3>Traits</h3>
      <div className="trait-grid">
        {traits.map((trait) => (
          <div 
            key={trait.name} 
            className="trait-checkbox"
            onClick={() => handleTraitToggle(trait.name)}
          >
            <input
              type="checkbox"
              id={`trait-${trait.name}`}
              checked={selectedTraits.includes(trait.name)}
              onChange={() => {}} // Controlled by div onClick
              onClick={(e) => e.stopPropagation()}
              readOnly
            />
            <label 
              htmlFor={`trait-${trait.name}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleTraitToggle(trait.name);
              }}
            >
              {trait.name}
            </label>
          </div>
        ))}
      </div>
      {selectedTraits.length > 0 && (
        <div className="selected-count">
          Selected: {selectedTraits.length} trait(s)
        </div>
      )}
    </TraitSelectorWrapper>
  );
};

