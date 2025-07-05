import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavouritesProvider } from '../../context/FavouritesContext';
import Favourites from '../Favourites';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <FavouritesProvider>
        {component}
      </FavouritesProvider>
    </BrowserRouter>
  );
};

describe('Favourites Component', () => {
  it('renders empty state when no favourites', () => {
    renderWithProviders(<Favourites />);
    expect(screen.getByText('В избранном пока ничего нет')).toBeInTheDocument();
  });

  it('renders favourites list when items exist', () => {
    // Mock localStorage
    const mockFavourites = [
      {
        id: 1,
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        image: 'test.jpg',
        quantity: 1
      }
    ];
    localStorage.setItem('favourites', JSON.stringify(mockFavourites));

    renderWithProviders(<Favourites />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Количество: 1')).toBeInTheDocument();
  });

  it('removes item from favourites when remove button is clicked', () => {
    const mockFavourites = [
      {
        id: 1,
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        image: 'test.jpg',
        quantity: 1
      }
    ];
    localStorage.setItem('favourites', JSON.stringify(mockFavourites));

    renderWithProviders(<Favourites />);
    
    const removeButton = screen.getByText('Удалить из избранного');
    fireEvent.click(removeButton);

    expect(screen.getByText('В избранном пока ничего нет')).toBeInTheDocument();
  });
}); 