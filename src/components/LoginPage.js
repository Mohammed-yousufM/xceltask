import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function LoginPage(props) {
  let history = useHistory();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [logError, setLogError] = useState("");

  const newAxios = axios.create({
    baseURL: "http://15.206.118.222:5000/admin",
  });

  const userIDAreaUpdate = (e) => {
    setUserID(e.target.value);
  };

  const passwAreaUpdate = (e) => {
    setPassword(e.target.value);
  };

  const authFunc = async () => {
    try {
      const response = await newAxios.post("/auth/login", {
        username: userID,
        password: password,
      });

      if (response.status === 200) {
        await localStorage.setItem("jwtSecret", response.data.token);
        history.push("/FirstScreen");
      }
    } catch (error) {
      setLogError("Please provide valid login details");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <section className="text-center">
        <h1 className="text-primary" aria-describedby="subHeader">
          Please Log-IN to continue.
        </h1>
      </section>

      <form>
        <div className="form-group">
          <label htmlFor="userID">UserName:</label>
          <input
            type="text"
            name="userID"
            id="userID"
            className="form-control"
            placeholder="Enter your Username"
            aria-describedby="usenameHelp"
            value={userID}
            onChange={userIDAreaUpdate}
          ></input>
          <small id="usenameHelp" className="form-text text-muted">
            This field is case sensitive
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your Password"
            aria-describedby="passwordHelp"
            value={password}
            onChange={passwAreaUpdate}
          ></input>
          <small id="passwordHelp" className="form-text text-muted">
            This field is case sensitive
          </small>
        </div>

        <div className="form-group">
          <button
            id="startExam"
            type="button"
            className="btn btn-info"
            onClick={authFunc}
          >
            Login
          </button>
        </div>
      </form>
      <p style={{ color: "red" }}>{logError}</p>
    </div>
  );
}

export default LoginPage;
