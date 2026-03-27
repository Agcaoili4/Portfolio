import { useState } from 'react';
import './App.css';
import { HomeLayout } from './Components/homeLayout';
import { LoadingScreen } from './Components/loadingScreen';
import { ThemeProvider } from './Components/ThemeContext';
import { SmoothScroll } from './Components/SmoothScroll';
import { ScrollProgress } from './Components/ScrollProgress';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <SmoothScroll>
        <ScrollProgress />
        <HomeLayout />
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;