"use client";

import "@styles/Login.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (response.ok) {
        router.push("/")
      }

      if (response.error) {
        setError("E-mail ou senha incorretos. Tente novamente.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="login">
      <img src="/assets/login.jpg" alt="login" className="login_decor" />
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Senha"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Fazer login</button>
        </form>
        <button className="google" onClick={loginWithGoogle}>
          <p>Fazer login com o Google  </p>
          <FcGoogle />
        </button>
        <a href="/register">Não possui uma conta? Cadastre-se aqui.</a>
      </div>
    </div>
  );
};

export default Login;