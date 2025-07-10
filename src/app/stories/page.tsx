import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, CalendarDays, MessageSquare, Star, Film, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const recentStories = [
  {
    id: "1",
    title: "The Rise of Ethiopian Cinema",
    author: "Selam W.",
    date: "2023-11-15",
    excerpt: "Exploring how Ethiopian films are gaining international recognition through festivals and streaming platforms...",
    comments: 24,
    rating: 4.2,
    tags: ["Trends", "International"]
  },
  {
    id: "2",
    title: "Interview with Director Yared Zeleke",
    author: "Michael T.",
    date: "2023-10-28", 
    excerpt: "An exclusive conversation about his award-winning film 'Lamb' and the future of Ethiopian storytelling...",
    comments: 18,
    rating: 4.5,
    tags: ["Interview", "Director"]
  },
  {
    id: "3",
    title: "10 Must-Watch Ethiopian Films of 2023",
    author: "Amina K.",
    date: "2023-09-05",
    excerpt: "Our curated list of the most impactful releases this year, from dramas to documentaries...",
    comments: 42,
    rating: 4.8,
    tags: ["List", "Recommendations"]
  }
];

export default function StoriesPage() {
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
              <Film className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link href="/movies" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <Film className="h-4 w-4" />
              <span>Movies</span>
            </Link>
            <Link href="/stories" className="flex items-center space-x-1 text-yellow-500">
              <BookOpen className="h-4 w-4" />
              <span>Recent Stories</span>
            </Link>
            <Link href="/upcoming" className="flex items-center space-x-1 text-gray-300 hover:text-white">
              <CalendarDays className="h-4 w-4" />
              <span>Upcoming</span>
            </Link>
          </div>
          
         
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-yellow-500">Recent Stories</h1>
            <Badge variant="outline" className="bg-gray-800 border-gray-700 text-yellow-500">
              <BookOpen className="h-4 w-4 mr-2" />
              {recentStories.length} stories
            </Badge>
          </div>
          
          <div className="flex space-x-3 w-full md:w-auto">
           
            <Button variant="outline" className="text-yellow-500 border-gray-700 hover:bg-yellow-500/10">
              Filter
            </Button>
          </div>
        </div>
        
        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentStories.map((story) => (
            <Card 
              key={story.id} 
              className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors group"
            >
              <CardHeader>
                <h2 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors">
                  {story.title}
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rating and Comments */}
                <div className="flex items-center justify-between">
                  <div className="bg-yellow-500 text-gray-900 px-2 py-1 rounded flex items-center">
                    <Star className="h-4 w-4 fill-gray-900 mr-1" />
                    <span className="text-sm font-medium">{story.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="text-sm">{story.comments}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author and Date */}
                <div className="flex items-center space-x-4 text-gray-400 text-sm">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-yellow-500" />
                    {story.author}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-yellow-500" />
                    {story.date}
                  </span>
                </div>

                {/* Story Excerpt */}
                <p className="text-gray-300 line-clamp-3">{story.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
                <Link href={`/stories/${story.id}/discuss`} className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full text-yellow-500 border-gray-700 hover:bg-yellow-500 hover:text-gray-900"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Discuss
                  </Button>
                </Link>
                <Link href={`/stories/${story.id}`} className="w-full ml-3">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Full Story
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
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
              <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
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