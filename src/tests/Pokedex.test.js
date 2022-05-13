import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import { Pokedex } from '../components';
// import data from '../data';

describe('Teste o componente <Pokedex.js />.', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    // ver quais props estao sendo enviados para funcionar
    const pokedex = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons',
    });
    expect(pokedex).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo pokémon da lista.', () => {
    renderWithRouter(<App />);

    const pokemon1 = screen.getByText('Pikachu');
    const botaoProximo = screen.getByTestId('next-pokemon');
    expect(pokemon1).toBeInTheDocument();
    userEvent.click(botaoProximo);
    const pokemon2 = screen.getByText('Charmander');
    expect(pokemon2).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    const pokemonLength = 1;
    expect(pokemon).toHaveLength(pokemonLength);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const botoesFiltro = screen.getAllByTestId('pokemon-type-button');
    expect(botoesFiltro[0]).toBeInTheDocument();

    const botaoEletric = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(botaoEletric);
    expect(botaoEletric).toHaveTextContent('Electric');

    const botaoALL = screen.getByRole('button', { name: 'All' });
    expect(botaoALL).toBeInTheDocument();
  });
});
