import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, children, headerContent}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="fy-modal-overlay"/>
    <div className="fy-modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="fy-modal">
        <div className="fy-modal-close">
          <i className="fas fa-times" onClick={hide}/>
        </div>
        <div className="fy-modal-header mb-3">
          <h4>{headerContent}</h4>
        </div>
        {children}
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;