import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink className={css.navLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={css.navLink} to="/movies">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
        <hr />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
