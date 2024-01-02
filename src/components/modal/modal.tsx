import { FC, ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
  }

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalClass = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';

  return (
    <div className={`${modalClass} w-full  h-full bg-black backdrop-blur-sm bg-opacity-30`}>
      <div className='bg-white rounded-md w-100'>
        <div className='bg-gray-500 p-2 rounded-md shadow-lg flex justify-end'>
          <button className='text-white pr-3' onClick={onClose}>
            x
          </button>
        </div>
        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
