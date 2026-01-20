import { Edit } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { type LineSeries, type YAxis, LineChart } from "@mui/x-charts";
import { EditMeasurementsModal, MeasurementChartTooltip } from "@/components";
import { MeasurementChartContext } from "@/context";
import {
  months,
  type BabyInformation,
  type BabyMeasurement,
  type BabyMeasurementType,
  type LengthUnit,
  type PercentileValuesMap,
  type WeightUnit,
} from "@/types";
import { useState } from "react";

type MeasurementChartProps<TUnit extends LengthUnit | WeightUnit> = {
  activeBabyInformation: BabyInformation;
  defaultUnit: TUnit;
  alternateUnit: TUnit;
  measurements: BabyMeasurement[];
  perecentileValuesMap: PercentileValuesMap;
  type: BabyMeasurementType;
  yAxis: ReadonlyArray<YAxis>;
  convertToAlternateUnitValue(value: number, invert?: boolean): number;
  onMeasurementChange(changedMeasurement: BabyMeasurement): void;
  onMeasurementRemoved(id: string): void;
};

export function MeasurementChart<TUnit extends LengthUnit | WeightUnit>({
  activeBabyInformation,
  defaultUnit,
  alternateUnit,
  measurements,
  perecentileValuesMap,
  type,
  yAxis,
  convertToAlternateUnitValue,
  onMeasurementChange,
  onMeasurementRemoved,
}: MeasurementChartProps<TUnit>) {
  const activeBabyMeasurements = measurements.filter(
    (measurement) => activeBabyInformation.id === measurement.babyInformationId,
  );

  const { palette } = useTheme();

  function createSeries(map: PercentileValuesMap): LineSeries[] {
    return (
      [
        { color: "#311b92", id: "p98", label: "98th" },
        { color: "#0d47a1", id: "p95", label: "95th" },
        { color: "#1976d2", id: "p90", label: "90th" },
        { color: "#0097a7", id: "p75", label: "75th" },
        { color: "#2e7d32", id: "p50", label: "50th" },
        { color: "#fbc02d", id: "p25", label: "25th" },
        { color: "#f57c00", id: "p10", label: "10th" },
        { color: "#d32f2f", id: "p5", label: "5th" },
        { color: "#880e4f", id: "p2", label: "2nd" },
      ] as const
    ).reduce<LineSeries[]>(
      (series, percentile) => [
        ...series,
        {
          color: percentile.color,
          data: map[percentile.id],
          label: percentile.label,
          showMark: false,
        },
      ],
      activeBabyMeasurements.length
        ? [
            {
              color: palette.text.primary,
              data: months.map((month) => {
                const measurement = activeBabyMeasurements.find(
                  (measurement) => month === measurement.month,
                );

                if (
                  measurement?.type === "height" &&
                  measurement.month === month &&
                  measurement.height?.value !== undefined
                ) {
                  return measurement.height.unit === alternateUnit
                    ? Number(
                        convertToAlternateUnitValue(
                          measurement.height.value,
                          true,
                        ).toFixed(1),
                      )
                    : measurement.height.value;
                }

                if (
                  measurement?.type === "weight" &&
                  measurement.month === month &&
                  measurement.weight?.value !== undefined
                ) {
                  return measurement.weight.unit === alternateUnit
                    ? Number(
                        convertToAlternateUnitValue(
                          measurement.weight.value,
                          true,
                        ).toFixed(1),
                      )
                    : measurement.weight.value;
                }

                return null;
              }),
              label: "Baby",
              showMark: true,
            },
          ]
        : [],
    );
  }

  const editMeasurementsTitle = `Edit measurements for ${activeBabyInformation.name}`;

  const [isEditMeasurementsModalOpen, setIsEditMeasurementsModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Stack gap={1}>
        <Stack alignSelf="flex-end" direction="row" gap={1} mr={10}>
          <Tooltip placement="top" title={editMeasurementsTitle}>
            <IconButton
              aria-label={editMeasurementsTitle}
              onClick={() => setIsEditMeasurementsModalOpen(true)}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </Stack>
        <MeasurementChartContext.Provider
          value={{ defaultUnit, alternateUnit, convertToAlternateUnitValue }}
        >
          <LineChart
            grid={{ horizontal: true, vertical: true }}
            height={400}
            series={createSeries(perecentileValuesMap)}
            slotProps={{
              legend: {
                sx: { display: "none" },
              },
            }}
            slots={{
              tooltip: MeasurementChartTooltip,
            }}
            xAxis={[
              {
                data: months,
                label: "Age (Months)",
                min: 0,
                max: 24,
                tickInterval: months as unknown as number[],
              },
            ]}
            yAxis={yAxis}
          />
        </MeasurementChartContext.Provider>
      </Stack>
      <EditMeasurementsModal
        activeBabyInformation={activeBabyInformation}
        defaultUnit={defaultUnit}
        alternateUnit={alternateUnit}
        isOpen={isEditMeasurementsModalOpen}
        measurements={measurements}
        type={type}
        onClose={() => setIsEditMeasurementsModalOpen(false)}
        onMeasurementChange={onMeasurementChange}
        onMeasurementRemoved={onMeasurementRemoved}
      />
    </>
  );
}
