import * as React from 'react';
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
} from '@material-ui/pickers';
import { FieldProps, getIn } from 'formik';
import { createErrorHandler } from './errorHandler';

export interface DateTimePickerProps
  extends FieldProps,
    Omit<MuiDateTimePickerProps, 'name' | 'value' | 'error'> {}

export function fieldToDateTimePicker({
  disabled,
  field: { onChange: _onChange, onBlur: fieldOnBlur, ...field },
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  onChange,
  onBlur,
  onError,
  helperText,
  ...props
}: DateTimePickerProps): MuiDateTimePickerProps {
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

export function DateTimePicker({ children, ...props }: DateTimePickerProps) {
  return (
    <MuiDateTimePicker {...fieldToDateTimePicker(props)}>
      {children}
    </MuiDateTimePicker>
  );
}

DateTimePicker.displayName = 'FormikMaterialUIDateTimePicker';
