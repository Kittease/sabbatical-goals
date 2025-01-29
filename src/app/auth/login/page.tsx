"use client";

import { loginWithGoogle } from "./actions";

const LoginPage = () => {
  return (
    <button onClick={loginWithGoogle} type="button">
      Se connecter via Google
    </button>
  );
};

export default LoginPage;
