import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';

const Home = React.lazy(() => import('./pages/Home'));
const Favourites = React.lazy(() => import('./pages/Favourites'));

const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  Магазин
                </Link>
                <div className="space-x-4">
                  <Link to="/" className="text-gray-600 hover:text-gray-800">
                    Главная
                  </Link>
                  <Link to="/favourites" className="text-gray-600 hover:text-gray-800">
                    Избранное
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<div>Загрузка...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favourites" element={<Favourites />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </FavouritesProvider>
  );
};

export default App;
