import styles from "./Header.module.css";
import Tab from "./Tab/Tab";
import { Link } from "react-router-dom";
import FlyOutMenu from "../FlyOutMenu/FlyOutMenu";
import { SearchService } from "../../services/search.service";
import useSearch from "../../hooks/useSearch";
import SearchItem from "./SearchItem";

export default function Header() {
  const { searchResults, searchValue, setSearchValue } = useSearch(
    SearchService.search
  );

  console.log("searchResult: ", searchResults);

  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link to={`/`}>
          <img src="/images/logo-uit.svg" alt="UIT logo" />
        </Link>
        <div className="relative">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            placeholder="# Explore"
          />
          {searchValue.length > 0 && (
            <ul className="absolute top-14 w-full bg-white rounded-lg shadow-lg p-3 space-y-3 flex flex-col">
              {searchResults.groups.map((result) => (
                <SearchItem
                  key={result.id}
                  imgUrl=""
                  title={result.name}
                  to={`/groups/${result.id}`}
                />
              ))}
              {searchResults.users.map((result) => (
                <SearchItem
                  key={result.id}
                  imgUrl={result.avatarUrl}
                  title={result.nickname}
                  to={`/profile/${result.id}`}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.rightContainer}>
        <Tab />
        <hr className={styles.hr} />
        <FlyOutMenu />
      </div>
    </header>
  );
}
