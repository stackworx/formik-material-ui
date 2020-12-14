import * as React from 'react';
import {
  TimePicker as MuiTimePicker,
  TimePickerProps as MuiTimePickerProps,
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';
import { createErrorHandler } from './errorHandler';

export interface TimePickerProps
  extends FieldProps,
    Omit<MuiTimePickerProps, 'name' | 'value' | 'error'> {}

export function fieldToTimePicker({
  disabled,
  field: { onChange: _onChange, onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  onChange,
  onBlur,
  onError,
  helperText,
  ...props
}: TimePickerProps): MuiTimePickerProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    error: showError,
    helperText: showError ? fieldError : helperText,
    disabled: disabled ?? isSubmitting,
    onChange:
      onChange ??
      function (date) {
        setFieldValue(field.name, date);
      },
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    onError:
      onError ?? createErrorHandler(fieldError, field.name, setFieldError),
    ...field,
    ...props,
  };
}

export function TimePicker({ children, ...props }: TimePickerProps) {
  return (
    <MuiTimePicker {...fieldToTimePicker(props)}>{children}</MuiTimePicker>
  );
}

TimePicker.displayName = 'FormikMaterialUITimePicker';
