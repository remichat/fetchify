import { useState } from 'react';

const useModal = () => {
  const [isShowingModal, setIsShowingModal] = useState(false);

  const toggleModal = () => setIsShowingModal(!isShowingModal)

  const displayModal = () => setIsShowingModal(true)
  
  const hideModal = () => setIsShowingModal(false)

  return {
    isShowingModal,
    toggleModal,
    displayModal,
    hideModal
  }
};

export default useModal;