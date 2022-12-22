import React from "react";
import { Grid, Paper, Button, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import UserApi from "apis/UserApi";

import styles from "./AddUserForm.modules.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const AddUserForm = (props) => {
  // const phoneRegExp = /^[2-9]{2}[0-9]{8}/;
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    idNumber: "",
    address: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phoneNumber: Yup.number()
      .typeError("Enter valid Phone number")
      .required("Required"),
    idNumber: Yup.number()
      .typeError("Enter valid ID number")
      .required("Required"),
    address: Yup.string().required("Required"),
    // phoneNumber: Yup.string()
    //   .matches(phoneRegExp, "Enter valid Phone number")
    //   .required("Required"),
  });
  const onSubmit = (values, props) => {
    // alert(JSON.stringify(values), null, 2);
    console.log(JSON.stringify(values));
    UserApi.postUserData(values);
    props.resetForm();
  };

  const handleCancel = () => {
    props.setOpen(false);
  };

  return (
    <Grid>
      <Paper elevation={0} className={cx("paperStyle")}>
        <Grid align="center">
          <Typography variant="overline">User information</Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form noValidate>
              {/* <TextField label='Name' name="name" fullWidth value={props.values.name}
                    onChange={props.handleChange} /> */}

              <Field
                variant="standard"
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                error={props.errors.name && props.touched.name}
                helperText={<ErrorMessage name="name" />}
                required
              />

              {/* <TextField label='Email' name='email' type='Email' fullWidth 
                    {...props.getFieldProps('email')}/> */}

              <Field
                variant="standard"
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                error={props.errors.email && props.touched.email}
                helperText={<ErrorMessage name="email" />}
                required
              />

              <Field
                variant="standard"
                as={TextField}
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                error={props.errors.phoneNumber && props.touched.phoneNumber}
                helperText={<ErrorMessage name="phoneNumber" />}
                required
              />

              <Field
                variant="standard"
                as={TextField}
                name="idNumber"
                label="ID Number"
                fullWidth
                error={props.errors.idNumber && props.touched.idNumber}
                helperText={<ErrorMessage name="idNumber" />}
                required
              />

              <Field
                variant="standard"
                as={TextField}
                name="address"
                label="Address"
                fullWidth
                error={props.errors.address && props.touched.address}
                helperText={<ErrorMessage name="address" />}
                required
              />

              <div className={cx("btnUserWrapper")}>
                <Button
                  type="submit"
                  className={cx("btnStyle")}
                  variant="contained"
                  color="primary"
                >
                  ADD
                </Button>

                <Button
                  onClick={handleCancel}
                  className={cx("btnStyle")}
                  variant="contained"
                  color="error"
                >
                  CANCEL
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default AddUserForm;
