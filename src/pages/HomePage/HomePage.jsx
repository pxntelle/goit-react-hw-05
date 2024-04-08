import css from "./HomePage.module.css";
import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../data/movies-api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]); // cтан для зберігання списку фільмів
  const [isLoading, setIsLoading] = useState(false); // відображення індикатора завантаження
  const [error, setError] = useState(null); // повідомлення про помилку

  useEffect(() => {
    const fetchData = async () => {
      // cтворюємо функцію для отримання даних
      setIsLoading(true); // перемикаємо стан завантаження даних під час фетчингу
      try {
        const data = await getTrendingMovies(); // функція для отримання трендових фільмів
        setMovies(data); // зберігаємо отримані дані у стані movies
      } catch (error) {
        setError(error); // зберігаємо помилку у стані error для відображення повідомлення
      } finally {
        setIsLoading(false); // припиняємо завантаження після завершення запиту
      }
    };
    fetchData(); // викликаємо функцію отримання даних під час першого рендерингу компоненту
  }, []); // вказуємо пустий масив залежностей, щоб ефект виконувався тільки під час монтажу компоненту

  return (
    <>
      <h2 className={css.trendingHeader}>Trending movies</h2>
      {isLoading && <Loader />}{" "}
      {error && <p>Something is wrong! Reload page, please.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}{" "}
    </>
  );
}
