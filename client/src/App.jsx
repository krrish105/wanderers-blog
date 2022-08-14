import './App.css';
import { useState, useEffect } from 'react';
import Routers from './components/Routers';

function App() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setUrl('http://127.0.0.1:3001');
    } else {
      setUrl('');
    }
  }, []);

  return (
    <div className="App flex justify-center items-center min-h-screen flex-col">
      <Routers />
    </div>
  );
}

export default App;
