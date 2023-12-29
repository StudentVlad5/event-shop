import { HelmetProvider } from 'react-helmet-async';
import { lazy, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from 'routes/RestrictedRoute';
import { PrivateRoute } from 'routes/PrivateRoute';
import { refreshUser } from '../redux/auth/operations';
import { selectIsRefreshing, getPermission } from '../redux/auth/selectors';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const permission = useSelector(getPermission);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const HomePage = lazy(() => import('pages/HomePage'));
  const LoginPage = lazy(() => import('pages/LoginPage'));
  const ForgotPasswordPage = lazy(() => import('pages/ForgotPasswordPage'));
  const TeamPage = lazy(() => import('pages/TeamPage'));
  const SpecialistPage = lazy(() => import('pages/SpecialistPage'));
  const EventsPage = lazy(() => import('pages/EventsPage'));
  const EventDetailsPage = lazy(() => import('pages/EventDetailsPage'));
  const AboutUsPage = lazy(() => import('pages/AboutUsPage'));
  const UserPage = lazy(() => import('pages/UserPage'));
  const AdminPage = lazy(() => import('pages/AdminPage'));

  return isRefreshing ? (
    <></>
  ) : (
    <HelmetProvider>
      <Suspense fallback={<div>{'Loading...'}</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            {permission === 'admin' ? (
              <Route
                path="admin"
                element={
                  <PrivateRoute redirectTo="/login" component={<AdminPage />} />
                }
              >
                <Route
                  path="profile"
                  element={
                    <PrivateRoute
                      redirectTo="/signin"
                      component={<UserPage />}
                    />
                  }
                />
              </Route>
            ) : (
              <Route
                path="user"
                element={
                  <PrivateRoute redirectTo="/login" component={<UserPage />} />
                }
              >
                <Route
                  path="profile"
                  element={
                    <PrivateRoute
                      redirectTo="/signin"
                      component={<UserPage />}
                    />
                  }
                />
              </Route>
            )}
            {/* <Route
              path="admin/users"
              element={
                <PrivateRoute
                  redirectTo="/admin"
                  component={<AdminUsersPage />}
                />
              }
            />
            <Route
              path="admin/events"
              element={
                <PrivateRoute
                  redirectTo="/admin"
                  component={<AdminEventsPage />}
                />
              }
            />
            <Route
              path="admin/team"
              element={
                <PrivateRoute
                  redirectTo="/admin"
                  component={<AdminTeamPage />}
                />
              }
            /> */}

            <Route
              path="login"
              element={
                <RestrictedRoute
                  redirectTo={permission === 'admin' ? '/admin' : '/user'}
                  component={<LoginPage />}
                />
              }
            />

            <Route
              path="forgot_password"
              element={
                <RestrictedRoute
                  redirectTo="/user/profile"
                  component={<ForgotPasswordPage />}
                />
              }
            />

            <Route path="events" element={<EventsPage />} />
            <Route path="events/:id" element={<EventDetailsPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="events/:id" element={<SpecialistPage />} />
            <Route path="about" element={<AboutUsPage />} />

            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  );
};
