import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient()

const _addMessage = async (session_id, message_text) => {
  await prisma.message.create({
    data: {
      session_id,
      message_text
    }
  })
}

const addMessage = (session_id, message_text, callback) => {
  _addMessage(session_id, message_text)
    .catch(e => {
      callback({error: e, success: false})
    })
    .finally(async () => {
      await prisma.$disconnect()
      callback({success: true})
    })
  console.dir(message)
}

export { addMessage };
