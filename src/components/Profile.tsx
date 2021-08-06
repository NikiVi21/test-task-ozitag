import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import style from "./Profile.module.css";
import Button from "@material-ui/core/Button";
import { StateType } from "../redux/store";

const Profile: React.FC = () => {
  const isAuth = useSelector((state: StateType) => state.Auth.isAuth);
  const name = useSelector((state: StateType) => state.Auth.name);
  const email = useSelector((state: StateType) => state.Auth.email);

  return !isAuth ? (
    <Redirect to="/login" />
  ) : (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div>Name: {name}</div>
        <div>Email: {email}</div>
        <Button href="" color="primary" variant="contained" type="logout">
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default Profile;
