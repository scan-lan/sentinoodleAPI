
const _getSession = (prisma, device_id) => prisma.session.findFirst({
  where: {
    device_id: device_id
  },
  orderBy: {
    datetime_started: "desc"
  }
})

const getSession = async (prisma, device_id, callback) => {
  const session = await _getSession(prisma, device_id)
    .catch(e => {
      callback({error: e, success: false})
    })
  callback(session)
  console.dir(session)
}

export { getSession };
