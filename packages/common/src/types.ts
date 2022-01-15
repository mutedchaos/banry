export interface StreamStatus {
  service: string
  name: string
  description: string
  onlineSince: Date | null
  offlineSince: Date | null
}
