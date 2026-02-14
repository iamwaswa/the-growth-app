import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { type ReactNode, useId } from "react";

/**
 * This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
 */
function SSRInitialFilled(_: BaseNumberField.Root.Props) {
  return null;
}
SSRInitialFilled.muiName = "Input";

type NumberFieldProps = BaseNumberField.Root.Props & {
  error?: boolean;
  fullWidth?: boolean;
  label?: ReactNode;
  size?: "small" | "medium";
};

export function NumberField({
  fullWidth,
  id,
  label,
  error,
  size = "medium",
  ...props
}: NumberFieldProps) {
  let numberFieldLabelId = useId();

  if (id) {
    numberFieldLabelId = id;
  }

  return (
    <BaseNumberField.Root
      {...props}
      render={(props, state) => (
        <FormControl
          error={error}
          disabled={state.disabled}
          fullWidth={fullWidth}
          ref={props.ref}
          required={state.required}
          size={size}
          variant="outlined"
        >
          {props.children}
        </FormControl>
      )}
    >
      <SSRInitialFilled {...props} />
      <InputLabel htmlFor={numberFieldLabelId}>{label}</InputLabel>
      <BaseNumberField.Input
        id={numberFieldLabelId}
        render={(props, state) => (
          <OutlinedInput
            endAdornment={
              <InputAdornment
                position="end"
                sx={{
                  alignSelf: "stretch",
                  borderColor: "divider",
                  borderLeft: "1px solid",
                  flexDirection: "column",
                  maxHeight: "unset",
                  ml: 0,
                  "& button": {
                    borderRadius: 0.5,
                    flex: 1,
                    py: 0,
                  },
                }}
              >
                <BaseNumberField.Increment
                  render={<IconButton aria-label="Increase" size={size} />}
                >
                  <KeyboardArrowUpIcon
                    fontSize={size}
                    sx={{ transform: "translateY(2px)" }}
                  />
                </BaseNumberField.Increment>
                <BaseNumberField.Decrement
                  render={<IconButton aria-label="Decrease" size={size} />}
                >
                  <KeyboardArrowDownIcon
                    fontSize={size}
                    sx={{ transform: "translateY(-2px)" }}
                  />
                </BaseNumberField.Decrement>
              </InputAdornment>
            }
            inputRef={props.ref}
            label={label}
            slotProps={{
              input: props,
            }}
            sx={{ pr: 0 }}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onFocus={props.onFocus}
            onKeyDown={props.onKeyDown}
            onKeyUp={props.onKeyUp}
          />
        )}
      />
    </BaseNumberField.Root>
  );
}
