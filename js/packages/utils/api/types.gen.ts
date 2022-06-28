import beapi from '@berty/api'

export type StreamEventPayloadType<T> = T extends beapi.messenger.StreamEvent.Type.Undefined
	? undefined
	: T extends beapi.messenger.StreamEvent.Type.TypeListEnded
	? beapi.messenger.StreamEvent.IListEnded
	: T extends beapi.messenger.StreamEvent.Type.TypeConversationUpdated
	? beapi.messenger.StreamEvent.IConversationUpdated
	: T extends beapi.messenger.StreamEvent.Type.TypeConversationDeleted
	? beapi.messenger.StreamEvent.IConversationDeleted
	: T extends beapi.messenger.StreamEvent.Type.TypeInteractionUpdated
	? beapi.messenger.StreamEvent.IInteractionUpdated
	: T extends beapi.messenger.StreamEvent.Type.TypeInteractionDeleted
	? beapi.messenger.StreamEvent.IInteractionDeleted
	: T extends beapi.messenger.StreamEvent.Type.TypeContactUpdated
	? beapi.messenger.StreamEvent.IContactUpdated
	: T extends beapi.messenger.StreamEvent.Type.TypeAccountUpdated
	? beapi.messenger.StreamEvent.IAccountUpdated
	: T extends beapi.messenger.StreamEvent.Type.TypeMemberUpdated
	? beapi.messenger.StreamEvent.IMemberUpdated
	: T extends beapi.messenger.StreamEvent.Type.TypeDeviceUpdated
	? beapi.messenger.StreamEvent.IDeviceUpdated
	: T extends beapi.messenger.StreamEvent.Type.TypeNotified
	? beapi.messenger.StreamEvent.INotified
	: T extends beapi.messenger.StreamEvent.Type.TypeMediaUpdated
	? beapi.messenger.StreamEvent.IMediaUpdated
	: T extends beapi.messenger.StreamEvent.Type.TypeConversationPartialLoad
	? beapi.messenger.StreamEvent.IConversationPartialLoad
	: never

export type StreamEventNotifiedPayloadType<T> =
	T extends beapi.messenger.StreamEvent.Notified.Type.Unknown
		? undefined
		: T extends beapi.messenger.StreamEvent.Notified.Type.TypeBasic
		? beapi.messenger.StreamEvent.Notified.IBasic
		: T extends beapi.messenger.StreamEvent.Notified.Type.TypeMessageReceived
		? beapi.messenger.StreamEvent.Notified.IMessageReceived
		: T extends beapi.messenger.StreamEvent.Notified.Type.TypeContactRequestSent
		? beapi.messenger.StreamEvent.Notified.IContactRequestSent
		: T extends beapi.messenger.StreamEvent.Notified.Type.TypeContactRequestReceived
		? beapi.messenger.StreamEvent.Notified.IContactRequestReceived
		: T extends beapi.messenger.StreamEvent.Notified.Type.TypeGroupInvitation
		? beapi.messenger.StreamEvent.Notified.IGroupInvitation
		: never

export type AppMessagePayloadType<T> = T extends beapi.messenger.AppMessage.Type.Undefined
	? undefined
	: T extends beapi.messenger.AppMessage.Type.TypeUserMessage
	? beapi.messenger.AppMessage.IUserMessage
	: T extends beapi.messenger.AppMessage.Type.TypeUserReaction
	? beapi.messenger.AppMessage.IUserReaction
	: T extends beapi.messenger.AppMessage.Type.TypeGroupInvitation
	? beapi.messenger.AppMessage.IGroupInvitation
	: T extends beapi.messenger.AppMessage.Type.TypeSetGroupInfo
	? beapi.messenger.AppMessage.ISetGroupInfo
	: T extends beapi.messenger.AppMessage.Type.TypeSetUserInfo
	? beapi.messenger.AppMessage.ISetUserInfo
	: T extends beapi.messenger.AppMessage.Type.TypeAcknowledge
	? beapi.messenger.AppMessage.IAcknowledge
	: T extends beapi.messenger.AppMessage.Type.TypeReplyOptions
	? beapi.messenger.AppMessage.IReplyOptions
	: T extends beapi.messenger.AppMessage.Type.TypeMonitorMetadata
	? beapi.messenger.AppMessage.IMonitorMetadata
	: never

export type MonitorGroupPayloadType<T> =
	T extends beapi.protocol.MonitorGroup.TypeEventMonitor.TypeEventMonitorUndefined
		? undefined
		: T extends beapi.protocol.MonitorGroup.TypeEventMonitor.TypeEventMonitorAdvertiseGroup
		? beapi.protocol.MonitorGroup.IEventMonitorAdvertiseGroup
		: T extends beapi.protocol.MonitorGroup.TypeEventMonitor.TypeEventMonitorPeerFound
		? beapi.protocol.MonitorGroup.IEventMonitorPeerFound
		: T extends beapi.protocol.MonitorGroup.TypeEventMonitor.TypeEventMonitorPeerJoin
		? beapi.protocol.MonitorGroup.IEventMonitorPeerJoin
		: T extends beapi.protocol.MonitorGroup.TypeEventMonitor.TypeEventMonitorPeerLeave
		? beapi.protocol.MonitorGroup.IEventMonitorPeerLeave
		: never

export type InteractionUndefined = {
	type: beapi.messenger.AppMessage.Type.Undefined
	payload?: undefined
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>
export type InteractionUserMessage = {
	type: beapi.messenger.AppMessage.Type.TypeUserMessage
	payload?: beapi.messenger.AppMessage.IUserMessage
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>
export type InteractionUserReaction = {
	type: beapi.messenger.AppMessage.Type.TypeUserReaction
	payload?: beapi.messenger.AppMessage.IUserReaction
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>
export type InteractionGroupInvitation = {
	type: beapi.messenger.AppMessage.Type.TypeGroupInvitation
	payload?: beapi.messenger.AppMessage.IGroupInvitation
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>
export type InteractionSetGroupInfo = {
	type: beapi.messenger.AppMessage.Type.TypeSetGroupInfo
	payload?: beapi.messenger.AppMessage.ISetGroupInfo
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>
export type InteractionSetUserInfo = {
	type: beapi.messenger.AppMessage.Type.TypeSetUserInfo
	payload?: beapi.messenger.AppMessage.ISetUserInfo
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>
export type InteractionAcknowledge = {
	type: beapi.messenger.AppMessage.Type.TypeAcknowledge
	payload?: beapi.messenger.AppMessage.IAcknowledge
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>
export type InteractionReplyOptions = {
	type: beapi.messenger.AppMessage.Type.TypeReplyOptions
	payload?: beapi.messenger.AppMessage.IReplyOptions
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>
export type InteractionMonitorMetadata = {
	type: beapi.messenger.AppMessage.Type.TypeMonitorMetadata
	payload?: beapi.messenger.AppMessage.IMonitorMetadata
} & Omit<beapi.messenger.IInteraction, 'payload' | 'type'>

export type ParsedInteraction =
	| InteractionUndefined
	| InteractionUserMessage
	| InteractionUserReaction
	| InteractionGroupInvitation
	| InteractionSetGroupInfo
	| InteractionSetUserInfo
	| InteractionAcknowledge
	| InteractionReplyOptions
	| InteractionMonitorMetadata
