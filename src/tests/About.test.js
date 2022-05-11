import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutLink = screen.getByText('About Pokédex');
    expect(aboutLink).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutLink = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutLink).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getAllByText(/Pokémons/i);
    expect(aboutText[0]).toBeInTheDocument();
    expect(aboutText[1]).toBeInTheDocument();
  });

  test('este se a página contém uma imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img', { name: 'Pokédex' });

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
