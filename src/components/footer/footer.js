import React from "react";
import Movielogo from "../../images/Movielogo.svg";
import tmdblogo from "../../images/tmdb-logo.svg";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer-main">
      <div className="section-1">
        <div className="footer-header">
          <div>
            <img src={Movielogo} width="40" height="40" alt="" />
          </div>
          <h2>THE MOVIE BASE</h2>
        </div>
        <p>
          Copyright <i className="far fa-copyright fa-sm" />
          2019
        </p>
        <p>Made by Oguz Öztürk</p>
        <div className="social-icons">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://oguzbits.com">
            <i className="fas fa-link" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/oguzbits">
            <i className="fab fa-github" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://stackoverflow.com/story/oguzoeztuerk">
            <i className="fab fa-stack-overflow" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:oguz.oeztuerk@outlook.de">
            <i className="fas fa-envelope" />
          </a>
        </div>
      </div>
      <div className="section-2">
        <header>
          <img
            src={tmdblogo}
            href="https://www.themoviedb.org"
            width="130"
            height="130"
            alt=""
          />
        </header>
        <p>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
        <div className="social-icons">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.themoviedb.org">
            <i className="fas fa-link" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/themoviedb">
            <i className="fab fa-twitter" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/themoviedb">
            <i className="fab fa-facebook" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
