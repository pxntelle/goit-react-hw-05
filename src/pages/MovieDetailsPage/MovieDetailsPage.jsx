import css from "./MovieDetailsPage.module.css";

import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import clsx from "clsx";
import { getMovieById } from "../../data/movies-api";
import Loader from "../../components/Loader/Loader";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";

const linkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const goBack = useRef(location?.state?.from ?? "/");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div>
      <Link to={goBack.current}>
        <button className={css.goBackBtn}>
          <FaPersonWalkingArrowLoopLeft className={css.btnIcon} />
          Go back
        </button>
      </Link>
      {isLoading && <Loader />}
      {error && <p>Something went wrong... Reload.</p>}
      {movie && (
        <div className={css.div}>
          {movie.poster_path ? (
            <img
              className={css.poster}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title || movie.original_title || "Default title"}
            />
          ) : (
            <RiUserStarFill className={css.posterIcon} />
          )}
          <div className={css.details}>
            <h2 className={css.detailsText}>
              {movie.title || movie.original_title} (
              {movie.release_date.slice(0, 4)})
            </h2>
            <p className={css.detailsText}>
              User score: {Math.round(movie.vote_average * 10)}%
            </p>
            <h3 className={css.detailsText}>Overview</h3>
            <p className={css.detailsText}>{movie.overview}</p>
            <h3 className={css.detailsText}>Genres</h3>
            <p className={css.detailsText}>
              {movie.genres.length > 0
                ? movie.genres.map((genre) => genre.name).join(" / ")
                : "We don't know yet 👀"}
            </p>
          </div>
        </div>
      )}
      <hr style={{ width: "100%" }} />
      <p>Additional information</p>
      <ul>
        <li>
          <NavLink to="cast" className={linkClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={linkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<div>LOADING SUB COMPONENT...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
