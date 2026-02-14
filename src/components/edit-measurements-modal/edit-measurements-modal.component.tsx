import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NumberField } from "@/components";
import {
  type BabyInformation,
  type Month,
  type BabyMeasurement,
  type LengthUnit,
  type WeightUnit,
  type BabyMeasurementType,
  months,
} from "@/types";
import { FormEvent, useId, useState } from "react";

type EditMeasurementsModalProps<TUnit extends LengthUnit | WeightUnit> = {
  activeBabyInformation: BabyInformation;
  defaultUnit: TUnit;
  alternateUnit: TUnit;
  isOpen: boolean;
  measurements: BabyMeasurement[];
  type: BabyMeasurementType;
  onClose(): void;
  onMeasurementChange(changedMeasurement: BabyMeasurement): void;
  onMeasurementRemoved(id: string): void;
};

export function EditMeasurementsModal<TUnit extends LengthUnit | WeightUnit>({
  activeBabyInformation,
  defaultUnit,
  alternateUnit,
  isOpen,
  measurements,
  type,
  onClose,
  onMeasurementChange,
  onMeasurementRemoved,
}: EditMeasurementsModalProps<TUnit>) {
  const measurementUnitLabelId = useId();
  const monthPickerLabelId = useId();

  const [measurement, setMeasurement] = useState<BabyMeasurement | null>(null);

  function getMeasurementMonth(): Month | "" {
    return measurement?.month ?? "";
  }

  function getMeasurementNotes(): string {
    return measurement?.notes ?? "";
  }

  function getMeasurementUnit(): LengthUnit | WeightUnit {
    if (
      measurement?.type === "head_circumference" &&
      measurement.headCircumference
    ) {
      return measurement.headCircumference.unit;
    }

    if (measurement?.type === "height" && measurement.height) {
      return measurement.height.unit;
    }

    if (measurement?.type === "weight" && measurement.weight) {
      return measurement.weight.unit;
    }

    return defaultUnit;
  }

  function getMeasurementValue(): number | null {
    if (
      measurement?.type === "head_circumference" &&
      measurement.headCircumference
    ) {
      return measurement.headCircumference.value;
    }

    if (measurement?.type === "height" && measurement.height) {
      return measurement.height.value;
    }

    if (measurement?.type === "weight" && measurement.weight) {
      return measurement.weight.value;
    }

    return null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (measurement) {
      onMeasurementChange(measurement);
      setMeasurement(null);
      onClose();
    }
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={isOpen}
      slotProps={{
        paper: {
          style: {
            maxWidth: 420,
          },
        },
      }}
      onClose={onClose}
    >
      <DialogTitle
        textAlign="center"
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography component="span" variant="h6">
          Edit Measurements
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Stack gap={2}>
          <Stack component="form" gap={2} onSubmit={handleSubmit}>
            <Stack
              component="fieldset"
              gap={2}
              sx={{ border: "none", m: 0, p: 0 }}
            >
              <FormControl fullWidth={true}>
                <InputLabel id={monthPickerLabelId}>Month</InputLabel>
                <Select
                  label="Month"
                  labelId={monthPickerLabelId}
                  value={getMeasurementMonth()}
                  onChange={(event) => {
                    setMeasurement(() => {
                      const existingMeasurement = measurements.find(
                        (measurement) =>
                          event.target.value === measurement.month,
                      );

                      if (existingMeasurement) {
                        return {
                          ...existingMeasurement,
                          month: event.target.value,
                        };
                      }

                      if (type === "head_circumference") {
                        return {
                          id: window.crypto.randomUUID(),
                          babyInformationId: activeBabyInformation.id,
                          headCircumference: null,
                          month: event.target.value,
                          notes: null,
                          type,
                        };
                      }

                      if (type === "height") {
                        return {
                          id: window.crypto.randomUUID(),
                          babyInformationId: activeBabyInformation.id,
                          height: null,
                          month: event.target.value,
                          notes: null,
                          type,
                        };
                      }

                      return {
                        id: window.crypto.randomUUID(),
                        babyInformationId: activeBabyInformation.id,
                        weight: null,
                        month: event.target.value,
                        notes: null,
                        type,
                      };
                    });
                  }}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month} months
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack direction="row" gap={1}>
                <NumberField
                  disabled={measurement === null}
                  fullWidth={true}
                  label="Value"
                  value={getMeasurementValue()}
                  onValueChange={(value) => {
                    setMeasurement((currentMeasurement) => {
                      if (
                        value !== null &&
                        currentMeasurement?.type === "head_circumference"
                      ) {
                        return {
                          ...currentMeasurement,
                          headCircumference: {
                            unit:
                              currentMeasurement.headCircumference?.unit ??
                              "cms",
                            value,
                          },
                        };
                      }

                      if (
                        value !== null &&
                        currentMeasurement?.type === "height"
                      ) {
                        return {
                          ...currentMeasurement,
                          height: {
                            unit: currentMeasurement.height?.unit ?? "cms",
                            value,
                          },
                        };
                      }

                      if (
                        value !== null &&
                        currentMeasurement?.type === "weight"
                      ) {
                        return {
                          ...currentMeasurement,
                          weight: {
                            unit: currentMeasurement.weight?.unit ?? "kgs",
                            value,
                          },
                        };
                      }

                      return currentMeasurement;
                    });
                  }}
                />
                <FormControl fullWidth={true}>
                  <InputLabel id={measurementUnitLabelId}>Unit</InputLabel>
                  <Select
                    disabled={measurement === null}
                    label="Unit"
                    labelId={measurementUnitLabelId}
                    value={getMeasurementUnit()}
                    onChange={(event) => {
                      setMeasurement((currentMeasurement) => {
                        const unit = event.target.value;

                        if (
                          currentMeasurement?.type === "head_circumference" &&
                          currentMeasurement.headCircumference?.value !==
                            undefined &&
                          (unit === "cms" || unit === "inches")
                        ) {
                          return {
                            ...currentMeasurement,
                            headCircumference: {
                              ...currentMeasurement.headCircumference,
                              unit,
                            },
                          };
                        }

                        if (
                          currentMeasurement?.type === "height" &&
                          currentMeasurement.height?.value !== undefined &&
                          (unit === "cms" || unit === "inches")
                        ) {
                          return {
                            ...currentMeasurement,
                            height: {
                              ...currentMeasurement.height,
                              unit,
                            },
                          };
                        }

                        if (
                          currentMeasurement &&
                          currentMeasurement.type === "weight" &&
                          currentMeasurement.weight?.value !== undefined &&
                          (unit === "kgs" || unit === "lbs")
                        ) {
                          return {
                            ...currentMeasurement,
                            weight: {
                              ...currentMeasurement.weight,
                              unit,
                            },
                          };
                        }

                        return currentMeasurement;
                      });
                    }}
                  >
                    <MenuItem value={defaultUnit}>{defaultUnit}</MenuItem>
                    <MenuItem value={alternateUnit}>{alternateUnit}</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <TextField
                disabled={measurement === null}
                label="Notes"
                multiline={true}
                rows={4}
                value={getMeasurementNotes()}
                onChange={(event) => {
                  setMeasurement((currentMeasurement) => {
                    if (currentMeasurement) {
                      return {
                        ...currentMeasurement,
                        notes: event.target.value,
                      };
                    }

                    return currentMeasurement;
                  });
                }}
              />
            </Stack>
            <Stack alignSelf="flex-end" direction="row" gap={1}>
              <Button
                color="error"
                disabled={
                  measurement === null ||
                  (measurement?.type === "head_circumference" &&
                    measurement.headCircumference === null) ||
                  (measurement?.type === "height" &&
                    measurement.height === null) ||
                  (measurement?.type === "weight" &&
                    measurement.weight === null)
                }
                type="button"
                variant="outlined"
                onClick={() => {
                  if (measurement) {
                    onMeasurementRemoved(measurement.id);
                    setMeasurement(null);
                    onClose();
                  }
                }}
              >
                Delete
              </Button>
              <Button type="submit" variant="outlined">
                Save
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
