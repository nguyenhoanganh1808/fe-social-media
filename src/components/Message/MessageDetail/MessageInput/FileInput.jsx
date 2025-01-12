import { File, Image, Paperclip } from "lucide-react";
import styles from "./MessageInput.module.css";
import { Dropdown } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import AddMediaForm from "./AddMediaForm";
import useToggle from "../../../../hooks/useToggle";
import PropTypes from "prop-types";
export default function FileInput({ setMessageData, receiverId }) {
  const { register, watch, setValue } = useFormContext();
  const { close, isOpen, open } = useToggle();

  const photoOrVideo = watch("photoOrVideo", []);
  const document = watch("document", []);

  return (
    <>
      <AddMediaForm
        isOpenModal={isOpen}
        closeModal={close}
        mediaFiles={photoOrVideo.length > 0 ? photoOrVideo : document}
        type={photoOrVideo.length > 0 ? "media" : "document"}
        receiverId={receiverId}
        setMessageData={setMessageData}
      />
      <Dropdown
        color="null"
        arrowIcon={false}
        label={
          <div className={styles.fileInputLabel}>
            <Paperclip />
          </div>
        }
        placement="top"
      >
        <Dropdown.Item>
          <label
            onClick={(e) => e.stopPropagation()}
            className="flex gap-3 justify-between items-center cursor-pointer w-full"
          >
            <Image />
            <span className="text-sm font-medium text-gray-700">
              Photo or Video
            </span>
            <input
              {...register("photoOrVideo")}
              type="file"
              accept="image/*,video/*"
              name="photoOrVideo"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;

                if (files.length > 0) {
                  setValue("document", []);
                  setValue("photoOrVideo", Array.from(files));
                  open();
                }
              }}
            />
          </label>
        </Dropdown.Item>
        <Dropdown.Item>
          <label
            onClick={(e) => e.stopPropagation()}
            className="flex justify-between items-center cursor-pointer w-full"
          >
            <File />
            <span className="text-sm font-medium text-gray-700">Document</span>
            <input
              {...register("document")}
              name="document"
              multiple
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files.length > 0) {
                  setValue("photoOrVideo", []);

                  setValue("document", Array.from(files));
                  open();
                }
              }}
            />
          </label>
        </Dropdown.Item>
      </Dropdown>
    </>
  );
}

FileInput.propTypes = {
  setMessageData: PropTypes.func.isRequired,
  receiverId: PropTypes.string.isRequired,
};
