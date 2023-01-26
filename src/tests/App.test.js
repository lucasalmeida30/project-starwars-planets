import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import TableProvider from '../context/TableProvider';
import testData from '../../cypress/mocks/testData';
import { act } from 'react-dom/test-utils';

describe("testando a aplicação do component table", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    });
  })
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('se o fetch é feito corretamente', async () => {
    render(<TableProvider>
      <App />
    </TableProvider>)


    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);

  })

 test('se o input de texto da aplicação funciona corretamente', async () => {
  render(<TableProvider>
    <App />
  </TableProvider>)
  
   const inputFilter = await screen.findByTestId('name-filter')
   const planet = await screen.findAllByTestId('planet')

   expect(inputFilter).toBeInTheDocument()
   userEvent.type(inputFilter, 't')
   expect(inputFilter).toHaveValue('t')
   
    userEvent.type(inputFilter, 'a');

    expect(inputFilter).toHaveValue('ta');

    userEvent.type(inputFilter, 't')
    expect(inputFilter).toHaveValue('tat')

    expect(planet).toHaveLength(1)

 })

 test('Testa se a aplicação do filtro select funciona ', async () => {
  render(<TableProvider>
    <App />
  </TableProvider>)
  const column = await screen.findByTestId('column-filter');
  const comparison = await screen.findByTestId('comparison-filter');
  const value = await screen.findByTestId('value-filter');
  const button = await screen.findByTestId('button-filter');

  act(() => {
    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '360');
    userEvent.click(button);
  })
  
  const planet = await screen.findAllByTestId('planet')
  expect(planet).toHaveLength(10)

  
  act(() => {
    userEvent.selectOptions(column, 'rotation_period');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '24');
    userEvent.click(button);
  })

  const planet2 = await screen.findAllByTestId('planet')
  expect(planet2).toHaveLength(3)
  
  act(() => {
    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'igual');
    userEvent.type(value, '7200');
    userEvent.click(button);
  })

  const planet3 = await screen.findAllByTestId('planet')
  expect(planet3).toHaveLength(10)
  
});
test('', async () => {
  render(<TableProvider>
    <App />
  </TableProvider>)
 
  const button =  screen.getByTestId('button-filter');
  const filter =  screen.getByTestId('filter')
  // const buttonRemove = screen.getByRole('button', {name: /remover/i})

  userEvent.click(button)
  expect(filter).toBeInTheDocument()
  

  const buttonRemoveAll = screen.getByTestId('button-remove-filters')
  userEvent.click(buttonRemoveAll)
  expect(filter).not.toBeInTheDocument()
})
});

