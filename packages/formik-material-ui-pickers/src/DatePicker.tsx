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
  field,
  form: { isSubmitting, touched, errors, status = {}, setFieldValue, setFieldError },
  disabled,
  ...props
}: DatePickerProps): MuiDatePickerProps {
  const fieldError =
    getIn(errors, field.name) || getIn(status.errors, field.name);;
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

export function DatePicker({ children, ...props }: DatePickerProps) {
  return (
    <MuiDatePicker {...fieldToDatePicker(props)}>{children}</MuiDatePicker>
  );
}

DatePicker.displayName = 'FormikMaterialUIDatePicker';
