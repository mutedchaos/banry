export interface StreamStatus {
  service: string
  name: string
  description: string
  onlineSince: string | null
  offlineSince: string | null
}
