"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, CalendarDays, Film, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function StoriesPageClient({ initialNews, isAdmin }: { initialNews: any[]; isAdmin: boolean }) {
  const [news, setNews] = useState(initialNews);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;
    setDeletingId(id);
    const res = await fetch("/api/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);
    if (res.ok) {
      setNews((prev) => prev.filter((n) => n.id !== id));
    } else {
      alert("Failed to delete news");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
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
              <span>News</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-yellow-500">News</h1>
            <Badge variant="outline" className="bg-gray-800 border-gray-700 text-yellow-500">
              <BookOpen className="h-4 w-4 mr-2" />
              {news.length} stories
            </Badge>
            {isAdmin && (
              <Link href="/admin/add-news">
                <button className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded shadow flex items-center">
                  <Plus className="h-4 w-4 mr-2" /> Add News
                </button>
              </Link>
            )}
          </div>
          <div className="flex space-x-3 w-full md:w-auto">
            <Button variant="outline" className="text-yellow-500 border-gray-700 hover:bg-yellow-500/10">
              Filter
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((story: any) => (
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
                {story.imageUrl && (
                  <img src={story.imageUrl} alt={story.title} className="w-full h-40 object-cover rounded mb-2" />
                )}
                <div className="flex flex-wrap gap-2">
                  {story.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-gray-400 text-sm">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-yellow-500" />
                    {story.author}
                  </span>
                  <span className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1 text-yellow-500" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300 line-clamp-3">{story.content.slice(0, 120)}...</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-700 pt-4 gap-2">
                <Link href={`/stories/${story.id}`} className="w-full ml-3">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Full Story
                  </Button>
                </Link>
                {isAdmin && (
                  <Button
                    variant="destructive"
                    className="ml-2 flex items-center"
                    onClick={() => handleDelete(story.id)}
                    disabled={deletingId === story.id}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {deletingId === story.id ? "Deleting..." : "Delete"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
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