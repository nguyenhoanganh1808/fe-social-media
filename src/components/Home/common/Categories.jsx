import { useCallback } from "react";
import useFetch from "../../../hooks/useFetch";
import { TopicService } from "../../../services/topic.service";
import SpinningContainer from "../../common/SpinningContainer";
import { NavLink } from "react-router-dom";

export default function Categories() {
  const { data: topics, loading } = useFetch(
    useCallback(() => TopicService.getTopics(), [])
  );

  if (loading) return <SpinningContainer />;

  return (
    <div className="flex items-center justify-center py-4 md:py-8 flex-wrap gap-2">
      {topics?.map((topic) => (
        <NavLink
          key={topic.id}
          to={`/posts/filter/${topic.id}`}
          className={({ isActive }) =>
            `bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center ${
              isActive ? "bg-blue-300 dark:bg-blue-500" : ""
            }`
          }
        >
          {topic.name}
        </NavLink>
      ))}
    </div>
  );
}
