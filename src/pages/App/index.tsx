import React from 'react';
import { Provider } from 'react-redux';
import SearchStore from '../../store';
import Routes from '../../routes';
import './styles.scss';

const App: React.FC = () => {
  return (
    <Provider store={SearchStore}>
      <div>
        <header className="header">
          <a href="/">
            <h1>The Movie Catalog</h1>
          </a>
        </header>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Provider>
  );
};

export default App;
