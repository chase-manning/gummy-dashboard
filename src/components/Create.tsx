import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addIframe } from "../state/coreSlice";
import Input from "./Input";
import Popup from "./Popup";

const StyledCreate = styled.div`
  display: flex;
  width: 100%;
`;

interface Props {
  show: boolean;
  close?: () => void;
}

const Create = ({ show, close }: Props) => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  return (
    <Popup
      show={show}
      close={close}
      action={() =>
        dispatch(
          addIframe({
            id: Math.round(Math.random() * 10000000000).toString(),
            url: value,
          })
        )
      }
      header="Enter website url"
      buttonText="Add to dashboard"
    >
      <StyledCreate>
        <Input
          value={value}
          update={(value: string) => setValue(value)}
          placeholder="https://chase.manning.dev/"
        />
      </StyledCreate>
    </Popup>
  );
};

export default Create;
