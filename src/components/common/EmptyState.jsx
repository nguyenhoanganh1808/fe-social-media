import PropTypes from "prop-types";

export default function EmptyState({ title, svg }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-transparent  border-gray-200 rounded-lg p-8">
      {svg}
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        No {title} Found
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Looks like you haven&apos;t added anything yet. Start by creating a new{" "}
        {title}.
      </p>
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  svg: PropTypes.node.isRequired,
};
