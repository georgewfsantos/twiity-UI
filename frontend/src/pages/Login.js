import React, { useState } from "react";

import "./Login.css";
import twittyLogo from "../assets/twitter.svg";

export default function Login({ history }) {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.length) {
      return;
    }

    localStorage.setItem("@Twitty:username", username);

    history.push("/timeline");
  }
  return (
    <div className="login-wrapper">
      <img src={twittyLogo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
