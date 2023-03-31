import moment from "jalali-moment"
moment.defineLocale("ar", {
	parentLocale: "ar-sa",

	preparse: function (string) {
		return string
	},

	postformat: function (string) {
		return string
	},
})
export default defineNuxtPlugin(nuxtApp => {
	const plugin = (...args) => moment(...args).locale("ar-iq")
	const $moment = plugin
	// @ts-ignore
	return {
		provide: {
			moment:$moment
		}
	}
})

export {
	moment
}
