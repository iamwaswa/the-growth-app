import { Close, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { FormEvent, useId, useState } from "react";
import type { BabyInformation, Gender } from "@/types";

type SettingsModalProps = {
  babies: BabyInformation[];
  isOpen: boolean;
  selected: BabyInformation | null;
  onAdd(info: BabyInformation): void;
  onClose(): void;
  onDelete(id: string): void;
  onSelect(id: string): void;
};

interface AddBabyFormElement extends HTMLFormElement {
  elements: AddBabyFormElementControlsCollection;
}

interface AddBabyFormElementControlsCollection extends HTMLFormControlsCollection {
  dateOfBirth: HTMLInputElement;
  gender: HTMLInputElement;
  name: HTMLInputElement;
}

export function SettingsModal({
  babies,
  isOpen,
  selected,
  onAdd,
  onClose,
  onDelete,
  onSelect,
}: SettingsModalProps) {
  const [formErrors, setFormErrors] = useState<
    Partial<
      Omit<
        Record<keyof AddBabyFormElementControlsCollection, string>,
        "item" | "length" | "namedItem"
      >
    >
  >({});

  const genderFieldLabelId = useId();

  const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    month: "short",
    minute: "2-digit",
    year: "numeric",
  });

  function handleSubmit(event: FormEvent<AddBabyFormElement>): void {
    event.preventDefault();

    setFormErrors({});

    const errors: typeof formErrors = {};

    const dateOfBirth = event.currentTarget.elements.dateOfBirth.value;
    if (!dateOfBirth) {
      errors["dateOfBirth"] = "Missing date of birth";
    }

    const gender = event.currentTarget.elements.gender.value;
    if (gender !== "female" && gender !== "male") {
      errors["gender"] = "Missing gender";
    }

    const name = event.currentTarget.elements.name.value;
    if (!name) {
      errors["name"] = "Missing name";
    }

    if (errors.dateOfBirth || errors.gender || errors.name) {
      setFormErrors((currentFormErrors) => ({
        ...currentFormErrors,
        ...errors,
      }));
      return;
    }

    onAdd({
      id: window.crypto.randomUUID(),
      dateOfBirth: new Date(dateOfBirth).toISOString(),
      gender: gender as Gender,
      name,
    });

    event.currentTarget.reset();
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
          Settings
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Stack gap={2}>
          <List>
            {babies.map((baby) => (
              <ListItem
                key={baby.id}
                secondaryAction={
                  <IconButton
                    aria-label={`Delete ${baby.name}`}
                    onClick={() => onDelete(baby.id)}
                  >
                    <Delete />
                  </IconButton>
                }
                sx={{ px: 0 }}
              >
                <ListItemButton
                  color={selected?.id === baby.id ? "primary" : "default"}
                  selected={selected?.id === baby.id}
                  sx={{ borderRadius: 1 }}
                  onClick={() => onSelect(baby.id)}
                >
                  <ListItemText
                    primary={baby.name}
                    secondary={`${baby.gender[0].toUpperCase()}${baby.gender.slice(1)} • ${dateTimeFormatter.format(
                      new Date(baby.dateOfBirth),
                    )}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Stack component="form" gap={2} onSubmit={handleSubmit}>
            <Box
              component="fieldset"
              sx={{ border: "none", flexGrow: 1, m: 0, p: 0 }}
            >
              <Stack gap={2}>
                <TextField
                  error={Boolean(formErrors.name)}
                  fullWidth={true}
                  helperText={formErrors.name}
                  label="Name"
                  name="name"
                />
                <FormControl error={Boolean(formErrors.dateOfBirth)}>
                  <DateTimePicker
                    disableFuture={true}
                    label="Date of birth"
                    name="dateOfBirth"
                    timeSteps={{ minutes: 1, seconds: 1 }}
                  />
                  {formErrors.dateOfBirth && (
                    <FormHelperText>{formErrors.dateOfBirth}</FormHelperText>
                  )}
                </FormControl>
                <FormControl error={Boolean(formErrors.gender)}>
                  <FormLabel id={genderFieldLabelId}>Gender</FormLabel>
                  <RadioGroup
                    aria-labelledby={genderFieldLabelId}
                    name="gender"
                  >
                    <FormControlLabel
                      control={<Radio size="small" value="female" />}
                      label="Female"
                    />
                    <FormControlLabel
                      control={<Radio size="small" value="male" />}
                      label="Male"
                    />
                  </RadioGroup>
                  {formErrors.gender && (
                    <FormHelperText>{formErrors.gender}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </Box>
            <Button variant="text" type="submit">
              Add
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
