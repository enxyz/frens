import { Layout, Icon } from '@ui-kitten/components'
import React from 'react'
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'

import beapi from '@berty/api'
import { UnifiedText } from '@berty/components/shared-components/UnifiedText'
import { useAppDimensions } from '@berty/contexts/app-dimensions.context'
import { useStyles } from '@berty/contexts/styles'
import { bertyMethodsHooks, useMountEffect, useThemeColor } from '@berty/hooks'
import { ScreenFC } from '@berty/navigation'
import { accountClient } from '@berty/utils/accounts/accountClient'

export const SystemInfo: ScreenFC<'Settings.SystemInfo'> = ({ navigation }) => {
	const { padding } = useStyles()
	const { scaleSize } = useAppDimensions()
	const colors = useThemeColor()
	const { reply: systemInfo, done, error, call } = bertyMethodsHooks.useSystemInfo()
	const [networkConfig, setNetworkConfig] = React.useState<beapi.account.INetworkConfig | null>(
		null,
	)

	useMountEffect(() => {
		const getNetworkConfig = async () => {
			// with an empty accountId the function returns default config
			const defaultConfig = await accountClient.networkConfigGet({ accountId: '' })
			console.log('defaultConfig', defaultConfig.currentConfig)
			if (defaultConfig.currentConfig) {
				setNetworkConfig(defaultConfig?.currentConfig)
			}
		}

		getNetworkConfig()
	})

	React.useEffect(() => {
		call()
	}, [call])

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={() => call()}>
					<Icon
						name='refresh-outline'
						width={30 * scaleSize}
						height={30 * scaleSize}
						fill={colors['reverted-main-text']}
					/>
				</TouchableOpacity>
			),
		})
	})

	return (
		<Layout style={{ flex: 1, backgroundColor: colors['main-background'] }}>
			<ScrollView bounces={false} contentContainerStyle={padding.bottom.scale(90)}>
				{done ? (
					error ? (
						<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
							<UnifiedText style={{ color: colors['warning-asset'] }}>
								{error.toString()}
							</UnifiedText>
						</View>
					) : (
						<UnifiedText selectable={true} style={{ height: '95%' }}>
							{JSON.stringify(systemInfo, null, 2)}
							{'\n'}
							{JSON.stringify(networkConfig, null, 2)}
						</UnifiedText>
					)
				) : (
					<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
						<ActivityIndicator size='large' />
					</View>
				)}
			</ScrollView>
		</Layout>
	)
}
