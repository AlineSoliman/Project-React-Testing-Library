import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import data from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found.', () => {
    renderWithRouter(<FavoritePokemons />);

    const FavoriteLink = screen.getByText('No favorite pokemon found');
    expect(FavoriteLink).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons
      pokemons={ data }
    />);

    const favoriteCheckbox = screen.getAllByTestId('pokemon-name');
    expect(favoriteCheckbox[0]).toBeInTheDocument();
    expect(favoriteCheckbox[1]).toBeInTheDocument();
  });
});
