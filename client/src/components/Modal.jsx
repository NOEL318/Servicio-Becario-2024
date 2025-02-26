import { CgClose } from "react-icons/cg";

export const Modal = ({
  setshowModal,
  showModal,
  title,
  content,
  action_event_1,
}) => {
  if (showModal == true)
    return (
      <>
        <div className="modal">
          <div className="header">
            <button
              className="button"
              onClick={() => setshowModal(showModal ? false : true)}
            >
              <CgClose size={20} />
            </button>
          </div>
          <div className="form">
            <h1>{title}</h1>
            <form onSubmit={(e) => e.preventDefault()}>{content}</form>
            {action_event_1}
          </div>
        </div>
      </>
    );
};
