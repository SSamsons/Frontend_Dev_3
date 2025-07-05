import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FavouriteItem } from '../types';

interface FavouritesContextType {
  favourites: FavouriteItem[];
  addToFavourites: (product: FavouriteItem) => void;
  removeFromFavourites: (productId: number) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>(() => {
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = useCallback((product: FavouriteItem) => {
    setFavourites(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromFavourites = useCallback((productId: number) => {
    setFavourites(prev => prev.filter(item => item.id !== productId));
  }, []);

  return (
    <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
}; 