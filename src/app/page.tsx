"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Star, Popcorn, Search, Calendar, Users, Home as HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { User, CalendarDays, MessageSquare } from "lucide-react";

export default function Home() {
  const trendingMovies = [
    {
      id: 1,
      title: "The Athlete",
      year: 2009,
      director: "Davey Frankel",
      rating: 4.2,
      poster: "https://i.ytimg.com/vi/k662i8OmOgg/hqdefault.jpg",
      genres: ["Biography", "Drama"]
    },
    { 
      id: 2,
      title: "Lamb",
      year: 2015,
      director: "Yared Zeleke",
      rating: 3.9,
      poster: "https://i.ytimg.com/vi/M5yOMUjUQdU/hqdefault.jpg",
      genres: ["Drama", "Family"]
    },
    {
      id: 3,
      title: "Difret",
      year: 2014,
      director: "Zeresenay Berhane Mehari",
      rating: 4.1,
      poster: "https://i.ytimg.com/vi/vtY0zHaRNl8/hqdefault.jpg",
      genres: ["Drama", "Legal"]
    },
    {
      id: 4,
      title: "Price of Love",
      year: 2015,
      director: "Hermon Hailay",
      rating: 3.7,
      poster: "https://i.ytimg.com/vi/dc9sWVm0DQM/hqdefault.jpg",
      genres: ["Romance", "Drama"]
    }
  ];

  const allMovies = [
    ...trendingMovies,
    {
      id: 5,
      title: "Yewendoch Guday",
      year: 2023,
      director: "Yonas Birhane",
      rating: 4.2,
      poster: "/placeholder.jpg",
      genres: ["Drama", "Romance"]
    },
    {
      id: 6,
      title: "Sew Le Sew",
      year: 2022,
      director: "Ephrem Amare",
      rating: 4.5,
      poster: "/placeholder.jpg",
      genres: ["Comedy", "Drama"]
    },
    {
      id: 7,
      title: "Ye Wonz Maibel",
      year: 2021,
      director: "Hermon Hailay",
      rating: 3.9,
      poster: "/placeholder.jpg",
      genres: ["Drama", "Family"]
    }
  ];

  const recentReviews = [
    {
      id: 1,
      movie: "Sew the Winter to My Skin",
      user: "Selam",
      rating: 4,
      comment: "Powerful storytelling with breathtaking cinematography.",
      date: "2 days ago"
    },
    {
      id: 2,
      movie: "Enkulal: Feathers of Heaven",
      user: "Mekonnen",
      rating: 3.5,
      comment: "A touching drama with excellent performances.",
      date: "5 days ago"
    }
  ];

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
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/movies" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <Film className="h-4 w-4" />
              <span>Movies</span>
            </Link>
            <Link href="/stories" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <BookOpen className="h-4 w-4" />
              <span>News</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover & Review <span className="text-yellow-500">Ethiopian</span> Cinema
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Track what you've watched. Share your thoughts. Find your next favorite Ethiopian film.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Input 
              placeholder="Search for Ethiopian movies..." 
              className="pl-12 py-6 bg-gray-800 border-gray-700 focus:border-yellow-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="trending" className="data-[state=active]:bg-gray-700">
              <Popcorn className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
              <Film className="h-4 w-4 mr-2" />
              All Movies
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-gray-700">
              <Star className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Trending Tab */}
          <TabsContent value="trending">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {trendingMovies.map((movie) => (
                <Card key={movie.id} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
                  <CardHeader>
                    <div className="aspect-[2/3] bg-gray-700 rounded-md overflow-hidden relative">
                      {movie.poster ? (
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "";
                            e.currentTarget.parentElement!.innerHTML = `
                              <div class=\"w-full h-full flex items-center justify-center bg-gray-700\">
                                <Film class=\"h-12 w-12 text-gray-500\" />
                              </div>
                            `;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                          <Film className="h-12 w-12 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">{movie.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {movie.year} • {movie.director}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {movie.genres.map(genre => (
                        <Badge key={genre} variant="secondary" className="text-xs bg-gray-700">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{movie.rating}</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-600 ml-auto">
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* All Movies Tab */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {allMovies.map((movie) => (
                <Card key={movie.id} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
                  <CardHeader className="p-0">
                    <div className="aspect-[2/3] bg-gray-700 rounded-t-md flex items-center justify-center">
                      <Film className="h-12 w-12 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg">{movie.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {movie.year} • {movie.director}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {movie.genres.map(genre => (
                        <Badge key={genre} variant="secondary" className="text-xs bg-gray-700">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{movie.rating}</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-600 ml-auto">
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Film className="h-6 w-6 text-yellow-500" />
              <h4 className="text-xl font-bold">Ethio<span className="text-yellow-500">Flix</span></h4>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white">About</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Terms</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Contact</Link>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-8">
            © {new Date().getFullYear()} EthioFlix. Celebrating Ethiopian cinema.
          </p>
        </div>
      </footer>
    </div>
  );
}