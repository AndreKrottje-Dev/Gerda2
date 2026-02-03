// Browser notifications for Gerda Health App

import { getNotificationsEnabled, setNotificationsEnabled } from './storage';

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
        console.warn('This browser does not support notifications');
        return false;
    }

    if (Notification.permission === 'granted') {
        setNotificationsEnabled(true);
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        const granted = permission === 'granted';
        setNotificationsEnabled(granted);
        return granted;
    }

    return false;
}

/**
 * Show a notification
 */
export function showNotification(title: string, body: string, icon?: string): void {
    if (!getNotificationsEnabled() || Notification.permission !== 'granted') {
        return;
    }

    new Notification(title, {
        body,
        icon: icon || '/vite.svg',
        badge: '/vite.svg'
    });
}

/**
 * Schedule daily reminders
 */
export function scheduleDailyReminders(): void {
    if (!getNotificationsEnabled()) {
        return;
    }

    const reminders = [
        { hour: 8, minute: 0, title: 'Goedemorgen', body: 'Log je ontbijt om je dag te starten' },
        { hour: 12, minute: 30, title: 'Lunch', body: 'Vergeet je lunch niet te registreren' },
        { hour: 18, minute: 0, title: 'Avondeten', body: 'Registreer je diner van vandaag' },
        { hour: 21, minute: 0, title: 'Dagelijkse check-in', body: 'Bekijk je voortgang van vandaag' }
    ];

    reminders.forEach(reminder => {
        scheduleNotification(reminder.hour, reminder.minute, reminder.title, reminder.body);
    });
}

/**
 * Schedule a notification for a specific time
 */
function scheduleNotification(hour: number, minute: number, title: string, body: string): void {
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hour, minute, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime();

    setTimeout(() => {
        showNotification(title, body);
        // Reschedule for next day
        scheduleNotification(hour, minute, title, body);
    }, timeUntilNotification);
}

/**
 * Show motivational notification based on streak
 */
export function showStreakNotification(currentStreak: number): void {
    if (currentStreak === 0) return;

    let message = '';
    if (currentStreak === 1) {
        message = 'Eerste dag binnen je doel. Ga zo door.';
    } else if (currentStreak === 7) {
        message = '7 dagen op rij op schema. Sterk werk.';
    } else if (currentStreak === 30) {
        message = '30 dagen op rij op schema. Uitstekend resultaat.';
    } else if (currentStreak % 10 === 0) {
        message = `${currentStreak} dagen op rij op schema. Goed momentum.`;
    }

    if (message) {
        showNotification('Gerda update', message);
    }
}
