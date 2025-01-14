import { Carousel } from "flowbite-react";
import PropTypes from "prop-types";

export function CarouselComponent({ medias }) {
  return (
    <div onClick={(e) => e.preventDefault()} className="relative w-[100%] h-96">
      <Carousel
        slide={false}
        leftControl={medias.length === 1 && " "}
        rightControl={medias.length === 1 && " "}
        indicators={medias.length === 1 && false}
      >
        {medias.map((media) => {
          if (media.type === "IMAGE") {
            return (
              <img
                className="object-contain w-full h-full"
                key={media.url}
                src={media.url}
                alt=""
              />
            );
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

CarouselComponent.propTypes = {
  medias: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};
