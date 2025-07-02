import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, CalendarDays, MessageSquare, Star } from "lucide-react";

const recentStories = [
  {
    id: 1,
    title: "The Rise of Ethiopian Cinema",
    author: "Selam W.",
    date: "2023-11-15",
    excerpt: "Exploring how Ethiopian films are gaining international recognition through festivals and streaming platforms...",
    comments: 24,
    rating: 4.2
  },
  {
    id: 2,
    title: "Interview with Director Yared Zeleke",
    author: "Michael T.",
    date: "2023-10-28", 
    excerpt: "An exclusive conversation about his award-winning film 'Lamb' and the future of Ethiopian storytelling...",
    comments: 18,
    rating: 4.5
  },
  {
    id: 3,
    title: "10 Must-Watch Ethiopian Films of 2023",
    author: "Amina K.",
    date: "2023-09-05",
    excerpt: "Our curated list of the most impactful releases this year, from dramas to documentaries...",
    comments: 42,
    rating: 4.8
  }
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Letterboxd-style title */}
        <div className="flex justify-between items-center mb-8 border-b border-[#333] pb-4">
          <h1 className="text-3xl font-bold text-[#00d26a]">Recent Stories</h1>
          <Button className="bg-[#00d26a] hover:bg-[#00a355] text-black">
            Submit Story
          </Button>
        </div>
        
        {/* Stories grid with Letterboxd styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentStories.map((story) => (
            <Card 
              key={story.id} 
              className="bg-[#1a1a1a] border-[#333] hover:border-[#00d26a] transition-colors hover:shadow-[0_0_15px_rgba(0,210,106,0.2)]"
            >
              <CardHeader>
                <h2 className="text-xl font-semibold text-white">{story.title}</h2>
              </CardHeader>
              <CardContent>
                {/* Rating badge */}
                <div className="flex items-center mb-3">
                  <div className="bg-[#00d26a] text-black px-2 py-1 rounded flex items-center mr-3">
                    <Star className="h-4 w-4 fill-black mr-1" />
                    <span className="text-sm font-medium">{story.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-[#00d26a]">
                    {story.comments} comments
                  </span>
                </div>

                {/* Author and date */}
                <div className="flex items-center space-x-4 mb-4 text-gray-400">
                  <span className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-1 text-[#00d26a]" />
                    {story.author}
                  </span>
                  <span className="flex items-center text-sm">
                    <CalendarDays className="h-4 w-4 mr-1 text-[#00d26a]" />
                    {story.date}
                  </span>
                </div>

                {/* Story excerpt */}
                <p className="text-gray-300 mb-4">{story.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-[#333] pt-4">
                <Button 
                  variant="outline" 
                  className="text-[#00d26a] border-[#333] hover:bg-[#00d26a] hover:text-black"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discuss
                </Button>
                <Button className="bg-[#00d26a] hover:bg-[#00a355] text-black">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Full Story
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}