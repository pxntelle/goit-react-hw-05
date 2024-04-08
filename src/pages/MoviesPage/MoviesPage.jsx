import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMoviesByQuery } from "../../data/movies-api";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  // Створення станів
  const [movies, setMovies] = useState([]); //зберігання списку фільмів
  const [isLoading, setIsLoading] = useState(false); //завантаження
  const [error, setError] = useState(null); //помилок

  const [searchParams, setSearchParams] = useSearchParams(); //використання хука для отримання параметрів пошуку з url
  const handleSubmit = (value) => {
    setSearchParams({ q: value }); // встановлення параметрів пошуку в URL
  };

  const searchQuery = searchParams.get("q"); //отримання значення пошукового запиту з параметрів

  useEffect(() => {
    if (!searchQuery) return; //якщо пошуковий запит вказаний
    // отримуємо фільми з api
    const fetchData = async () => {
      setIsLoading(true); // стан завантаження => true
      try {
        const data = await getMoviesByQuery(searchQuery); // отримання фільмів за пошуковим запитом
        setMovies(data); // оновлення стану з отриманими фільмами
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); // завершення завантаження
      }
    };
    fetchData(); // виклик функції для отримання даних
  }, [searchQuery]); // вказуємо searchQuery як залежність, щоб ефект спрацьовував при його зміні

  return (
    <>
      <SearchBar onHandleSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <p>Something is wrong! Reload.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
