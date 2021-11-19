import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient()

const _addMessage = async (session_id, message_text) => {
  return await prisma.message.create({
    data: {
      session_id,
      message_text
    }
  })
}

const addMessage = async (session_id, message_text, callback) => {
  const message = await _addMessage(session_id, message_text)
    .catch(e => {
      callback({error: e, success: false})
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
  callback(message)
  console.dir(message)
}

export { addMessage };