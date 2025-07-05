import React, { useMemo } from 'react';
import { useFavourites } from '../context/FavouritesContext';

const Favourites: React.FC = () => {
  const { favourites, removeFromFavourites } = useFavourites();

  const totalItems = useMemo(() => 
    favourites.reduce((sum, item) => sum + item.quantity, 0),
    [favourites]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Избранное</h1>
      {favourites.length === 0 ? (
        <p className="text-gray-500">В избранном пока ничего нет</p>
      ) : (
        <>
          <p className="mb-4">Всего товаров: {totalItems}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favourites.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-lg font-bold mb-2">${item.price}</p>
                <p className="text-gray-500 mb-4">Количество: {item.quantity}</p>
                <button
                  onClick={() => removeFromFavourites(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Удалить из избранного
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Favourites); 