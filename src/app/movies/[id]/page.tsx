import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calendar, Film, ArrowLeft, Heart, List, Eye, Clock } from "lucide-react";
import Link from "next/link";

// Mock data - in a real app you'd fetch this based on params.id
const getMovieDetails = (id: string) => {
  const movies = [
    {
      id: "1",
      title: "Yewendoch Guday",
      year: 2023,
      rating: 4.2,
      imageUrl: "/placeholder-movie.jpg",
      genres: ["Drama", "Romance"],
      director: "Yonas Birhane",
      status: "Released",
      description: "A romantic drama exploring modern relationships in Addis Ababa. The film follows two young professionals navigating love and career in contemporary Ethiopia.",
      duration: "128 min",
      language: "Amharic",
      cast: ["Dagmawi Asfaw", "Hirut Assefa", "Mikiyas Wolde"],
      reviews: [
        { user: "Selam", rating: 5, comment: "Beautiful storytelling and cinematography!" },
        { user: "Abel", rating: 4, comment: "Great performances by the lead actors" }
      ]
    },
    {
      id: "2",
      title: "Sew Le Sew",
      year: 2022,
      rating: 4.5,
      imageUrl: "/placeholder-movie.jpg",
      genres: ["Comedy", "Drama"],
      director: "Ephrem Amare",
      status: "Released",
      description: "Hilarious comedy about mistaken identities in contemporary Ethiopia. Full of witty dialogue and cultural references.",
      duration: "112 min",
      language: "Amharic",
      cast: ["Ephrem Amare", "Selam Tesfaye", "Dawit Wolde"],
      reviews: [
        { user: "Tewodros", rating: 5, comment: "Laughed from start to finish!" }
      ]
    },
    {
      id: "3",
      title: "Ye Wonz Maibel",
      year: 2021,
      rating: 3.9,
      imageUrl: "/placeholder-movie.jpg",
      genres: ["Drama", "Family"],
      director: "Hermon Hailay",
      status: "Released",
      description: "Heartwarming family drama set during the Ethiopian rainy season. Explores themes of tradition and change.",
      duration: "105 min",
      language: "Amharic",
      cast: ["Hermon Hailay", "Alemtsehay Wedajo", "Yohannes Tilahun"],
      reviews: []
    }
  ];
  return movies.find(movie => movie.id === id);
};

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = getMovieDetails(params.id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Link href="/movies">
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              Back to Movies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/movies">
          <Button variant="outline" className="mb-6 text-yellow-500 border-gray-700 hover:bg-yellow-500/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Movies
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-3xl text-yellow-500">{movie.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-yellow-500" />
                    {movie.year}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                    {movie.duration}
                  </span>
                  <span className="flex items-center bg-yellow-500 text-gray-900 px-2 py-1 rounded">
                    <Star className="h-4 w-4 fill-gray-900 mr-1" />
                    {movie.rating.toFixed(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
                
                {/* Synopsis */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-yellow-500">Synopsis</h3>
                  <p className="text-gray-300">{movie.description}</p>
                </div>
                
                {/* Cast */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-yellow-500">Cast</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {movie.cast.map((actor) => (
                      <div key={actor} className="text-sm bg-gray-700/50 rounded p-2">
                        {actor}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reviews Section */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-yellow-500">
                      Reviews ({movie.reviews.length})
                    </h3>
                    <Button variant="outline" className="text-yellow-500 border-gray-700 hover:bg-yellow-500/10">
                      Write a Review
                    </Button>
                  </div>
                  
                  {movie.reviews.length > 0 ? (
                    movie.reviews.map((review, index) => (
                      <div key={index} className="mb-6 pb-6 border-b border-gray-700 last:border-0">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center mr-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-500' : 'fill-yellow-500/20'} text-yellow-500`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.user}</span>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No reviews yet. Be the first to review!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Movie Poster */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="aspect-[2/3] bg-gray-900 rounded-lg flex items-center justify-center">
                  <Film className="h-20 w-20 text-gray-700" />
                </div>
              </CardContent>
            </Card>
            
            {/* Action Buttons */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favorites
                </Button>
                <Button variant="outline" className="w-full text-yellow-500 border-gray-700 hover:bg-yellow-500/10">
                  <List className="h-4 w-4 mr-2" />
                  Add to Watchlist
                </Button>
                <Button variant="outline" className="w-full text-yellow-500 border-gray-700 hover:bg-yellow-500/10">
                  <Eye className="h-4 w-4 mr-2" />
                  Mark as Watched
                </Button>
              </CardContent>
            </Card>
            
            {/* Movie Details */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-500">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Director:</span>
                  <span>{movie.director}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-yellow-500">{movie.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span>{movie.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span>{movie.duration}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Rating Widget */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-500">Rate This Movie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="hover:scale-110 transition-transform">
                      <Star className="h-8 w-8 text-yellow-500 fill-yellow-500/20 hover:fill-yellow-500" />
                    </button>
                  ))}
                </div>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Submit Rating
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}