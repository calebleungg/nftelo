import pino from "pino"

const logger = pino({
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
})

export default logger