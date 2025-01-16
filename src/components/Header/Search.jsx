import useSearch from "../../hooks/useSearch";
import { SearchService } from "../../services/search.service";
import SearchItem from "./SearchItem";

export default function Search() {
  const {
    searchResults,
    searchValue,
    setSearchValue,
    isShowResult,
    setIsShowResult,
  } = useSearch(SearchService.search, { groups: [], users: [], posts: [] });
  return (
    <div className="relative">
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="search"
        placeholder="# Explore"
      />
      {searchValue.length > 0 && isShowResult && (
        <ul className="absolute top-14 w-full bg-white rounded-lg shadow-lg p-3 space-y-3 flex flex-col">
          {searchResults.groups.map((result) => (
            <SearchItem
              onClick={() => setIsShowResult(false)}
              key={result.id}
              imgUrl=""
              title={result.name}
              to={`/groups/${result.id}/`}
            />
          ))}
          {searchResults.users.map((result) => (
            <SearchItem
              onClick={() => setIsShowResult(false)}
              key={result.id}
              imgUrl={
                result.student
                  ? result.student.profile.avatarUrl
                  : result.lecturer
                  ? result.lecturer.profile.avatarUrl
                  : ""
              }
              title={
                result.student
                  ? result.student.profile.nickName
                  : result.lecturer
                  ? result.lecturer.profile.nickName
                  : "admin"
              }
              to={`/profile/${result.id}`}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
