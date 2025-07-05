import React, { useCallback } from 'react';
import { useFavourites } from '../context/FavouritesContext';
import { Product } from '../types';

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Смартфон X',
    price: 999,
    description: 'Современный смартфон с отличной камерой',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Ноутбук Pro',
    price: 1499,
    description: 'Мощный ноутбук для работы и игр',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 3,
    name: 'Наушники Air',
    price: 199,
    description: 'Беспроводные наушники с шумоподавлением',
    image: 'https://via.placeholder.com/300',
  },
];

const Home: React.FC = () => {
  const { addToFavourites } = useFavourites();

  const handleAddToFavourites = useCallback((product: Product) => {
    addToFavourites({ ...product, quantity: 1 });
  }, [addToFavourites]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Наши товары</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">${product.price}</p>
            <button
              onClick={() => handleAddToFavourites(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Добавить в избранное
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Home); 