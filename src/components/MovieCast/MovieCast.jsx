import css from "./MovieCast.module.css";
import { RiUserStarFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { getCast } from "../../data/movies-api";

export default function MovieCast() {
  const { movieId } = useParams(); // отримання параметру movieId з URL за допомогою useParams
  const [actor, setActor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // використання useEffect для отримання даних про акторів після завантаження компонента або зміни movieId
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        // Виклик функції getCast зі значенням movieId та оновлення стану actor
        const data = await getCast(movieId);
        setActor(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]); //передача movieId як залежності, щоб ефект спрацьовував при зміні movieId

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Something went wrong... Reload.</p>}
      {actor.length > 0 && (
        <ul className={css.actorsList}>
          {actor.map(({ id, name, character, profile_path }) => (
            <li key={id} className={css.item}>
              <div>
                {profile_path ? (
                  <img
                    className={css.avatar}
                    src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                    alt={name}
                    // width={120}
                  />
                ) : (
                  <RiUserStarFill className={css.avatarIcon} />
                )}
              </div>
              <div>
                <p className={css.actorName}>
                  {name ? name : "Unknown actor 👀"}{" "}
                </p>
                <p className={css.actorCharacter}>
                  {character ? character : "Unknown character 👀"}{" "}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!actor.length && <p>Mysterious cast 👀</p>}
    </>
  );
}
