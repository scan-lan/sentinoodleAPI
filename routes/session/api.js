
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


const _updateMessageWaitTime = (prisma, session_id, message_wait_period_minutes) => prisma.session.update({
  where: {
    id: session_id
  },
  data: {
    message_wait_period_minutes: message_wait_period_minutes
  }
})

const updateMessageWaitTime = async (prisma, session_id, message_wait_period_minutes, callback) => {
  const response = await _updateMessageWaitTime(prisma, session_id, message_wait_period_minutes)
  callback(response)
  console.dir(response)
}

export { getSession, updateMessageWaitTime };
