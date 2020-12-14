import * as React from 'react';
import {
  KeyboardTimePicker as MuiKeyboardTimePicker,
  KeyboardTimePickerProps as MuiKeyboardTimePickerProps,
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';
import { createErrorHandler } from './errorHandler';

export interface KeyboardTimePickerProps
  extends FieldProps,
    Omit<MuiKeyboardTimePickerProps, 'name' | 'value' | 'error'> {}

export function fieldToKeyboardTimePicker({
  disabled,
  field: { onChange: _onChange, onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  onChange,
  onBlur,
  onError,
  helperText,
  ...props
}: KeyboardTimePickerProps): MuiKeyboardTimePickerProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    error: showError,
    helperText: showError ? fieldError : helperText,
    disabled: disabled != undefined ? disabled : isSubmitting,
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

export function KeyboardTimePicker({
  children,
  ...props
}: KeyboardTimePickerProps) {
  return (
    <MuiKeyboardTimePicker {...fieldToKeyboardTimePicker(props)}>
      {children}
    </MuiKeyboardTimePicker>
  );
}

KeyboardTimePicker.displayName = 'FormikMaterialUIKeyboardTimePicker';
