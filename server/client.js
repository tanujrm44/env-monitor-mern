import { createClient } from "redis"

const client = createClient({
  url: "redis://default:7Ggz115j2JkOtUSn8OWpJkJjI9slUfcv@redis-15642.c264.ap-south-1-1.ec2.redns.redis-cloud.com:15642",
})

const init = async () => {
  await client.connect()
}

init()

export default client
