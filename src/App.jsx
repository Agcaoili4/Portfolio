import { useState } from 'react';
import './App.css';
import { HomeLayout } from './Components/homeLayout';
import { LoadingScreen } from './Components/loadingScreen';
import { ThemeProvider } from './Components/ThemeContext';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <HomeLayout />
    </ThemeProvider>
  );
}

export default App;
