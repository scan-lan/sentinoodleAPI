import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient()

const _addMessage = async (device_id, message_text) => {
  return await prisma.message.create({
    data: {
      device_id,
      message_text
    }
  })
}

const addMessage = async (device_id, message_text, callback) => {
  const message = await _addMessage(device_id, message_text)
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
