import css from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

export default function SearchBar({ onHandleSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onHandleSubmit(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={css.searchContainer}>
      <div className={css.searchBar}>
        {" "}
        <button type="submit" className={css.btn}>
          <CiSearch className={css.btnImg} />
        </button>
        <input
          className={css.input}
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search movies"
        />
      </div>
    </form>
  );
}
