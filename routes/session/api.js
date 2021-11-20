
const _getSession = (prisma, device_id) => prisma.session.findFirst({
  where: {
    device_id: device_id
  },
  orderBy: {
    datetime_started: "desc"
  }
})

const getSession = async (prisma, device_id, callback) => {
  const message = await _getSession(prisma, device_id)
    .catch(e => {
      callback({error: e, success: false})
    })
  callback(message)
  console.dir(message)
}

export { getSession };
