import * as React from 'react';
import {
  KeyboardDateTimePicker as MuiKeyboardDateTimePicker,
  KeyboardDateTimePickerProps as MuiKeyboardDateTimePickerProps,
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';
import { createErrorHandler } from './errorHandler';

export interface KeyboardDateTimePickerProps
  extends FieldProps,
    Omit<MuiKeyboardDateTimePickerProps, 'name' | 'value' | 'error'> {}

export function fieldToKeyboardDateTimePicker({
  disabled,
  field: { onChange: _onChange, onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  onChange,
  onBlur,
  onError,
  helperText,
  ...props
}: KeyboardDateTimePickerProps): MuiKeyboardDateTimePickerProps {
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

export function KeyboardDateTimePicker({
  children,
  ...props
}: KeyboardDateTimePickerProps) {
  return (
    <MuiKeyboardDateTimePicker {...fieldToKeyboardDateTimePicker(props)}>
      {children}
    </MuiKeyboardDateTimePicker>
  );
}

KeyboardDateTimePicker.displayName = 'FormikMaterialUIKeyboardDateTimePicker';
