import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchApi() {
      const url = 'https://swapi.dev/api/planets';
      const response = await fetch(url);
      const json = await response.json();
      const { results } = json;
      const filterResults = results.map((element) => element)
        .filter((planet) => delete planet.residents);
      setPlanets(filterResults);
    }
    fetchApi();
    setIsLoading(false);
  }, []);
  const planetsValue = useMemo(() => ({
    planets, setPlanets, isLoading,
  }), [planets, setPlanets, isLoading]);
  return (
    <TableContext.Provider value={ planetsValue }>
      { children }
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default TableProvider;
