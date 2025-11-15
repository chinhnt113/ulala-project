import styled from 'styled-components';
import type { MutationType } from '../data/mutations';
import { mutations } from '../data/mutations';

interface MutationSelectorProps {
  mutation: MutationType;
  onMutationChange: (mutation: MutationType) => void;
}

const MutationSelectorWrapper = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.75rem;
    color: #333;
    font-size: 1.1rem;
  }

  .mutation-options {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }

  .mutation-radio {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f0f0f0;
    }

    input[type="radio"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: #667eea;
    }

    label {
      cursor: pointer;
      user-select: none;
      font-weight: 500;
      color: #333;
    }
  }
`;

export const MutationSelector = ({ mutation, onMutationChange }: MutationSelectorProps) => {
  return (
    <MutationSelectorWrapper>
      <h3>Mutation</h3>
      <div className="mutation-options">
        {mutations.map((mut) => (
          <div key={mut.type} className="mutation-radio">
            <input
              type="radio"
              id={`mutation-${mut.type}`}
              name="mutation"
              value={mut.type}
              checked={mutation === mut.type}
              onChange={() => onMutationChange(mut.type)}
            />
            <label htmlFor={`mutation-${mut.type}`}>
              {mut.name}
            </label>
          </div>
        ))}
      </div>
    </MutationSelectorWrapper>
  );
};

