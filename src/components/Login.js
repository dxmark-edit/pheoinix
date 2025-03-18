import React, { useState } from "react";
import { Mail, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import "./LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="login-page">
    
      <img src="/assets/pheoinix_logo.png" alt="Logo" className="site-logo" />

      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Connexion</h2>
          <div className="login-form">
            <div className="input-group">
              <Mail className="icon" />
              <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <button className="login-button">
              <LogIn size={18} /> Se connecter avec l'email
            </button>
            <div className="divider">
              <div className="line"></div>
              <span>OU</span>
              <div className="line"></div>
            </div>
            <button className="google-button">
              <FcGoogle size={20} /> Se connecter avec Google
            </button>
          
            <div className="signup-link">
              <span>Pas encore de compte ? </span>
              <a href="/signup" className="signup-text-link">S'inscrire</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
