import { ReactNode } from "react";
import styled from "styled-components";
import Button from "./Button";

import exit from "../assets/ui/exit.svg";

const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  position: relative;
  width: 600px;
  padding: 2rem;
  border-radius: 1rem;
  background-color: var(--plain);
  border: 2px solid var(--plain-shadow);
  box-shadow: 0 0.3rem 0 0 var(--plain-shadow);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--plain-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 7rem;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Header = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  position: absolute;
  top: 2rem;
  left: 0rem;
  width: 100%;
  text-align: center;
`;

const ExitButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
`;

const ExitIcon = styled.img`
  height: 1.8rem;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
`;

interface Props {
  children: ReactNode;
  show: boolean;
  close?: () => void;
  action?: () => void;
  buttonText?: string;
  header?: string;
}

const Popup = ({
  children,
  show,
  close,
  action,
  buttonText,
  header,
}: Props) => {
  if (!show) return null;

  return (
    <StyledPopup>
      <Background
        onClick={() => {
          if (close) close();
        }}
      />

      <Container>
        {header && <Header>{header}</Header>}

        {close && (
          <ExitButton onClick={() => close()}>
            <ExitIcon src={exit} alt="Exit icon" />
          </ExitButton>
        )}
        {children}
        {action && (
          <ButtonContainer>
            <Button primary click={action}>
              {buttonText || "Okay"}
            </Button>
          </ButtonContainer>
        )}
      </Container>
    </StyledPopup>
  );
};

export default Popup;
