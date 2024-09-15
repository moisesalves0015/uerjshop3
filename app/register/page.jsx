"use client";

import "@styles/Register.scss";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [passwordMatch, setPasswordMatch] = useState(true); // Estado para verificação de senha
  const [passwordTouched, setPasswordTouched] = useState(false); // Estado para saber se a confirmação de senha foi tocada
  const router = useRouter();

  // Validação de senha
  useEffect(() => {
    if (passwordTouched) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword, passwordTouched]);

  // Função para capturar mudanças nos campos de formulário
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação da imagem
    if (!formData.profileImage) {
      alert("Por favor, carregue uma foto de perfil.");
      return;
    }

    if (!passwordMatch) {
      alert("As senhas não correspondem!");
      return;
    }

    try {
      const registerForm = new FormData();

      // Adiciona os campos do formulário no FormData
      for (const key in formData) {
        registerForm.append(key, formData[key]);
      }

      // Envia a requisição POST para a API de registro
      const response = await fetch("/api/register/", {
        method: "POST",
        body: registerForm,
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona o usuário para a página de login se o registro for bem-sucedido
        router.push("/login");
      } else if (response.status === 409) {
        // Captura o erro de conflito (email já registrado)
        alert("Este email já está registrado. Tente fazer login.");
      } else {
        // Outros erros
        alert(data.message || "Erro ao registrar. Tente novamente.");
      }
    } catch (err) {
      // Erro ao fazer a requisição
      console.error("Erro no registro", err.message);
      alert("Erro no servidor. Tente novamente mais tarde.");
    }
  };

  // Função para login com Google
  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="register">
      <img src="../public/uploads/uerj-3-1000x580.jpg" alt="register" className="register_decor" />
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Nome"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirma Senha"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              setPasswordTouched(true); // Marca que a confirmação de senha foi tocada
            }}
            required
          />

          {/* Mensagem de erro de senha não correspondente */}
          {!passwordMatch && passwordTouched && (
            <p style={{ color: "red" }}>As senhas não correspondem!</p>
          )}

          {/* Upload de imagem de perfil */}
          <input
            id="image"
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile" />
            <p>Carregar Foto de Perfil</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}

          {/* Botão de envio */}
          <button type="submit" disabled={!passwordMatch}>
            Registrar
          </button>
        </form>

        {/* Botão de login com Google */}
        <button type="button" onClick={loginWithGoogle} className="google">
          <p>Cadastrar com o Google</p>
          <FcGoogle />
        </button>
        <a href="/login">Já possui uma conta? Faça o login aqui.</a>
      </div>
    </div>
  );
};

export default Register;
