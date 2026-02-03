import { useState } from 'react';
import { EXERCISE_DATABASE, getExerciseCategoryLabel, type ExerciseActivity } from '../data/exerciseDatabase';
import { addExerciseEntry, removeExerciseEntry, getTodayLog, getUserProfile } from '../utils/storage';
import { calculateCaloriesBurned } from '../utils/calculations';

interface ExerciseLoggerProps {
    onUpdate: () => void;
}

export default function ExerciseLogger({ onUpdate }: ExerciseLoggerProps) {
    const [selectedCategory, setSelectedCategory] = useState<ExerciseActivity['category']>('cardio');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExercise, setSelectedExercise] = useState<ExerciseActivity | null>(null);
    const [duration, setDuration] = useState('30');
    const [todayExercises, setTodayExercises] = useState(getTodayLog().exercises);

    const profile = getUserProfile();
    const categories: ExerciseActivity['category'][] = ['cardio', 'kracht', 'sport', 'ontspanning'];

    const getCategoryBadge = (category: ExerciseActivity['category']) => {
        switch (category) {
            case 'cardio':
                return 'CA';
            case 'kracht':
                return 'KR';
            case 'sport':
                return 'SP';
            default:
                return 'RE';
        }
    };

    const filteredExercises = EXERCISE_DATABASE.filter(ex => {
        const matchesCategory = ex.category === selectedCategory;
        const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSelectExercise = (exercise: ExerciseActivity) => {
        setSelectedExercise(exercise);
    };

    const handleAddExercise = () => {
        if (!selectedExercise || !profile) return;

        const durationNum = parseInt(duration);
        if (isNaN(durationNum) || durationNum <= 0) return;

        const caloriesBurned = calculateCaloriesBurned(
            selectedExercise.met,
            profile.currentWeight,
            durationNum
        );

        addExerciseEntry({
            name: selectedExercise.name,
            duration: durationNum,
            caloriesBurned
        });

        setTodayExercises(getTodayLog().exercises);
        setSelectedExercise(null);
        setDuration('30');
        onUpdate();
    };

    const handleRemoveExercise = (exerciseId: string) => {
        removeExerciseEntry(exerciseId);
        setTodayExercises(getTodayLog().exercises);
        onUpdate();
    };

    return (
        <div className="exercise-logger">
            <h2>Training & Beweging</h2>

            {/* Today's Exercises */}
            {todayExercises.length > 0 && (
                <div className="card mb-lg">
                    <h3 className="card-title">Vandaag geregistreerd</h3>
                    <ul className="list">
                        {todayExercises.map(ex => (
                            <li key={ex.id} className="list-item">
                                <div className="list-item-content">
                                    <div className="list-item-title">{ex.name}</div>
                                    <div className="list-item-subtitle">
                                        {ex.duration} min • {Math.round(ex.caloriesBurned)} kcal verbrand
                                    </div>
                                </div>
                                <button
                                    className="btn btn-danger btn-small"
                                    onClick={() => handleRemoveExercise(ex.id)}
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Add Exercise Form */}
            {selectedExercise && profile && (
                <div className="card mb-lg exercise-form">
                    <h3 className="card-title">{selectedExercise.name}</h3>

                    <div className="form-group">
                        <label className="form-label">Duur (minuten)</label>
                        <input
                            type="number"
                            className="form-input"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            min="1"
                    placeholder="30"
                />
            </div>

                    <div className="calories-preview">
                        <span className="calories-preview-label">Geschatte calorieën verbrand:</span>
                        <span className="calories-preview-value">
                            {Math.round(calculateCaloriesBurned(selectedExercise.met, profile.currentWeight, parseInt(duration) || 0))} kcal
                        </span>
                    </div>

                    <div className="flex gap-sm">
                        <button className="btn btn-primary" onClick={handleAddExercise}>
                            Toevoegen
                        </button>
                        <button className="btn btn-secondary" onClick={() => setSelectedExercise(null)}>
                            Annuleren
                        </button>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="form-group">
                <input
                    type="text"
                    className="form-input"
                    placeholder="Zoek training..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Category Tabs */}
            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {getExerciseCategoryLabel(cat)}
                    </button>
                ))}
            </div>

            {/* Exercise List */}
            <div className="exercise-list">
                {filteredExercises.map(ex => (
                    <div
                        key={ex.id}
                        className="exercise-item"
                        onClick={() => handleSelectExercise(ex)}
                    >
                        <div className="exercise-icon">{getCategoryBadge(ex.category)}</div>
                        <div className="exercise-content">
                            <div className="exercise-name">{ex.name}</div>
                            <div className="exercise-met">MET: {ex.met}</div>
                        </div>
                        <div className="exercise-arrow">›</div>
                    </div>
                ))}
            </div>

            <style>{`
        .exercise-logger {
          padding-bottom: var(--space-xl);
        }
        
        .exercise-form {
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
        }
        
        .calories-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-md);
          background: var(--color-surface);
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-lg);
          border: 1px solid var(--color-border);
        }
        
        .calories-preview-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }
        
        .calories-preview-value {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
        }
        
        .category-tabs {
          display: flex;
          gap: var(--space-sm);
          margin-bottom: var(--space-lg);
          overflow-x: auto;
          padding-bottom: var(--space-sm);
        }
        
        .category-tab {
          padding: var(--space-sm) var(--space-lg);
          border: none;
          background: var(--color-card);
          color: var(--color-text-secondary);
          border-radius: var(--radius-xl);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }
        
        .category-tab:hover {
          background: var(--color-card-hover);
        }
        
        .category-tab.active {
          background: var(--color-primary);
          color: white;
        }
        
        .exercise-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        
        .exercise-item {
          background: var(--color-card);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          display: flex;
          align-items: center;
          gap: var(--space-md);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }
        
        .exercise-item:hover {
          background: var(--color-card-hover);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .exercise-item:active {
          transform: translateY(0);
        }
        
        .exercise-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--color-surface);
          color: var(--color-primary);
          font-size: 12px;
          letter-spacing: 0.12em;
          font-weight: var(--font-weight-semibold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .exercise-content {
          flex: 1;
        }
        
        .exercise-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-primary);
          margin-bottom: var(--space-xs);
        }
        
        .exercise-met {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }
        
        .exercise-arrow {
          font-size: var(--font-size-xl);
          color: var(--color-text-tertiary);
        }
      `}</style>
        </div>
    );
}
