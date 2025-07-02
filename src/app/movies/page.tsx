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
import { Star, Search, Filter, Calendar, Film } from "lucide-react";

const movies = [
  {
    id: 1,
    title: "Yewendoch Guday",
    year: 2023,
    rating: 4.2,
    imageUrl: "/placeholder-movie.jpg",
    genres: ["Drama", "Romance"],
    director: "Yonas Birhane",
  },
  {
    id: 2,
    title: "Sew Le Sew",
    year: 2022,
    rating: 4.5,
    imageUrl: "/placeholder-movie.jpg",
    genres: ["Comedy", "Drama"],
    director: "Ephrem Amare",
  },
  {
    id: 3,
    title: "Ye Wonz Maibel",
    year: 2021,
    rating: 3.9,
    imageUrl: "/placeholder-movie.jpg",
    genres: ["Drama", "Family"],
    director: "Hermon Hailay",
  },
];

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Header with search and filters */}
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-3xl font-bold text-[#00d26a]">Ethiopian Movies</h1>
            
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search movies..."
                  className="pl-10 bg-[#1a1a1a] border-[#333] focus:border-[#00d26a]"
                />
              </div>
              
              <Select>
                <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#333]">
                  <Filter className="mr-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#333] text-white">
                  <SelectItem value="popular" className="hover:bg-[#00d26a]/10">Popular</SelectItem>
                  <SelectItem value="recent" className="hover:bg-[#00d26a]/10">Recently Added</SelectItem>
                  <SelectItem value="top-rated" className="hover:bg-[#00d26a]/10">Top Rated</SelectItem>
                  <SelectItem value="oldest" className="hover:bg-[#00d26a]/10">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main content tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-[#1a1a1a] border border-[#333]">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#00d26a] data-[state=active]:text-black">
                All Movies
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-[#00d26a] data-[state=active]:text-black">
                Recent Releases
              </TabsTrigger>
              <TabsTrigger value="top-rated" className="data-[state=active]:bg-[#00d26a] data-[state=active]:text-black">
                Top Rated
              </TabsTrigger>
              <TabsTrigger value="genres" className="data-[state=active]:bg-[#00d26a] data-[state=active]:text-black">
                Genres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="pt-4">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {movies.map((movie) => (
                  <Card key={movie.id} className="bg-[#1a1a1a] border-[#333] hover:border-[#00d26a] transition-colors hover:shadow-[0_0_15px_rgba(0,210,106,0.2)]">
                    <CardHeader className="p-0 relative">
                      <div className="aspect-[2/3] relative bg-[#0a0a0a] rounded-t-lg flex items-center justify-center">
                        <Film className="h-12 w-12 text-[#333]" />
                        <div className="absolute bottom-2 left-2 bg-[#00d26a] text-black px-2 py-1 rounded flex items-center">
                          <Star className="h-4 w-4 fill-black mr-1" />
                          <span className="text-sm font-medium">{movie.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg line-clamp-1 text-white">{movie.title}</CardTitle>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-400 flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-[#00d26a]" />
                          {movie.year}
                        </span>
                        <div className="flex space-x-1">
                          {movie.genres.slice(0, 2).map((genre) => (
                            <Badge key={genre} variant="outline" className="text-xs bg-[#0a0a0a] border-[#333] text-[#00d26a]">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2 line-clamp-1">{movie.director}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button variant="outline" className="w-full bg-[#0a0a0a] border-[#333] text-[#00d26a] hover:bg-[#00d26a] hover:text-black">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Add other tabs content here */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}