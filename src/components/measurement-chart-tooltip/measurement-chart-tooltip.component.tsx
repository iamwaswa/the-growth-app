import { ChartsTooltipContainer } from "@mui/x-charts";
import { MeasurementChartTooltipContent } from "@/components";

export function MeasurementChartTooltip() {
  return (
    <ChartsTooltipContainer trigger="axis">
      <MeasurementChartTooltipContent />
    </ChartsTooltipContainer>
  );
}
