import { useState } from 'react';
import './App.css';
import { HomeLayout } from './Components/homeLayout';
import { LoadingScreen } from './Components/loadingScreen';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <HomeLayout />
    </>
  );
}

export default App;
