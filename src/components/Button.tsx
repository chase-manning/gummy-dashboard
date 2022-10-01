import { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
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
    opacity: 0.5;
    transform: none;
  }
`;

const Shadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
  transform: translateY(4px);

  background: ${(p: ButtonProps) => {
    if (p.primary) return "var(--primary-dark)";
    return "var(--border)";
  }};
`;

const StyledButton = styled.div`
  position: relative;
  padding: 0 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  height: 4.8rem;
  transform: translateY(0);
  transition: all 0.3s;

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
}

const Button = ({ children, click, primary }: Props): JSX.Element => {
  return (
    <Container>
      <Shadow primary={primary} />
      <StyledButton onClick={() => click()} primary={primary}>
        {children}
      </StyledButton>
    </Container>
  );
};

export default Button;
