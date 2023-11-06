import { useState } from "react";
import Modal from "./components/Modal.tsx";

// eslint-disable-next-line react-refresh/only-export-components
export enum Title {
  Warning = "Warning",
  Info = "Info",
}
const App = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible ? (
        <Modal
          type={Title.Warning}
          message="This is info message."
          isOpen
          onClose={handleCloseModal}
          onBtnOk={handleOk}
          timeout={5}
        />
      ) : null}
    </>
  );
};

export default App;
