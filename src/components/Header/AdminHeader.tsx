
import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import userImg from '../../assets/images/avatar.png';
import Logo from '../../assets/images/Logo.png';
import { BiMenu } from 'react-icons/bi';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NavLinkItem {
  path: string;
  display: string;
}

const navLinks: NavLinkItem[] = [
  {
    path: '/admin',
    display: 'Dashboard',
  },
  {
    path: '/admin/doctors',
    display: 'Doctors',
  },
  {
    path: '/admin/patients',
    display: 'Patients',
  },
  {
    path: '/admin/applications',
    display: 'Applications',
  },
  {
    path: '/admin/payments',
    display: 'Payments',
  },
];

const Adminheader: React.FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [Token, setToken] = useState('');

  const navigate = useNavigate()

  const handlerStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current?.classList.add('sticky_header', "bg-gray-100","bg-opacity-50");
      } else {
        headerRef.current?.classList.remove('sticky_header', "bg-gray-100","bg-opacity-50");
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


  const Logout = () => {

    localStorage.removeItem('token');
    navigate('/login')

  }

  const toggleMenu = () => menuRef.current?.classList.toggle('show_menu');


  return (
    <header className="headers h-24 flex items-center" ref={headerRef}>
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

              <div className='flex items-center'>
                <button className='bg-blue-500 py-1 px-4 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]' onClick={Logout}>Logout</button>
              </div>

            </div>

            {!Token ? (<Link to='/login'>
              <button className='bg-blue-500 py-1 px-4 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>Login</button>
            </Link>) : ("")}
          </div>

          <span className='md:hidden' onClick={toggleMenu}>
            <BiMenu className='w-6 h-6 cursor-pointer' />
          </span>
        </div>
      </div>
    </header>
  )
}

export default Adminheader
