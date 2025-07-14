"use client";

import React, { useState, useRef } from "react";

export default function AddMovieForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess("Movie added successfully!");
        form.reset();
      } else {
        setError(result.error || "Failed to add movie");
      }
    } catch (err) {
      setError("Failed to add movie");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
      <h1 className="text-3xl font-bold mb-6">Add a New Movie</h1>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit} ref={formRef}>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input name="title" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Director</label>
          <input name="director" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Release Year</label>
          <input name="releaseYear" type="number" className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input name="imageUrl" className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Movie"}
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
} 