import { useState } from 'react';
import { FOOD_DATABASE, getCategoryLabel, type FoodItem } from '../data/foodDatabase';
import { addFoodEntry, removeFoodEntry, getTodayLog, getCustomFoods, addCustomFood, removeCustomFood } from '../utils/storage';

interface FoodLoggerProps {
    onUpdate: () => void;
}

export default function FoodLogger({ onUpdate }: FoodLoggerProps) {
    const [selectedCategory, setSelectedCategory] = useState<FoodItem['category']>('ontbijt');
    const [searchQuery, setSearchQuery] = useState('');
    const [todayFoods, setTodayFoods] = useState(getTodayLog().foods);
    const [customFoods, setCustomFoods] = useState<FoodItem[]>(getCustomFoods());
    const [customForm, setCustomForm] = useState({
        name: '',
        category: 'ontbijt' as FoodItem['category'],
        serving: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        healthScore: '7'
    });
    const [isCustomOpen, setIsCustomOpen] = useState(false);

    const categories: FoodItem['category'][] = ['ontbijt', 'lunch', 'diner', 'snacks', 'dranken'];

    const allFoods = [...customFoods, ...FOOD_DATABASE];

    const filteredFoods = allFoods.filter(food => {
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

    const handleAddCustomFood = () => {
        if (!customForm.name.trim() || !customForm.serving.trim()) return;
        const calories = parseFloat(customForm.calories);
        const protein = parseFloat(customForm.protein);
        const carbs = parseFloat(customForm.carbs);
        const fat = parseFloat(customForm.fat);
        const healthScore = parseInt(customForm.healthScore, 10);

        if ([calories, protein, carbs, fat].some((v) => isNaN(v))) return;
        if (isNaN(healthScore) || healthScore < 1 || healthScore > 10) return;

        const newFood = addCustomFood({
            name: customForm.name.trim(),
            category: customForm.category,
            serving: customForm.serving.trim(),
            calories,
            protein,
            carbs,
            fat,
            healthScore
        });

        setCustomFoods([newFood, ...customFoods]);
        setCustomForm({
            name: '',
            category: customForm.category,
            serving: '',
            calories: '',
            protein: '',
            carbs: '',
            fat: '',
            healthScore: '7'
        });
    };

    const handleRemoveCustomFood = (foodId: string) => {
        removeCustomFood(foodId);
        setCustomFoods(getCustomFoods());
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
                    <div className="today-header">
                        <h3 className="card-title">Vandaag geregistreerd</h3>
                        <div className="today-summary">
                            {todayFoods.length} items
                        </div>
                    </div>
                    <ul className="list">
                        {Object.values(
                            todayFoods.reduce((acc, food) => {
                                const key = food.name.toLowerCase();
                                if (!acc[key]) {
                                    acc[key] = {
                                        name: food.name,
                                        calories: food.calories,
                                        protein: food.protein,
                                        carbs: food.carbs,
                                        fat: food.fat,
                                        healthScore: food.healthScore,
                                        count: 1,
                                        ids: [food.id]
                                    };
                                } else {
                                    acc[key].calories += food.calories;
                                    acc[key].protein += food.protein;
                                    acc[key].carbs += food.carbs;
                                    acc[key].fat += food.fat;
                                    acc[key].count += 1;
                                    acc[key].ids.push(food.id);
                                }
                                return acc;
                            }, {} as Record<string, { name: string; calories: number; protein: number; carbs: number; fat: number; healthScore: number; count: number; ids: string[] }>)
                        ).map(item => (
                            <li key={item.name} className="list-item">
                                <div className="list-item-content">
                                    <div className="list-item-title">
                                        {item.name} {item.count > 1 && <span className="item-count">x{item.count}</span>}
                                    </div>
                                    <div className="list-item-subtitle">
                                        {Math.round(item.calories)} kcal • {getHealthScoreBadge(item.healthScore)}
                                    </div>
                                </div>
                                <div className="list-actions">
                                    <button
                                        className="btn btn-secondary btn-small"
                                        onClick={() => item.ids.forEach(id => handleRemoveFood(id))}
                                    >
                                        Verwijder
                                    </button>
                                </div>
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

            {/* Custom Food */}
            <div className="card mb-lg">
                <div className="custom-header">
                    <h3 className="card-title">Eigen item toevoegen</h3>
                    <button
                        className="btn btn-secondary btn-small"
                        onClick={() => setIsCustomOpen(!isCustomOpen)}
                    >
                        {isCustomOpen ? 'Sluiten' : 'Openen'}
                    </button>
                </div>

                {isCustomOpen && (
                    <div className="custom-body">
                        <div className="custom-grid">
                        <div className="form-group">
                            <label className="form-label">Naam</label>
                            <input
                            type="text"
                            className="form-input"
                            value={customForm.name}
                            onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                            placeholder="Bijv. Kipfilet"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Categorie</label>
                        <select
                            className="form-select"
                            value={customForm.category}
                            onChange={(e) => setCustomForm({ ...customForm, category: e.target.value as FoodItem['category'] })}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Portie</label>
                        <input
                            type="text"
                            className="form-input"
                            value={customForm.serving}
                            onChange={(e) => setCustomForm({ ...customForm, serving: e.target.value })}
                            placeholder="Bijv. 100g"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Calorieën</label>
                        <input
                            type="number"
                            className="form-input"
                            value={customForm.calories}
                            onChange={(e) => setCustomForm({ ...customForm, calories: e.target.value })}
                            placeholder="120"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Eiwit (g)</label>
                        <input
                            type="number"
                            className="form-input"
                            value={customForm.protein}
                            onChange={(e) => setCustomForm({ ...customForm, protein: e.target.value })}
                            placeholder="25"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Koolhydraten (g)</label>
                        <input
                            type="number"
                            className="form-input"
                            value={customForm.carbs}
                            onChange={(e) => setCustomForm({ ...customForm, carbs: e.target.value })}
                            placeholder="3"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Vetten (g)</label>
                        <input
                            type="number"
                            className="form-input"
                            value={customForm.fat}
                            onChange={(e) => setCustomForm({ ...customForm, fat: e.target.value })}
                            placeholder="2"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Gezondheids-score (1-10)</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            className="form-input"
                            value={customForm.healthScore}
                            onChange={(e) => setCustomForm({ ...customForm, healthScore: e.target.value })}
                            placeholder="7"
                        />
                    </div>
                </div>
                        <div className="flex gap-sm">
                            <button className="btn btn-primary" onClick={handleAddCustomFood}>
                                Toevoegen
                            </button>
                        </div>
                    </div>
                )}

                {customFoods.length > 0 && (
                    <div className="custom-list">
                        <div className="custom-list-title">Eigen items</div>
                        <ul className="list">
                            {customFoods.map(food => (
                                <li key={food.id} className="list-item">
                                    <div className="list-item-content">
                                        <div className="list-item-title">{food.name}</div>
                                        <div className="list-item-subtitle">{food.serving} • {food.calories} kcal</div>
                                    </div>
                                    <button
                                        className="btn btn-danger btn-small"
                                        onClick={() => handleRemoveCustomFood(food.id)}
                                    >
                                        Verwijder
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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
                        {food.id.startsWith('cust_') && (
                            <div className="custom-flag">Eigen</div>
                        )}
                    </div>
                ))}
            </div>

            <style>{`
        .food-logger {
          padding-bottom: var(--space-xl);
        }

        .custom-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-md);
        }

        .today-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-sm);
        }

        .today-summary {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .item-count {
          font-size: var(--font-size-xs);
          padding: 2px 6px;
          border-radius: 999px;
          background: rgba(27, 42, 65, 0.08);
          color: var(--color-primary);
          margin-left: var(--space-sm);
        }

        .list-actions {
          display: flex;
          gap: var(--space-xs);
        }

        .custom-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-md);
        }

        .custom-body {
          margin-top: var(--space-md);
        }

        .custom-list {
          margin-top: var(--space-lg);
        }

        .custom-list-title {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-sm);
          text-transform: uppercase;
          letter-spacing: 0.12em;
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
          position: relative;
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

        .custom-flag {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: var(--font-size-xs);
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(27, 42, 65, 0.08);
          color: var(--color-primary);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @media (max-width: 520px) {
          .custom-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
