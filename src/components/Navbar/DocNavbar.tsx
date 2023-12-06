// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserDoctor,faMessage,faCalendarCheck,faUser } from '@fortawesome/free-solid-svg-icons';
// import { FC } from 'react';




// const Navbar: FC = () => {
//   return (
//     <nav className="sm:w-40 text-white">
//       <div className='relative'>
//         <ul className="md:flex flex-col text-center items-center top-14 left-0 sm:w-[50%] md:w-[95%]  rounded-md p-4">
//           <li className="p-2 rounded-md w-full mb-2 md:mb-7 bg-[#3b82f6] hover:text-[#ffff] hover:bg-[#8fa3c4]">
//             <span className="hidden md:inline">Doctors</span>
//             <span className="md:hidden p-1">
//               <FontAwesomeIcon icon={faUserDoctor} style={{ color: "#ffffff" }} />
//             </span>
//           </li>
//           <li className="p-2 rounded-md w-full mb-2 md:mb-7 bg-[#8fa3c4] hover:text-[#fff] hover:bg-[#3b82f6]">
//             <span className="hidden md:inline">Appointments</span>
            
//             <span className="md:hidden p-1"><FontAwesomeIcon icon={faCalendarCheck} /></span>
//           </li>
//           <li className="p-2 rounded-md w-full mb-2 md:mb-7 bg-[#8fa3c4] hover:text-[#fff] hover:bg-[#3b82f6]">
//             <span className="hidden md:inline">Messages</span>
            
//             <span className="md:hidden p-1">
//             <FontAwesomeIcon icon={faMessage} style={{color: "#f7f7f7",}} />
//             </span>
//           </li>
//           <li className="p-2 rounded-md w-full bg-[#8fa3c4] hover:text-[#fff] hover:bg-[#3b82f6]">
//             <span className="hidden md:inline">Profile</span>
//             <span className="md:hidden p-1"><FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} /></span>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faMessage, faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';
import { NavLink} from 'react-router-dom';
import "./navbar.css"

interface NavLinkItem {
  path: string;
  display: string;
}

const navLinks: NavLinkItem[] = [
    {
        path: '/dashboard',
        display: 'Dashboard',
    },

  {
    path: '/patients',
    display: 'Patients',
  },
  {
    path: '/bookings',
    display: 'Bookings',
  },
  {
    path: '/messages',
    display: 'Messages',
  },
  {
    path: '/profile',
    display: 'Profile',
  },
  {
    path: '/payments',
    display: 'Payment',
  },
];

const DocNavbar: FC = () => {



  return (
    <nav className="sm:w-40 text-gray-300">
      <div className='relative'>
        <ul className="md:flex flex-col text-center items-center top-14 left-0 sm:w-[50%] md:w-[95%]  rounded-md p-4">
          {navLinks.map((link) => (
            <li key={link.path} className="p-2 rounded-md w-full mb-2 md:mb-7 hover:text-[#ffff] bg-[#538deb]">
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


