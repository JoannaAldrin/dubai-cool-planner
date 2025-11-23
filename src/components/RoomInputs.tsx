import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Users, Ruler, Thermometer, Maximize2 } from "lucide-react";

interface RoomInputsProps {
  area: number;
  height: number;
  numPeople: number;
  indoorTemp: number;
  onAreaChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onPeopleChange: (value: number) => void;
  onIndoorTempChange: (value: number) => void;
}

export function RoomInputs({
  area,
  height,
  numPeople,
  indoorTemp,
  onAreaChange,
  onHeightChange,
  onPeopleChange,
  onIndoorTempChange,
}: RoomInputsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Maximize2 className="w-5 h-5 text-primary" />
          <span>Room Parameters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="area" className="flex items-center space-x-2">
            <Ruler className="w-4 h-4 text-muted-foreground" />
            <span>Room Area (m²)</span>
          </Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="area"
              min={10}
              max={200}
              step={5}
              value={[area]}
              onValueChange={(values) => onAreaChange(values[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={area}
              onChange={(e) => onAreaChange(Number(e.target.value))}
              className="w-20"
              min={10}
              max={200}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="height" className="flex items-center space-x-2">
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
            <span>Room Height (m)</span>
          </Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="height"
              min={2.4}
              max={5}
              step={0.1}
              value={[height]}
              onValueChange={(values) => onHeightChange(values[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={height}
              onChange={(e) => onHeightChange(Number(e.target.value))}
              className="w-20"
              min={2.4}
              max={5}
              step={0.1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="people" className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>Number of People</span>
          </Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="people"
              min={0}
              max={20}
              step={1}
              value={[numPeople]}
              onValueChange={(values) => onPeopleChange(values[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={numPeople}
              onChange={(e) => onPeopleChange(Number(e.target.value))}
              className="w-20"
              min={0}
              max={20}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="indoor-temp" className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <span>Indoor Temperature Setpoint (°C)</span>
          </Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="indoor-temp"
              min={18}
              max={28}
              step={0.5}
              value={[indoorTemp]}
              onValueChange={(values) => onIndoorTempChange(values[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={indoorTemp}
              onChange={(e) => onIndoorTempChange(Number(e.target.value))}
              className="w-20"
              min={18}
              max={28}
              step={0.5}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
