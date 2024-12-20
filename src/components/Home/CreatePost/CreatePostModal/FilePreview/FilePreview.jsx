import PropTypes from "prop-types";
import styles from "./FilePreview.module.css";
import { File, X } from "lucide-react";
import { convertBytesToMegaBytes } from "../../../../../lib/utils";

const FilePreview = ({ files, onRemove }) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className={styles.filePreview}>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <div className={styles.file}>
              <File size={40} color="red" fill="red" />
              <div>
                <p className={styles.fileName}>{file.name}</p>
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
        ))}
      </ul>
    </div>
  );
};

FilePreview.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FilePreview;
