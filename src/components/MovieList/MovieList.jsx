import css from "../MovieList/MovieList.module.css";

import { NavLink, useLocation } from "react-router-dom";
import { RiUserStarFill } from "react-icons/ri";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(({ id, title, original_title, poster_path }) => (
        <li key={id} className={css.item}>
          <NavLink to={`/movies/${id}`} state={{ from: location }}>
            <div className={css.div}>
              {poster_path ? (
                <img
                  className={css.miniImg}
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt={title || original_title}
                />
              ) : (
                <RiUserStarFill className={css.avatarIcon} />
              )}
              <h3 className={css.movieTitle}>{title || original_title}</h3>
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
