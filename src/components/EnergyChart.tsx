import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

interface EnergyChartProps {
  data: Array<{ hour: string; baseline: number; optimized: number }>;
  strategyName: string;
}

export function EnergyChart({ data, strategyName }: EnergyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <span>24-Hour Energy Consumption Profile</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Comparing baseline vs. {strategyName} strategy
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              interval={2}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="hsl(var(--muted))"
              strokeWidth={2}
              name="Baseline"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="optimized"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              name="Optimized"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-4 p-4 bg-accent/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Peak hours (12:00-18:00):</span> Higher 
            electricity rates apply. Optimization strategies focus on reducing consumption during this period.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
