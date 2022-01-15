export type ClientToServerEvents = {
  getStreamStatuses(): void
  loginWithToken(args: { token: string }): void
  loginWithPassword(args: { password: string }): void
}
