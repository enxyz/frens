import React from 'react'
import { View } from 'react-native'

import beapi from '@berty/api'
import { ChatDate } from '@berty/components/chat/ChatDate'
import { MessageSystemWrapper } from '@berty/components/chat/message/MessageSystemWrapper'
import { useStyles } from '@berty/contexts/styles'
import { useThemeColor } from '@berty/hooks'

import { UnifiedText } from '../shared-components/UnifiedText'

export const InfosMultiMember: React.FC<beapi.messenger.IConversation> = ({
	createdDate: createdDateStr,
}) => {
	const { margin, text, flex } = useStyles()
	const colors = useThemeColor()
	const createdDate = parseInt(createdDateStr as unknown as string, 10)
	const textColor = colors['background-header']
	return (
		<View style={[flex.align.center, flex.justify.center]}>
			<ChatDate date={createdDate} />
			<MessageSystemWrapper styleContainer={[margin.top.large, margin.bottom.medium]}>
				<UnifiedText style={[text.align.center, { color: textColor }]}>
					Group joined! 👍
				</UnifiedText>
			</MessageSystemWrapper>
		</View>
	)
}
