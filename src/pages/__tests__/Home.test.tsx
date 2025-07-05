import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavouritesProvider } from '../../context/FavouritesContext';
import Home from '../Home';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <FavouritesProvider>
        {component}
      </FavouritesProvider>
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  it('renders product list', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByText('Наши товары')).toBeInTheDocument();
    expect(screen.getByText('Смартфон X')).toBeInTheDocument();
    expect(screen.getByText('Ноутбук Pro')).toBeInTheDocument();
    expect(screen.getByText('Наушники Air')).toBeInTheDocument();
  });

  it('adds product to favourites when button is clicked', () => {
    renderWithProviders(<Home />);
    
    const addButton = screen.getAllByText('Добавить в избранное')[0];
    fireEvent.click(addButton);

    // Check if the product was added to localStorage
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    expect(favourites).toHaveLength(1);
    expect(favourites[0].name).toBe('Смартфон X');
  });

  it('displays product details correctly', () => {
    renderWithProviders(<Home />);
    
    const product = screen.getByText('Смартфон X').closest('div');
    expect(product).toHaveTextContent('Современный смартфон с отличной камерой');
    expect(product).toHaveTextContent('$999');
  });
}); 