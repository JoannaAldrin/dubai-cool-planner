// Cooling load and energy calculation utilities for Dubai climate

// Constants for calculations
const AIR_DENSITY = 1.2; // kg/m³ at standard conditions
const SPECIFIC_HEAT = 1.005; // kJ/(kg·K) for air
const SENSIBLE_HEAT_PER_PERSON = 90; // W per person
const LATENT_HEAT_PER_PERSON = 30; // W per person
const EQUIPMENT_LOAD = 200; // W default equipment load

// DEWA electricity tariffs (AED/kWh) - simplified rates
export const DEWA_TARIFFS = {
  residential: {
    peak: 0.38, // Peak hours (typically 12pm-6pm in summer)
    offPeak: 0.23, // Off-peak hours
    standard: 0.32, // Standard rate
  },
  commercial: {
    peak: 0.42,
    offPeak: 0.25,
    standard: 0.35,
  },
};

export interface RoomParameters {
  area: number; // m²
  height: number; // m
  numPeople: number;
  indoorTemp: number; // °C
  outdoorTemp: number; // °C
  outdoorHumidity: number; // %
}

export interface CoolingLoad {
  roomSensibleHeat: number; // W
  occupantSensibleHeat: number; // W
  occupantLatentHeat: number; // W
  equipmentHeat: number; // W
  totalLoad: number; // W
  totalLoadKW: number; // kW
}

export interface EnergyConsumption {
  hourlyEnergy: number; // kWh
  dailyEnergy: number; // kWh
  monthlyCost: number; // AED
  hourlyCost: number; // AED
}

export interface OptimizationResult {
  strategy: string;
  description: string;
  energySavings: number; // kWh
  costSavings: number; // AED
  percentageSavings: number; // %
  optimizedDailyEnergy: number; // kWh
}

/**
 * Calculate cooling load based on room parameters and weather conditions
 */
export function calculateCoolingLoad(params: RoomParameters): CoolingLoad {
  const roomVolume = params.area * params.height; // m³
  
  // Calculate temperature difference (only cool if outdoor > indoor)
  const tempDiff = Math.max(params.outdoorTemp - params.indoorTemp, 0);
  
  // Room sensible heat gain (converted to W)
  // Q = ρ × c_p × V × ΔT (converted from kJ/s to W)
  const roomSensibleHeat = AIR_DENSITY * SPECIFIC_HEAT * roomVolume * tempDiff * 1000 / 3600;
  
  // Occupant heat gains
  const occupantSensibleHeat = params.numPeople * SENSIBLE_HEAT_PER_PERSON;
  const occupantLatentHeat = params.numPeople * LATENT_HEAT_PER_PERSON;
  
  // Equipment heat gain
  const equipmentHeat = EQUIPMENT_LOAD;
  
  // Total cooling load
  const totalLoad = roomSensibleHeat + occupantSensibleHeat + occupantLatentHeat + equipmentHeat;
  const totalLoadKW = totalLoad / 1000;
  
  return {
    roomSensibleHeat,
    occupantSensibleHeat,
    occupantLatentHeat,
    equipmentHeat,
    totalLoad,
    totalLoadKW,
  };
}

/**
 * Calculate energy consumption and costs
 */
export function calculateEnergyConsumption(
  coolingLoadKW: number,
  tariffType: 'residential' | 'commercial' = 'residential',
  peakHoursPerDay: number = 6
): EnergyConsumption {
  // Assume COP (Coefficient of Performance) of 3.0 for modern AC systems
  const COP = 3.0;
  const actualPowerKW = coolingLoadKW / COP;
  
  // Hourly energy consumption
  const hourlyEnergy = actualPowerKW; // kWh
  
  // Daily energy (assuming 12 hours of operation)
  const dailyEnergy = hourlyEnergy * 12;
  
  // Calculate cost (mix of peak and off-peak)
  const peakEnergy = hourlyEnergy * peakHoursPerDay;
  const offPeakEnergy = dailyEnergy - peakEnergy;
  
  const tariff = DEWA_TARIFFS[tariffType];
  const dailyCost = (peakEnergy * tariff.peak) + (offPeakEnergy * tariff.offPeak);
  const monthlyCost = dailyCost * 30;
  const hourlyCost = actualPowerKW * tariff.standard;
  
  return {
    hourlyEnergy,
    dailyEnergy,
    monthlyCost,
    hourlyCost,
  };
}

/**
 * Simulate optimization strategies
 */
