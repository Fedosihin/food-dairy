// src/ProductModal.jsx
import { symptoms } from './symptomsData';

function SymptomModal({ onClose, onSelectSymptom }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Выберите симптом</h2>
        <div className="products-grid">
          {symptoms.map(symptom => (
            <div 
              key={symptom.id}
              className="product-card"
              onClick={() => {onSelectSymptom({...symptom, type: 'symptom'}); onClose();}}
            >
              <img 
                src={symptom.image} 
                alt={symptom.name} 
                className="product-thumb"
              />
              <p>{symptom.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SymptomModal;