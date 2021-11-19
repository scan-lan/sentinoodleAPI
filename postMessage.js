import pkg from '@prisma/client';


const { PrismaClient } = pkg;
const prisma = new PrismaClient()

const main = async () => {
  const allEvents = await prisma.event.findMany()
  console.dir(allEvents)
}

const postMessage = () => {
  main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
}

export default postMessage;
