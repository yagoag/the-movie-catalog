import React from 'react';
import { Provider } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import SearchStore from '../../store';
import Routes from '../../routes';
import './styles.scss';

const App: React.FC = () => {
  return (
    <Provider store={SearchStore}>
      <SkeletonTheme color="#bdbdbd" highlightColor="#f2f2f2">
        <header className="header">
          <a href="/">
            <h1>The Movie Catalog</h1>
          </a>
        </header>
        <div className="content">
          <Routes />
        </div>
      </SkeletonTheme>
    </Provider>
  );
};

export default App;
