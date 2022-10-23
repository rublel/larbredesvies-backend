import React from "react";
import "./login.css";
let Login = () => {
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Connection</h3>
            <div className="form-group mt-3">
              <label>Adresse Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Entrez votre Email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Mot de passe</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Entrez votreMot de passe"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                envoyer
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Mot de passe <a href="#">Oublié?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
