// Import necessary libraries and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faMessage, faCalendarCheck, faUser} from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';
import { NavLink} from 'react-router-dom';
import "./navbar.css"

interface NavLinkItem {
  path: string;
  display: string;
}

const navLinks: NavLinkItem[] = [
  {
    path: '/doctor',
    display: 'Dashboard',
  },
  {
    path: '/doctor/bookings',
    display: 'Bookings',
  },
  {
    path: '/doctor/timeslots',
    display: 'Timeslots',
  },
  {
    path: '/doctor/messages',
    display: 'Messages',
  },
  {
    path: '/doctor/profile',
    display: 'Profile',
  },
  {
    path: '/doctor/payments',
    display: 'Payment',
  },
 
];

const DocNavbar: FC = () => {
 
 


  

  return (
    <nav className="sm:w-52 flex justify-center text-gray-300 bg-[#202231]">
      <div className='relative '>
        <ul className="md:flex flex-col text-center items-center top-14 left-0 sm:w-[50%] md:w-[95%]  rounded-md p-4">
          {navLinks.map((link) => (
            <li key={link.path} className="p-2 px-4 rounded-md w-full mb-2 md:mb-7 hover:text-white hover:overline bg-[#171b30]">
              <NavLink to={link.path} className="flex items-center justify-center">
                <span className="hidden md:inline">{link.display}</span>
                <span className="md:hidden p-1 px-2">
                  {link.display === 'Dashboard' && <FontAwesomeIcon icon={faUserDoctor} style={{ color: "#ffffff" }} />}
                  {link.display === 'Patients' && <FontAwesomeIcon icon={faUserDoctor} style={{ color: "#ffffff" }} />}
                  {link.display === 'Bookings' && <FontAwesomeIcon icon={faCalendarCheck} />}
                  {link.display === 'Messages' && <FontAwesomeIcon icon={faMessage} style={{ color: "#f7f7f7" }} />}
                  {link.display === 'Profile' && <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />}
                  {link.display === 'Payments' && <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />}
                
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default DocNavbar;
