// import { useMemo, useState, useContext } from 'react';
// import PropTypes from 'prop-types';
// import FilterContext from './FilterContext';
// import TableContext from './TableContext';

// function FilterProvider({ children }) {
//   const { planets } = useContext(TableContext);
//   const [valueInput, setValueInput] = useState({
//     planetsOptions: [],
//     optionFilter: 'population',
//     optionOperator: 'maior que',
//     valueNumber: 0,
//   });

//   // function handleChange(e) {
//   //   const { value, name } = e.target;
//   //   setValueInput({
//   //     ...valueInput,
//   //     [name]: value,
//   //   });
//   // }

//   // const filterColums = () => {
//   //   if (valueInput.optionOperator === 'maior que') {
//   //     const resultsPlanets = planets && planets
//   //       .filter((element) => +element.population > +valueInput.valueNumber);
//   //     setValueInput({
//   //       ...valueInput,
//   //       planetsOptions: resultsPlanets,
//   //     });
//   //   } else if (valueInput.optionOperator === 'menor que') {
//   //     const resultsPlanets2 = planets
//   //       .filter((element) => +element[valueInput.optionFilter] < +valueInput.valueNumber);
//   //     setValueInput({
//   //       ...valueInput,
//   //       planetsOptions: resultsPlanets2,
//   //     });
//   //   } else {
//   //     const resultsPlanets3 = planets
//   //       .filter((e) => +e[valueInput.optionFilter] === +valueInput.valueNumber);
//   //     setValueInput({
//   //       ...valueInput,
//   //       planetsOptions: resultsPlanets3,
//   //     });
//   //   }
//   // }

//   // const filterInputs = useMemo(() => ({
//   //   valueInput, handleChange, filterColums,
// //   // }), [valueInput]);

// //   return (
// //     <div>
// //       <FilterContext.Provider value={ filterInputs }>
// //         { children }
// //       </FilterContext.Provider>
// //     </div>
// //   );
// // }

// FilterProvider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };

// export default FilterProvider;
