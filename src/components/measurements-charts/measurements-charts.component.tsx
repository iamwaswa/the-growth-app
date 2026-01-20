import { Stack, Typography } from "@mui/material";
import { MeasurementChart } from "@/components";
import type {
  BabyInformation,
  BabyMeasurement,
  GrowthPercentileData,
} from "@/types";
import { cmToInch, kgToLb } from "@/utils";

type MeasurementChartsProps = {
  activeBabyInformation: BabyInformation;
  measurements: BabyMeasurement[];
  onMeasurementChange(editedMeasurement: BabyMeasurement): void;
  onMeasurementRemoved(id: string): void;
};

export function MeasurementCharts({
  activeBabyInformation,
  measurements,
  onMeasurementChange,
  onMeasurementRemoved,
}: MeasurementChartsProps) {
  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });

  const growthPercentileData: GrowthPercentileData = {
    female: {
      head_circumference_cm: {
        p2: [31.7, 37.2, 39.9, 41.5, 42.6, 43.4, 44.1, 44.7, 45.2],
        p5: [32.3, 37.7, 40.4, 42.1, 43.2, 44.1, 44.8, 45.4, 45.9],
        p10: [32.9, 38.3, 41.0, 42.7, 43.8, 44.7, 45.4, 46.0, 46.6],
        p25: [33.9, 39.3, 42.1, 43.7, 44.8, 45.7, 46.4, 47.1, 47.7],
        p50: [34.8, 40.5, 43.3, 45.0, 46.1, 47.0, 47.8, 48.4, 49.0],
        p75: [35.8, 41.7, 44.6, 46.3, 47.5, 48.4, 49.2, 49.9, 50.4],
        p90: [36.7, 42.8, 45.8, 47.6, 48.8, 49.7, 50.5, 51.2, 51.8],
        p95: [37.3, 43.5, 46.6, 48.4, 49.6, 50.6, 51.4, 52.1, 52.7],
        p98: [38.0, 44.4, 47.5, 49.4, 50.6, 51.6, 52.5, 53.2, 53.8],
        max: 60,
        min: 30,
      },
      length_cm: {
        p2: [45.4, 55.8, 61.5, 65.6, 69.2, 72.3, 75.2, 77.9, 80.3],
        p5: [46.4, 56.8, 62.6, 66.7, 70.3, 73.5, 76.4, 79.1, 81.6],
        p10: [47.3, 57.7, 63.6, 67.8, 71.4, 74.7, 77.7, 80.5, 83.0],
        p25: [48.2, 58.7, 64.7, 68.9, 72.6, 76.0, 79.1, 81.9, 84.5],
        p50: [49.2, 59.8, 65.8, 70.2, 74.0, 77.3, 80.5, 83.4, 86.1],
        p75: [50.3, 61.0, 67.1, 71.5, 75.3, 78.8, 82.0, 84.9, 87.7],
        p90: [51.2, 62.1, 68.3, 72.8, 76.7, 80.2, 83.4, 86.4, 89.1],
        p95: [51.8, 62.8, 69.1, 73.6, 77.5, 81.1, 84.3, 87.3, 90.1],
        p98: [52.6, 63.6, 69.9, 74.5, 78.4, 82.0, 85.3, 88.3, 91.1],
        max: 100,
        min: 40,
      },
      weight_kg: {
        p2: [2.4, 4.6, 5.8, 6.6, 7.1, 7.6, 8.2, 8.7, 9.1],
        p5: [2.6, 5.0, 6.2, 7.0, 7.6, 8.1, 8.7, 9.2, 9.6],
        p10: [2.8, 5.3, 6.5, 7.4, 8.0, 8.6, 9.2, 9.7, 10.1],
        p25: [3.0, 5.6, 6.9, 7.8, 8.5, 9.1, 9.8, 10.3, 10.8],
        p50: [3.3, 6.0, 7.3, 8.3, 9.0, 9.7, 10.4, 11.0, 11.5],
        p75: [3.5, 6.4, 7.8, 8.9, 9.7, 10.4, 11.2, 11.9, 12.4],
        p90: [3.8, 6.8, 8.4, 9.5, 10.3, 11.1, 12.0, 12.7, 13.3],
        p95: [4.0, 7.1, 8.7, 9.8, 10.7, 11.6, 12.5, 13.3, 13.8],
        p98: [4.2, 7.4, 9.1, 10.3, 11.2, 12.1, 13.0, 13.8, 14.4],
        max: 20,
        min: 0,
      },
    },
    male: {
      head_circumference_cm: {
        p2: [32.1, 37.8, 40.6, 42.3, 43.4, 44.3, 45.0, 45.6, 46.1],
        p5: [32.7, 38.4, 41.2, 42.9, 44.0, 44.9, 45.7, 46.3, 46.8],
        p10: [33.3, 39.0, 41.8, 43.5, 44.7, 45.6, 46.3, 47.0, 47.6],
        p25: [34.3, 40.0, 42.9, 44.6, 45.8, 46.7, 47.5, 48.1, 48.7],
        p50: [35.4, 41.2, 44.1, 45.9, 47.0, 48.0, 48.7, 49.4, 50.0],
        p75: [36.4, 42.5, 45.4, 47.2, 48.4, 49.3, 50.1, 50.8, 51.4],
        p90: [37.4, 43.6, 46.7, 48.5, 49.7, 50.6, 51.5, 52.2, 52.8],
        p95: [38.0, 44.3, 47.5, 49.3, 50.6, 51.6, 52.4, 53.1, 53.8],
        p98: [38.7, 45.3, 48.5, 50.4, 51.7, 52.7, 53.6, 54.4, 55.0],
        max: 60,
        min: 30,
      },
      length_cm: {
        p2: [46.1, 57.4, 63.6, 67.8, 71.3, 74.4, 77.2, 79.8, 82.1],
        p5: [47.1, 58.4, 64.7, 68.9, 72.4, 75.6, 78.4, 81.1, 83.4],
        p10: [48.0, 59.4, 65.8, 70.1, 73.6, 76.8, 79.7, 82.4, 84.8],
        p25: [48.9, 60.4, 67.0, 71.3, 74.9, 78.2, 81.1, 83.9, 86.3],
        p50: [49.9, 61.4, 68.2, 72.6, 76.2, 79.5, 82.5, 85.3, 87.8],
        p75: [51.0, 62.6, 69.4, 73.8, 77.5, 80.9, 84.0, 86.8, 89.3],
        p90: [51.9, 63.8, 70.6, 75.1, 78.8, 82.2, 85.3, 88.2, 90.7],
        p95: [52.5, 64.6, 71.3, 75.9, 79.6, 83.0, 86.2, 89.1, 91.6],
        p98: [53.2, 65.5, 72.1, 76.8, 80.5, 84.0, 87.2, 90.1, 92.6],
        max: 100,
        min: 40,
      },
      weight_kg: {
        p2: [2.5, 5.0, 6.4, 7.2, 7.8, 8.3, 8.8, 9.3, 9.7],
        p5: [2.7, 5.4, 6.8, 7.7, 8.3, 8.8, 9.4, 9.9, 10.3],
        p10: [2.9, 5.7, 7.2, 8.1, 8.7, 9.3, 9.8, 10.4, 10.8],
        p25: [3.1, 6.0, 7.5, 8.5, 9.2, 9.8, 10.4, 11.0, 11.5],
        p50: [3.4, 6.4, 8.0, 9.0, 9.7, 10.4, 11.0, 11.7, 12.2],
        p75: [3.7, 6.9, 8.5, 9.6, 10.3, 11.1, 11.7, 12.4, 13.0],
        p90: [3.9, 7.3, 9.1, 10.2, 11.0, 11.8, 12.5, 13.3, 13.8],
        p95: [4.2, 7.6, 9.4, 10.5, 11.4, 12.3, 13.0, 13.8, 14.4],
        p98: [4.4, 7.9, 9.8, 11.0, 11.9, 12.8, 13.5, 14.3, 15.0],
        max: 20,
        min: 0,
      },
    },
  };

  return (
    <Stack gap={2}>
      <Stack>
        <Typography variant="body2">{activeBabyInformation.name}</Typography>
        <Typography variant="caption">
          {activeBabyInformation.gender[0].toUpperCase()}
          {activeBabyInformation.gender.slice(1)} •{" "}
          {dateTimeFormatter.format(
            new Date(activeBabyInformation.dateOfBirth),
          )}
        </Typography>
      </Stack>
      <Stack gap={4}>
        <MeasurementChart
          activeBabyInformation={activeBabyInformation}
          defaultUnit="cms"
          alternateUnit="inches"
          convertToAlternateUnitValue={cmToInch}
          measurements={measurements.filter(
            (measurement) =>
              measurement.babyInformationId === activeBabyInformation.id &&
              measurement.type === "head_circumference",
          )}
          perecentileValuesMap={
            growthPercentileData[activeBabyInformation.gender]
              .head_circumference_cm
          }
          type="head_circumference"
          yAxis={[
            {
              id: "cm",
              label: "Length (cm)",
              min: growthPercentileData[activeBabyInformation.gender]
                .head_circumference_cm.min,
              max: growthPercentileData[activeBabyInformation.gender]
                .head_circumference_cm.max,
              position: "left",
            },
            {
              id: "in",
              label: "Length (in)",
              min: cmToInch(
                growthPercentileData[activeBabyInformation.gender]
                  .head_circumference_cm.min,
              ),
              max: cmToInch(
                growthPercentileData[activeBabyInformation.gender]
                  .head_circumference_cm.max,
              ),
              position: "right",
            },
          ]}
          onMeasurementChange={onMeasurementChange}
          onMeasurementRemoved={onMeasurementRemoved}
        />
        <MeasurementChart
          activeBabyInformation={activeBabyInformation}
          defaultUnit="cms"
          alternateUnit="inches"
          convertToAlternateUnitValue={cmToInch}
          measurements={measurements.filter(
            (measurement) =>
              measurement.babyInformationId === activeBabyInformation.id &&
              measurement.type === "height",
          )}
          perecentileValuesMap={
            growthPercentileData[activeBabyInformation.gender].length_cm
          }
          type="height"
          yAxis={[
            {
              id: "cm",
              label: "Length (cm)",
              min: growthPercentileData[activeBabyInformation.gender].length_cm
                .min,
              max: growthPercentileData[activeBabyInformation.gender].length_cm
                .max,
              position: "left",
            },
            {
              id: "in",
              label: "Length (in)",
              min: cmToInch(
                growthPercentileData[activeBabyInformation.gender].length_cm
                  .min,
              ),
              max: cmToInch(
                growthPercentileData[activeBabyInformation.gender].length_cm
                  .max,
              ),
              position: "right",
            },
          ]}
          onMeasurementChange={onMeasurementChange}
          onMeasurementRemoved={onMeasurementRemoved}
        />
        <MeasurementChart
          activeBabyInformation={activeBabyInformation}
          defaultUnit="kgs"
          alternateUnit="lbs"
          convertToAlternateUnitValue={kgToLb}
          measurements={measurements.filter(
            (measurement) =>
              measurement.babyInformationId === activeBabyInformation.id &&
              measurement.type === "weight",
          )}
          perecentileValuesMap={
            growthPercentileData[activeBabyInformation.gender].weight_kg
          }
          type="weight"
          yAxis={[
            {
              id: "kg",
              label: "Weight (kg)",
              min: growthPercentileData[activeBabyInformation.gender].weight_kg
                .min,
              max: growthPercentileData[activeBabyInformation.gender].weight_kg
                .max,
              position: "left",
            },
            {
              id: "lb",
              label: "Weight (lb)",
              min: kgToLb(
                growthPercentileData[activeBabyInformation.gender].weight_kg
                  .min,
              ),
              max: kgToLb(
                growthPercentileData[activeBabyInformation.gender].weight_kg
                  .max,
              ),
              position: "right",
            },
          ]}
          onMeasurementChange={onMeasurementChange}
          onMeasurementRemoved={onMeasurementRemoved}
        />
      </Stack>
    </Stack>
  );
}
