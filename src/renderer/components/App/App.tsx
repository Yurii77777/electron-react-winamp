import { HashRouter } from 'react-router-dom';

import { Router } from '../../routes/router';
import { AppProvider } from '../../providers/AppProvider';

export const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <AppProvider>
          <main className="h-screen flex flex-col p-1">
            <Router />
          </main>
        </AppProvider>
      </div>
    </HashRouter>
  );
};
