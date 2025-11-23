import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptimizationResult } from "@/lib/cooling-calculations";
import { TrendingDown, Lightbulb, DollarSign, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OptimizationComparisonProps {
  optimizations: OptimizationResult[];
  onStrategySelect: (strategy: string) => void;
}

export function OptimizationComparison({
  optimizations,
  onStrategySelect,
}: OptimizationComparisonProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          <span>Optimization Strategies</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Pre-cooling" onValueChange={onStrategySelect}>
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-4">
            {optimizations.map((opt) => (
              <TabsTrigger key={opt.strategy} value={opt.strategy}>
                {opt.strategy}
              </TabsTrigger>
            ))}
          </TabsList>

          {optimizations.map((opt) => (
            <TabsContent key={opt.strategy} value={opt.strategy} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{opt.strategy}</h4>
                  <p className="text-sm text-muted-foreground">{opt.description}</p>
                </div>
                <Badge variant="secondary" className="ml-2">
                  <Percent className="w-3 h-3 mr-1" />
                  {opt.percentageSavings.toFixed(0)}% savings
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Energy Savings</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {opt.energySavings.toFixed(1)} kWh
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">per day</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-chart-1/10 to-chart-1/5 rounded-lg border border-chart-1/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-chart-1" />
                    <p className="text-sm font-medium text-muted-foreground">Cost Savings</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {opt.costSavings.toFixed(0)} AED
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">per month</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-chart-2/10 to-chart-2/5 rounded-lg border border-chart-2/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-chart-2" />
                    <p className="text-sm font-medium text-muted-foreground">Optimized Usage</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {opt.optimizedDailyEnergy.toFixed(1)} kWh
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">per day</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
