import React, { useState } from "react";
import { Informer } from "@consta/uikit/Informer";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../services/token";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserToken = async (username, password) => {
    const loginResponse = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    });

    if (!loginResponse.ok) {
      throw new Error("Данного пользователя нет в системе!");
    }

    return (await loginResponse.json()).accessToken;
  };

  const onFormSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const token = await fetchUserToken(username, password);
      saveToken(token);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={onFormSubmit} style={{ width: "30vw" }}>
      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="username" style={{ display: "block", marginBottom: "8px" }}>
          Логин:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "10px" }}
          placeholder="Введите логин"
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "8px" }}>
          Пароль:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "10px" }}
          placeholder="Введите пароль"
        />
      </div>

      {error && (
        <div style={{ marginBottom: "16px" }}>
          <Informer status="alert" view="filled" title="Ошибка" label={error} />
        </div>
      )}

      <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "white",
            border: "solid 2px black",
            padding: "8px 16px",
            borderRadius: "5px",
          }}
        >
          Вход
        </button>
      </div>
    </form>
  );
};

export default AuthPage;
