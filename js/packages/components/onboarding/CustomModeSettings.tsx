import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
	Platform,
	ActivityIndicator,
} from 'react-native'
import { Icon } from '@ui-kitten/components'
import { RESULTS, PERMISSIONS, check } from 'react-native-permissions'

import beapi from '@berty-tech/api'
import { ScreenFC, useNavigation } from '@berty-tech/navigation'
import rnutil from '@berty-tech/rnutil'
import {
	accountService,
	useMessengerContext,
	useMountEffect,
	useThemeColor,
} from '@berty-tech/store'
import { useStyles } from '@berty-tech/styles'

import { ButtonSetting } from '../shared-components'
import { Toggle } from '../shared-components/Toggle'

const ConfigPart: React.FC<{
	title: string
	icon: string
	iconSize?: number
}> = ({ title, icon, iconSize = 40 }) => {
	const [{ padding, text, margin, border }, { scaleSize }] = useStyles()
	const colors = useThemeColor()

	return (
		<View
			style={[
				padding.vertical.small,
				margin.horizontal.medium,
				border.radius.medium,
				padding.horizontal.medium,
				{ flex: 1 },
			]}
		>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<View style={{ flex: 1 }}>
					<Icon
						width={iconSize * scaleSize}
						height={iconSize * scaleSize}
						name={icon}
						pack='custom'
						fill={colors['background-header']}
					/>
				</View>
				<View style={{ flex: 6, justifyContent: 'center' }}>
					<Text
						style={[
							text.size.big,
							{
								fontFamily: 'Open Sans',
								fontWeight: '700',
								color: colors['background-header'],
								alignSelf: 'center',
							},
						]}
					>
						{title}
					</Text>
				</View>
				<TouchableOpacity
					style={{ flex: 1 }}
					onPress={() => {
						// TODO navigate to the help page
					}}
				>
					<Icon
						width={30 * scaleSize}
						height={30 * scaleSize}
						name='info-outline'
						fill={colors['background-header']}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const Proximity: React.FC<{
	setNewConfig: React.Dispatch<beapi.account.INetworkConfig | null>
	newConfig: beapi.account.INetworkConfig | null
}> = ({ setNewConfig, newConfig }) => {
	const { navigate } = useNavigation()
	const colors = useThemeColor()
	const { t } = useTranslation()

	return (
		<View>
			<ButtonSetting
				name={t('onboarding.advanced-settings.first-part.first-button')}
				color={colors['main-text']}
				icon='expert-ble'
				iconPack='custom'
				iconColor='#6E6DFF'
				actionIconColor={colors['main-text']}
				backgroundColor={colors['input-background']}
				toggled
				toggleStatus='secondary'
				varToggle={newConfig?.bluetoothLe === beapi.account.NetworkConfig.Flag.Enabled}
				actionToggle={async () => {
					const retConfig = {
						...newConfig,
						bluetoothLe:
							newConfig?.bluetoothLe === beapi.account.NetworkConfig.Flag.Enabled
								? beapi.account.NetworkConfig.Flag.Disabled
								: beapi.account.NetworkConfig.Flag.Enabled,
					}
					const status = await check(
						Platform.OS === 'ios'
							? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
							: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
					)
					if (status === RESULTS.GRANTED) {
						setNewConfig(retConfig)
					} else {
						await rnutil.checkPermissions('p2p', {
							navigate,
							navigateToPermScreenOnProblem: true,
							onComplete: async () => () => setNewConfig(retConfig),
						})
					}
				}}
			/>
			{Platform.OS === 'ios' && (
				<ButtonSetting
					name='Multipeer connectivity'
					color={colors['main-text']}
					icon='expert-ble'
					iconPack='custom'
					iconColor='#6E6DFF'
					actionIconColor={colors['main-text']}
					backgroundColor={colors['input-background']}
					toggled
					toggleStatus='secondary'
					varToggle={
						newConfig?.appleMultipeerConnectivity === beapi.account.NetworkConfig.Flag.Enabled
					}
					actionToggle={async () => {
						const retConfig = {
							...newConfig,
							appleMultipeerConnectivity:
								newConfig?.appleMultipeerConnectivity === beapi.account.NetworkConfig.Flag.Enabled
									? beapi.account.NetworkConfig.Flag.Disabled
									: beapi.account.NetworkConfig.Flag.Enabled,
						}
						const status = await check(
							Platform.OS === 'ios'
								? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
								: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
						)
						if (status === RESULTS.GRANTED) {
							setNewConfig(retConfig)
						} else {
							await rnutil.checkPermissions('p2p', {
								navigate,
								navigateToPermScreenOnProblem: true,
								onComplete: () => setNewConfig(retConfig),
							})
						}
					}}
				/>
			)}
			{Platform.OS === 'android' && (
				<ButtonSetting
					name='Android nearby'
					color={colors['main-text']}
					icon='expert-ble'
					iconPack='custom'
					iconColor='#6E6DFF'
					actionIconColor={colors['main-text']}
					backgroundColor={colors['input-background']}
					toggled
					toggleStatus='secondary'
					varToggle={newConfig?.androidNearby === beapi.account.NetworkConfig.Flag.Enabled}
					actionToggle={async () => {
						const retConfig = {
							...newConfig,
							androidNearby:
								newConfig?.androidNearby === beapi.account.NetworkConfig.Flag.Enabled
									? beapi.account.NetworkConfig.Flag.Disabled
									: beapi.account.NetworkConfig.Flag.Enabled,
						}
						const status = await check(
							Platform.OS === 'ios'
								? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
								: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
						)
						if (status === RESULTS.GRANTED) {
							setNewConfig(retConfig)
						} else {
							await rnutil.checkPermissions('p2p', {
								navigate,
								navigateToPermScreenOnProblem: true,
								onComplete: () => setNewConfig(retConfig),
							})
						}
					}}
				/>
			)}
			<ButtonSetting
				name={t('onboarding.advanced-settings.first-part.second-button')}
				color={colors['main-text']}
				icon='expert-setting'
				iconPack='custom'
				iconColor='#6E6DFF'
				actionIconColor={colors['main-text']}
				backgroundColor={colors['input-background']}
				toggled
				toggleStatus='secondary'
				varToggle={newConfig?.mdns === beapi.account.NetworkConfig.Flag.Enabled}
				actionToggle={async () => {
					setNewConfig({
						...newConfig,
						mdns:
							newConfig?.mdns === beapi.account.NetworkConfig.Flag.Enabled
								? beapi.account.NetworkConfig.Flag.Disabled
								: beapi.account.NetworkConfig.Flag.Enabled,
					})
				}}
			/>
		</View>
	)
}

const PeerToPeer: React.FC<{
	setNewConfig: React.Dispatch<beapi.account.INetworkConfig | null>
	newConfig: beapi.account.INetworkConfig | null
}> = ({ setNewConfig, newConfig }) => {
	const colors = useThemeColor()
	const { t } = useTranslation()
	return (
		<View>
			<ButtonSetting
				name={t('onboarding.advanced-settings.second-part.first-button')}
				color={colors['main-text']}
				icon='expert-setting'
				iconPack='custom'
				iconColor='#6E6DFF'
				actionIconColor={colors['main-text']}
				backgroundColor={colors['input-background']}
				toggled
				toggleStatus='secondary'
				varToggle={newConfig?.dht === beapi.account.NetworkConfig.DHTFlag.DHTClient}
				actionToggle={async () => {
					setNewConfig({
						...newConfig,
						dht:
							newConfig?.dht === beapi.account.NetworkConfig.DHTFlag.DHTClient
								? beapi.account.NetworkConfig.DHTFlag.DHTDisabled
								: beapi.account.NetworkConfig.DHTFlag.DHTClient,
					})
				}}
			/>
			{/* TODO: node list */}
			<ButtonSetting
				name={`rendezvous: ${JSON.stringify(newConfig?.rendezvous)}`}
				color={colors['main-text']}
				icon='privacy'
				iconPack='custom'
				iconColor='#6E6DFF'
				actionIconColor={colors['main-text']}
				backgroundColor={colors['input-background']}
			/>
		</View>
	)
}

const Services: React.FC<{
	setNewConfig: React.Dispatch<beapi.account.INetworkConfig | null>
	newConfig: beapi.account.INetworkConfig | null
}> = ({ newConfig }) => {
	const colors = useThemeColor()
	const navigation = useNavigation()

	return (
		<View>
			<ButtonSetting
				name={`relay: ${JSON.stringify(newConfig?.staticRelay)}`}
				icon='earth'
				iconPack='custom'
				color={colors['main-text']}
				iconColor='#6E6DFF'
				actionIconColor={colors['main-text']}
				backgroundColor={colors['input-background']}
				onPress={() => navigation.navigate('Settings.NetworkMap')}
			/>
			<ButtonSetting
				name={`bootstrap: ${JSON.stringify(newConfig?.bootstrap)}`}
				icon='earth'
				iconPack='custom'
				color={colors['main-text']}
				iconColor='#6E6DFF'
				actionIconColor={colors['main-text']}
				backgroundColor={colors['input-background']}
				onPress={() => navigation.navigate('Settings.NetworkMap')}
			/>
			<ButtonSetting
				name='replication'
				icon='earth'
				iconPack='custom'
				color={colors['main-text']}
				iconColor='#6E6DFF'
				actionIconColor={colors['main-text']}
				backgroundColor={colors['input-background']}
				onPress={() => navigation.navigate('Settings.NetworkMap')}
			/>
		</View>
	)
}

const CustomConfig: React.FC<{
	setNewConfig: React.Dispatch<beapi.account.INetworkConfig | null>
	newConfig: beapi.account.INetworkConfig | null
}> = ({ setNewConfig, newConfig }) => {
	const [{ margin, padding, border }] = useStyles()
	const { t } = useTranslation()
	const colors = useThemeColor()
	return (
		<View>
			<View
				style={[
					padding.medium,
					border.radius.medium,
					{ backgroundColor: colors['main-background'] },
				]}
			>
				<ConfigPart title={t('onboarding.advanced-settings.first-part.title')} icon='proximity' />
				<Proximity setNewConfig={setNewConfig} newConfig={newConfig} />
			</View>
			<View
				style={[
					margin.top.medium,
					padding.medium,
					border.radius.medium,
					{ backgroundColor: colors['main-background'] },
				]}
			>
				<ConfigPart title={t('onboarding.advanced-settings.second-part.title')} icon='peer' />
				<PeerToPeer setNewConfig={setNewConfig} newConfig={newConfig} />
			</View>
			<View
				style={[
					margin.top.medium,
					padding.medium,
					border.radius.medium,
					{ backgroundColor: colors['main-background'] },
				]}
			>
				<ConfigPart
					title={t('onboarding.advanced-settings.third-part.title')}
					icon='services'
					iconSize={50}
				/>
				<Services setNewConfig={setNewConfig} newConfig={newConfig} />
			</View>
		</View>
	)
}

const ApplyChanges: React.FC<{ newConfig: beapi.account.INetworkConfig | null }> = ({
	newConfig,
}) => {
	const [{ padding, border, text }] = useStyles()
	const colors = useThemeColor()
	const ctx = useMessengerContext()
	const [isPressed, setIsPressed] = React.useState<boolean>(false)

	return (
		<View style={{ alignSelf: 'center', flex: 1 }}>
			<View style={[padding.medium]}>
				<TouchableOpacity
					onPress={async () => {
						if (newConfig) {
							setIsPressed(true)
							await ctx.createNewAccount(newConfig)
						}
					}}
					style={[
						padding.medium,
						border.radius.medium,
						{ backgroundColor: '#3F49EA', alignItems: 'center' },
					]}
				>
					{isPressed ? (
						<ActivityIndicator />
					) : (
						<Text
							style={[
								text.size.medium,
								{ fontFamily: 'Open Sans', fontWeight: '700', color: colors['reverted-main-text'] },
							]}
						>
							ACCEPT
						</Text>
					)}
				</TouchableOpacity>
			</View>
		</View>
	)
}

const EnableDisableAll: React.FC<{
	setNewConfig: React.Dispatch<beapi.account.INetworkConfig | null>
}> = ({ setNewConfig }) => {
	const [{ padding, border }] = useStyles()
	const colors = useThemeColor()
	const [isToggled, setIsToggled] = React.useState(false)
	const { navigate } = useNavigation()

	const enable: beapi.account.INetworkConfig = {
		bootstrap: [':default:'],
		rendezvous: [':default:'],
		staticRelay: [':default:'],
		dht: beapi.account.NetworkConfig.DHTFlag.DHTClient,
		bluetoothLe: beapi.account.NetworkConfig.Flag.Enabled,
		appleMultipeerConnectivity: beapi.account.NetworkConfig.Flag.Enabled,
		androidNearby: beapi.account.NetworkConfig.Flag.Enabled,
		mdns: beapi.account.NetworkConfig.Flag.Enabled,
	}

	const disable: beapi.account.INetworkConfig = {
		bootstrap: [],
		rendezvous: [],
		staticRelay: [],
		dht: beapi.account.NetworkConfig.DHTFlag.DHTUndefined,
		bluetoothLe: beapi.account.NetworkConfig.Flag.Disabled,
		appleMultipeerConnectivity: beapi.account.NetworkConfig.Flag.Disabled,
		androidNearby: beapi.account.NetworkConfig.Flag.Disabled,
		mdns: beapi.account.NetworkConfig.Flag.Disabled,
	}

	return (
		<View
			style={[
				padding.scale(2),
				border.radius.medium,
				{
					flexDirection: 'row',
					alignItems: 'center',
				},
			]}
		>
			<Text style={{ fontFamily: 'Open Sans', color: colors['reverted-main-text'] }}>all</Text>
			<View style={[padding.small]}>
				<Toggle
					checked={isToggled}
					status='third'
					onChange={async () => {
						const toToggled = !isToggled

						setIsToggled(toToggled)
						if (toToggled) {
							const status = await check(
								Platform.OS === 'ios'
									? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
									: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
							)
							if (status === RESULTS.GRANTED) {
								setNewConfig(enable)
							} else {
								await rnutil.checkPermissions('p2p', {
									navigate,
									navigateToPermScreenOnProblem: true,
									onComplete: async () => () => setNewConfig(enable),
								})
							}
						} else {
							setNewConfig(disable)
						}
					}}
				/>
			</View>
		</View>
	)
}

export const CustomModeSettings: ScreenFC<'Onboarding.CustomModeSettings'> = () => {
	const colors = useThemeColor()
	const [{ padding }] = useStyles()
	const [newConfig, setNewConfig] = React.useState<beapi.account.INetworkConfig | null>(null)

	useMountEffect(() => {
		const getNetworkConfig = async () => {
			// with an empty accountId the function returns default config
			const defaultConfig = await accountService.networkConfigGet({ accountId: '' })
			if (defaultConfig.currentConfig) {
				setNewConfig(defaultConfig?.currentConfig)
			}
		}

		getNetworkConfig()
	})

	useEffect(() => {
		console.log('newConfig change', newConfig)
	}, [newConfig])

	return (
		<SafeAreaView style={{ backgroundColor: colors['background-header'], flex: 1 }}>
			<StatusBar barStyle='light-content' />
			<ScrollView
				bounces={false}
				contentContainerStyle={[padding.medium]}
				showsVerticalScrollIndicator={false}
			>
				<CustomConfig setNewConfig={setNewConfig} newConfig={newConfig} />
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<EnableDisableAll setNewConfig={setNewConfig} />
					<ApplyChanges newConfig={newConfig} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
