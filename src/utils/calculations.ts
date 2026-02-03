// BMI, BMR, TDEE calculations for Gerda Health App

export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number; // cm
  currentWeight: number; // kg
  targetWeight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  createdAt: number;
}

/**
 * Calculate BMI (Body Mass Index)
 * Formula: weight(kg) / (height(m))²
 */
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Ondergewicht';
  if (bmi < 25) return 'Gezond gewicht';
  if (bmi < 30) return 'Overgewicht';
  return 'Obesitas';
}

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * Men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
 * Women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
 */
export function calculateBMR(profile: UserProfile): number {
  const { currentWeight, height, age, gender } = profile;
  const baseBMR = 10 * currentWeight + 6.25 * height - 5 * age;
  const bmr = gender === 'male' ? baseBMR + 5 : baseBMR - 161;
  return Math.round(bmr);
}

/**
 * Get activity multiplier for TDEE calculation
 */
function getActivityMultiplier(activityLevel: UserProfile['activityLevel']): number {
  const multipliers = {
    sedentary: 1.2,      // little/no exercise
    light: 1.375,        // 1-3 days/week
    moderate: 1.55,      // 3-5 days/week
    active: 1.725,       // 6-7 days/week
    very_active: 1.9     // twice/day
  };
  return multipliers[activityLevel];
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 * TDEE = BMR × Activity Multiplier
 */
export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const multiplier = getActivityMultiplier(profile.activityLevel);
  return Math.round(bmr * multiplier);
}

/**
 * Calculate daily calorie goal based on target weight
 */
export function calculateDailyCalorieGoal(profile: UserProfile): number {
  const tdee = calculateTDEE(profile);
  const { currentWeight, targetWeight } = profile;
  
  if (targetWeight < currentWeight) {
    // Weight loss: TDEE - 500 (lose ~0.5kg/week)
    return tdee - 500;
  } else if (targetWeight > currentWeight) {
    // Weight gain: TDEE + 500 (gain ~0.5kg/week)
    return tdee + 500;
  }
  
  // Maintenance
  return tdee;
}

/**
 * Calculate calories burned from exercise
 * Formula: Calories = MET × weight(kg) × duration(hours)
 */
export function calculateCaloriesBurned(
  met: number,
  weight: number,
  durationMinutes: number
): number {
  const durationHours = durationMinutes / 60;
  return Math.round(met * weight * durationHours);
}

/**
 * Get activity level label in Dutch
 */
export function getActivityLevelLabel(level: UserProfile['activityLevel']): string {
  const labels = {
    sedentary: 'Zittend (weinig beweging)',
    light: 'Licht actief (1-3 dagen/week)',
    moderate: 'Matig actief (3-5 dagen/week)',
    active: 'Actief (6-7 dagen/week)',
    very_active: 'Zeer actief (2x per dag)'
  };
  return labels[level];
}
