import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, CalendarDays, MessageSquare, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock data - in a real app you'd fetch this based on params.id
const getStoryDetails = (id: string) => {
  const stories = [
    {
      id: "1",
      title: "The Rise of Ethiopian Cinema",
      author: "Selam W.",
      date: "November 15, 2023",
      content: `
        <p>Ethiopian cinema has been undergoing a remarkable transformation in recent years. What began as a small industry primarily producing local dramas has now expanded to include internationally acclaimed films that compete at major festivals worldwide.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-500">International Recognition</h3>
        <p>Films like "Lamb" by Yared Zeleke and "The Price of Love" by Hermon Hailay have put Ethiopian cinema on the global map. These works showcase unique storytelling perspectives that blend traditional Ethiopian narratives with universal themes.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-500">Streaming Platforms</h3>
        <p>With the rise of streaming platforms, Ethiopian films are reaching wider audiences than ever before. Services like Netflix and Amazon Prime have begun acquiring distribution rights to select Ethiopian productions.</p>
        
        <p className="mt-6">The future looks bright as a new generation of filmmakers emerges from film schools across the country, bringing fresh perspectives and technical expertise to the industry.</p>
      `,
      comments: 24,
      rating: 4.2,
      tags: ["Cinema", "Trends", "International"]
    },
    // ... other stories
  ];
  return stories.find(story => story.id === id);
};

export default function StoryDetailsPage({ params }: { params: { id: string } }) {
  const story = getStoryDetails(params.id);

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
                    {story.date}
                  </span>
                  <span className="flex items-center bg-yellow-500 text-gray-900 px-2 py-1 rounded">
                    <Star className="h-4 w-4 fill-gray-900 mr-1" />
                    {story.rating.toFixed(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Story Content */}
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: story.content }}
                />
                
                {/* Comments Section */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-yellow-500">
                      Comments ({story.comments})
                    </h3>
                    <Button variant="outline" className="text-yellow-500 border-gray-700 hover:bg-yellow-500/10">
                      Add Comment
                    </Button>
                  </div>
                  
                  {/* Comment List - would be dynamic in a real app */}
                  <div className="space-y-4">
                    <div className="border-b border-gray-700 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? 'fill-yellow-500' : 'fill-yellow-500/20'} text-yellow-500`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">User123</span>
                      </div>
                      <p className="text-gray-300">This was such an insightful article! I had no idea Ethiopian cinema was getting this much international attention.</p>
                    </div>
                  </div>
                </div>
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
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-500">Related Stories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b border-gray-700 pb-4">
                  <h4 className="font-medium hover:text-yellow-500 cursor-pointer">Interview with Director Yared Zeleke</h4>
                  <p className="text-sm text-gray-400 mt-1">October 28, 2023</p>
                </div>
                <div className="border-b border-gray-700 pb-4">
                  <h4 className="font-medium hover:text-yellow-500 cursor-pointer">10 Must-Watch Ethiopian Films of 2023</h4>
                  <p className="text-sm text-gray-400 mt-1">September 5, 2023</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}