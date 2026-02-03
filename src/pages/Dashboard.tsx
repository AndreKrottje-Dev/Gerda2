import { useState } from 'react';
import { getUserProfile, getTodayLog } from '../utils/storage';
import { calculateDailyCalorieGoal } from '../utils/calculations';
import GerdaCoach from '../components/GerdaCoach';
import ProgressRing from '../components/ProgressRing';
import StreakCounter from '../components/StreakCounter';
import Navbar from '../components/Navbar';
import monogram from '../assets/gerda-monogram.svg';

export default function Dashboard() {
  const [profile] = useState(getUserProfile());
  const [todayLog] = useState(getTodayLog());

  if (!profile) {
    return null; // Will be redirected by App.tsx
  }

  const calorieGoal = calculateDailyCalorieGoal(profile);
  const caloriesConsumed = todayLog.foods.reduce((sum, food) => sum + food.calories, 0);
  const caloriesBurned = todayLog.exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0);
  const netCalories = caloriesConsumed - caloriesBurned;
  const progress = Math.min((netCalories / calorieGoal) * 100, 100);

  // Calculate macros
  const totalProtein = todayLog.foods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = todayLog.foods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = todayLog.foods.reduce((sum, food) => sum + food.fat, 0);

  return (
    <div className="app-container">
      <div className="page dashboard-compact">
        <div className="dashboard-header">
          <div className="brand-lockup">
            <div className="brand-mark">
              <img src={monogram} alt="Gerda" />
            </div>
            <div>
              <div className="brand-name">Gerda</div>
              <div className="brand-tagline">Performance Nutrition</div>
            </div>
          </div>
          <div>
            <h1>Welkom terug, {profile.name}</h1>
            <p className="text-small">
              {new Date().toLocaleDateString('nl-NL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <GerdaCoach profile={profile} />

        <StreakCounter />

        <div className="card">
          <h3 className="card-title text-center">Vandaag</h3>

          <div className="progress-ring-wrapper">
            <ProgressRing
              progress={progress}
              size={160}
              strokeWidth={16}
              color="var(--color-primary)"
              value={`${Math.round(netCalories)}`}
              label={`van ${Math.round(calorieGoal)} kcal`}
            />
          </div>

          <div className="calorie-breakdown">
            <div className="calorie-item">
              <span className="calorie-icon">IN</span>
              <div>
                <div className="calorie-label">Inname</div>
                <div className="calorie-value">{Math.round(caloriesConsumed)} kcal</div>
              </div>
            </div>

            <div className="calorie-divider">-</div>

            <div className="calorie-item">
              <span className="calorie-icon">OUT</span>
              <div>
                <div className="calorie-label">Verbruik</div>
                <div className="calorie-value">{Math.round(caloriesBurned)} kcal</div>
              </div>
            </div>

            <div className="calorie-divider">=</div>

            <div className="calorie-item">
              <span className="calorie-icon">NET</span>
              <div>
                <div className="calorie-label">Netto</div>
                <div className="calorie-value">{Math.round(netCalories)} kcal</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Macronutriënten</h3>
          <div className="macros-grid">
            <div className="macro-item">
              <div className="macro-icon macro-protein">P</div>
              <div className="macro-content">
                <div className="macro-label">Eiwitten</div>
                <div className="macro-value">{Math.round(totalProtein)}g</div>
              </div>
            </div>

            <div className="macro-item">
              <div className="macro-icon macro-carbs">C</div>
              <div className="macro-content">
                <div className="macro-label">Koolhydraten</div>
                <div className="macro-value">{Math.round(totalCarbs)}g</div>
              </div>
            </div>

            <div className="macro-item">
              <div className="macro-icon macro-fat">F</div>
              <div className="macro-content">
                <div className="macro-label">Vetten</div>
                <div className="macro-value">{Math.round(totalFat)}g</div>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Snelle acties</h3>
          <div className="action-buttons">
            <a href="/food" className="action-btn">
              <span className="action-icon">VO</span>
              <span className="action-label">Voeding registreren</span>
            </a>
            <a href="/exercise" className="action-btn">
              <span className="action-icon">TR</span>
              <span className="action-label">Training registreren</span>
            </a>
          </div>
        </div>
      </div>

      <Navbar />

      <style>{`
        .dashboard-header {
          margin-bottom: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        .dashboard-compact .card {
          padding: var(--space-md);
        }

        .dashboard-compact .card-title {
          margin-bottom: var(--space-sm);
        }

        .dashboard-compact .gerda-card {
          padding: var(--space-md);
          margin-bottom: var(--space-md);
        }

        .dashboard-compact .gerda-stats {
          gap: var(--space-sm);
        }

        .dashboard-compact .gerda-stat {
          padding: 6px;
        }

        .dashboard-compact .streak-card {
          padding: var(--space-md);
          margin-bottom: var(--space-md);
          gap: var(--space-md);
        }

        .dashboard-compact .streak-icon {
          width: 44px;
          height: 44px;
          font-size: 12px;
        }
        
        .progress-ring-wrapper {
          display: flex;
          justify-content: center;
          margin: var(--space-md) 0 var(--space-lg);
        }
        
        .calorie-breakdown {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: var(--space-md);
          background: var(--color-surface);
          border-radius: var(--radius-md);
          margin-top: var(--space-lg);
          border: 1px solid var(--color-border);
        }
        
        .calorie-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        
        .calorie-icon {
          font-size: 10px;
          letter-spacing: 0.08em;
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
          background: rgba(27, 42, 65, 0.08);
          border-radius: 8px;
          padding: 6px 8px;
          min-width: 40px;
          text-align: center;
        }
        
        .calorie-label {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
        
        .calorie-value {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }
        
        .calorie-divider {
          font-size: var(--font-size-xl);
          color: var(--color-text-tertiary);
          font-weight: var(--font-weight-bold);
        }
        
        .macros-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-sm);
        }
        
        .macro-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
        }
        
        .macro-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.08em;
          color: var(--color-primary);
          background: rgba(27, 42, 65, 0.08);
        }

        .macro-protein {
          background: rgba(27, 42, 65, 0.12);
        }

        .macro-carbs {
          background: rgba(201, 162, 39, 0.18);
          color: #6B5300;
        }

        .macro-fat {
          background: rgba(91, 101, 115, 0.12);
          color: #4C5561;
        }
        
        .macro-content {
          text-align: center;
        }
        
        .macro-label {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-xs);
        }
        
        .macro-value {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-primary);
        }
        
        .quick-actions {
          margin-top: var(--space-xl);
        }
        
        .quick-actions h3 {
          margin-bottom: var(--space-md);
        }
        
        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-sm);
        }
        
        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-md);
          background: var(--color-card);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .action-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: var(--color-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          letter-spacing: 0.12em;
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
        }
        
        .action-label {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-primary);
        }
        
        @media (max-width: 480px) {
          .dashboard-compact .card {
            padding: var(--space-md);
          }

          .calorie-breakdown {
            flex-direction: column;
            gap: var(--space-md);
          }
          
          .calorie-divider {
            transform: rotate(90deg);
          }
          
          .macros-grid {
            grid-template-columns: 1fr;
          }
          
          .macro-item {
            flex-direction: row;
            justify-content: flex-start;
          }
          
          .macro-content {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}
