import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
// import mockApi from './helpers/mockApi';
import userEvent from '@testing-library/user-event';
import TableProvider from '../context/TableProvider';
import testData from '../../cypress/mocks/testData';

describe("testando a aplicação do component table", () => {
  test('se o fetch é feito corretamente', async () => {
    render(<TableProvider>
      <App />
    </TableProvider>)
    beforeEach(() => {
      global.fetch = jest.fn(async () => ({
        json: async () => testData,
      
      }));
    })
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  })

 test('inputs da aplicação', async () => {
  render(<TableProvider>
    <App />
  </TableProvider>)
   const inputFilter = await screen.findByTestId('name-filter')
   expect(inputFilter).toBeInTheDocument()
   userEvent.type(inputFilter, 't')
   expect(inputFilter).toHaveValue('t')
   
    userEvent.type(inputFilter, 'a');

    expect(inputFilter).toHaveValue('ta');

 })

 test('Testa se a aplicação do filtro funciona ', async () => {
  render(<TableProvider>
    <App />
  </TableProvider>)
  const column = await screen.findByTestId('column-filter');
  const comparison = await screen.findByTestId('comparison-filter');
  const value = await screen.findByTestId('value-filter');
  const button = await screen.findByTestId('button-filter');

  userEvent.selectOptions(column, 'orbital_period');
  userEvent.selectOptions(comparison, 'menor que');
  userEvent.type(value, '320');
  userEvent.click(button);

  let row = screen.getAllByRole('row');

  expect(row).toHaveLength(2);

  userEvent.clear(value);
  userEvent.selectOptions(column, 'rotation_period');
  userEvent.selectOptions(comparison, 'menor que');
  userEvent.type(value, '17');
  userEvent.click(button);

  row = screen.getAllByRole('row');

  expect(row).toHaveLength(2);

});
});

