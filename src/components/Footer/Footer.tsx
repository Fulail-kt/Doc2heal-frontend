import { Link } from "react-router-dom"
import logo from '../../assets/images/Logo.png'

const Footer:React.FC=()=> {
  return (
    <div className="bg-gradient-to-r  flex items-center from-blue-300 via-white to-orange-200 w-full h-48">
    <div className="w-[20%] cursor-pointer">
      <Link to='/'><img src={logo} width={200} className="p-3" alt="" /></Link>
    </div>
    <div className="flex w-full justify-center text-base text-gray-600 font-semibold cursor-pointer"> {/* Use flex-grow to make this div take up the remaining space */}
      <ul className="flex space-x-4 w-full justify-evenly ">
        <Link to='services'>
          <li className="">Services</li>
        </Link>
        <Link to='faq'>
          <li className="">FAQ!</li>
        </Link>
        <Link to='contact'>
          <li className="">Contact</li>
        </Link>
        <Link to='about'>
          <li className="">About Us</li>
        </Link>
      </ul>
    </div>
  </div>
  )
}

export default Footer
