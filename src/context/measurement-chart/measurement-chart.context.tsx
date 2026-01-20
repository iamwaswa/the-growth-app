import { MeasurementChartContextType } from "@/types";
import { createContext, useContext } from "react";

export const MeasurementChartContext = createContext<
  Partial<MeasurementChartContextType>
>({});

export function useMeasurementChartContext() {
  const context = useContext(MeasurementChartContext);

  if (
    !context.defaultUnit ||
    !context.alternateUnit ||
    !context.convertToAlternateUnitValue
  ) {
    throw new Error("MeasurementChartContext used outside its Provider!");
  }

  const { defaultUnit, alternateUnit, convertToAlternateUnitValue } = context;

  return {
    defaultUnit,
    alternateUnit,
    convertToAlternateUnitValue,
  };
}
