import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { RoomInputs } from "@/components/RoomInputs";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { OptimizationComparison } from "@/components/OptimizationComparison";
import { EnergyChart } from "@/components/EnergyChart";
import { fetchDubaiWeather, WeatherData } from "@/lib/weather-api";
import {
  calculateCoolingLoad,
  calculateEnergyConsumption,
  simulateOptimizations,
  generateHourlyData,
  RoomParameters,
} from "@/lib/cooling-calculations";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/dubai-hero.jpg";

const Index = () => {
  const { toast } = useToast();
  
  // Weather state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  
  // Room parameters state
  const [area, setArea] = useState(50);
  const [height, setHeight] = useState(3);
  const [numPeople, setNumPeople] = useState(4);
  const [indoorTemp, setIndoorTemp] = useState(24);
  
  // Selected optimization strategy
  const [selectedStrategy, setSelectedStrategy] = useState("Pre-cooling");
  
  // Fetch weather data on mount
  useEffect(() => {
    loadWeather();
  }, []);
  
  const loadWeather = async () => {
    setWeatherLoading(true);
    try {
      const data = await fetchDubaiWeather();
      setWeather(data);
    } catch (error) {
      toast({
        title: "Weather Data Error",
        description: "Using fallback weather data for Dubai",
        variant: "destructive",
      });
    } finally {
      setWeatherLoading(false);
    }
  };
  
  // Calculate results
  const roomParams: RoomParameters = {
    area,
    height,
    numPeople,
    indoorTemp,
    outdoorTemp: weather?.temperature || 42,
    outdoorHumidity: weather?.humidity || 65,
  };
  
  const coolingLoad = calculateCoolingLoad(roomParams);
  const energyConsumption = calculateEnergyConsumption(coolingLoad.totalLoadKW);
  const optimizations = simulateOptimizations(roomParams, energyConsumption);
  
  const selectedOptimization = optimizations.find(opt => opt.strategy === selectedStrategy) || optimizations[0];
  const hourlyData = generateHourlyData(
    energyConsumption.hourlyEnergy,
    selectedOptimization.optimizedDailyEnergy / 24,
    selectedStrategy
  );
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Dubai skyline" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Dubai Cooling Optimizer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Optimize your building's cooling system for maximum efficiency and cost savings
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Weather Display */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <WeatherDisplay weather={weather} loading={weatherLoading} />
          </div>
          <Button 
            onClick={loadWeather} 
            variant="outline"
            className="ml-4"
            disabled={weatherLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${weatherLoading ? 'animate-spin' : ''}`} />
            Refresh Weather
          </Button>
        </div>
        
        {/* Input and Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RoomInputs
            area={area}
            height={height}
            numPeople={numPeople}
            indoorTemp={indoorTemp}
            onAreaChange={setArea}
            onHeightChange={setHeight}
            onPeopleChange={setNumPeople}
            onIndoorTempChange={setIndoorTemp}
          />
          
          <ResultsDisplay
            coolingLoad={coolingLoad}
            energyConsumption={energyConsumption}
          />
        </div>
        
        {/* Optimization Strategies */}
        <div className="mb-8">
          <OptimizationComparison
            optimizations={optimizations}
            onStrategySelect={setSelectedStrategy}
          />
        </div>
        
        {/* Energy Chart */}
        <EnergyChart data={hourlyData} strategyName={selectedStrategy} />
      </div>
      
      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Dubai Cooling Optimizer - Built for optimizing HVAC systems in UAE climate</p>
          <p className="mt-2">Weather data from Open-Meteo | DEWA tariff estimates</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
