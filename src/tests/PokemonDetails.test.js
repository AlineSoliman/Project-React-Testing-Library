import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />.', () => {
  const moredetails = 'More details';
  const pathPikachu = '/pokemons/25';
  test('Teste se as informações detalhadas do pokémon são mostradas na tela..', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetails = screen.getByText(moredetails);
    userEvent.click(pokemonDetails);
    expect(history.location.pathname).toBe(pathPikachu);

    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const summary2 = screen.getByText(/This intelligent Pokémon/i);
    expect(summary2).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas.', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetails = screen.getByText(moredetails);
    userEvent.click(pokemonDetails);
    expect(history.location.pathname).toBe(pathPikachu);

    const location = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu' });
    expect(location).toBeInTheDocument();

    const locationImg = screen.getAllByAltText('Pikachu location');
    expect(locationImg[0]).toBeInTheDocument();
    expect(locationImg[1]).toBeInTheDocument();

    const locationMap = screen.getAllByAltText('Pikachu location');
    expect(locationMap[0]).toBeInTheDocument();
    expect(locationMap[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    expect(locationMap[1]).toBeInTheDocument();
    expect(locationMap[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Teste se existe na página uma seção com os mapas.', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetails = screen.getByText(moredetails);
    userEvent.click(pokemonDetails);
    expect(history.location.pathname).toBe(pathPikachu);

    const favorite = screen.getByRole('checkbox');
    expect(favorite).toBeInTheDocument();

    const favoriteLabel = screen.getByText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
  });
});
