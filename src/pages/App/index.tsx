import React from 'react';
import Routes from '../../routes';
import './styles.scss';

const App: React.FC = () => {
  return (
    <div>
      <header className="header">
        <h1>The Movie Catalog</h1>
      </header>
      <div className="content">
        <Routes />
      </div>
    </div>
  );
};

export default App;
