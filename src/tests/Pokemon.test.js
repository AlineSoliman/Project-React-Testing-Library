import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { PokemonDetails } from '../components';

describe('Teste o componente <Pokemon.js />.', () => {
  const moredetails = 'More details';
  const pathPikachu = '/pokemons/25';
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText('Pikachu');
    const pokemonType = screen.getAllByText('Electric');
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    const pokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    const pokemonImgAlt = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType[0]).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImgAlt).toBeInTheDocument();
  });

  test('Teste se o card do pokémon indicado na Pokédex contém um link details', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(moredetails);
    const pokemonCard = screen.getByText('Pikachu');
    expect(details).toBeInTheDocument();
    expect(pokemonCard).toHaveAttribute('src', pathPikachu);
  });

  test('Teste se ao clicar no link details, é feito o redirecionamento.', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByText(moredetails);

    userEvent.click(details);
    expect(history.location.pathname).toBe(pathPikachu);
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>.', () => {
    const { history } = renderWithRouter(<PokemonDetails />);

    history.push(pathPikachu);
    const detailsPikachu = screen.getByText('Pikachu Details');
    expect(detailsPikachu).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const details = screen.getByText(moredetails);
    userEvent.click(details);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    const icon = screen.getByAltText('Pikachu is marked as favorite');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
