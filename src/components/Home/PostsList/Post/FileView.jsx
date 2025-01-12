import PropTypes from "prop-types";
import {
  extractFileFromUrlType,
  extractFileType,
  formatSize,
  getFileIcon,
  getFileType,
} from "../../../../lib/utils";

export default function FileView({ file }) {
  const fileSize = formatSize(file.size);

  const fileType = getFileType(file.fileName);

  const handleDownload = () => {
    window.open(file.url, "_blank");
  };

  const type = extractFileFromUrlType(file);
  const fileIconSrc = getFileIcon(type);

  return (
    <div
      onClick={(e) => e.preventDefault()}
      className="flex items-start my-2.5 bg-gray-50 dark:bg-gray-600 rounded-xl p-2 w-fit z-10"
    >
      <div className="me-2">
        <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
          <img className="h-12 w-12" src={fileIconSrc} alt={type} />

          {file.fileName}
        </span>
        <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
          {fileSize}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="self-center"
            width="3"
            height="4"
            viewBox="0 0 3 4"
            fill="none"
          >
            <circle cx="1.5" cy="2" r="1.5" fill="#6B7280" />
          </svg>
          {fileType}
        </span>
      </div>
      <div className="inline-flex self-center items-center">
        <button
          onClick={handleDownload}
          className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-4 h-4 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

FileView.propTypes = {
  file: PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
