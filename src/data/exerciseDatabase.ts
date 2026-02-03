// Dutch exercise database with MET values

export interface ExerciseActivity {
    id: string;
    name: string;
    category: 'cardio' | 'kracht' | 'sport' | 'ontspanning';
    met: number; // Metabolic Equivalent of Task
    icon: string; // emoji
}

export const EXERCISE_DATABASE: ExerciseActivity[] = [
    // CARDIO
    {
        id: 'car_001',
        name: 'Hardlopen (8 km/u)',
        category: 'cardio',
        met: 8.0,
        icon: '🏃'
    },
    {
        id: 'car_002',
        name: 'Hardlopen (10 km/u)',
        category: 'cardio',
        met: 10.0,
        icon: '🏃'
    },
    {
        id: 'car_003',
        name: 'Hardlopen (12 km/u)',
        category: 'cardio',
        met: 12.0,
        icon: '🏃'
    },
    {
        id: 'car_004',
        name: 'Joggen (langzaam)',
        category: 'cardio',
        met: 6.0,
        icon: '🏃'
    },
    {
        id: 'car_005',
        name: 'Wandelen (5 km/u)',
        category: 'cardio',
        met: 3.8,
        icon: '🚶'
    },
    {
        id: 'car_006',
        name: 'Wandelen (6 km/u)',
        category: 'cardio',
        met: 4.5,
        icon: '🚶'
    },
    {
        id: 'car_007',
        name: 'Wandelen (stevig)',
        category: 'cardio',
        met: 5.0,
        icon: '🚶'
    },
    {
        id: 'car_008',
        name: 'Fietsen (matig, 15 km/u)',
        category: 'cardio',
        met: 6.8,
        icon: '🚴'
    },
    {
        id: 'car_009',
        name: 'Fietsen (snel, 20 km/u)',
        category: 'cardio',
        met: 8.0,
        icon: '🚴'
    },
    {
        id: 'car_010',
        name: 'Fietsen (zeer snel, 25 km/u)',
        category: 'cardio',
        met: 10.0,
        icon: '🚴'
    },
    {
        id: 'car_011',
        name: 'Zwemmen (matig)',
        category: 'cardio',
        met: 5.8,
        icon: '🏊'
    },
    {
        id: 'car_012',
        name: 'Zwemmen (intensief)',
        category: 'cardio',
        met: 9.8,
        icon: '🏊'
    },
    {
        id: 'car_013',
        name: 'Roeien (matig)',
        category: 'cardio',
        met: 7.0,
        icon: '🚣'
    },
    {
        id: 'car_014',
        name: 'Roeien (intensief)',
        category: 'cardio',
        met: 12.0,
        icon: '🚣'
    },
    {
        id: 'car_015',
        name: 'Crosstrainer',
        category: 'cardio',
        met: 7.0,
        icon: '🏋️'
    },
    {
        id: 'car_016',
        name: 'Traplopen',
        category: 'cardio',
        met: 8.8,
        icon: '🪜'
    },
    {
        id: 'car_017',
        name: 'Touwtjespringen',
        category: 'cardio',
        met: 11.8,
        icon: '🪢'
    },

    // KRACHT
    {
        id: 'kra_001',
        name: 'Fitness (algemeen)',
        category: 'kracht',
        met: 5.0,
        icon: '💪'
    },
    {
        id: 'kra_002',
        name: 'Fitness (intensief)',
        category: 'kracht',
        met: 6.0,
        icon: '💪'
    },
    {
        id: 'kra_003',
        name: 'Gewichtheffen (licht)',
        category: 'kracht',
        met: 3.0,
        icon: '🏋️'
    },
    {
        id: 'kra_004',
        name: 'Gewichtheffen (zwaar)',
        category: 'kracht',
        met: 6.0,
        icon: '🏋️'
    },
    {
        id: 'kra_005',
        name: 'Bodyweight oefeningen',
        category: 'kracht',
        met: 4.5,
        icon: '🤸'
    },
    {
        id: 'kra_006',
        name: 'Push-ups / Sit-ups',
        category: 'kracht',
        met: 3.8,
        icon: '🤸'
    },
    {
        id: 'kra_007',
        name: 'Planken',
        category: 'kracht',
        met: 4.0,
        icon: '🧘'
    },
    {
        id: 'kra_008',
        name: 'CrossFit',
        category: 'kracht',
        met: 8.0,
        icon: '🏋️'
    },

    // SPORT
    {
        id: 'spo_001',
        name: 'Voetbal',
        category: 'sport',
        met: 7.0,
        icon: '⚽'
    },
    {
        id: 'spo_002',
        name: 'Basketbal',
        category: 'sport',
        met: 6.5,
        icon: '🏀'
    },
    {
        id: 'spo_003',
        name: 'Tennis (enkel)',
        category: 'sport',
        met: 7.3,
        icon: '🎾'
    },
    {
        id: 'spo_004',
        name: 'Tennis (dubbel)',
        category: 'sport',
        met: 5.0,
        icon: '🎾'
    },
    {
        id: 'spo_005',
        name: 'Badminton',
        category: 'sport',
        met: 5.5,
        icon: '🏸'
    },
    {
        id: 'spo_006',
        name: 'Volleybal',
        category: 'sport',
        met: 4.0,
        icon: '🏐'
    },
    {
        id: 'spo_007',
        name: 'Hockey',
        category: 'sport',
        met: 8.0,
        icon: '🏑'
    },
    {
        id: 'spo_008',
        name: 'Schaatsen',
        category: 'sport',
        met: 7.0,
        icon: '⛸️'
    },
    {
        id: 'spo_009',
        name: 'Inline skaten',
        category: 'sport',
        met: 7.5,
        icon: '🛼'
    },
    {
        id: 'spo_010',
        name: 'Squash',
        category: 'sport',
        met: 12.0,
        icon: '🎾'
    },
    {
        id: 'spo_011',
        name: 'Golf',
        category: 'sport',
        met: 4.8,
        icon: '⛳'
    },
    {
        id: 'spo_012',
        name: 'Dansen (matig)',
        category: 'sport',
        met: 4.5,
        icon: '💃'
    },
    {
        id: 'spo_013',
        name: 'Dansen (intensief)',
        category: 'sport',
        met: 6.5,
        icon: '💃'
    },
    {
        id: 'spo_014',
        name: 'Boksen',
        category: 'sport',
        met: 9.0,
        icon: '🥊'
    },
    {
        id: 'spo_015',
        name: 'Kickboksen',
        category: 'sport',
        met: 10.0,
        icon: '🥊'
    },

    // ONTSPANNING
    {
        id: 'ont_001',
        name: 'Yoga (hatha)',
        category: 'ontspanning',
        met: 2.5,
        icon: '🧘'
    },
    {
        id: 'ont_002',
        name: 'Yoga (power)',
        category: 'ontspanning',
        met: 4.0,
        icon: '🧘'
    },
    {
        id: 'ont_003',
        name: 'Pilates',
        category: 'ontspanning',
        met: 3.0,
        icon: '🧘'
    },
    {
        id: 'ont_004',
        name: 'Stretching',
        category: 'ontspanning',
        met: 2.3,
        icon: '🤸'
    },
    {
        id: 'ont_005',
        name: 'Tai Chi',
        category: 'ontspanning',
        met: 3.0,
        icon: '🧘'
    },
    {
        id: 'ont_006',
        name: 'Wandelen (rustig)',
        category: 'ontspanning',
        met: 2.5,
        icon: '🚶'
    },
    {
        id: 'ont_007',
        name: 'Tuinieren',
        category: 'ontspanning',
        met: 3.5,
        icon: '🌱'
    },
    {
        id: 'ont_008',
        name: 'Schoonmaken (huis)',
        category: 'ontspanning',
        met: 3.3,
        icon: '🧹'
    }
];

/**
 * Get exercises by category
 */
export function getExercisesByCategory(category: ExerciseActivity['category']): ExerciseActivity[] {
    return EXERCISE_DATABASE.filter(ex => ex.category === category);
}

/**
 * Search exercises by name
 */
export function searchExercises(query: string): ExerciseActivity[] {
    const lowerQuery = query.toLowerCase();
    return EXERCISE_DATABASE.filter(ex =>
        ex.name.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get exercise by ID
 */
export function getExerciseById(id: string): ExerciseActivity | undefined {
    return EXERCISE_DATABASE.find(ex => ex.id === id);
}

/**
 * Get category label in Dutch
 */
export function getExerciseCategoryLabel(category: ExerciseActivity['category']): string {
    const labels = {
        cardio: 'Cardio',
        kracht: 'Kracht',
        sport: 'Sport',
        ontspanning: 'Ontspanning'
    };
    return labels[category];
}
