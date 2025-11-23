import { Cloud, Droplets, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/lib/weather-api";

interface WeatherDisplayProps {
  weather: WeatherData | null;
  loading: boolean;
}

export function WeatherDisplay({ weather, loading }: WeatherDisplayProps) {
  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading weather data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Dubai Weather</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(weather.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Dubai',
              })}
            </p>
          </div>
          <Cloud className="w-8 h-8 text-primary" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Thermometer className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{weather.temperature}°C</p>
              <p className="text-xs text-muted-foreground">Temperature</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Droplets className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{weather.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Feels like: <span className="font-semibold text-foreground">{weather.feelsLike}°C</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
