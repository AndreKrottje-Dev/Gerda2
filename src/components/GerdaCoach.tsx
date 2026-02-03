import { useMemo } from 'react';
import type { UserProfile } from '../utils/calculations';
import { calculateDailyCalorieGoal } from '../utils/calculations';
import { getTodayLog } from '../utils/storage';

interface GerdaCoachProps {
    profile: UserProfile;
}

export default function GerdaCoach({ profile }: GerdaCoachProps) {
    const feedback = useMemo(() => {
        const todayLog = getTodayLog();
        const calorieGoal = calculateDailyCalorieGoal(profile);

        // Calculate total calories consumed
        const caloriesConsumed = todayLog.foods.reduce((sum, food) => sum + food.calories, 0);

        // Calculate total calories burned from exercise
        const caloriesBurned = todayLog.exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0);

        // Net calories (consumed - burned)
        const netCalories = caloriesConsumed - caloriesBurned;
        const difference = netCalories - calorieGoal;

        // Calculate average health score
        const avgHealthScore = todayLog.foods.length > 0
            ? todayLog.foods.reduce((sum, food) => sum + food.healthScore, 0) / todayLog.foods.length
            : 0;

        // Determine message type and content
        let message = '';
        let emoji = 'G';
        let type: 'success' | 'warning' | 'danger' | 'info' = 'info';

        // No data yet today
        if (todayLog.foods.length === 0 && todayLog.exercises.length === 0) {
            message = 'Goedemorgen. Log je eerste maaltijd om de dag te starten.';
            emoji = 'G';
            type = 'info';
        }
        // Perfect range (within ±100 kcal)
        else if (Math.abs(difference) <= 100) {
            message = `Op schema. Netto ${netCalories} kcal.`;
            type = 'success';
        }
        // Slightly over (100-300 kcal)
        else if (difference > 100 && difference <= 300) {
            message = `Boven doel met ${Math.round(difference)} kcal. Houd porties strak.`;
            type = 'warning';
        }
        // Way over (>300 kcal)
        else if (difference > 300) {
            message = `Duidelijk boven doel: +${Math.round(difference)} kcal. Focus op je doelgewicht van ${profile.targetWeight} kg.`;
            type = 'danger';
        }
        // Under target (<-200 kcal)
        else if (difference < -200) {
            message = `Onder doel met ${Math.abs(Math.round(difference))} kcal. Zorg voor voldoende energie.`;
            type = 'warning';
        }

        // Add nutrition quality feedback
        if (todayLog.foods.length > 0) {
            if (avgHealthScore < 5) {
                message += ' Voedingskwaliteit laag. Voeg meer volkoren en groente toe.';
                if (type === 'success') type = 'warning';
            } else if (avgHealthScore > 7) {
                message += ' Sterke voedingskeuzes vandaag.';
            }
        }

        // Add exercise feedback
        if (todayLog.exercises.length === 0 && todayLog.foods.length > 0) {
            message += ' Nog geen training gelogd. Plan minimaal 30 minuten beweging.';
            if (type === 'success') type = 'info';
        } else if (caloriesBurned > 300) {
            message += ` Training afgerond: ${Math.round(caloriesBurned)} kcal verbrand.`;
        }

        return { message, emoji, type, caloriesConsumed, caloriesBurned, netCalories, calorieGoal, difference };
    }, [profile]);

    const getCardClass = () => {
        switch (feedback.type) {
            case 'success':
                return 'gerda-card gerda-success';
            case 'warning':
                return 'gerda-card gerda-warning';
            case 'danger':
                return 'gerda-card gerda-danger';
            default:
                return 'gerda-card gerda-info';
        }
    };

    return (
        <div className={getCardClass()}>
            <div className="gerda-header">
                <div className="gerda-avatar">{feedback.emoji}</div>
                <div>
                    <h3 className="gerda-name">Gerda</h3>
                    <p className="gerda-subtitle">Digitale coach</p>
                </div>
            </div>

            <p className="gerda-message">{feedback.message}</p>

            <div className="gerda-stats">
                <div className="gerda-stat">
                    <span className="gerda-stat-label">Gegeten</span>
                    <span className="gerda-stat-value">{Math.round(feedback.caloriesConsumed)} kcal</span>
                </div>
                <div className="gerda-stat">
                    <span className="gerda-stat-label">Verbrand</span>
                    <span className="gerda-stat-value">{Math.round(feedback.caloriesBurned)} kcal</span>
                </div>
                <div className="gerda-stat">
                    <span className="gerda-stat-label">Doel</span>
                    <span className="gerda-stat-value">{Math.round(feedback.calorieGoal)} kcal</span>
                </div>
            </div>

            <style>{`
        .gerda-card {
          background: var(--color-card);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          margin-bottom: var(--space-lg);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border);
          border-left: 4px solid var(--color-primary);
        }
        
        .gerda-success {
          border-left-color: var(--color-success);
          background: linear-gradient(135deg, rgba(46, 125, 50, 0.06) 0%, var(--color-card) 100%);
        }
        
        .gerda-warning {
          border-left-color: var(--color-warning);
          background: linear-gradient(135deg, rgba(225, 161, 0, 0.06) 0%, var(--color-card) 100%);
        }
        
        .gerda-danger {
          border-left-color: var(--color-danger);
          background: linear-gradient(135deg, rgba(198, 40, 40, 0.06) 0%, var(--color-card) 100%);
        }
        
        .gerda-info {
          border-left-color: var(--color-primary);
        }
        
        .gerda-header {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        }
        
        .gerda-avatar {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: var(--font-weight-bold);
          color: #fff;
          letter-spacing: 0.04em;
        }
        
        .gerda-name {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          margin: 0;
        }
        
        .gerda-subtitle {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin: 0;
        }
        
        .gerda-message {
          font-size: var(--font-size-base);
          line-height: 1.6;
          color: var(--color-text-primary);
          margin-bottom: var(--space-lg);
        }
        
        .gerda-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
        }
        
        .gerda-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-sm);
          background: var(--color-surface);
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
        }
        
        .gerda-stat-label {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-xs);
        }
        
        .gerda-stat-value {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }
      `}</style>
        </div>
    );
}
