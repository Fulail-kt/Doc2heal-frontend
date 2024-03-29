import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import userImg from '../../assets/images/avatar.png';
import Logo from '../../assets/images/Logo.png';
import { BiMenu } from 'react-icons/bi';

interface NavLinkItem {
  path: string;
  display: string;
}

const navLinks: NavLinkItem[] = [
  {
    path: '/',
    display: 'Home',
  },
  {
    path: '/doctors',
    display: 'Find Doctors',
  },
  {
    path: '/services',
    display: 'Services',
  },
  {
    path: '/about-us',
    display: 'About Us',
  },
];

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [Token, setToken] = useState('');

  const location = useLocation()
  const handlerStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current?.classList.add('sticky_header');
      } else {
        headerRef.current?.classList.remove('sticky_header');
      }
    });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    handlerStickyHeader();
    return () => {
      window.removeEventListener('scroll', handlerStickyHeader);
    };
  }, [Token]);


  const toggleMenu = () => menuRef.current?.classList.toggle('show_menu');


  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ===================LOGO================= */}
          <div className='w-[160px]'>
            <img src={Logo} alt="LOGO" />
          </div>


          {/* =================== MENU ============== */}

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {
                navLinks.map((link, index) => <li key={index}>
                  <NavLink to={link.path} className={navClass => navClass.isActive ? "text-blue-500 text-[16px] leading-7 font-[600]" : 'text-slate-600 text-[16px] leading-7 font-[500] hover:text-blue-500'}>{link.display}</NavLink>
                </li>)
              }
            </ul>
          </div>

          {/* ============== nav right================ */}
          <div className="flex items-center gap-4">

            <div className={!Token ? 'hidden' : ''}>
              <Link to='/profile'>
                <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                  <img src={userImg} className='w-full rounded-full' alt="" />
                </figure>
              </Link>
            </div>

            {!Token ? (
              location.pathname === "/login" ? (
                <Link to="/signup">
                  <button className="bg-blue-500 py-2 px-6 text-white font-semibold h-10 flex items-center justify-center rounded-full">
                    Signup
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="bg-blue-500 py-2 px-6 text-white font-semibold h-10 flex items-center justify-center rounded-full">
                    Login
                  </button>
                </Link>
              )
            ) : null}

          </div>
          <span className='md:hidden' onClick={toggleMenu}>
            <BiMenu className='w-6 h-6 cursor-pointer' />
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
