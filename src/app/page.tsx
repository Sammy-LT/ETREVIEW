import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Star, Popcorn, Search, Calendar, Users, Home as HomeIcon } from "lucide-react";

export default function Home() {
  const trendingMovies = [
    {
      id: 1,
      title: "The Athlete",
      year: 2009,
      director: "Davey Frankel",
      rating: 4.2,
      poster: "/placeholder.jpg"
    },
    { 
      id: 2,
      title: "Lamb",
      year: 2015,
      director: "Yared Zeleke",
      rating: 3.9,
      poster: "/placeholder.jpg"
    },
    {
      id: 3,
      title: "Difret",
      year: 2014,
      director: "Zeresenay Berhane Mehari",
      rating: 4.1,
      poster: "/placeholder.jpg"
    },
    {
      id: 4,
      title: "Price of Love",
      year: 2015,
      director: "Hermon Hailay",
      rating: 3.7,
      poster: "/placeholder.jpg"
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
            <h1 className="text-2xl font-bold">Ethio<span className="text-yellow-500">Flix</span></h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <Film className="h-4 w-4" />
              <span>Movies</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </a>
            <a href="#" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <Calendar className="h-4 w-4" />
              <span>Upcoming</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex">
              Sign In
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              Sign Up
            </Button>
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
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="trending" className="data-[state=active]:bg-gray-700">
              <Popcorn className="h-4 w-4 mr-2" />
              Trending Movies
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-gray-700">
              <Star className="h-4 w-4 mr-2" />
              Recent Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {trendingMovies.map((movie) => (
                <Card key={movie.id} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
                  <CardHeader>
                    <div className="aspect-[2/3] bg-gray-700 rounded-md flex items-center justify-center">
                      <Film className="h-12 w-12 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg">{movie.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {movie.year} • {movie.director}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{movie.rating}</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-600">
                      Review
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-6 mt-6">
              {recentReviews.map((review) => (
                <Card key={review.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{review.movie}</CardTitle>
                        <CardDescription className="text-gray-400">
                          Review by {review.user} • {review.date}
                        </CardDescription>
                      </div>
                      <div className="flex items-center bg-gray-700 px-2 py-1 rounded">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">"{review.comment}"</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="text-yellow-500">
                      Read full review
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to start tracking your Ethiopian movie journey?</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of Ethiopian cinema enthusiasts and share your passion for film.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-yellow-600 hover:bg-yellow-700 px-8 py-6 text-lg">
              Sign Up - It's Free
            </Button>
            <Button variant="outline" className="border-gray-500 px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
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