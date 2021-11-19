import pkg from '@prisma/client';
const { PrismaClient } = pkg;


const prisma = new PrismaClient()

const _getSession = async (device_id) => {
  return await prisma.session.findFirst({
    where: {
      device_id: device_id
    },
    orderBy: {
      datetime_started: "desc"
    }
  })
}

const getSession = async (device_id, callback) => {
  const message = await _getSession(device_id)
    .catch(e => {
      callback({error: e, success: false})
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
  callback(message)
  console.dir(message)
}

export { getSession };
