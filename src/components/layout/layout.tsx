import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@/const';
import { getLayoutState } from './utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuthStatus, selectUser } from '@/store/selectors';
import { logoutUser } from '@/store/user-slice';

export default function Layout(): JSX.Element {
  const { pathname } = useLocation();
  const { rootClassName, linkClassName, shouldRenderUser, shouldRenderFooter } = getLayoutState(pathname as AppRoute);
  const authorizationStatus = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleSignOutClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutUser());
  };


  return (
    <div className={`page${rootClassName}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className={`header__logo-link${linkClassName}`} to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            {
              shouldRenderUser ? (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favourites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">{user?.email}</span>
                            <span className="header__favorite-count">3</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}
                      </Link>
                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <li className="header__nav-item">
                        <a className="header__nav-link" href="#" onClick={handleSignOutClick}>
                          <span className="header__signout">Sign out</span>
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              ) : null
            }
          </div>
        </div>
      </header>
      <Outlet />
      {shouldRenderFooter ? (
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      ) : null}
    </div>
  );
}
