import { Carousel } from "flowbite-react";
import PropTypes from "prop-types";

export function CustomCarousel({ medias }) {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slide={false}>
        {medias.map((media) => {
          if (media.type === "IMAGE") {
            return <img key={media.url} src={media.url} alt="" />;
          } else {
            return (
              <video key={media.url} className="h-full w-full" controls>
                <source src={media.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          }
        })}
      </Carousel>
    </div>
  );
}

CustomCarousel.propTypes = {
  medias: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};
