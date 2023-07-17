import styled from "styled-components";

export const LoaderContainer = styled.div`
display: flex;
align-items: flex-end;
justify-content: center;

.loading-spinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #3c8dbc transparent #3c8dbc transparent;
    border-radius: 50%;
    animation: spin-anim 1.2s linear infinite;
}

@keyframes spin-anim {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`