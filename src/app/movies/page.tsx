import { prisma } from "@/lib/prisma";
import { Film, Calendar } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function MoviesPage({ searchParams }: { searchParams?: { search?: string } }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const search = searchParams?.search?.trim() || "";
  const movies = await prisma.movie.findMany({
    where: search
      ? {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-yellow-500" />
            <Link href="/" className="text-2xl font-bold">Ethio<span className="text-yellow-500">Flix</span></Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <span>Home</span>
            </Link>
            <Link href="/movies" className="flex items-center space-x-1 text-white">
              <span>Movies</span>
            </Link>
            <Link href="/stories" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <span>News</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!session && (
              <>
                <Link href="/auth/login" className="text-yellow-500 font-bold hover:underline">Sign In</Link>
                <Link href="/auth/register" className="text-yellow-500 font-bold hover:underline">Register</Link>
              </>
            )}
            {session && (
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="text-yellow-500 font-bold hover:underline">Log Out</button>
              </form>
            )}
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-yellow-500">Ethiopian Movies</h1>
            <Badge variant="outline" className="bg-gray-800 border-gray-700 text-yellow-500">
              <Film className="h-4 w-4 mr-2" />
              {movies.length} films
            </Badge>
            {session?.user?.email?.toLowerCase() === "admin@gmail.com" && (
              <Link href="/admin/add-movie">
                <button className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow">
                  + Add Movie
                </button>
              </Link>
            )}
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
            <button type="submit" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-r">Search</button>
          </form>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} className="block group">
                <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg group-hover:ring-2 group-hover:ring-yellow-500 transition">
                  <div className="aspect-[2/3] bg-gray-900 flex items-center justify-center overflow-hidden">
                    {movie.imageUrl ? (
                      <img src={movie.imageUrl} alt={movie.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
                    ) : (
                      <Film className="h-12 w-12 text-gray-700" />
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-white line-clamp-1">{movie.title}</h2>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-400 flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
                        {movie.releaseYear || "N/A"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">Dir. {movie.director || "Unknown"}</p>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{movie.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}