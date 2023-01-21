import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const { planets, isLoading, searchFilter, filterValue } = useContext(TableContext);
  const filtered = planets.filter(({ name }) => name.toLowerCase().includes(filterValue));
  return (
    <div>
      <h1>Projeto Star Wars</h1>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Digite aqui"
        onChange={ searchFilter }
      />
      <table>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        {
          isLoading ? <h2>Carregando...</h2> : filtered.map((element) => (
            <tr key={ element.name }>
              <td>{element.name}</td>
              <td>{element.rotation_period}</td>
              <td>{element.orbital_period}</td>
              <td>{element.diameter}</td>
              <td>{element.climate}</td>
              <td>{element.gravity}</td>
              <td>{element.terrain}</td>
              <td>{element.surface_water}</td>
              <td>{element.population}</td>
              <td>{element.films}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>

          ))
        }

      </table>
    </div>
  );
}

export default Table;
