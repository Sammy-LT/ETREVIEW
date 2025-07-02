import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Add a movie
  const movie = await prisma.movie.create({
    data: {
      title: 'Teza',
      originalTitle: 'ቴዛ',
      year: 2008,
      duration: 135,
      plot: 'An Ethiopian drama about exile and return.',
      country: 'Ethiopia',
      language: 'Amharic',
      poster: 'https://picsum.photos/300/450',
      imdbId: 'tt1234567',
    },
  });
  console.log('Movie created:', movie);

  // You can add more seeds here like users, reviews, genres, etc.
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
