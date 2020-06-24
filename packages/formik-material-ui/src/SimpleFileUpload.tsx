import * as React from 'react';
import { FieldProps, getIn } from 'formik';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import Input, { InputProps } from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

export interface SimpleFileUploadProps extends FieldProps {
  label: string;
  disabled?: boolean;
  InputProps?: Omit<InputProps, 'name' | 'type' | 'label'>;
  InputLabelProps?: InputLabelProps;
  FormControlProps?: FormControlProps;
}

export const SimpleFileUpload = ({
  field,
  form: { isSubmitting, touched, errors, setFieldValue, status = {} },
  label,
  disabled = false,
  InputProps: inputProps,
  InputLabelProps: inputLabelProps,
  FormControlProps: formControlProps,
}: SimpleFileUploadProps) => {
  const error =
    getIn(touched, field.name) &&
    (getIn(errors, field.name) || getIn(status.errors, field.name));

  return (
    <FormControl {...formControlProps}>
      {label && (
        <InputLabel shrink error={!!error} {...inputLabelProps}>
          {label}
        </InputLabel>
      )}
      <Input
        error={!!error}
        inputProps={{
          type: 'file',
          disabled: disabled || isSubmitting,
          name: field.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange: (event: React.ChangeEvent<any>) => {
            if (inputProps?.onChange) {
              inputProps.onChange(event);
            } else {
              const file = event.currentTarget.files[0];
              setFieldValue(field.name, file);
            }
          },
        }}
        {...inputProps}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
};
