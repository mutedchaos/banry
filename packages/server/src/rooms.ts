export const ROOM_UNAUTHENTICATED = 'unauthenticated'
export const ROOM_USERS = 'users'

export function getUserRoom(userId: string) {
  return `user:${userId}`
}
