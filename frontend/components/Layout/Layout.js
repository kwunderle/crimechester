import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="App">
      {loading ? (
        <CircularProgress />
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default Layout;