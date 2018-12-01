import React, { Component } from 'react';
import isNil from 'lodash/fp/isNil';

// Declaration of the component as React Class Component
class FormModal extends Component {
  
  // Init of the component before it is mounted.
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  
  // Add listeners immediately after the component is mounted.
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  // Remove listeners immediately before a component is unmounted and destroyed.
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }
  
  // Handle the key press event.
  handleKeyUp(e) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }
  
  // Handle the mouse click on browser window.
  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }
  
  // Render the component passing onCloseRequest and children as props.
  render () {
    const {
      onCloseRequest,
      children,
    } = this.props;
    
    return (
      <div className="modalOverlay">
        <div
          className="modal"
          ref={node => (this.modal = node)}
        >
          <div className="modalContent">
            {children}
          </div>
        </div>

        <button
          type="button"
          className="closeButton"
          onClick={onCloseRequest}
        />
      </div>
    );
  }
}

// Export the component to use it in other components.
export default FormModal;