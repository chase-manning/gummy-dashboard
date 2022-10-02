import { useState } from "react";
import styled from "styled-components";
import useAddIframe from "../app/add-iframe";
import { generateId } from "../helpers/id-helper";
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
  const addIframe = useAddIframe();

  const updateValid = async (url: string) => {
    setValid(url.substring(0, 8) === "https://");
  };

  return (
    <Popup
      show={show}
      close={close}
      action={() => {
        addIframe(
          containerId,
          iframeId,
          {
            type: "iframe",
            id: generateId(),
            url: value,
          },
          position
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
