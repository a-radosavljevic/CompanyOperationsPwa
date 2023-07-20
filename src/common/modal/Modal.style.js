import styled from "styled-components";

export const ModalContainer = styled.div`
  .overlay {
    background-color: rgba(0, 0, 0, 0.55);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    display: none;
    z-index: 5;
  }
  
  .overlay.show {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .Modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1200;
    height: auto;
    width: 80vw;
    max-width: 800px;
    background-color: #fff;
    transition: all 0.2s ease-in-out;
    border-radius: 4px;
  }
  
  .Modal.show {
    display: block;
    transition: all 0.2s ease-in-out;
  }

  .modal-body-scroll {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    word-wrap: break-word;
    padding: 15px;
  }
  
  .display-block {
    display: block;
  }
  
  .display-none {
    display: none;
  }

  .modal-header {
    text-align: center;
    margin-bottom: 15px;
    padding: 15px;
  }

  .close-dialog-btn {
    background-color: #fff;
    border: none;
    font-size: 24px;
    display: inline-block;
    margin-top: -10px;
  }

  .service-config.container,
  .container.topic {
    border: 1px solid #b1b1b1;
    border-radius: 4px;
  }
`;