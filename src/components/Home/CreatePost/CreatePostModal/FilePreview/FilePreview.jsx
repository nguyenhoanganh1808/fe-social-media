import PropTypes from "prop-types";
import styles from "./FilePreview.module.css";
import { X } from "lucide-react";
import {
  extractFileType,
  formatFileSize,
  getFileIcon,
} from "../../../../../lib/utils";

const FilePreview = ({ files, onRemove }) => {
  if (!files || files.length === 0) {
    return <p>No files to preview.</p>;
  }

  const filesArray = files instanceof FileList ? Array.from(files) : files;

  return (
    <div className={styles.filePreview}>
      <ul className="overflow-y-auto max-h-[200px]">
        {filesArray.map((file, index) => {
          console.log("g: ", files);
          const type = extractFileType(file);
          const fileIconSrc = getFileIcon(type);
          return (
            <li key={index}>
              <div className={`${styles.file} relative`}>
                <img className="w-12 h-12" src={fileIconSrc} alt="" />
                <div>
                  <p
                    className={`${styles.fileName} max-w-[100%] overflow-clip`}
                  >
                    {file.name}
                  </p>
                  <p>{formatFileSize(file.size)}</p>
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
