import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useAxesTooltip, useLineSeries } from "@mui/x-charts";
import { useMeasurementChartContext } from "@/context";

export function MeasurementChartTooltipContent() {
  const axesTooltip = useAxesTooltip();
  const lineSeries = useLineSeries();
  const { defaultUnit, alternateUnit, convertToAlternateUnitValue } =
    useMeasurementChartContext();

  if (!axesTooltip) {
    return null;
  }

  const [{ axisValue, dataIndex }] = axesTooltip;

  const percentileData = lineSeries.map(({ color, data, id, label }) => ({
    color,
    id,
    label: typeof label === "string" ? label : "",
    value:
      data[dataIndex] === null || data[dataIndex] === undefined
        ? ""
        : data[dataIndex].toString(),
  }));

  return (
    <Paper elevation={4}>
      <Stack gap={2}>
        <Typography
          display="flex"
          justifyContent="space-between"
          sx={{ pt: 2, px: 2 }}
          variant="subtitle2"
        >
          {axisValue.toString()} months
        </Typography>
        <Divider />
        <Stack gap={2} pb={2} px={2}>
          {percentileData.map((percentile) => (
            <Stack key={percentile.id} component="span" direction="row" gap={2}>
              <Stack component="span" direction="row" gap={2} width={80}>
                <Box
                  bgcolor={percentile.color}
                  component="span"
                  height={20}
                  width={20}
                />
                <Typography
                  color="textSecondary"
                  component="span"
                  variant="body2"
                >
                  {percentile.label}
                </Typography>
              </Stack>
              <Typography component="span" variant="body2">
                {percentile.value} {defaultUnit} •{" "}
                {convertToAlternateUnitValue(Number(percentile.value)).toFixed(
                  1,
                )}{" "}
                {alternateUnit}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
