import useSearch from "../../hooks/useSearch";
import { createUserProfile } from "../../lib/utils";
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
              imgUrl="https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_640.png"
              title={result.name}
              to={`/groups/${result.id}/`}
            />
          ))}
          {searchResults.users.map((result) => {
            const user = createUserProfile(result);
            return (
              <SearchItem
                onClick={() => setIsShowResult(false)}
                key={result.id}
                imgUrl={user.avatarUrl}
                title={user.nickName}
                to={`/profile/${result.id}`}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
