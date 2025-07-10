import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Filter, Calendar, Film, Home as HomeIcon, BookOpen, Users, Clock, Heart, List, Eye } from "lucide-react";
import Link from "next/link";

const movies = [
  {
    id: 1,
    title: "Yewendoch Guday",
    year: 2023,
    rating: 4.2,
    imageUrl: "/placeholder-movie.jpg",
    genres: ["Drama", "Romance"],
    director: "Yonas Birhane",
    status: "Released",
    watched: true,
    liked: true,
    inWatchlist: false,
    reviews: 42,
  },
  {
    id: 2,
    title: "Sew Le Sew",
    year: 2022,
    rating: 4.5,
    imageUrl: "/placeholder-movie.jpg",
    genres: ["Comedy", "Drama"],
    director: "Ephrem Amare",
    status: "Released",
    watched: false,
    liked: false,
    inWatchlist: true,
    reviews: 28,
  },
  {
    id: 3,
    title: "Ye Wonz Maibel",
    year: 2021,
    rating: 3.9,
    imageUrl: "/placeholder-movie.jpg",
    genres: ["Drama", "Family"],
    director: "Hermon Hailay",
    status: "Released",
    watched: true,
    liked: false,
    inWatchlist: false,
    reviews: 15,
  },
];

export default function MoviesPage() {
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
            <Link href="/movies" className="flex items-center space-x-1 text-white">
              <Film className="h-4 w-4" />
              <span>Movies</span>
            </Link>
            <Link href="/stories" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <BookOpen className="h-4 w-4" />
              <span>Recent Stories</span>
            </Link>
           
            <Link href="/upcoming" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <Calendar className="h-4 w-4" />
              <span>Upcoming</span>
            </Link>
          </div>
          
        
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Header with search */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-yellow-500">Ethiopian Movies</h1>
              <Badge variant="outline" className="bg-gray-800 border-gray-700 text-yellow-500">
                <Film className="h-4 w-4 mr-2" />
                {movies.length} films
              </Badge>
            </div>
            
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-yellow-500" />
                <Input
                  placeholder="Search movies..."
                  className="pl-10 bg-gray-800 border-gray-700 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
              
              <Select>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <Filter className="mr-2 h-4 w-4 text-yellow-500" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="popular" className="hover:bg-yellow-500/10 focus:bg-yellow-500/10">Popular</SelectItem>
                  <SelectItem value="recent" className="hover:bg-yellow-500/10">Recently Added</SelectItem>
                  <SelectItem value="top-rated" className="hover:bg-yellow-500/10">Top Rated</SelectItem>
                  <SelectItem value="oldest" className="hover:bg-yellow-500/10">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main content tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-gray-800 border border-gray-700 gap-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900">
                All Films
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900">
                Recent
              </TabsTrigger>
              <TabsTrigger value="top-rated" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900">
                Top Rated
              </TabsTrigger>
              <TabsTrigger value="watchlist" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900">
                Watchlist
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="pt-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {movies.map((movie) => (
                  <Card key={movie.id} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors group">
                    <CardHeader className="p-0 relative">
                      <div className="aspect-[2/3] relative bg-gray-900 rounded-t-lg flex items-center justify-center overflow-hidden">
                        <Film className="h-12 w-12 text-gray-700 group-hover:text-yellow-500 transition-colors" />
                        <div className="absolute top-2 right-2 flex flex-col space-y-2">
                          {movie.watched && (
                            <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700">
                              <Eye className="h-4 w-4" />
                            </Badge>
                          )}
                          {movie.inWatchlist && (
                            <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700">
                              <List className="h-4 w-4" />
                            </Badge>
                          )}
                          {movie.liked && (
                            <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700">
                              <Heart className="h-4 w-4 fill-white" />
                            </Badge>
                          )}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-yellow-500 text-gray-900 px-2 py-1 rounded flex items-center">
                          <Star className="h-4 w-4 fill-gray-900 mr-1" />
                          <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg line-clamp-1 text-white hover:text-yellow-500 transition-colors">
                        {movie.title}
                      </CardTitle>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
                          {movie.year}
                        </span>
                        <Badge variant="outline" className="text-xs bg-gray-900 border-gray-700 text-yellow-500">
                          {movie.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-2 line-clamp-1">Dir. {movie.director}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {movie.genres.map((genre) => (
                          <Badge key={genre} variant="outline" className="text-xs bg-gray-900 border-gray-700">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center mt-3 text-xs text-gray-500">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{movie.reviews} reviews</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex space-x-2">
                      <Link href={`/movies/${movie.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full bg-gray-900 border-gray-700 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900">
                          View Details
                        </Button>
                      </Link>
                     
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Film className="h-6 w-6 text-yellow-500" />
              <h4 className="text-xl font-bold">Ethio<span className="text-yellow-500">Flix</span></h4>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">About</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
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