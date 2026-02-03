import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserProfile } from '../utils/storage';
import type { UserProfile } from '../utils/calculations';
import { calculateBMI, calculateBMR, calculateTDEE, getBMICategory } from '../utils/calculations';
import monogram from '../assets/gerda-monogram.svg';

export default function Onboarding() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'female' as 'male' | 'female',
        height: '',
        currentWeight: '',
        targetWeight: '',
        activityLevel: 'moderate' as UserProfile['activityLevel']
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = () => {
        const profile: UserProfile = {
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender,
            height: parseInt(formData.height),
            currentWeight: parseFloat(formData.currentWeight),
            targetWeight: parseFloat(formData.targetWeight),
            activityLevel: formData.activityLevel,
            createdAt: Date.now()
        };

        saveUserProfile(profile);
        navigate('/');
    };

    const canProceed = () => {
        if (step === 1) {
            return formData.name && formData.age && formData.gender;
        }
        if (step === 2) {
            return formData.height && formData.currentWeight && formData.targetWeight;
        }
        if (step === 3) {
            return formData.activityLevel;
        }
        return false;
    };

    const getPreview = () => {
        if (step === 3 && formData.height && formData.currentWeight) {
            const tempProfile: UserProfile = {
                name: formData.name,
                age: parseInt(formData.age),
                gender: formData.gender,
                height: parseInt(formData.height),
                currentWeight: parseFloat(formData.currentWeight),
                targetWeight: parseFloat(formData.targetWeight),
                activityLevel: formData.activityLevel,
                createdAt: 0
            };

            const bmi = calculateBMI(tempProfile.currentWeight, tempProfile.height);
            const bmr = calculateBMR(tempProfile);
            const tdee = calculateTDEE(tempProfile);

            return { bmi, bmr, tdee };
        }
        return null;
    };

    const preview = getPreview();

    return (
        <div className="app-container">
            <div className="page">
                <div className="onboarding-header">
                    <div className="brand-lockup">
                        <div className="brand-mark">
                            <img src={monogram} alt="Gerda" />
                        </div>
                        <div>
                            <div className="brand-name">Gerda</div>
                            <div className="brand-tagline">Performance Nutrition</div>
                        </div>
                    </div>
                    <h1>Profiel instellen</h1>
                    <p className="text-small">Snel en overzichtelijk aan de slag</p>

                    <div className="progress-steps">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
                        <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
                        <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
                        <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
                    </div>
                </div>

                <div className="card">
                    {step === 1 && (
                        <div className="fade-in">
                            <h2>Basisgegevens</h2>

                            <div className="form-group">
                                <label className="form-label">Naam</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="Je naam"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Leeftijd</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={formData.age}
                                    onChange={(e) => handleChange('age', e.target.value)}
                                    placeholder="25"
                                    min="10"
                                    max="120"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Geslacht</label>
                                <div className="gender-buttons">
                                    <button
                                        className={`gender-btn ${formData.gender === 'female' ? 'active' : ''}`}
                                        onClick={() => handleChange('gender', 'female')}
                                    >
                                        Vrouw
                                    </button>
                                    <button
                                        className={`gender-btn ${formData.gender === 'male' ? 'active' : ''}`}
                                        onClick={() => handleChange('gender', 'male')}
                                    >
                                        Man
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="fade-in">
                            <h2>Lichaamsmetingen</h2>

                            <div className="form-group">
                                <label className="form-label">Lengte (cm)</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={formData.height}
                                    onChange={(e) => handleChange('height', e.target.value)}
                                    placeholder="170"
                                    min="100"
                                    max="250"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Huidig gewicht (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-input"
                                    value={formData.currentWeight}
                                    onChange={(e) => handleChange('currentWeight', e.target.value)}
                                    placeholder="70.0"
                                    min="30"
                                    max="300"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Doelgewicht (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-input"
                                    value={formData.targetWeight}
                                    onChange={(e) => handleChange('targetWeight', e.target.value)}
                                    placeholder="65.0"
                                    min="30"
                                    max="300"
                                />
                            </div>

                            {formData.currentWeight && formData.height && (
                                <div className="bmi-preview">
                                    <span className="bmi-label">BMI (huidig)</span>
                                    <span className="bmi-value">
                                        {calculateBMI(parseFloat(formData.currentWeight), parseInt(formData.height))}
                                        <span className="bmi-category">
                                            ({getBMICategory(calculateBMI(parseFloat(formData.currentWeight), parseInt(formData.height)))})
                                        </span>
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="fade-in">
                            <h2>Activiteitsniveau</h2>

                            <div className="form-group">
                                <label className="form-label">Hoe actief ben je?</label>
                                <select
                                    className="form-select"
                                    value={formData.activityLevel}
                                    onChange={(e) => handleChange('activityLevel', e.target.value)}
                                >
                                    <option value="sedentary">Zittend (weinig beweging)</option>
                                    <option value="light">Licht actief (1-3 dagen/week)</option>
                                    <option value="moderate">Matig actief (3-5 dagen/week)</option>
                                    <option value="active">Actief (6-7 dagen/week)</option>
                                    <option value="very_active">Zeer actief (2x per dag)</option>
                                </select>
                            </div>

                            {preview && (
                                <div className="stats-preview">
                                    <h3>Je statistieken</h3>
                                    <div className="stats-grid">
                                        <div className="stat-card">
                                            <div className="stat-label">BMI</div>
                                            <div className="stat-value">{preview.bmi}</div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-label">BMR</div>
                                            <div className="stat-value">{preview.bmr}<span className="stat-unit">kcal</span></div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-label">TDEE</div>
                                            <div className="stat-value">{preview.tdee}<span className="stat-unit">kcal</span></div>
                                        </div>
                                    </div>
                                    <p className="text-small mt-md">
                                        Je ontvangt een dagelijks calorie-advies op basis van je profiel.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="button-group">
                        {step > 1 && (
                            <button className="btn btn-secondary" onClick={handleBack}>
                                Terug
                            </button>
                        )}
                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={!canProceed()}
                        >
                            {step === 3 ? 'Start' : 'Volgende'}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        .onboarding-header {
          text-align: left;
          margin-bottom: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        
        .progress-steps {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: var(--space-sm);
          margin-top: var(--space-lg);
        }
        
        .step {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-card);
          border: 2px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-secondary);
          transition: all 0.3s ease;
        }
        
        .step.active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }
        
        .step-line {
          width: 60px;
          height: 2px;
          background: var(--color-border);
          transition: all 0.3s ease;
        }
        
        .step-line.active {
          background: var(--color-primary);
        }
        
        .gender-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-md);
        }
        
        .gender-btn {
          padding: var(--space-lg);
          border: 2px solid var(--color-border);
          background: var(--color-card);
          border-radius: var(--radius-md);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .gender-btn:hover {
          background: var(--color-card-hover);
        }
        
        .gender-btn.active {
          border-color: var(--color-primary);
          background: rgba(27, 42, 65, 0.08);
          color: var(--color-primary);
        }
        
        .bmi-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md);
          background: var(--color-surface);
          border-radius: var(--radius-sm);
          margin-top: var(--space-md);
        }
        
        .bmi-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }
        
        .bmi-value {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
        }
        
        .bmi-category {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-left: var(--space-sm);
        }
        
        .stats-preview {
          margin-top: var(--space-lg);
          padding-top: var(--space-lg);
          border-top: 1px solid var(--color-border);
        }
        
        .button-group {
          display: flex;
          gap: var(--space-md);
          margin-top: var(--space-xl);
        }
        
        .button-group .btn {
          flex: 1;
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
}
