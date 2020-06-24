import * as React from 'react';
import {
  TimePicker as MuiTimePicker,
  TimePickerProps as MuiTimePickerProps,
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';

export interface TimePickerProps
  extends FieldProps,
    Omit<MuiTimePickerProps, 'name' | 'value' | 'error'> {}

export function fieldToTimePicker({
  disabled,
  field,
  form: {
    isSubmitting,
    touched,
    errors,
    status = {},
    setFieldValue,
    setFieldError,
  },
  ...props
}: TimePickerProps): MuiTimePickerProps {
  const fieldError =
    getIn(errors, field.name) || getIn(status.errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    ...props,
    ...field,
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    disabled: disabled != undefined ? disabled : isSubmitting,
    onChange(date) {
      props.onChange ? props.onChange(date) : setFieldValue(field.name, date);
    },
    onError(error) {
      if (error !== fieldError && !(error == '' && !fieldError)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore - https://github.com/jaredpalmer/formik/pull/2286
        setFieldError(field.name, error ? String(error) : undefined);
      }
    },
  };
}

export function TimePicker({ children, ...props }: TimePickerProps) {
  return (
    <MuiTimePicker {...fieldToTimePicker(props)}>{children}</MuiTimePicker>
  );
}

TimePicker.displayName = 'FormikMaterialUITimePicker';
