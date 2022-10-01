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

const Content = styled.div`
  position: relative;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  padding-top: 7rem;
`;

const Header = styled.div`
  font-size: 2.4rem;
  font-weight: 600;
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

      <Content>
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
      </Content>
    </StyledPopup>
  );
};

export default Popup;
