export const convertMinutesAgo = (timestamp) => {
  const now = new Date() // Current time
  const past = new Date(timestamp) // Convert timestamp to Date object
  const differenceInMs = now.getTime() - past.getTime() // Difference in milliseconds
  return Math.floor(differenceInMs / 60000) // Convert to minutes
}
