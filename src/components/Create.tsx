import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { generateId } from "../helpers/id-helper";
import { addIframe } from "../state/coreSlice";
import Input from "./Input";
import Popup from "./Popup";

const StyledCreate = styled.div`
  display: flex;
  width: 100%;
`;

interface Props {
  containerId: string;
  iframeId: string;
  position: "left" | "right" | "top" | "bottom";
  show: boolean;
  close?: () => void;
}

const Create = ({ show, close, containerId, position, iframeId }: Props) => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();

  const updateValid = async (url: string) => {
    setValid(url.substring(0, 8) === "https://");
  };

  return (
    <Popup
      show={show}
      close={close}
      action={() => {
        dispatch(
          addIframe({
            containerId,
            iframeId,
            position,
            iframe: {
              type: "iframe",
              id: generateId(),
              url: value,
            },
          })
        );
        if (close) close();
      }}
      header="Enter website url"
      buttonText="Add to dashboard"
      buttonDisabled={!value || !valid}
    >
      <StyledCreate>
        <Input
          value={value}
          update={(value: string) => {
            setValue(value);
            updateValid(value);
          }}
          placeholder="https://chase.manning.dev/"
        />
      </StyledCreate>
    </Popup>
  );
};

export default Create;
