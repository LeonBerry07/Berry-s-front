import "./Login.css";
import React, {
  useState,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useCart } from "../CartContext/CartContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  // Cargar carrito del usuario después del login
  const { loadUserCart } = useCart();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login error");
        return;
      }

      // guardar sesión (NO TOCO TU SISTEMA)
      localStorage.setItem(
        "token",
        data.token
      );
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // contexto global de autenticación
      login(data.user, data.token);

      // cargar el carrito correspondiente a este usuario
      loadUserCart();

      alert("Login successful 🎉");

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  }

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Ingresar
        </button>

        <p>
          Don't have an account?{" "}
          <a href="/register">
            Create one
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;