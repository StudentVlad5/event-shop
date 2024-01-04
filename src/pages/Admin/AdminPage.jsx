import { Outlet } from 'react-router-dom';
import { Admin } from 'components/Admin';
import React, { useEffect, useState } from 'react';
import { SEO } from 'utils/SEO';
import { fetchData } from 'services/APIservice';
import { useDispatch, useSelector } from 'react-redux';
import { AdminContainer } from './Pages.styled';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { getCategory } from '../redux/category/operation';
import { getSpecialists } from '../redux/specialists/operation';

const AdminPage = () => {
  const [category, setCategory] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/categories`);
        dispatch(getCategory({ ...data }));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setCategory(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async function getData() {
      setIsLoading(true);
      try {
        const { data } = await fetchData(`/specialists`);
        dispatch(getSpecialists({ ...data }));
        if (!data) {
          return onFetchError('Whoops, something went wrong');
        }
        setSpecialists(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <SEO title="Administration" description="Page Administration" />
      {isLoading ? onLoading() : onLoaded()}
      {error && onFetchError('Whoops, something went wrong')}
      <AdminContainer>
        <Admin />
        <Outlet />
      </AdminContainer>
    </>
  );
};

export default AdminPage;
