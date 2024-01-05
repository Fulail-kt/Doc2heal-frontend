import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faMessage, faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "./navbar.css";

interface NavLinkItem {
  path: string;
  display: string;
}

interface NavbarProps {
  handleLogout: () => void;
}




const navLinks: NavLinkItem[] = [
  {
    path: '/doctors',
    display: 'Doctors',
  },
  {
    path: '/appointments',
    display: 'Appointments',
  },
  {
    path: '/messages',
    display: 'Messages',
  },
  {
    path: '/profile',
    display: 'Profile',
  },
];

const Navbar: FC<NavbarProps> = ({ handleLogout }) => {
  const location = useLocation();

  return (
    <nav className="sm:w-40 text-gray-300">
      <div className='relative'>
        <ul className="md:flex flex-col text-center items-center top-14 left-0 sm:w-[50%] md:w-[95%]   rounded-md p-4">
          {navLinks.map((link) => (
            <li key={link.path} className={`p-2 rounded-md w-full shadow-slate-400 shadow-lg ${link.path === "/profile" ? '' : 'mb-7'} hover:text-[#ffff] bg-[#538deb]`}>
              <NavLink to={link.path} className="flex items-center justify-center">
                <span className="hidden md:inline">{link.display}</span>
                <span className="md:hidden p-1 px-2">
                  {link.display === 'Doctors' && <FontAwesomeIcon icon={faUserDoctor} style={{ color: "#ffffff" }} />}
                  {link.display === 'Appointments' && <FontAwesomeIcon icon={faCalendarCheck} />}
                  {link.display === 'Messages' && <FontAwesomeIcon icon={faMessage} style={{ color: "#f7f7f7" }} />}
                  {link.display === 'Profile' && <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />}
                </span>
              </NavLink>
            </li>
          ))}
          {location.pathname === '/profile' && (
            <li className="p-2  shadow-slate-400 shadow-lg rounded-md w-full mt-7 hover:text-[#ffff] bg-[#538deb]">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
