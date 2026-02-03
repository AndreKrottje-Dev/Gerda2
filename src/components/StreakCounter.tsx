import { getStreakData } from '../utils/storage';

export default function StreakCounter() {
    const streaks = getStreakData();

    return (
        <div className="streak-card">
            <div className="streak-icon-container">
                <span className="streak-icon" style={{ animation: streaks.current > 0 ? 'pulse 2s ease-in-out infinite' : 'none' }}>
                    ST
                </span>
            </div>

            <div className="streak-content">
                <div className="streak-main">
                    <span className="streak-number">{streaks.current}</span>
                    <span className="streak-label">dagen op rij</span>
                </div>

                {streaks.longest > 0 && (
                    <div className="streak-record">
                        <span className="streak-record-icon">Record</span>
                        <span className="streak-record-text">{streaks.longest} dagen</span>
                    </div>
                )}

                {streaks.current === 0 && (
                    <p className="streak-motivation">
                        Start vandaag met je eerste dag binnen je doel.
                    </p>
                )}

                {streaks.current >= 7 && (
                    <p className="streak-motivation">
                        Sterk werk. Je zit al {streaks.current} dagen op schema.
                    </p>
                )}
            </div>

            <style>{`
        .streak-card {
          background: linear-gradient(135deg, #1B2A41 0%, #2E3A4D 100%);
          border-radius: var(--radius-lg);
          padding: var(--space-lg);
          margin-bottom: var(--space-lg);
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .streak-icon-container {
          flex-shrink: 0;
        }
        
        .streak-icon {
          font-size: 14px;
          display: block;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--font-weight-bold);
          letter-spacing: 0.16em;
        }
        
        .streak-content {
          flex: 1;
        }
        
        .streak-main {
          display: flex;
          align-items: baseline;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
        }
        
        .streak-number {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
        }
        
        .streak-label {
          font-size: var(--font-size-base);
          opacity: 0.9;
        }
        
        .streak-record {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: var(--font-size-sm);
          opacity: 0.9;
          margin-bottom: var(--space-sm);
        }

        .streak-record-icon {
          font-size: var(--font-size-xs);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          opacity: 0.7;
        }
        
        .streak-motivation {
          font-size: var(--font-size-sm);
          opacity: 0.9;
          margin: 0;
          margin-top: var(--space-sm);
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
        </div>
    );
}
