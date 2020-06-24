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
  field,
  form: { isSubmitting, touched, errors, status = {}, setFieldValue, setFieldError },
  ...props
}: KeyboardDatePickerProps): MuiKeyboardDatePickerProps {
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
    onError: createErrorHandler(fieldError, field.name, setFieldError),
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
