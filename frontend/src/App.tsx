import { BrowserRouter as Router } from 'react-router-dom';

import { GlobalStyle } from './styles/global';

import { AppProvider } from './hooks';

import Routes from './routes';

function App() {
  return (
    <Router forceRefresh>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
}

export default App;
