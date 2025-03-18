import React, { useState } from "react";
import { Mail, Lock, UserPlus } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"; 
import "./SignupForm.css";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  
  const handleLoginRedirect = (e) => {
    e.preventDefault(); 
    navigate(-1); 
  };

  return (
    <div className="signup-page">
    
      <img src="/assets/pheoinix_logo.png" alt="Logo" className="site-logo" />

      <div className="signup-container">
        <div className="signup-box">
          <h2 className="signup-title">Inscription</h2>
          <div className="signup-form">
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
            <div className="input-group">
              <Lock className="icon" />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>
            <button className="signup-button">
              <UserPlus size={18} /> S'inscrire
            </button>
            <div className="divider">
              <div className="line"></div>
              <span>OU</span>
              <div className="line"></div>
            </div>
            <button className="google-button">
              <FcGoogle size={20} /> S'inscrire avec Google
            </button>
           
            <div className="login-link">
              <span>Vous avez déjà un compte ? </span>
              <a href="/login" onClick={handleLoginRedirect} className="login-text-link">
                Se connecter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
