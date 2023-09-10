import styled from "styled-components";

export const NavigationTop = styled.div`
  height: 50px;
  background-color: #fff;
  color: #333;
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 0 15px;
  box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.25);
  svg {
    cursor: pointer;
  }
`;
export const SideMenu = styled.div`
  position: fixed;
  height: 100vh;
  right: -50vw;
  top: 0;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  width: 50vw;
  background-color: #fff;
  z-index: 1;
  box-shadow: 1px 0px 5px 2px rgba(0,0,0,0.3);
  transition: all 0.2s ease-in-out;
  border-left: 1px solid #ddd;
  opacity: 0;
  &.active {
    opacity: 1;
    right: 0;
    transition: all 0.2s ease-in-out;
  }
  & > div {
    padding: 15px;
  }
  svg {
    cursor: pointer;
  }
  .nav-link-div {
    display: flex;
    flex-direction: column;
    a:not(:last-child) {
      border-bottom: 1px solid #ddd;
    }
    a {
        text-decoration: none;
        color: #333;
        font-size: 18px;
        padding: 5px 0;
    }
  }
`;