export function simulateOptimizations(
  baselineParams: RoomParameters,
  baselineEnergy: EnergyConsumption,
  tariffType: 'residential' | 'commercial' = 'residential'
): OptimizationResult[] {
  const results: OptimizationResult[] = [];
  
  // Strategy 1: Pre-cooling (reduce peak hour usage by 30%)
  const preCoolingSavings = baselineEnergy.dailyEnergy * 0.15; // 15% overall savings
  const preCoolingCostSavings = baselineEnergy.monthlyCost * 0.15;
  results.push({
    strategy: 'Pre-cooling',
    description: 'Cool space before peak hours (10am-12pm) to reduce afternoon load',
    energySavings: preCoolingSavings,
    costSavings: preCoolingCostSavings,
    percentageSavings: 15,
    optimizedDailyEnergy: baselineEnergy.dailyEnergy - preCoolingSavings,
  });
  
  // Strategy 2: Thermostat setpoint adjustment (+2°C)
  const adjustedParams = { ...baselineParams, indoorTemp: baselineParams.indoorTemp + 2 };
  const adjustedLoad = calculateCoolingLoad(adjustedParams);
  const adjustedEnergy = calculateEnergyConsumption(adjustedLoad.totalLoadKW, tariffType);
  const setpointSavings = baselineEnergy.dailyEnergy - adjustedEnergy.dailyEnergy;
  const setpointCostSavings = baselineEnergy.monthlyCost - adjustedEnergy.monthlyCost;
  results.push({
    strategy: 'Setpoint +2°C',
    description: `Increase thermostat from ${baselineParams.indoorTemp}°C to ${adjustedParams.indoorTemp}°C`,
    energySavings: setpointSavings,
    costSavings: setpointCostSavings,
    percentageSavings: (setpointSavings / baselineEnergy.dailyEnergy) * 100,
    optimizedDailyEnergy: adjustedEnergy.dailyEnergy,
  });
  
  // Strategy 3: Off-peak usage shift
  const offPeakSavings = baselineEnergy.dailyEnergy * 0.08; // Minimal energy savings
  const offPeakCostSavings = baselineEnergy.monthlyCost * 0.22; // Significant cost savings
  results.push({
    strategy: 'Off-Peak Shift',
    description: 'Shift 40% of cooling to off-peak hours (6pm-10pm)',
    energySavings: offPeakSavings,
    costSavings: offPeakCostSavings,
    percentageSavings: 22,
    optimizedDailyEnergy: baselineEnergy.dailyEnergy - offPeakSavings,
  });
  
  // Strategy 4: Combined approach
  const combinedSavings = baselineEnergy.dailyEnergy * 0.32;
  const combinedCostSavings = baselineEnergy.monthlyCost * 0.35;
  results.push({
    strategy: 'Combined',
    description: 'Pre-cooling + setpoint adjustment + off-peak shift',
    energySavings: combinedSavings,
    costSavings: combinedCostSavings,
    percentageSavings: 35,
    optimizedDailyEnergy: baselineEnergy.dailyEnergy - combinedSavings,
  });
  
  return results;
}

/**
 * Generate hourly energy consumption data for charts
 */
export function generateHourlyData(
  baselineEnergy: number,
  optimizedEnergy: number,
  strategy: string
): Array<{ hour: string; baseline: number; optimized: number }> {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return hours.map((hour) => {
    const hourStr = `${hour.toString().padStart(2, '0')}:00`;
    
    // Simulate varying load throughout the day
    let baselineMultiplier = 1.0;
    let optimizedMultiplier = 1.0;
    
    // Peak hours (12-18): higher load
    if (hour >= 12 && hour < 18) {
      baselineMultiplier = 1.4;
      
      // Pre-cooling strategy: reduce peak, increase pre-peak
      if (strategy === 'Pre-cooling') {
        optimizedMultiplier = hour < 14 ? 1.2 : 1.1;
      } else if (strategy === 'Off-Peak Shift') {
        optimizedMultiplier = 1.2;
      } else {
        optimizedMultiplier = baselineMultiplier * 0.85;
      }
    }
    // Off-peak hours (18-22): moderate load
    else if (hour >= 18 && hour < 22) {
      baselineMultiplier = 1.1;
      
      if (strategy === 'Off-Peak Shift') {
        optimizedMultiplier = 1.3; // Shifted load
      } else {
        optimizedMultiplier = baselineMultiplier * 0.85;
      }
    }
    // Night/morning: low load
    else {
      baselineMultiplier = hour >= 6 && hour < 12 ? 0.8 : 0.3;
      optimizedMultiplier = baselineMultiplier * 0.85;
    }
    
    return {
      hour: hourStr,
      baseline: Number((baselineEnergy * baselineMultiplier).toFixed(2)),
      optimized: Number((optimizedEnergy * optimizedMultiplier).toFixed(2)),
    };
  });
}
