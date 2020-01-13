class OlympianStats {
    constructor(totalCount, maleWeight, femaleWeight, avgAge) {
        this.olympian_stats = {
            total_competing_olympians: totalCount,
            average_weight: {
                unit: 'kg',
                male_olympians: maleWeight,
                female_olympians: femaleWeight
            },
            average_age: avgAge
        }
    };
};

module.exports = OlympianStats;