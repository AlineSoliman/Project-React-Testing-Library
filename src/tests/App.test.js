import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto de links de navegação.', () => {
  test('Testa se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  test('Testa se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
  });

  test('Testa se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);

    const favotiteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favotiteLink).toBeInTheDocument();
  });
});

describe('Teste se o app é direcionado para as respectivas páginas ao clicar nos links.',
  () => {
    test('Se a aplicação é redirecionada para a página inicial, ao clicar no link Home.',
      () => {
        const { history } = renderWithRouter(<App />);
        const homeLink = screen.getByRole('link', { name: 'Home' });
        userEvent.click(homeLink);
        expect(history.location.pathname).toBe('/');
      });

    test('Se a aplicação é direcionada para a página de About, ao clicar no link About.',
      () => {
        const { history } = renderWithRouter(<App />);
        const aboutLink = screen.getByRole('link', { name: 'About' });
        userEvent.click(aboutLink);
        expect(history.location.pathname).toBe('/about');
      });

    test('Se a aplicação vai para a página de P. Favoritados, ao clicar no link Favorite',
      () => {
        const { history } = renderWithRouter(<App />);
        const favotiteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
        userEvent.click(favotiteLink);
        expect(history.location.pathname).toBe('/favorites');
      });

    test('Se a aplicação vai para a página Not Found ao entrar em uma URL desconhecida.',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push('/aline');
        const notFound = screen.getByRole('heading', { level: 2, name: /not found/i });
        expect(notFound).toBeInTheDocument();
      });
  });
