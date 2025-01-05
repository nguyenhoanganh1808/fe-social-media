import PropTypes from "prop-types";

export default function AvatarList({ members }) {
  return (
    <ul className="flex -space-x-4 rtl:space-x-reverse">
      {members.map((member) => (
        <li key={member.id}>
          <img
            key={member.id}
            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
            src={member.avatarUrl}
            alt=""
          />
        </li>
      ))}
    </ul>
  );
}

AvatarList.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    })
  ),
};
