import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import { action } from '@storybook/addon-actions';

import Wrapper from './Wrapper';
import FormValues from './FormValues';

import {
  Switch,
  SwitchWithLabel,
} from '../packages/formik-material-ui/src/main';
import { Box } from '@material-ui/core';

export default () => (
  <Wrapper title="Switches">
    <Formik
      initialValues={{
        on: true,
        off: false,
        withLabel: false,
        multiple: [],
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          action('submit')(values);
        }, 2000);
      }}
    >
      {({ submitForm, values }) => (
        <Form>
          <Field component={Switch} name="on" type="checkbox" />
          <br />
          <Field component={Switch} name="off" type="checkbox" />
          <br />
          <Field
            component={SwitchWithLabel}
            Label={{ label: 'Switch With Label' }}
            name="withLabel"
            type="checkbox"
          />
          <br />
          <Box>
            <Field
              component={SwitchWithLabel}
              Label={{ label: 'Designer?' }}
              name="multiple"
              value="designer"
              type="checkbox"
            />
            <Field
              component={SwitchWithLabel}
              Label={{ label: 'Developer?' }}
              name="multiple"
              value="developer"
              type="checkbox"
            />
            <Field
              component={SwitchWithLabel}
              Label={{ label: 'Product Manager?' }}
              name="multiple"
              value="product"
              type="checkbox"
            />
          </Box>
          <Button variant="contained" color="primary" onClick={submitForm}>
            Submit
          </Button>
          <br />
          <FormValues values={values} />
        </Form>
      )}
    </Formik>
  </Wrapper>
);
