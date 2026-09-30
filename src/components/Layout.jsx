import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ dark, setDark }) {
  const location = useLocation();
  return (
    <div className={`min-h-screen flex flex-col ${dark ? 'dark' : 'light'}`} style={{ background: 'var(--bg-base)', color: 'var(--text-1)' }}>
      <Navbar dark={dark} setDark={setDark} />
      <main key={location.pathname} className="flex-1 page-enter">
        <Outlet context={{ dark, setDark }} />
      </main>
      <Footer dark={dark} />
    </div>
  );
}
