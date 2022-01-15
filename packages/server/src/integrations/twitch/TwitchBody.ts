type TwitchBodyCommon<T> = {
  subscription: {
    id: string
    status: string
    type: T
    version: string
    cost: number
    condition: any
    transport: any
    created_at: string
  }
  challenge?: string
}

export type TwitchStreamOnline = TwitchBodyCommon<'stream.online'> & {
  event: {
    id: string
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
    type: string
    started_at: string
  }
}

export type TwitchStreamOffline = TwitchBodyCommon<'stream.offline'> & {
  event: {
    broadcaster_user_id: string
    broadcaster_user_login: string
    broadcaster_user_name: string
  }
}

export type TwitchChannelUpdate =
  | TwitchBodyCommon<'channel.update'> & {
      event: {
        broadcaster_user_id: string
        broadcaster_user_login: string
        broadcaster_user_name: string
        title: string
        language: string
        category_id: string
        category_name: string
        is_mature: boolean
      }
    }

export type TwitchBody = TwitchStreamOnline | TwitchStreamOffline | TwitchChannelUpdate
