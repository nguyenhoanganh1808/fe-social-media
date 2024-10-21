import PropTypes from "prop-types";
import { icons } from "lucide-react";

function Icon({ name, color, size }) {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default Icon;
