import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoolingLoad, EnergyConsumption } from "@/lib/cooling-calculations";
import { Zap, DollarSign, Gauge, Droplets } from "lucide-react";

interface ResultsDisplayProps {
  coolingLoad: CoolingLoad;
  energyConsumption: EnergyConsumption;
}

export function ResultsDisplay({ coolingLoad, energyConsumption }: ResultsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gauge className="w-5 h-5 text-primary" />
          <span>Cooling Load & Energy Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Cooling Load Breakdown */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-3">Cooling Load Components</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-accent/50 rounded">
                <span className="text-sm text-foreground">Room Sensible Heat</span>
                <span className="font-mono font-semibold text-foreground">
                  {coolingLoad.roomSensibleHeat.toFixed(0)} W
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-accent/50 rounded">
                <span className="text-sm text-foreground">Occupant Sensible Heat</span>
                <span className="font-mono font-semibold text-foreground">
                  {coolingLoad.occupantSensibleHeat.toFixed(0)} W
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-accent/50 rounded">
                <span className="text-sm text-foreground">Occupant Latent Heat</span>
                <span className="font-mono font-semibold text-foreground">
                  {coolingLoad.occupantLatentHeat.toFixed(0)} W
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-accent/50 rounded">
                <span className="text-sm text-foreground">Equipment Load</span>
                <span className="font-mono font-semibold text-foreground">
                  {coolingLoad.equipmentHeat.toFixed(0)} W
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded border-2 border-primary/30">
                <span className="text-sm font-bold text-foreground">Total Cooling Load</span>
                <span className="font-mono text-lg font-bold text-primary">
                  {coolingLoad.totalLoadKW.toFixed(2)} kW
                </span>
              </div>
            </div>
          </div>

          {/* Energy Consumption */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-chart-1/20 to-chart-1/5 rounded-lg">
              <Zap className="w-8 h-8 text-chart-1 mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {energyConsumption.hourlyEnergy.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground text-center">kWh/hour</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-chart-2/20 to-chart-2/5 rounded-lg">
              <Droplets className="w-8 h-8 text-chart-2 mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {energyConsumption.dailyEnergy.toFixed(1)}
              </p>
              <p className="text-xs text-muted-foreground text-center">kWh/day</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-lg">
              <DollarSign className="w-8 h-8 text-destructive mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {energyConsumption.monthlyCost.toFixed(0)}
              </p>
              <p className="text-xs text-muted-foreground text-center">AED/month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
