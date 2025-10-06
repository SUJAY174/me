import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { MovieCard } from './components/MovieCard';
import { MovieDetails } from './components/MovieDetails';
import { Spinner } from './components/Spinner';
import { Movie } from './types';
import { movieService } from './services/movieService';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  useTheme(); // Initialize theme hook to apply theme class to root element
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchMovies = useCallback(async (search: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedMovies = await movieService.fetchMovies(search);
      setMovies(fetchedMovies);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchMovies(term);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <p className="text-center text-red-500 mt-10">{error}</p>;
    }
    if (movies.length === 0) {
      return (
        <p className="text-center text-gray-500 dark:text-brand-muted mt-10">
          No movies found for "{searchTerm}". Try a different search.
        </p>
      );
    }
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelectMovie={handleSelectMovie} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-bg font-sans">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-brand-light mb-8">
          Featured Movies
        </h1>
        {renderContent()}
      </main>
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default App;