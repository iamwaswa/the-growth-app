export type Gender = "female" | "male";

export type BabyInformation = {
  /** The unique identifier (usually the timestamp or a UUID) */
  id: string;
  /** The baby's date of birth */
  dateOfBirth: string;
  /** The baby's gender */
  gender: Gender;
  /** The baby's name */
  name: string;
};

export type BabyHeadCircumferenceMeasurement = {
  /** The unique identifier (usually the timestamp or a UUID) */
  id: string;
  /** The unique identifier for the baby information (usually the timestamp or a UUID) */
  babyInformationId: string;
  /** The baby's head circumference measurement value and unit */
  headCircumference: {
    /** The baby's head circumference measurement value */
    value: number;
    /** The baby's head circumference measurement unit */
    unit: LengthUnit;
  } | null;
  /** The month relevant for the measurement */
  month: Month;
  /** Extra notes to go along with the measurement, e.g. The doctor mentioned the dip is normal given the diet changes */
  notes: string | null;
  /** The type of the baby measurement */
  type: "head_circumference";
};

export type BabyHeightMeasurement = {
  /** The unique identifier (usually the timestamp or a UUID) */
  id: string;
  /** The unique identifier for the baby information (usually the timestamp or a UUID) */
  babyInformationId: string;
  /** The baby's height measurement value and unit */
  height: {
    /** The baby's height measurement value */
    value: number;
    /** The baby's height measurement unit */
    unit: LengthUnit;
  } | null;
  /** The month relevant for the measurement */
  month: Month;
  /** Extra notes to go along with the measurement, e.g. The doctor mentioned the dip is normal given the diet changes */
  notes: string | null;
  /** The type of the baby measurement */
  type: "height";
};

export type BabyWeightMeasurement = {
  /** The unique identifier (usually the timestamp or a UUID) */
  id: string;
  /** The unique identifier for the baby information (usually the timestamp or a UUID) */
  babyInformationId: string;
  /** The baby's weight measurement value and unit */
  weight: {
    /** The baby's weight measurement value */
    value: number;
    /** The baby's weight measurement unit */
    unit: WeightUnit;
  } | null;
  /** The month relevant for the measurement */
  month: Month;
  /** Extra notes to go along with the measurement, e.g. The doctor mentioned the dip is normal given the diet changes */
  notes: string | null;
  /** The type of the baby measurement */
  type: "weight";
};

export type GrowthPercentileData = {
  female: {
    head_circumference_cm: PercentileValuesMap & MinMaxMap;
    length_cm: PercentileValuesMap & MinMaxMap;
    weight_kg: PercentileValuesMap & MinMaxMap;
  };
  male: {
    head_circumference_cm: PercentileValuesMap & MinMaxMap;
    length_cm: PercentileValuesMap & MinMaxMap;
    weight_kg: PercentileValuesMap & MinMaxMap;
  };
};

export type BabyMeasurement =
  | BabyHeadCircumferenceMeasurement
  | BabyHeightMeasurement
  | BabyWeightMeasurement;

export type BabyMeasurementType = "head_circumference" | "height" | "weight";

export type LengthUnit = "cms" | "inches";

export type MeasurementChartContextType = {
  defaultUnit: string;
  alternateUnit: string;
  convertToAlternateUnitValue(value: number, invert?: boolean): number;
};

export type MinMaxMap = {
  max: number;
  min: number;
};

export const months = [0, 3, 6, 9, 12, 15, 18, 21, 24] as const;

export type Month = (typeof months)[number];

export type PercentileValuesMap = {
  p98: [number, number, number, number, number, number, number, number, number];
  p95: [number, number, number, number, number, number, number, number, number];
  p90: [number, number, number, number, number, number, number, number, number];
  p75: [number, number, number, number, number, number, number, number, number];
  p50: [number, number, number, number, number, number, number, number, number];
  p25: [number, number, number, number, number, number, number, number, number];
  p10: [number, number, number, number, number, number, number, number, number];
  p5: [number, number, number, number, number, number, number, number, number];
  p2: [number, number, number, number, number, number, number, number, number];
};

export type WeightUnit = "kgs" | "lbs";
