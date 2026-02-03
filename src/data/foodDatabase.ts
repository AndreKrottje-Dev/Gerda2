// Dutch food database with nutritional information

export interface FoodItem {
    id: string;
    name: string;
    category: 'ontbijt' | 'lunch' | 'diner' | 'snacks' | 'dranken';
    serving: string;
    calories: number;
    protein: number; // grams
    carbs: number; // grams
    fat: number; // grams
    healthScore: number; // 1-10 (10 = very healthy)
}

export const FOOD_DATABASE: FoodItem[] = [
    // ONTBIJT (Breakfast)
    {
        id: 'ont_001',
        name: 'Volkoren brood',
        category: 'ontbijt',
        serving: '1 snee (35g)',
        calories: 70,
        protein: 3,
        carbs: 12,
        fat: 1,
        healthScore: 8
    },
    {
        id: 'ont_002',
        name: 'Wit brood',
        category: 'ontbijt',
        serving: '1 snee (30g)',
        calories: 80,
        protein: 2,
        carbs: 15,
        fat: 1,
        healthScore: 4
    },
    {
        id: 'ont_003',
        name: 'Meergranen brood',
        category: 'ontbijt',
        serving: '1 snee (35g)',
        calories: 75,
        protein: 3,
        carbs: 13,
        fat: 1,
        healthScore: 7
    },
    {
        id: 'ont_004',
        name: 'Kaas (jong)',
        category: 'ontbijt',
        serving: '30g',
        calories: 120,
        protein: 8,
        carbs: 0,
        fat: 10,
        healthScore: 6
    },
    {
        id: 'ont_005',
        name: 'Kaas (belegen)',
        category: 'ontbijt',
        serving: '30g',
        calories: 115,
        protein: 8,
        carbs: 0,
        fat: 9,
        healthScore: 6
    },
    {
        id: 'ont_006',
        name: 'Pindakaas',
        category: 'ontbijt',
        serving: '15g',
        calories: 90,
        protein: 4,
        carbs: 3,
        fat: 7,
        healthScore: 6
    },
    {
        id: 'ont_007',
        name: 'Hagelslag (puur)',
        category: 'ontbijt',
        serving: '15g',
        calories: 70,
        protein: 1,
        carbs: 10,
        fat: 3,
        healthScore: 3
    },
    {
        id: 'ont_008',
        name: 'Hagelslag (melk)',
        category: 'ontbijt',
        serving: '15g',
        calories: 75,
        protein: 1,
        carbs: 11,
        fat: 3,
        healthScore: 2
    },
    {
        id: 'ont_009',
        name: 'Jam',
        category: 'ontbijt',
        serving: '15g',
        calories: 40,
        protein: 0,
        carbs: 10,
        fat: 0,
        healthScore: 3
    },
    {
        id: 'ont_010',
        name: 'Boter',
        category: 'ontbijt',
        serving: '10g',
        calories: 75,
        protein: 0,
        carbs: 0,
        fat: 8,
        healthScore: 3
    },
    {
        id: 'ont_011',
        name: 'Margarine',
        category: 'ontbijt',
        serving: '10g',
        calories: 70,
        protein: 0,
        carbs: 0,
        fat: 8,
        healthScore: 4
    },
    {
        id: 'ont_012',
        name: 'Yoghurt naturel',
        category: 'ontbijt',
        serving: '150g',
        calories: 90,
        protein: 5,
        carbs: 7,
        fat: 4,
        healthScore: 8
    },
    {
        id: 'ont_013',
        name: 'Yoghurt vol (fruit)',
        category: 'ontbijt',
        serving: '150g',
        calories: 140,
        protein: 5,
        carbs: 20,
        fat: 4,
        healthScore: 5
    },
    {
        id: 'ont_014',
        name: 'Griekse yoghurt',
        category: 'ontbijt',
        serving: '150g',
        calories: 180,
        protein: 9,
        carbs: 6,
        fat: 13,
        healthScore: 7
    },
    {
        id: 'ont_015',
        name: 'Kwark mager',
        category: 'ontbijt',
        serving: '150g',
        calories: 75,
        protein: 15,
        carbs: 5,
        fat: 0,
        healthScore: 9
    },
    {
        id: 'ont_016',
        name: 'Muesli',
        category: 'ontbijt',
        serving: '50g',
        calories: 180,
        protein: 5,
        carbs: 30,
        fat: 4,
        healthScore: 7
    },
    {
        id: 'ont_017',
        name: 'Cornflakes',
        category: 'ontbijt',
        serving: '30g',
        calories: 110,
        protein: 2,
        carbs: 25,
        fat: 0,
        healthScore: 4
    },
    {
        id: 'ont_018',
        name: 'Havermout',
        category: 'ontbijt',
        serving: '40g',
        calories: 150,
        protein: 5,
        carbs: 27,
        fat: 3,
        healthScore: 9
    },
    {
        id: 'ont_019',
        name: 'Ei (gekookt)',
        category: 'ontbijt',
        serving: '1 stuk (50g)',
        calories: 70,
        protein: 6,
        carbs: 1,
        fat: 5,
        healthScore: 8
    },
    {
        id: 'ont_020',
        name: 'Ei (gebakken)',
        category: 'ontbijt',
        serving: '1 stuk',
        calories: 90,
        protein: 6,
        carbs: 1,
        fat: 7,
        healthScore: 7
    },
    {
        id: 'ont_021',
        name: 'Appel',
        category: 'ontbijt',
        serving: '1 stuk (150g)',
        calories: 52,
        protein: 0,
        carbs: 14,
        fat: 0,
        healthScore: 10
    },
    {
        id: 'ont_022',
        name: 'Banaan',
        category: 'ontbijt',
        serving: '1 stuk (120g)',
        calories: 105,
        protein: 1,
        carbs: 27,
        fat: 0,
        healthScore: 9
    },

    // LUNCH
    {
        id: 'lun_001',
        name: 'Broodje kaas',
        category: 'lunch',
        serving: '1 broodje',
        calories: 280,
        protein: 12,
        carbs: 30,
        fat: 12,
        healthScore: 5
    },
    {
        id: 'lun_002',
        name: 'Broodje ham',
        category: 'lunch',
        serving: '1 broodje',
        calories: 250,
        protein: 15,
        carbs: 28,
        fat: 8,
        healthScore: 6
    },
    {
        id: 'lun_003',
        name: 'Broodje gezond',
        category: 'lunch',
        serving: '1 broodje',
        calories: 220,
        protein: 10,
        carbs: 30,
        fat: 6,
        healthScore: 8
    },
    {
        id: 'lun_004',
        name: 'Tosti kaas',
        category: 'lunch',
        serving: '1 stuk',
        calories: 350,
        protein: 14,
        carbs: 32,
        fat: 18,
        healthScore: 4
    },
    {
        id: 'lun_005',
        name: 'Tosti ham-kaas',
        category: 'lunch',
        serving: '1 stuk',
        calories: 380,
        protein: 18,
        carbs: 32,
        fat: 19,
        healthScore: 5
    },
    {
        id: 'lun_006',
        name: 'Soep (tomaat)',
        category: 'lunch',
        serving: '250ml',
        calories: 80,
        protein: 2,
        carbs: 12,
        fat: 3,
        healthScore: 7
    },
    {
        id: 'lun_007',
        name: 'Soep (groentesoep)',
        category: 'lunch',
        serving: '250ml',
        calories: 70,
        protein: 2,
        carbs: 10,
        fat: 2,
        healthScore: 8
    },
    {
        id: 'lun_008',
        name: 'Salade (gemengd)',
        category: 'lunch',
        serving: '200g',
        calories: 150,
        protein: 5,
        carbs: 10,
        fat: 10,
        healthScore: 9
    },
    {
        id: 'lun_009',
        name: 'Salade Caesar',
        category: 'lunch',
        serving: '250g',
        calories: 350,
        protein: 12,
        carbs: 15,
        fat: 28,
        healthScore: 5
    },

    // DINER
    {
        id: 'din_001',
        name: 'Aardappelen (gekookt)',
        category: 'diner',
        serving: '200g',
        calories: 170,
        protein: 4,
        carbs: 38,
        fat: 0,
        healthScore: 7
    },
    {
        id: 'din_002',
        name: 'Friet',
        category: 'diner',
        serving: '150g',
        calories: 450,
        protein: 5,
        carbs: 55,
        fat: 22,
        healthScore: 2
    },
    {
        id: 'din_003',
        name: 'Rijst (wit)',
        category: 'diner',
        serving: '150g gekookt',
        calories: 195,
        protein: 4,
        carbs: 43,
        fat: 0,
        healthScore: 5
    },
    {
        id: 'din_004',
        name: 'Rijst (bruin)',
        category: 'diner',
        serving: '150g gekookt',
        calories: 170,
        protein: 4,
        carbs: 36,
        fat: 1,
        healthScore: 8
    },
    {
        id: 'din_005',
        name: 'Pasta (wit)',
        category: 'diner',
        serving: '150g gekookt',
        calories: 220,
        protein: 8,
        carbs: 43,
        fat: 1,
        healthScore: 5
    },
    {
        id: 'din_006',
        name: 'Pasta (volkoren)',
        category: 'diner',
        serving: '150g gekookt',
        calories: 210,
        protein: 8,
        carbs: 40,
        fat: 2,
        healthScore: 7
    },
    {
        id: 'din_007',
        name: 'Kip (filet)',
        category: 'diner',
        serving: '150g',
        calories: 240,
        protein: 45,
        carbs: 0,
        fat: 5,
        healthScore: 9
    },
    {
        id: 'din_008',
        name: 'Gehakt (rund)',
        category: 'diner',
        serving: '100g',
        calories: 250,
        protein: 20,
        carbs: 0,
        fat: 19,
        healthScore: 5
    },
    {
        id: 'din_009',
        name: 'Gehaktbal',
        category: 'diner',
        serving: '1 stuk (80g)',
        calories: 200,
        protein: 12,
        carbs: 5,
        fat: 15,
        healthScore: 4
    },
    {
        id: 'din_010',
        name: 'Vis (zalm)',
        category: 'diner',
        serving: '150g',
        calories: 280,
        protein: 30,
        carbs: 0,
        fat: 17,
        healthScore: 9
    },
    {
        id: 'din_011',
        name: 'Vis (kabeljauw)',
        category: 'diner',
        serving: '150g',
        calories: 130,
        protein: 28,
        carbs: 0,
        fat: 1,
        healthScore: 10
    },
    {
        id: 'din_012',
        name: 'Broccoli',
        category: 'diner',
        serving: '150g',
        calories: 50,
        protein: 4,
        carbs: 7,
        fat: 0,
        healthScore: 10
    },
    {
        id: 'din_013',
        name: 'Bloemkool',
        category: 'diner',
        serving: '150g',
        calories: 38,
        protein: 3,
        carbs: 5,
        fat: 0,
        healthScore: 10
    },
    {
        id: 'din_014',
        name: 'Wortelen',
        category: 'diner',
        serving: '150g',
        calories: 60,
        protein: 1,
        carbs: 14,
        fat: 0,
        healthScore: 9
    },
    {
        id: 'din_015',
        name: 'Sperziebonen',
        category: 'diner',
        serving: '150g',
        calories: 45,
        protein: 3,
        carbs: 8,
        fat: 0,
        healthScore: 9
    },
    {
        id: 'din_016',
        name: 'Sla (gemengd)',
        category: 'diner',
        serving: '100g',
        calories: 15,
        protein: 1,
        carbs: 2,
        fat: 0,
        healthScore: 10
    },
    {
        id: 'din_017',
        name: 'Pizza (Margherita)',
        category: 'diner',
        serving: '1 stuk (300g)',
        calories: 750,
        protein: 28,
        carbs: 90,
        fat: 30,
        healthScore: 3
    },
    {
        id: 'din_018',
        name: 'Lasagne',
        category: 'diner',
        serving: '350g',
        calories: 550,
        protein: 25,
        carbs: 45,
        fat: 28,
        healthScore: 4
    },

    // SNACKS
    {
        id: 'sna_001',
        name: 'Chips (naturel)',
        category: 'snacks',
        serving: '100g',
        calories: 536,
        protein: 7,
        carbs: 50,
        fat: 35,
        healthScore: 2
    },
    {
        id: 'sna_002',
        name: 'Chips (paprika)',
        category: 'snacks',
        serving: '100g',
        calories: 530,
        protein: 6,
        carbs: 52,
        fat: 33,
        healthScore: 2
    },
    {
        id: 'sna_003',
        name: 'Chocoladereep (melk)',
        category: 'snacks',
        serving: '50g',
        calories: 265,
        protein: 4,
        carbs: 28,
        fat: 15,
        healthScore: 2
    },
    {
        id: 'sna_004',
        name: 'Chocoladereep (puur)',
        category: 'snacks',
        serving: '50g',
        calories: 270,
        protein: 4,
        carbs: 24,
        fat: 18,
        healthScore: 4
    },
    {
        id: 'sna_005',
        name: 'Koekje (digestive)',
        category: 'snacks',
        serving: '2 stuks',
        calories: 140,
        protein: 2,
        carbs: 20,
        fat: 6,
        healthScore: 3
    },
    {
        id: 'sna_006',
        name: 'Stroopwafel',
        category: 'snacks',
        serving: '1 stuk',
        calories: 140,
        protein: 1,
        carbs: 18,
        fat: 7,
        healthScore: 2
    },
    {
        id: 'sna_007',
        name: 'Noten (gemengd)',
        category: 'snacks',
        serving: '30g',
        calories: 180,
        protein: 6,
        carbs: 5,
        fat: 16,
        healthScore: 7
    },
    {
        id: 'sna_008',
        name: 'Appel',
        category: 'snacks',
        serving: '1 stuk (150g)',
        calories: 52,
        protein: 0,
        carbs: 14,
        fat: 0,
        healthScore: 10
    },
    {
        id: 'sna_009',
        name: 'Banaan',
        category: 'snacks',
        serving: '1 stuk (120g)',
        calories: 105,
        protein: 1,
        carbs: 27,
        fat: 0,
        healthScore: 9
    },
    {
        id: 'sna_010',
        name: 'Sinaasappel',
        category: 'snacks',
        serving: '1 stuk (150g)',
        calories: 62,
        protein: 1,
        carbs: 15,
        fat: 0,
        healthScore: 10
    },
    {
        id: 'sna_011',
        name: 'Druiven',
        category: 'snacks',
        serving: '100g',
        calories: 69,
        protein: 1,
        carbs: 18,
        fat: 0,
        healthScore: 8
    },
    {
        id: 'sna_012',
        name: 'Wortel (rauw)',
        category: 'snacks',
        serving: '1 stuk (80g)',
        calories: 32,
        protein: 1,
        carbs: 7,
        fat: 0,
        healthScore: 10
    },

    // DRANKEN
    {
        id: 'dra_001',
        name: 'Water',
        category: 'dranken',
        serving: '250ml',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        healthScore: 10
    },
    {
        id: 'dra_002',
        name: 'Koffie (zwart)',
        category: 'dranken',
        serving: '250ml',
        calories: 2,
        protein: 0,
        carbs: 0,
        fat: 0,
        healthScore: 8
    },
    {
        id: 'dra_003',
        name: 'Koffie (met melk)',
        category: 'dranken',
        serving: '250ml',
        calories: 40,
        protein: 2,
        carbs: 3,
        fat: 2,
        healthScore: 7
    },
    {
        id: 'dra_004',
        name: 'Thee (zonder suiker)',
        category: 'dranken',
        serving: '250ml',
        calories: 2,
        protein: 0,
        carbs: 0,
        fat: 0,
        healthScore: 9
    },
    {
        id: 'dra_005',
        name: 'Melk (vol)',
        category: 'dranken',
        serving: '250ml',
        calories: 150,
        protein: 8,
        carbs: 12,
        fat: 8,
        healthScore: 6
    },
    {
        id: 'dra_006',
        name: 'Melk (halfvol)',
        category: 'dranken',
        serving: '250ml',
        calories: 115,
        protein: 8,
        carbs: 12,
        fat: 4,
        healthScore: 7
    },
    {
        id: 'dra_007',
        name: 'Melk (mager)',
        category: 'dranken',
        serving: '250ml',
        calories: 85,
        protein: 8,
        carbs: 12,
        fat: 0,
        healthScore: 8
    },
    {
        id: 'dra_008',
        name: 'Sinaasappelsap',
        category: 'dranken',
        serving: '250ml',
        calories: 110,
        protein: 2,
        carbs: 26,
        fat: 0,
        healthScore: 5
    },
    {
        id: 'dra_009',
        name: 'Appelsap',
        category: 'dranken',
        serving: '250ml',
        calories: 115,
        protein: 0,
        carbs: 28,
        fat: 0,
        healthScore: 5
    },
    {
        id: 'dra_010',
        name: 'Cola',
        category: 'dranken',
        serving: '250ml',
        calories: 105,
        protein: 0,
        carbs: 27,
        fat: 0,
        healthScore: 1
    },
    {
        id: 'dra_011',
        name: 'Cola Light',
        category: 'dranken',
        serving: '250ml',
        calories: 1,
        protein: 0,
        carbs: 0,
        fat: 0,
        healthScore: 3
    },
    {
        id: 'dra_012',
        name: 'Bier',
        category: 'dranken',
        serving: '250ml',
        calories: 103,
        protein: 1,
        carbs: 8,
        fat: 0,
        healthScore: 2
    },
    {
        id: 'dra_013',
        name: 'Wijn (rood)',
        category: 'dranken',
        serving: '150ml',
        calories: 125,
        protein: 0,
        carbs: 4,
        fat: 0,
        healthScore: 3
    },
    {
        id: 'dra_014',
        name: 'Wijn (wit)',
        category: 'dranken',
        serving: '150ml',
        calories: 120,
        protein: 0,
        carbs: 4,
        fat: 0,
        healthScore: 3
    }
];

/**
 * Get foods by category
 */
export function getFoodsByCategory(category: FoodItem['category']): FoodItem[] {
    return FOOD_DATABASE.filter(food => food.category === category);
}

/**
 * Search foods by name
 */
export function searchFoods(query: string): FoodItem[] {
    const lowerQuery = query.toLowerCase();
    return FOOD_DATABASE.filter(food =>
        food.name.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get food by ID
 */
export function getFoodById(id: string): FoodItem | undefined {
    return FOOD_DATABASE.find(food => food.id === id);
}

/**
 * Get category label in Dutch
 */
export function getCategoryLabel(category: FoodItem['category']): string {
    const labels = {
        ontbijt: 'Ontbijt',
        lunch: 'Lunch',
        diner: 'Diner',
        snacks: 'Snacks',
        dranken: 'Dranken'
    };
    return labels[category];
}
