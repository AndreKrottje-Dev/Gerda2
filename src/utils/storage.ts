// Local Storage wrapper for Gerda Health App

import type { UserProfile } from './calculations';

export interface FoodEntry {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    healthScore: number;
    timestamp: number;
}

export interface ExerciseEntry {
    id: string;
    name: string;
    duration: number; // minutes
    caloriesBurned: number;
    timestamp: number;
}

export interface DailyLog {
    foods: FoodEntry[];
    exercises: ExerciseEntry[];
    weight?: number; // optional daily weigh-in
    waterIntake: number; // glasses
}

export interface StreakData {
    current: number;
    longest: number;
    lastLogDate: string; // YYYY-MM-DD
}

const STORAGE_KEYS = {
    USER_PROFILE: 'gerda_user_profile',
    DAILY_LOGS: 'gerda_daily_logs',
    STREAKS: 'gerda_streaks',
    NOTIFICATIONS_ENABLED: 'gerda_notifications_enabled'
};

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayKey(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

/**
 * Save user profile
 */
export function saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

/**
 * Get user profile
 */
export function getUserProfile(): UserProfile | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
}

/**
 * Get all daily logs
 */
export function getAllDailyLogs(): Record<string, DailyLog> {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
    return data ? JSON.parse(data) : {};
}

/**
 * Get daily log for a specific date
 */
export function getDailyLog(date: string): DailyLog {
    const allLogs = getAllDailyLogs();
    return allLogs[date] || { foods: [], exercises: [], waterIntake: 0 };
}

/**
 * Get today's log
 */
export function getTodayLog(): DailyLog {
    return getDailyLog(getTodayKey());
}

/**
 * Save daily log for a specific date
 */
export function saveDailyLog(date: string, log: DailyLog): void {
    const allLogs = getAllDailyLogs();
    allLogs[date] = log;
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(allLogs));
}

/**
 * Add food entry to today's log
 */
export function addFoodEntry(food: Omit<FoodEntry, 'id' | 'timestamp'>): void {
    const today = getTodayKey();
    const log = getTodayLog();

    const entry: FoodEntry = {
        ...food,
        id: `food_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now()
    };

    log.foods.push(entry);
    saveDailyLog(today, log);
}

/**
 * Remove food entry from today's log
 */
export function removeFoodEntry(foodId: string): void {
    const today = getTodayKey();
    const log = getTodayLog();
    log.foods = log.foods.filter(f => f.id !== foodId);
    saveDailyLog(today, log);
}

/**
 * Add exercise entry to today's log
 */
export function addExerciseEntry(exercise: Omit<ExerciseEntry, 'id' | 'timestamp'>): void {
    const today = getTodayKey();
    const log = getTodayLog();

    const entry: ExerciseEntry = {
        ...exercise,
        id: `exercise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now()
    };

    log.exercises.push(entry);
    saveDailyLog(today, log);
}

/**
 * Remove exercise entry from today's log
 */
export function removeExerciseEntry(exerciseId: string): void {
    const today = getTodayKey();
    const log = getTodayLog();
    log.exercises = log.exercises.filter(e => e.id !== exerciseId);
    saveDailyLog(today, log);
}

/**
 * Update water intake for today
 */
export function updateWaterIntake(glasses: number): void {
    const today = getTodayKey();
    const log = getTodayLog();
    log.waterIntake = glasses;
    saveDailyLog(today, log);
}

/**
 * Update weight for today
 */
export function updateDailyWeight(weight: number): void {
    const today = getTodayKey();
    const log = getTodayLog();
    log.weight = weight;
    saveDailyLog(today, log);
}

/**
 * Get streak data
 */
export function getStreakData(): StreakData {
    const data = localStorage.getItem(STORAGE_KEYS.STREAKS);
    return data ? JSON.parse(data) : { current: 0, longest: 0, lastLogDate: '' };
}

/**
 * Save streak data
 */
export function saveStreakData(streaks: StreakData): void {
    localStorage.setItem(STORAGE_KEYS.STREAKS, JSON.stringify(streaks));
}

/**
 * Update streak based on today's performance
 * A day counts as "on track" if within ±10% of calorie goal
 */
export function updateStreak(isOnTrack: boolean): void {
    const today = getTodayKey();
    const streaks = getStreakData();

    // Check if we already updated today
    if (streaks.lastLogDate === today) {
        return;
    }

    if (isOnTrack) {
        streaks.current += 1;
        if (streaks.current > streaks.longest) {
            streaks.longest = streaks.current;
        }
    } else {
        streaks.current = 0;
    }

    streaks.lastLogDate = today;
    saveStreakData(streaks);
}

/**
 * Get/Set notification preferences
 */
export function getNotificationsEnabled(): boolean {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED);
    return data === 'true';
}

export function setNotificationsEnabled(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, enabled.toString());
}

/**
 * Clear all app data (for testing/reset)
 */
export function clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}
