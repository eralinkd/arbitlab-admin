import React, { useState } from "react";

import logo from "../../assets/img/black-logo.svg";
import { postLogin } from "../../api/api";
import styles from "./Login.module.css";
import useStore from "../../state/store";

function Login() {
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const toastrRef = useStore((state) => state.toastrRef);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);

  const validateEmail = (email) => {
    return email.length >= 3;
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    return hasNumber.test(password) && hasLetter.test(password);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (!value) {
      setUsernameError("Введите имя пользователя!");
    } else if (!validateEmail(value)) {
      setUsernameError("Введите корректное имя пользователя!");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const errors = [];
    if (!value) {
      errors.push("Введите пароль! Минимум 8 символов.");
    } else if (value.length < 8) {
      errors.push("Введите корректный пароль! Минимум 8 символов.");
    }
    if (!validatePassword(value)) {
      errors.push("Пароль должен содержать цифру и букву.");
    }
    setPasswordErrors(errors);
  };

  const handleLogin = async () => {
    if (usernameError || passwordErrors.length > 0 || !username || !password) {
      setError("Неверное имя пользователя или пароль.");
      return;
    }

    postLogin(username, password)
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          toastrRef.current.notify("Вход выполнен!", "success");
          const token = data.token;
          if (token) {
            localStorage.setItem("jwtToken", token);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        toastrRef.current.notify("Что-то пошло не так...", "error");
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.head}></div>
      <div className={styles.container}>
        <div className={styles.left}>
          <main className={styles.form}>
            <div className={styles.heading}>
              <img alt="logo" src={logo}></img>
            </div>

            <div className={styles.inputContainer}>
              <label>Имя пользователя</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                aria-required="true"
                aria-invalid={!!usernameError}
              />
              {usernameError && <p className={styles.error}>{usernameError}</p>}
            </div>

            <div className={styles.inputContainer}>
              <label>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                aria-required="true"
                aria-invalid={passwordErrors.length > 0}
              />
              {passwordErrors.map((error, index) => (
                <p className={styles.error}>{error}</p>
              ))}
            </div>

            <div className={styles.inputContainer}>
              <button className={styles.loginButton} onClick={handleLogin}>
                Войти
              </button>
              {error && (
                <p style={{ marginTop: "-12px" }} className={styles.error}>
                  {error}
                </p>
              )}
            </div>
          </main>
        </div>
        <div className={styles.info}>
          <div className={styles.infoContainer}>
            <p className={styles.infoText}>
              <span>A</span>rbitlab
            </p>
            <p className={styles.infoText}>
              A<span>r</span>bitlab
            </p>
            <p className={styles.infoText}>
              Ar<span>b</span>itlab
            </p>
            <p className={styles.infoText}>
              Arb<span>i</span>tlab
            </p>
            <p className={styles.infoText}>
              Arbi<span>t</span>lab
            </p>
            <p className={styles.infoText}>
              Arbit<span>l</span>ab
            </p>
            <p className={styles.infoText}>
              Arbitl<span>a</span>b
            </p>
            <p className={styles.infoText}>
              Arbitla<span>b</span>
            </p>

            <div className={styles.line}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
