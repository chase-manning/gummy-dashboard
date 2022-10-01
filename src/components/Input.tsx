import styled from "styled-components";

const StyledInput = styled.input`
  display: flex;
`;

interface Props {
  value: string;
  setValue: (value: string) => void;
}

const Input = ({ value, setValue }: Props) => {
  return <StyledInput>meow</StyledInput>;
};

export default Input;
