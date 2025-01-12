import PropTypes from "prop-types";
import {
  extractFileType,
  formatSize,
  getFileIcon,
} from "../../../../lib/utils";

export default function FileList({ files }) {
  return (
    <ul className="space-y-3 overflow-y-auto">
      {files.map((file, index) => {
        const type = extractFileType(file);
        const fileIconSrc = getFileIcon(type);
        return (
          <li className="flex text-base gap-3" key={index}>
            <img className="h-12 w-12" src={fileIconSrc} alt={type} />
            <div className="max-w-sm">
              <p className="overflow-hidden">{file.name}</p>
              <p className="text-gray-400 text-sm">{formatSize(file.size)}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
};
