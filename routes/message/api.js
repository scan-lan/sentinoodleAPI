
const _getMessages = (prisma, session_id) => prisma.message.findMany({
  where: {
    session_id: session_id
  }
})

const getMessages = async (prisma, session_id, callback) => {
  const messages = await _getMessages(prisma, session_id)
  callback(messages)
  console.log(messages)
}

const _postMessage = (prisma, session_id, message_text) => prisma.message.create({
  data: {
    session_id: session_id,
    message_text: message_text
  }
})

const postMessage = async (prisma, session_id, message_text, callback) => {
  const message = await _postMessage(prisma, session_id, message_text)
    .catch(e => {
      callback({error: e, success: false});
    })
  if (message) callback(message);
  console.dir(message)
}

export { getMessages, postMessage };
