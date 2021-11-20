
const _postMessage = (prisma, device_id, message_text) => prisma.message.create({
  data: {
    device_id: device_id,
    message_text: message_text
  }
})

const postMessage = async (prisma, device_id, message_text, callback) => {
  const message = await _postMessage(prisma, device_id, message_text)
    .catch(e => {
      callback({error: e, success: false});
    })
  if (message) callback(message);
  console.dir(message)
}

export { postMessage };
