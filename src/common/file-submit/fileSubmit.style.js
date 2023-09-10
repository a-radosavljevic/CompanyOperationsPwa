import styled from "styled-components";

export const FileSubmitContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center
`;

export const FileSubmitLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30vh;
  border: 2px dashed #ccc;
  border-radius: 5px;
  cursor: pointer;

  iframe {
  height: 100%;
  width: 100%;
}
`;