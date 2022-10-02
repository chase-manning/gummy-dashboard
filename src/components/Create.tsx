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

  const transformUrl = (url: string) => {
    if (url.includes("youtu.be")) {
      const id = url.substring(url.lastIndexOf("/") + 1);
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes("youtube.com")) {
      const id = url.substring(url.indexOf("v=") + 2, url.indexOf("&"));
      console.log(id);
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const action = () => {
    addIframe(
      containerId,
      iframeId,
      {
        type: "iframe",
        id: generateId(),
        url: transformUrl(value),
      },
      position
    );
    setValue("");
    setValid(false);
    if (close) close();
  };

  return (
    <Popup
      show={show}
      close={close}
      action={action}
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
          placeholder="e.g. https://chase.manning.dev/"
          action={action}
        />
      </StyledCreate>
    </Popup>
  );
};

export default Create;
