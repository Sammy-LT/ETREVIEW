import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calendar, Film, ArrowLeft, Clock, Popcorn } from "lucide-react";
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { authClient } from "@/lib/auth-client";
import QuickStarRating from "@/components/QuickStarRating";

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = await prisma.movie.findUnique({
    where: { id: params.id },
  });

  if (!movie) {
    notFound();
  }

  
  const reviews = await prisma.review.findMany({
    where: { movieId: params.id },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
    : null;
    

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">

      <div className="container mx-auto px-4 py-8">
        
        <Link href="/movies">
          <Button variant="outline" className="mb-6 text-green-500 border-gray-700 hover:bg-green-500/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Films
          </Button>
        </Link>

        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
        
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-[2/3] bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800">
              {movie.imageUrl ? (
                <img src={movie.imageUrl} alt={movie.title} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <Film className="h-20 w-20 text-gray-700" />
                </div>
              )}
            </div>
          </div>

              
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-green-500">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-4 text-gray-400">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-green-500" />
                {movie.releaseYear || "N/A"}
              </span>
              {avgRating && (
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-green-500" />
                  {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </div>

              
            <div className="flex gap-3 mb-6">
              <QuickStarRating movieId={movie.id} />
              <Button variant="outline" className="text-green-500 border-gray-700 hover:bg-green-500/10">
                {/* You can add another action here if needed */}
              </Button>
            </div>

        
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-green-500">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>

           
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-500">Director</h3>
              <p className="text-gray-300">{movie.director || "Unknown"}</p>
            </div>
          </div>
        </div>

       
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-500">Reviews</h2>
            {avgRating && (
              <div className="flex items-center">
                <Star className="h-5 w-5 text-green-500 mr-1" />
                <span className="font-bold">{avgRating.toFixed(1)}</span>
                <span className="text-gray-400 ml-1">/ 5 from {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</span>
              </div>
            )}
          </div>

          <ReviewForm movieId={movie.id} />

          {reviews.length > 0 ? (
            <div className="space-y-6 mt-6">
              {reviews.map(r => (
                <Card key={r.id} className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < r.rating ? "fill-green-500 text-green-500" : "text-gray-700"}`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-green-500">{r.user?.name || "Anonymous"}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{r.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="py-8 text-center text-gray-500">
                No reviews yet. Be the first to review this film!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}