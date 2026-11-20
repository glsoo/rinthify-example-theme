// runs like a plugin while the theme is on, for things css can't do
export default {
	start(api) {
		// a clock in the title bar, in the accent color
		api.addStyle(`
			#ex-clock { margin-right: 0.9rem; font-size: 0.85rem; color: var(--accent); font-variant-numeric: tabular-nums; pointer-events: none; user-select: none; }
		`)
		const clock = document.createElement('div')
		clock.id = 'ex-clock'
		const tick = () => {
			clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
			// the app can redraw the title bar, so put it back if it's gone
			const bar = document.querySelector('.app-title-bar > section')
			if (bar && clock.parentElement !== bar) bar.prepend(clock)
		}
		tick()
		const timer = setInterval(tick, 1000)

		// styles from api are removed when the theme turns off, anything else goes here
		api.onCleanup(() => {
			clearInterval(timer)
			clock.remove()
		})
	},
}
