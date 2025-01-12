import PropTypes from "prop-types";
import styles from "./FilePreview.module.css";
import { X } from "lucide-react";
import {
  convertBytesToMegaBytes,
  extractFileType,
  getFileIcon,
} from "../../../../../lib/utils";

const FilePreview = ({ files, onRemove }) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className={styles.filePreview}>
      <ul className="overflow-y-auto max-h-[200px]">
        {files.map((file, index) => {
          const type = extractFileType(file);
          const fileIconSrc = getFileIcon(type);
          return (
            <li key={index}>
              <div className={`${styles.file} relative`}>
                <img className="w-12 h-12" src={fileIconSrc} alt="" />
                <div>
                  <p className={`${styles.fileName} max-w-[90%] overflow-clip`}>
                    {file.name}
                  </p>
                  <p>{convertBytesToMegaBytes(file.size)} MB</p>
                </div>
                <X
                  onClick={() => onRemove(index)}
                  className={styles.XIcon}
                  size={30}
                  color="#65686c"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

FilePreview.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FilePreview;
