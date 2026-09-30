import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout   from './components/Layout';
import Home      from './pages/Home';
import Technology from './pages/Technology';
import Mission   from './pages/Mission';
import Scenarios from './pages/Scenarios';
import Dashboard from './pages/Dashboard';
import About     from './pages/About';

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('drishti-theme');
    return stored !== null ? stored === 'dark' : true; // default: dark
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (dark) {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      body.classList.add('light');
      body.classList.remove('dark');
    }
    localStorage.setItem('drishti-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return [dark, setDark];
}

export default function App() {
  const [dark, setDark] = useDarkMode();
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout dark={dark} setDark={setDark} />}>
          <Route index         element={<Home dark={dark} />} />
          <Route path="technology" element={<Technology dark={dark} />} />
          <Route path="mission"    element={<Mission dark={dark} />} />
          <Route path="scenarios"  element={<Scenarios dark={dark} />} />
          <Route path="dashboard"  element={<Dashboard dark={dark} />} />
          <Route path="about"      element={<About dark={dark} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
