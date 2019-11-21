import React from 'react';
import { Link } from 'react-router-dom';
import homeAlone from '../../assets/home-alone.png';
import './styles.scss';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="page-title">
        <h1>Página não encontrada</h1>
      </div>
      <div className="message">
        <img src={homeAlone} alt="Scared Kevin from Home Alone" />
        <div className="content">
          <p>Eita nois, onde eu tô?</p>
          <p>
            Bom, eu devo ficar seguro se <Link to="/">voltar pra casa</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
