import styled from "styled-components";
import Popup from "./Popup";

const StyledCreate = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid var(--border);
`;

interface Props {
  show: boolean;
  close?: () => void;
}

const Create = ({ show, close }: Props) => {
  return (
    <Popup
      show={show}
      close={close}
      action={() => console.log("meow")}
      header="Enter url"
    >
      <StyledCreate>meow</StyledCreate>
    </Popup>
  );
};

export default Create;
