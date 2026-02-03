import { useState } from 'react';
import { getUserProfile, saveUserProfile, clearAllData } from '../utils/storage';
import type { UserProfile } from '../utils/calculations';
import { calculateBMI, calculateBMR, calculateTDEE, calculateDailyCalorieGoal, getBMICategory, getActivityLevelLabel } from '../utils/calculations';
import { requestNotificationPermission, scheduleDailyReminders } from '../utils/notifications';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
    const [profile, setProfile] = useState(getUserProfile());
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(profile || {
        name: '',
        age: 0,
        gender: 'female' as const,
        height: 0,
        currentWeight: 0,
        targetWeight: 0,
        activityLevel: 'moderate' as const,
        createdAt: 0
    });

    if (!profile) return null;

    const bmi = calculateBMI(profile.currentWeight, profile.height);
    const bmr = calculateBMR(profile);
    const tdee = calculateTDEE(profile);
    const calorieGoal = calculateDailyCalorieGoal(profile);

    const handleSave = () => {
        saveUserProfile(editData);
        setProfile(editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditData(profile);
        setIsEditing(false);
    };

    const handleEnableNotifications = async () => {
        const granted = await requestNotificationPermission();
        if (granted) {
            scheduleDailyReminders();
            alert('Notificaties ingeschakeld! Je ontvangt dagelijkse herinneringen.');
        } else {
            alert('Notificaties zijn geblokkeerd. Schakel ze in via je browser instellingen.');
        }
    };

    const handleResetData = () => {
        if (confirm('Weet je zeker dat je alle data wilt verwijderen? Dit kan niet ongedaan worden gemaakt.')) {
            clearAllData();
            window.location.href = '/';
        }
    };

    return (
        <div className="app-container">
            <div className="page">
                <h1>Profiel</h1>

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Persoonlijke gegevens</h3>
                        {!isEditing && (
                            <button className="btn btn-secondary btn-small" onClick={() => setIsEditing(true)}>
                                Bewerken
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <div className="edit-form">
                            <div className="form-group">
                                <label className="form-label">Naam</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Leeftijd</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={editData.age}
                                    onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Lengte (cm)</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={editData.height}
                                    onChange={(e) => setEditData({ ...editData, height: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Huidig gewicht (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-input"
                                    value={editData.currentWeight}
                                    onChange={(e) => setEditData({ ...editData, currentWeight: parseFloat(e.target.value) })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Doelgewicht (kg)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-input"
                                    value={editData.targetWeight}
                                    onChange={(e) => setEditData({ ...editData, targetWeight: parseFloat(e.target.value) })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Activiteitsniveau</label>
                                <select
                                    className="form-select"
                                    value={editData.activityLevel}
                                    onChange={(e) => setEditData({ ...editData, activityLevel: e.target.value as UserProfile['activityLevel'] })}
                                >
                                    <option value="sedentary">Zittend (weinig beweging)</option>
                                    <option value="light">Licht actief (1-3 dagen/week)</option>
                                    <option value="moderate">Matig actief (3-5 dagen/week)</option>
                                    <option value="active">Actief (6-7 dagen/week)</option>
                                    <option value="very_active">Zeer actief (2x per dag)</option>
                                </select>
                            </div>

                            <div className="flex gap-sm">
                                <button className="btn btn-primary" onClick={handleSave}>Opslaan</button>
                                <button className="btn btn-secondary" onClick={handleCancel}>Annuleren</button>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-info">
                            <div className="info-item">
                                <span className="info-label">Naam:</span>
                                <span className="info-value">{profile.name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Leeftijd:</span>
                                <span className="info-value">{profile.age} jaar</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Geslacht:</span>
                                <span className="info-value">{profile.gender === 'male' ? 'Man' : 'Vrouw'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Lengte:</span>
                                <span className="info-value">{profile.height} cm</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Huidig gewicht:</span>
                                <span className="info-value">{profile.currentWeight} kg</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Doelgewicht:</span>
                                <span className="info-value">{profile.targetWeight} kg</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Activiteitsniveau:</span>
                                <span className="info-value">{getActivityLevelLabel(profile.activityLevel)}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="card">
                    <h3 className="card-title">Je statistieken</h3>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-label">BMI</div>
                            <div className="stat-value">{bmi}</div>
                            <div className="text-xs">{getBMICategory(bmi)}</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">BMR</div>
                            <div className="stat-value">{bmr}<span className="stat-unit">kcal</span></div>
                            <div className="text-xs">Basis metabolisme</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">TDEE</div>
                            <div className="stat-value">{tdee}<span className="stat-unit">kcal</span></div>
                            <div className="text-xs">Dagelijks verbruik</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-label">Doel</div>
                            <div className="stat-value">{calorieGoal}<span className="stat-unit">kcal</span></div>
                            <div className="text-xs">Dagelijks advies</div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title">Instellingen</h3>

                    <button className="btn btn-secondary w-full mb-md" onClick={handleEnableNotifications}>
                        Notificaties inschakelen
                    </button>

                    <button className="btn btn-danger w-full" onClick={handleResetData}>
                        Alle data verwijderen
                    </button>
                </div>
            </div>

            <Navbar />

            <style>{`
        .profile-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        
        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-sm) 0;
          border-bottom: 1px solid var(--color-bg);
        }
        
        .info-item:last-child {
          border-bottom: none;
        }
        
        .info-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }
        
        .info-value {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-primary);
        }
        
        .edit-form {
          padding-top: var(--space-md);
        }
      `}</style>
        </div>
    );
}
