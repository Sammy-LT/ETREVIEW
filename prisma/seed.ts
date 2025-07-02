import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const movieData = [
  {
    title: "Teza",
    originalTitle: "ቴዛ",
    year: 2008,
    duration: 135,
    plot: "An Ethiopian drama about exile and return.",
    country: "Ethiopia",
    language: "Amharic",
    poster: "https://picsum.photos/300/450",
    imdbId: "tt1234567",
  },
  {
    title: "Difret",
    originalTitle: "ድፍረት",
    year: 2014,
    duration: 99,
    plot: "A true story of a young Ethiopian girl on trial for killing her would-be husband.",
    poster: "https://picsum.photos/300/450?2",
    imdbId: "tt3124780",
  },
];

export async function main() {
  for (const m of movieData) {
    await prisma.movie.create({ data: m });
  }
}

main()
  .then(() => {
    console.log("Seed data inserted successfully.");
  })
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
