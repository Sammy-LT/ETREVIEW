import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, CalendarDays, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function StoryDetailsPage({ params }: { params: { id: string } }) {
  const story = await prisma.news.findUnique({
    where: { id: params.id },
  });

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Story not found</h1>
          <Link href="/stories">
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/stories">
          <Button variant="outline" className="mb-6 text-yellow-500 border-gray-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-3xl text-yellow-500">{story.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-400">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-yellow-500" />
                    {story.author}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-yellow-500" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {story.imageUrl && (
                  <img src={story.imageUrl} alt={story.title} className="w-full h-60 object-cover rounded mb-2" />
                )}
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Story Content */}
                <div className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: story.content.replace(/\n/g, '<br />') }}
                />
              </CardContent>
            </Card>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-500">About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{story.author}</h4>
                    <p className="text-sm text-gray-400">Film Journalist</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-300">
                  {story.author} has been covering Ethiopian cinema for over 5 years, with bylines in multiple international film publications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}