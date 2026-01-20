import { useLocalStorage } from "@/hooks";
import type { BabyInformation, BabyMeasurement } from "@/types";

export function useAppState() {
  const [activeBabyInformation, setActiveBabyInformation] =
    useLocalStorage<BabyInformation | null>(
      "active-baby-information-pwa-final",
      null,
    );
  const [babiesInformation, setBabiesInformation] = useLocalStorage<
    BabyInformation[]
  >("babies-information-pwa-final", []);
  const [babiesMeasurements, setBabiesMeasumrents] = useLocalStorage<
    BabyMeasurement[]
  >("babies-measurements-pwa-final", []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    "theme-growth-pwa-final",
    false,
  );

  return [
    {
      activeBabyInformation,
      babiesInformation,
      babiesMeasurements,
      isDarkMode,
    },
    {
      setActiveBabyInformation,
      setBabiesInformation,
      setBabiesMeasumrents,
      setIsDarkMode,
    },
  ] as const;
}
