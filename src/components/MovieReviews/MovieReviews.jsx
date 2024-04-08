import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReview } from "../../data/movies-api";
import Loader from "../Loader/Loader";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getReview(movieId);
        setReviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Something went wrong... Reload.</p>}
      {reviews.length > 0 && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>{author} </h3>
              <p className={css.reviewText}>{content} </p>
            </li>
          ))}
        </ul>
      )}
      {!reviews.length && <p>Nobody shared the reviews so far 👀</p>}
    </>
  );
}
