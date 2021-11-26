
const _getSummary = async (prisma, session_id) => {
  const sessionIdAndMotionDetected = {
    session_id: {
      equals: session_id
    },
    event_name: {
      equals: "motion_detected"
    }
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastRoomEvent = await prisma.event.findFirst({
    where: {
      AND: sessionIdAndMotionDetected
    },
    orderBy: {
      published_at: "desc"
    }
  })

  const firstEventToday = await prisma.event.findFirst({
    where: {
      AND: {
        ...sessionIdAndMotionDetected,
        published_at: {
          gte: today
        }
      }
    },
    orderBy: {
      published_at: "asc"
    }
  })

  const lastAteEvent = await prisma.event.findFirst({
    where: {
      AND: {
        session_id: {
          equals: session_id
        },
        event_name: {
          equals: "eaten"
        }
      }
    },
    orderBy: {
      published_at: "desc"
    }
  })

  const affirmationActionsToday = await prisma.action.findMany({
    where: {
      AND: {
        action_taken: {
          gte: today
        },
        type: {
          equals: "give_affirmation"
        }
      }
    }
  })
  const messagesReceived = affirmationActionsToday.map((action) => JSON.parse(action.body).message)

  return {
    last_room_entered: {
      room: lastRoomEvent.room,
      time: lastRoomEvent.published_at
    },
    time_woke_up: firstEventToday.published_at,
    messages_received_today: messagesReceived,
    last_ate: lastAteEvent.published_at
  }
}

const getSummary = async (prisma, session_id, callback) => {
  const summary = await _getSummary(prisma, session_id)
  callback(summary)
  console.dir(summary)
}

export { getSummary };
