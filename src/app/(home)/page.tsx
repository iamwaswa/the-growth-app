"use client";

import { DarkMode, LightMode, Settings } from "@mui/icons-material";
import {
  Container,
  Typography,
  IconButton,
  Stack,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { MeasurementCharts, SettingsModal } from "@/components";
import { useAppState, useIsMounted } from "@/hooks";
import { createTheme } from "@/theme";

export default function HomePage() {
  const [
    {
      activeBabyInformation,
      babiesInformation,
      babiesMeasurements,
      isDarkMode,
    },
    {
      setActiveBabyInformation,
      setBabiesInformation,
      setIsDarkMode,
      setBabiesMeasumrents,
    },
  ] = useAppState();

  const isMounted = useIsMounted();

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeProvider theme={createTheme(isDarkMode ? "dark" : "light")}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              The Growth App
            </Typography>
            <Stack direction="row" gap={2}>
              <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
              <IconButton
                aria-label="settings"
                disabled={isSettingsOpen}
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings />
              </IconButton>
            </Stack>
          </Stack>
          {activeBabyInformation ? (
            <MeasurementCharts
              activeBabyInformation={activeBabyInformation}
              measurements={babiesMeasurements.filter(
                (measurement) =>
                  activeBabyInformation.id === measurement.babyInformationId,
              )}
              onMeasurementChange={(changedMeasurement) => {
                setBabiesMeasumrents((measurements) => {
                  const existingMeasurementIndex = measurements.findIndex(
                    (measurement) => changedMeasurement.id === measurement.id,
                  );

                  if (existingMeasurementIndex === -1) {
                    return [...measurements, changedMeasurement];
                  }

                  return [
                    ...measurements.slice(0, existingMeasurementIndex),
                    {
                      ...measurements[existingMeasurementIndex],
                      ...changedMeasurement,
                    },
                    ...measurements.slice(existingMeasurementIndex + 1),
                  ];
                });
              }}
              onMeasurementRemoved={(id) => {
                setBabiesMeasumrents((measurements) =>
                  measurements.filter((measurement) => id !== measurement.id),
                );
              }}
            />
          ) : (
            <Typography variant="body2">
              Please add / select a baby from the settings menu
            </Typography>
          )}
        </Container>
        <SettingsModal
          babies={babiesInformation}
          isOpen={isSettingsOpen}
          selected={activeBabyInformation}
          onAdd={(newInfo) =>
            setBabiesInformation((currentInfo) => [...currentInfo, newInfo])
          }
          onClose={() => setIsSettingsOpen(false)}
          onDelete={(id) => {
            setBabiesInformation((currentInfo) =>
              currentInfo.filter((info) => id !== info.id),
            );
            if (id === activeBabyInformation?.id) {
              setActiveBabyInformation(null);
            }
          }}
          onSelect={(id) =>
            setActiveBabyInformation(
              babiesInformation.find((info) => id === info.id) ?? null,
            )
          }
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
