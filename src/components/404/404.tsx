import {FC} from 'react'
import git from '../../assets/images/404.gif'

const NotFound:FC = () => {
  return (
    <div className='w-100 overflow-y-hidden'>
      <img className='w-full h-[600px] bg-cover overflow-hidden' src={git} alt="" />
    </div>
  )
}

export default NotFound
