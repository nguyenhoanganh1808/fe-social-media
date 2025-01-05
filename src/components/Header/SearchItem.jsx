import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";

export default function SearchItem({ title, imgUrl, to, onClick }) {
  return (
    <Link onClick={onClick} to={to}>
      <div className="flex items-center space-x-2">
        <Avatar src={imgUrl} alt="" size={30} />
        <span>{title}</span>
      </div>
    </Link>
  );
}

SearchItem.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
