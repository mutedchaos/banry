import { StreamStatus } from '@banry/common'

export type StreamIdentifier = Pick<StreamStatus, 'service' | 'name'>
