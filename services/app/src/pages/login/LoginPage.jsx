import React from "react";
import {useNavigate, Navigate} from "react-router";
import {useUserFromLocalStorage} from "../../hooks/useUserFromLocalStorage";

const LoginPage = () => {

    const navigate = useNavigate();
    const {authentication} = useUserFromLocalStorage();
    const navigateUrl = "/game/test"

    const submitInfo = (event) => {
        event.preventDefault();
        window.localStorage.setItem('user', event.target.username.value);
        navigate(navigateUrl);
    };

    return authentication ? (<Navigate to={navigateUrl} />) : (
      <div>
        <div>Enter your name</div>
        <form onSubmit={(event) => submitInfo(event)}>
          <input type="text" name="username" />
          <button type="submit">Enter Game</button>
        </form>
      </div>
    );
}

export default LoginPage;