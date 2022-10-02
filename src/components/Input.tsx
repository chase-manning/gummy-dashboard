import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  border-radius: 1rem;
  border: 2px solid var(--plain-shadow);
  box-shadow: 0 0.2rem 0 0 var(--plain-shadow);
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  outline: none;
  color: var(--main);
  width: 100%;

  ::placeholder {
    color: var(--sub);
  }
`;

const Max = styled.button`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--sub);
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5rem;
  border: none;
  margin-top: 0;
  background-color: var(--plain);
  width: 100%;
`;

interface Props {
  value: string;
  update: (value: string) => void;
  placeholder?: string;
  type?: string;
  max?: string;
  action: () => void;
}

const Input = (props: Props) => {
  return (
    <Container>
      <StyledInput
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            props.action();
          }
        }}
        autoFocus
        value={props.value}
        type={props.type || "text"}
        placeholder={props.placeholder}
        onChange={(event) => props.update(event.target.value)}
      />
      {props.max && (
        <Max onClick={() => props.update(props.max || "0")}>max</Max>
      )}
    </Container>
  );
};

export default Input;
