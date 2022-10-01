import { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
  disabled?: boolean;
  circle?: boolean;
}

const Container = styled.button`
  position: relative;
  cursor: pointer;
  margin-bottom: 4px;

  filter: brightness(1);
  transition: all 0.3s;
  :hover {
    filter: brightness(1.03);
    div:first-child {
    }
    div:last-child {
      transform: translateY(-2px);
    }
  }

  :active {
    div:first-child {
    }
    div:last-child {
      transform: translateY(2px);
    }
  }

  :disabled {
    cursor: not-allowed;
    transform: none;
    filter: saturate(0) brightness(1.1);
  }
`;

const Shadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: translateY(4px);

  border-radius: ${(p: ButtonProps) => {
    if (p.circle) return "50%";
    return "12px";
  }};
  background: ${(p: ButtonProps) => {
    if (p.primary) return "var(--primary-dark)";
    return "var(--border)";
  }};
`;

const StyledButton = styled.div`
  position: relative;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  transform: translateY(0);
  transition: all 0.3s;
  height: 4.8rem;

  width: ${(p: ButtonProps) => {
    if (p.circle) return "5.2rem";
    return "100%";
  }};
  font-size: ${(p: ButtonProps) => {
    if (p.circle) return "2.5rem";
    return "1.7rem";
  }};
  border-radius: ${(p: ButtonProps) => {
    if (p.circle) return "50%";
    return "12px";
  }};
  border: ${(p: ButtonProps) => {
    if (p.primary) return "none";
    return "2px solid var(--border)";
  }};
  border-bottom: none;
  background: ${(p: ButtonProps) => {
    if (p.primary) return "var(--primary)";
    return "var(--bg)";
  }};
  color: ${(p: ButtonProps) => {
    if (p.primary) return "var(--bg)";
    return "var(--sub)";
  }};
`;

interface Props {
  click: () => void;
  primary?: boolean;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
  wide?: boolean;
  circle?: boolean;
}

const Button = ({
  children,
  click,
  primary,
  disabled,
  circle,
}: Props): JSX.Element => {
  return (
    <Container disabled={disabled}>
      <Shadow primary={primary} circle={circle} />
      <StyledButton
        onClick={() => {
          if (!disabled) click();
        }}
        primary={primary}
        circle={circle}
      >
        {children}
      </StyledButton>
    </Container>
  );
};

export default Button;
