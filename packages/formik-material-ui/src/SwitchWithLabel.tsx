import * as React from 'react';
import MuiSwitch from '@material-ui/core/Switch';
import FormControlLabel, {
  FormControlLabelProps as MuiFormControlLabelProps,
} from '@material-ui/core/FormControlLabel';
import { FieldProps } from 'formik';

import { SwitchProps, fieldToSwitch } from './Switch';

/**
 * Exclude props that are passed directly to the control
 * https://github.com/mui-org/material-ui/blob/v3.1.1/packages/material-ui/src/FormControlLabel/FormControlLabel.js#L71
 */
export interface SwitchWithLabelProps extends FieldProps, SwitchProps {
  Label: Omit<
    MuiFormControlLabelProps,
    'checked' | 'name' | 'onChange' | 'value' | 'control'
  >;
}

export function SwitchWithLabel<Val = unknown>({
  Label,
  ...props
}: SwitchWithLabelProps) {
  return (
    <FormControlLabel
      control={<MuiSwitch {...fieldToSwitch(props)} />}
      {...Label}
    />
  );
}

SwitchWithLabel.displayName = 'FormikMaterialUISwitchWithLabel';
