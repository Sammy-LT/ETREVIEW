import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Calendar, Film, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm";
import { Badge } from "@/components/ui/badge";
import StarRating from "@/components/StarRating";
import { authClient } from "@/lib/auth-client";
import QuickStarRating from "@/components/QuickStarRating";
import PaginatedReviews from "@/components/PaginatedReviews";

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
          <PaginatedReviews movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}