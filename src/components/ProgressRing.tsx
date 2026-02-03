interface ProgressRingProps {
    progress: number; // 0-100
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
    value?: string;
}

export default function ProgressRing({
    progress,
    size = 200,
    strokeWidth = 20,
    color = '#00C7BE',
    label,
    value
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="progress-ring-container" style={{ width: size, height: size }}>
            <svg className="progress-ring" width={size} height={size}>
                {/* Background circle */}
                <circle
                    className="progress-ring-bg"
                    stroke="var(--color-border)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />

                {/* Progress circle */}
                <circle
                    className="progress-ring-circle"
                    stroke={color}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{
                        transition: 'stroke-dashoffset 0.5s ease',
                        strokeLinecap: 'round'
                    }}
                />
            </svg>

            <div className="progress-ring-text">
                {value && <div className="progress-ring-number">{value}</div>}
                {label && <div className="progress-ring-label">{label}</div>}
            </div>

            <style>{`
        .progress-ring-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .progress-ring {
          transform: rotate(-90deg);
        }
        
        .progress-ring-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        
        .progress-ring-number {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-primary);
        }
        
        .progress-ring-label {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin-top: var(--space-xs);
        }
      `}</style>
        </div>
    );
}
