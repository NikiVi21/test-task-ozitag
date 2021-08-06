import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import style from "./Auth.module.css";
import { getLoginThunk } from "../redux/authReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { StateType } from "../redux/store";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

type PropsType = {
  isAuth: boolean;
  isError: boolean;
  errorMessage: string | null;
  getLoginThunk: (
    clientId: number | null,
    email: string,
    password: string
  ) => void;
};

const Auth: React.FC<PropsType> = (props) => {
  const formik = useFormik({
    initialValues: {
      clientId: null,
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let clientId;
      clientId = clientId ?? 1;
      props.getLoginThunk(clientId, values.email, values.password);
    },
  });

  return props.isAuth ? (
    <Redirect to="/profile" />
  ) : (
    <div className={style.wrapper}>
      <form className={style.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {props.isError && <div>{props.errorMessage} </div>}
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

let mapStateToProps = (state: StateType) => ({
  isAuth: state.Auth.isAuth,
  isError: state.Auth.isError,
  errorMessage: state.Auth.errorMessage,
});

export default compose(connect(mapStateToProps, { getLoginThunk }))(Auth);
