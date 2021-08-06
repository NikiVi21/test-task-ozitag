import { FC } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path={"/login"} component={Auth} />
      <Route path={"/profile"} component={Profile} />
    </BrowserRouter>
  );
};

export default App;
