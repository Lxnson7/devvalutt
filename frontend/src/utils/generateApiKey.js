export function generateApiKey() {
  const prefix = 'dk_' // DevKey prefix
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 15)
  const randomPart2 = Math.random().toString(36).substring(2, 15)
  
  return `${prefix}${timestamp}_${randomPart}${randomPart2}`
}
