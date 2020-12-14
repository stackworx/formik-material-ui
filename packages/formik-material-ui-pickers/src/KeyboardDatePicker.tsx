import * as React from 'react';
import {
  KeyboardDatePicker as MuiKeyboardDatePicker,
  KeyboardDatePickerProps as MuiKeyboardDatePickerProps,
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';
import { createErrorHandler } from './errorHandler';

export interface KeyboardDatePickerProps
  extends FieldProps,
    Omit<MuiKeyboardDatePickerProps, 'name' | 'value' | 'error'> {}

export function fieldToKeyboardDatePicker({
  disabled,
  field: { onChange: _onChange, onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  onChange,
  onBlur,
  onError,
  helperText,
  ...props
}: KeyboardDatePickerProps): MuiKeyboardDatePickerProps {
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

export function KeyboardDatePicker({
  children,
  ...props
}: KeyboardDatePickerProps) {
  return (
    <MuiKeyboardDatePicker {...fieldToKeyboardDatePicker(props)}>
      {children}
    </MuiKeyboardDatePicker>
  );
}

KeyboardDatePicker.displayName = 'FormikMaterialUIKeyboardDatePicker';
