import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const ethiopianMovies = [
  {
    title: "አትሸኟትም �ይ? Atesheguatem Wey?",
    year: 2020,
    plot: "Ethiopian drama film",
    poster: "https://vhx.imgix.net/sodere/assets/7f3d4c58-3d1b-4a6a-9aed-97b33cbcf33f.jpg",
    videoLink: "https://www.sodere.com/classic-movies-2/videos/atesheguatem-wey-ethiopian-film-2020",
    country: "Ethiopia",
    language: "Amharic"
  },
  {
    title: "Fiker Endabede",
    year: 2015, // Adjust year as needed
    plot: "Classic Ethiopian romance",
    poster: "https://vhx.imgix.net/sodere/assets/7d016407-1452-4614-bcee-bd59fa76214d/fikerendabde345.png",
    videoLink: "https://www.sodere.com/classic-movies-2/videos/fiker-endabede-full",
    country: "Ethiopia",
    language: "Amharic"
  },

]

async function main() {
  console.log(`Start seeding...`)
  
  for (const movie of ethiopianMovies) {
    const createdMovie = await prisma.movie.create({
      data: {
        title: movie.title,
        year: movie.year,
        plot: movie.plot,
        poster: movie.poster,
        country: movie.country,
        language: movie.language,
        // Add relations if needed
      }
    })
    console.log(`Created movie: ${createdMovie.title}`)
  }
  console.log(`Seeding completed.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })