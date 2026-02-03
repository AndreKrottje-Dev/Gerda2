import { useState } from 'react';
import { FOOD_DATABASE, getCategoryLabel, type FoodItem } from '../data/foodDatabase';
import { addFoodEntry, removeFoodEntry, getTodayLog } from '../utils/storage';

interface FoodLoggerProps {
    onUpdate: () => void;
}

export default function FoodLogger({ onUpdate }: FoodLoggerProps) {
    const [selectedCategory, setSelectedCategory] = useState<FoodItem['category']>('ontbijt');
    const [searchQuery, setSearchQuery] = useState('');
    const [todayFoods, setTodayFoods] = useState(getTodayLog().foods);

    const categories: FoodItem['category'][] = ['ontbijt', 'lunch', 'diner', 'snacks', 'dranken'];

    const filteredFoods = FOOD_DATABASE.filter(food => {
        const matchesCategory = food.category === selectedCategory;
        const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddFood = (food: FoodItem) => {
        addFoodEntry({
            name: food.name,
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            healthScore: food.healthScore
        });
        setTodayFoods(getTodayLog().foods);
        onUpdate();
    };

    const handleRemoveFood = (foodId: string) => {
        removeFoodEntry(foodId);
        setTodayFoods(getTodayLog().foods);
        onUpdate();
    };

    const getHealthScoreBadge = (score: number) => {
        if (score >= 8) return <span className="badge badge-success">Zeer gezond</span>;
        if (score >= 6) return <span className="badge badge-primary">Gezond</span>;
        if (score >= 4) return <span className="badge badge-warning">Matig</span>;
        return <span className="badge badge-danger">Ongezond</span>;
    };

    return (
        <div className="food-logger">
            <h2>Voeding registreren</h2>

            {/* Today's Foods */}
            {todayFoods.length > 0 && (
                <div className="card mb-lg">
                    <h3 className="card-title">Vandaag geregistreerd</h3>
                    <ul className="list">
                        {todayFoods.map(food => (
                            <li key={food.id} className="list-item">
                                <div className="list-item-content">
                                    <div className="list-item-title">{food.name}</div>
                                    <div className="list-item-subtitle">
                                        {food.calories} kcal • {getHealthScoreBadge(food.healthScore)}
                                    </div>
                                </div>
                                <button
                                    className="btn btn-danger btn-small"
                                    onClick={() => handleRemoveFood(food.id)}
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Search */}
            <div className="form-group">
                <input
                    type="text"
                    className="form-input"
                    placeholder="Zoek voeding..."
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
                        {getCategoryLabel(cat)}
                    </button>
                ))}
            </div>

            {/* Food List */}
            <div className="food-list">
                {filteredFoods.map(food => (
                    <div key={food.id} className="food-item" onClick={() => handleAddFood(food)}>
                        <div className="food-item-content">
                            <div className="food-item-name">{food.name}</div>
                            <div className="food-item-serving">{food.serving}</div>
                            <div className="food-item-macros">
                                <span>E: {food.protein}g</span>
                                <span>K: {food.carbs}g</span>
                                <span>V: {food.fat}g</span>
                            </div>
                        </div>
                        <div className="food-item-calories">
                            <div className="calories-value">{food.calories}</div>
                            <div className="calories-label">kcal</div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .food-logger {
          padding-bottom: var(--space-xl);
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
        
        .food-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        
        .food-item {
          background: var(--color-card);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }
        
        .food-item:hover {
          background: var(--color-card-hover);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        
        .food-item:active {
          transform: translateY(0);
        }
        
        .food-item-content {
          flex: 1;
        }
        
        .food-item-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-primary);
          margin-bottom: var(--space-xs);
        }
        
        .food-item-serving {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-xs);
        }
        
        .food-item-macros {
          display: flex;
          gap: var(--space-md);
          font-size: var(--font-size-xs);
          color: var(--color-text-tertiary);
        }
        
        .food-item-calories {
          text-align: right;
          margin-left: var(--space-md);
        }
        
        .calories-value {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
        }
        
        .calories-label {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
      `}</style>
        </div>
    );
}
