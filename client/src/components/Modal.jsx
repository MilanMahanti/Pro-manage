import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import SpinnerMini from "./SpinnerMini";

function Modal({ callback, name, closeModal, loading }) {
  const { ref } = useOutsideClick(closeModal);
  return createPortal(
    <div className={styles.overlay}>
      <div ref={ref} className={styles.modal}>
        <p>{`Are you sure you want to ${name}? `}</p>
        <button onClick={callback} className="btn primary" disabled={loading}>
          {loading ? <SpinnerMini /> : `Yes, ${name}`}
        </button>
        <button onClick={closeModal} className="btn cancel" disabled={loading}>
          Cancel
        </button>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
