import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import AppProvider from './hooks';

function App() {

  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
