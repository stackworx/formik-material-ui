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
}: KeyboardTimePickerProps): MuiKeyboardTimePickerProps {
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
      setFieldValue(field.name, date);
    },
    onError: createErrorHandler(fieldError, field.name, setFieldError),
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
