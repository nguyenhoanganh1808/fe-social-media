import PropTypes from "prop-types";

export default function ImagesGallery({ medias }) {
  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  return medias.map((file, index) => {
    return (
      <div key={index} className="group flex flex-row relative my-2.5">
        <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-wrap items-center justify-center">
          <button
            onClick={() => handleDownload(file.url)}
            data-tooltip-target="download-image"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
          >
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
              />
            </svg>
          </button>
          <div
            id="download-image"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Download image
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>

        {file.type === "IMAGE" ? (
          <img src={file.url} className="rounded-lg" />
        ) : (
          <video
            src={file.url}
            className="h-auto max-w-full rounded-lg"
            controls
          />
        )}
      </div>
    );
  });
}

ImagesGallery.propTypes = {
  medias: PropTypes.array,
};
