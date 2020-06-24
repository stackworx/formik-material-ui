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
  field,
  form: { isSubmitting, touched, errors, status = {}, setFieldValue, setFieldError },
  ...props
}: KeyboardDateTimePickerProps): MuiKeyboardDateTimePickerProps {
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
