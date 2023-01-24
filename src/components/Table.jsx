import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';

function Table() {
  const [valueInput, setValueInput] = useState({
    planetsOptions: [],
    optionFilter: 'population',
    optionOperator: 'maior que',
    valueNumber: 0,
  });
  const [filter, setFilter] = useState([]);

  const { planets, searchFilter, filterValue } = useContext(TableContext);

  const filtered = planets && planets
    .filter(({ name }) => name.toLowerCase().includes(filterValue));

  function handleChange(e) {
    const { value, name } = e.target;
    setValueInput({
      ...valueInput,
      [name]: value,
    });
  }
  function filterColums() {
    const filterMultiplos = filter.reduce((acc, curr) => acc.filter((planet) => {
      switch (curr.optionOperator) {
      case 'maior que':
        return +planet[curr.optionFilter] > +curr.valueNumber;
      case 'menor que':
        return +planet[curr.optionFilter] < +curr.valueNumber;
      case 'igual a':
        return +planet[curr.optionFilter] === +curr.valueNumber;
      default:
        return planet;
      }
    }), filtered);
    setValueInput({
      ...valueInput,
      planetsOptions: filterMultiplos,
    });
  }
  useEffect(() => {
    filterColums();
  }, [filter]);

  function handleclick() {
    //  valueInput.planetsOptions.filter((planet) => )
    setFilter([
      ...filter,
      {
        optionFilter: valueInput.optionFilter,
        optionOperator: valueInput.optionOperator,
        valueNumber: valueInput.valueNumber,
      },
    ]);
  }

  return (
    <div>
      <h1>Projeto Star Wars</h1>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Digite aqui"
        onChange={ searchFilter }
      />
      <br />
      <br />
      <select
        data-testid="column-filter"
        onChange={ handleChange }
        value={ valueInput.optionFilter }
        name="optionFilter"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleChange }
        name="optionOperator"
        value={ valueInput.optionOperator }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        placeholder="Digite um numero"
        data-testid="value-filter"
        name="valueNumber"
        onChange={ handleChange }
        value={ valueInput.valueNumber }
      />
      <button
        data-testid="button-filter"
        onClick={ handleclick }
      >
        Filtrar
      </button>
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
          valueInput.planetsOptions.length === 0 ? filtered
            .map((element) => (
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
            : valueInput.planetsOptions.map((element) => (
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
