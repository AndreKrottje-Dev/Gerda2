import { useState } from 'react';
import { getAllDailyLogs, getUserProfile, getStreakData } from '../utils/storage';
import { calculateDailyCalorieGoal } from '../utils/calculations';
import Navbar from '../components/Navbar';

export default function ProgressPage() {
  const [profile] = useState(getUserProfile());
  const [allLogs] = useState(getAllDailyLogs());
  const [streaks] = useState(getStreakData());

  if (!profile) return null;

  const calorieGoal = calculateDailyCalorieGoal(profile);

  // Get last 7 days of data
  const last7Days = Object.entries(allLogs)
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .slice(0, 7);

  const totalDaysLogged = Object.keys(allLogs).length;
  const avgCaloriesConsumed = last7Days.length > 0
    ? last7Days.reduce((sum, [, log]) =>
      sum + log.foods.reduce((s, f) => s + f.calories, 0), 0) / last7Days.length
    : 0;

  return (
    <div className="app-container">
      <div className="page">
        <h1>Voortgang</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Huidige streak</div>
            <div className="stat-value">{streaks.current}<span className="stat-unit">dagen</span></div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Langste streak</div>
            <div className="stat-value">{streaks.longest}<span className="stat-unit">dagen</span></div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Dagen geregistreerd</div>
            <div className="stat-value">{totalDaysLogged}<span className="stat-unit">dagen</span></div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Gem. inname</div>
            <div className="stat-value">{Math.round(avgCaloriesConsumed)}<span className="stat-unit">kcal</span></div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title">Laatste 7 dagen</h3>

          {last7Days.length === 0 ? (
            <p className="text-small text-center">Nog geen data. Start met registreren.</p>
          ) : (
            <div className="history-list">
              {last7Days.map(([date, log]) => {
                const caloriesConsumed = log.foods.reduce((sum, f) => sum + f.calories, 0);
                const caloriesBurned = log.exercises.reduce((sum, e) => sum + e.caloriesBurned, 0);
                const netCalories = caloriesConsumed - caloriesBurned;
                const difference = netCalories - calorieGoal;
                const isOnTrack = Math.abs(difference) <= calorieGoal * 0.1;
                const statusLabel = isOnTrack ? 'Op schema' : difference > 0 ? 'Boven' : 'Onder';
                const statusClass = isOnTrack ? 'status-ok' : difference > 0 ? 'status-warn' : 'status-low';

                return (
                  <div key={date} className="history-item">
                    <div className="history-date">
                      <div className="history-day">
                        {new Date(date).toLocaleDateString('nl-NL', { weekday: 'short' })}
                      </div>
                      <div className="history-date-num">
                        {new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>

                    <div className="history-content">
                      <div className="history-calories">
                        <span className="history-value">{Math.round(netCalories)} kcal</span>
                        <span className="history-label">van {Math.round(calorieGoal)}</span>
                      </div>

                      <div className="history-details">
                        <span>{log.foods.length} maaltijden</span>
                        <span>•</span>
                        <span>{log.exercises.length} activiteiten</span>
                      </div>
                    </div>

                    <div className={`history-status ${statusClass}`}>
                      {statusLabel}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="card-title">Je doel</h3>
          <div className="goal-info">
            <div className="goal-item">
              <span className="goal-label">Huidig gewicht:</span>
              <span className="goal-value">{profile.currentWeight} kg</span>
            </div>
            <div className="goal-item">
              <span className="goal-label">Doelgewicht:</span>
              <span className="goal-value">{profile.targetWeight} kg</span>
            </div>
            <div className="goal-item">
              <span className="goal-label">Te gaan:</span>
              <span className="goal-value">
                {Math.abs(profile.targetWeight - profile.currentWeight).toFixed(1)} kg
              </span>
            </div>
            <div className="goal-item">
              <span className="goal-label">Dagelijks doel:</span>
              <span className="goal-value">{Math.round(calorieGoal)} kcal</span>
            </div>
          </div>
        </div>
      </div>

      <Navbar />

      <style>{`
        .history-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        
        .history-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-md);
          background: var(--color-surface);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }
        
        .history-date {
          text-align: center;
          min-width: 60px;
        }
        
        .history-day {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          text-transform: uppercase;
        }
        
        .history-date-num {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }
        
        .history-content {
          flex: 1;
        }
        
        .history-calories {
          display: flex;
          align-items: baseline;
          gap: var(--space-sm);
          margin-bottom: var(--space-xs);
        }
        
        .history-value {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }
        
        .history-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }
        
        .history-details {
          display: flex;
          gap: var(--space-sm);
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
        
        .history-status {
          font-size: var(--font-size-xs);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 6px 10px;
          border-radius: 999px;
          font-weight: var(--font-weight-semibold);
          color: var(--color-primary);
          background: rgba(27, 42, 65, 0.08);
        }

        .history-status.status-ok {
          color: var(--color-success);
          background: rgba(46, 125, 50, 0.12);
        }

        .history-status.status-warn {
          color: var(--color-warning);
          background: rgba(225, 161, 0, 0.14);
        }

        .history-status.status-low {
          color: var(--color-danger);
          background: rgba(198, 40, 40, 0.12);
        }
        
        .goal-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        
        .goal-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-sm) 0;
          border-bottom: 1px solid var(--color-bg);
        }
        
        .goal-item:last-child {
          border-bottom: none;
        }
        
        .goal-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }
        
        .goal-value {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }
      `}</style>
    </div>
  );
}
