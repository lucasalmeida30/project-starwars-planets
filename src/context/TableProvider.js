import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    async function fetchApi() {
      const url = 'https://swapi.dev/api/planets';
      setIsLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      const { results } = json;
      const filterResults = results.map((element) => element)
        .filter((planet) => delete planet.residents);
      setPlanets(filterResults);
    }
    fetchApi();
    setIsLoading(false);
  }, [filterValue]);

  function searchFilter(e) {
    setFilterValue(e.target.value);
  }
  const planetsValue = useMemo(() => ({
    planets, filterValue, isLoading, searchFilter,
  }), [planets, filterValue, isLoading]);
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
