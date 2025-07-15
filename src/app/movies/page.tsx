"use client";
import React, { useState, useEffect } from "react";
import { Film, Calendar } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@/components/MovieCard";
import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<{ id: string; name: string }[]>([]);
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.email?.toLowerCase() === "admin@gmail.com";
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const genreId = searchParams.get("genreId") || "";

  useEffect(() => {
    fetch("/api/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (genreId) params.set("genreId", genreId);
      const res = await fetch(`/api/movies?${params.toString()}`);
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    }
    fetchMovies();
    // eslint-disable-next-line
  }, [search, genreId]);

  function handleDelete(id: string) {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  }

  function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newGenreId = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (newGenreId) {
      params.set("genreId", newGenreId);
    } else {
      params.delete("genreId");
    }
    router.push(`/movies?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      
      <nav className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-yellow-500" />
            <Link href="/" className="text-2xl font-bold">
              Ethio<span className="text-yellow-500">Flix</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link href="/movies" className="text-white">
              Movies
            </Link>
            <Link href="/stories" className="text-gray-300 hover:text-white">
              News
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!session && (
              <>
                <Link
                  href="/auth/login"
                  className="text-yellow-500 font-bold hover:underline"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-yellow-500 font-bold hover:underline"
                >
                  Register
                </Link>
              </>
            )}
            {session && (
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="text-yellow-500 font-bold hover:underline"
                >
                  Log Out
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>

      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-yellow-500">
              Ethiopian Movies
            </h1>
            <Badge
              variant="outline"
              className="bg-gray-800 border-gray-700 text-yellow-500"
            >
              <Film className="h-4 w-4 mr-2" />
              {movies.length} films
            </Badge>
            {isAdmin && (
              <Link href="/admin/add-movie">
                <button className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow">
                  + Add Movie
                </button>
              </Link>
            )}
          </div>

          {/* Genre Filter Dropdown */}
          <div className="mb-4 max-w-xs">
            <label className="block mb-1 font-medium">Filter by Genre</label>
            <select
              className="w-full border rounded px-3 py-2 text-black"
              value={genreId}
              onChange={handleGenreChange}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>

          {/* Search Form */}
          <form method="GET" action="/movies" className="mb-4 flex max-w-md">
            <input
              type="text"
              name="search"
              placeholder="Search by title..."
              defaultValue={search}
              className="w-full px-4 py-2 rounded-l bg-gray-800 border border-gray-700 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-r"
            >
              Search
            </button>
          </form>

          {/* Movie Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {loading ? (
              <div className="col-span-full text-center text-gray-400">Loading...</div>
            ) : movies.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">No movies found.</div>
            ) : (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} isAdmin={isAdmin} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
