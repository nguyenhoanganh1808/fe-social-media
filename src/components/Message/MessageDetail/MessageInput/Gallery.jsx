import PropTypes from "prop-types";

export default function Gallery({ medias }) {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {medias.map((media, index) => {
        const fileURL = URL.createObjectURL(media);
        return (
          <div className="flex-1 basis-[31%]" key={index}>
            {media.type.startsWith("image/") ? (
              <img
                src={fileURL}
                alt={media.name}
                className="h-auto max-w-full rounded-lg"
              />
            ) : media.type.startsWith("video/") ? (
              <video
                controls
                src={fileURL}
                className="h-auto max-w-full rounded-lg"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

Gallery.propTypes = {
  medias: PropTypes.array.isRequired,
};
