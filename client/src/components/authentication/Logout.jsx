import { useState } from "react";
import { GoSignOut } from "react-icons/go";
import Modal from "../Modal";
import { useLogout } from "../../queries/useLogout";

function Logout() {
  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  const { isLoading, logout } = useLogout();
  return (
    <>
      <button className="logout" onClick={openModal}>
        <GoSignOut />
        <span>Logout</span>
      </button>
      {modal && (
        <Modal
          name="Logout"
          closeModal={closeModal}
          callback={logout}
          loading={isLoading}
        />
      )}
    </>
  );
}

export default Logout;
