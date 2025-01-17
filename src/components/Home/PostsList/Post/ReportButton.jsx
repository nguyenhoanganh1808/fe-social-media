import { Flag } from "lucide-react";
import { ReportModalForm } from "./ReportModalForm";
import useToggle from "../../../../hooks/useToggle";
import PropTypes from "prop-types";

export default function ReportButton({ postId }) {
  const { isOpen, open, close } = useToggle();
  return (
    <>
      <ReportModalForm
        isOpenModal={isOpen}
        onCloseModal={close}
        postId={postId}
      />
      <button
        className="rounded-md hover:rounded-md"
        style={{ color: "black" }}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          open();
        }}
      >
        <Flag />
        Report
      </button>
    </>
  );
}

ReportButton.propTypes = {
  postId: PropTypes.number.isRequired,
};
