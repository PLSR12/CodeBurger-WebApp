import ReactModal from "react-modal";

import { Button, ButtonsArea, Text, Title } from "./styles";

export function Modal({
  isOpen,
  onRequestClose,
  ariaHideApp,
  title,
  text,
  handleNo,
  textNo,
  handleYes,
  textYes,
}) {
  return (
    <ReactModal
      style={{
        overlay: {},
        content: { inset: "30%", minHeight: "max-content", height: "250px" },
      }}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={ariaHideApp}
      data-testeid="pure_modal"
    >
      <Title>{title}</Title>
      <Text>{text}</Text>
      <ButtonsArea>
        <Button type="button" onClick={() => handleNo()}>
          {textNo}
        </Button>
        <Button type="button" onClick={() => handleYes()}>
          {textYes}
        </Button>
      </ButtonsArea>
    </ReactModal>
  );
}
