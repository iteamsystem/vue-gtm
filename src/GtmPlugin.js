import { logDebug } from './utils';
import pluginConfig from './config';
/**
 * Plugin main class
 */
var inBrowser = typeof window !== 'undefined';

export default class AnalyticsPlugin {
	trackView(screenName, path) {
		if (inBrowser && pluginConfig.enabled) {
			logDebug('Dispatching TrackView', { screenName, path });

			let dataLayer = window.dataLayer = window.dataLayer || [];
			dataLayer.push({
				'event': 'content-view',
				'content-name': path
			});
		}	
	}

	trackEvent({
		event = null,
		category = null,
		action = null,
		label = null,
		value = null,
		noninteraction = false,
		...rest
	} = {}) {
		if (inBrowser && pluginConfig.enabled) {
			logDebug('Dispatching event', { event, category, action, label, value, ...rest });

			let dataLayer = window.dataLayer = window.dataLayer || [];
			dataLayer.push({
				'event': event || 'interaction',
				'EventCategory': category,
				'EventAction': action,
				'EventLabel': label,
				'value': value,
				'interaction-type': noninteraction,
				...rest
			});
		}	
	}
}