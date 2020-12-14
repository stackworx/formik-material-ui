import * as React from 'react';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';
import { createErrorHandler } from './errorHandler';

export interface DatePickerProps
  extends FieldProps,
    Omit<MuiDatePickerProps, 'name' | 'value' | 'error'> {}

export function fieldToDatePicker({
  field: { onChange: _onChange, onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  disabled,
  onChange,
  onBlur,
  onError,
  helperText,
  ...props
}: DatePickerProps): MuiDatePickerProps {
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

export function DatePicker({ children, ...props }: DatePickerProps) {
  return (
    <MuiDatePicker {...fieldToDatePicker(props)}>{children}</MuiDatePicker>
  );
}

DatePicker.displayName = 'FormikMaterialUIDatePicker';
