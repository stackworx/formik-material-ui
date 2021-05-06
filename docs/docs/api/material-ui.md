---
id: material-ui
title: Material-UI
---

The following props are always excluded: `name, value, error`, and additional ones where it makes sense

## Checkbox

#### Example

```jsx
import { Checkbox } from 'formik-material-ui';

<Field component={Checkbox} type="checkbox" name="checked" />;
```

#### [Material-UI Documentation](https://material-ui.com/api/checkbox/)

## CheckboxWithLabel

A convenience wrapper that adds label to Checkbox using FormControlLabel. Supports all the same properties as Checkbox and accepts an additional `Label` prop, which are props applied to FormControlLabel.

#### Example

```jsx
import { CheckboxWithLabel } from 'formik-material-ui';

<Field
  component={CheckboxWithLabel}
  type="checkbox"
  name="checked"
  Label={{ label: 'Checkbox' }}
/>;
```

#### [Material-UI Documentation](https://material-ui.com/api/form-control-label/)

## InputBase

#### Example

```jsx
import { InputBase } from 'formik-material-ui';

<Field component={InputBase} name="inputBase" />;
```

#### [Material-UI Documentation](https://material-ui.com/api/input-base/)

## RadioGroup

#### Example

```jsx
import { FormControlLabel, Radio, LinearProgress } from '@material-ui/core';
import { Formik, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';

<Formik {...otherProps}>
  {({ isSubmitting }) => (
    <Field component={RadioGroup} name="activity">
      <FormControlLabel
        value="painting"
        control={<Radio disabled={isSubmitting} />}
        label="Painting"
        disabled={isSubmitting}
      />
      <FormControlLabel
        value="drawing"
        control={<Radio disabled={isSubmitting} />}
        label="Drawing"
        disabled={isSubmitting}
      />
      <FormControlLabel
        value="none"
        control={<Radio disabled={isSubmitting} />}
        label="None"
        disabled
      />
    </Field>
  )}
</Formik>;
```

#### [Material-UI Documentation](https://material-ui.com/api/radio-group/#radiogroup-api)

## Select

#### Example

```jsx
import { Field } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { Select } from 'formik-material-ui';

<FormControl>
  <InputLabel htmlFor="age-simple">Age</InputLabel>
  <Field
    component={Select}
    name="age"
    inputProps={{
      id: 'age-simple',
    }}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Field>
</FormControl>;
```

#### [Material-UI Documentation](https://material-ui.com/api/select/)

## SimpleFileUpload

#### Example

```jsx
import { SimpleFileUpload } from 'formik-material-ui';

<Field component={SimpleFileUpload} name="file" label="Simple File Upload" />;
```

#### API

```jsx
interface SimpleFileUploadProps {
  name: string; // Field Name
  label: string; // Field Label
  disabled?: boolean;
  // Customize the Input Component
  InputProps?: Omit<InputProps, 'name' | 'type' | 'label'>;
  // Customize the Input Label Component
  InputLabelProps?: InputLabelProps;
}
```

## Switch

```jsx
import { Switch } from 'formik-material-ui';

{({ values, handleChange }) => (
  <Form>
    <Field component={Switch} type="checkbox" name="initialValueProp" checked={values.initialValueProp} onChange={handleChange} />
  </Form>
)}

```

#### [Material-UI Documentation](https://material-ui.com/api/switch/)

## TextField

#### Example

```jsx
import { TextField } from 'formik-material-ui';

<Field
  component={TextField}
  label="Outlined"
  name="outlined"
  variant="outlined"
  InputProps={{ notched: true }}
/>;
```

#### [Material-UI Documentation](https://material-ui.com/api/text-field/#textfield-api)
