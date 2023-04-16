import Swiper, { Pagination, Controller } from 'swiper'
Swiper.use([Pagination, Controller])

document.addEventListener('DOMContentLoaded', () => {

	const randomBg = document.getElementById('randomBg'),
		imagesLight = ['images/dist/background/light-bg-1.jpg', 'images/dist/background/light-bg-2.jpg', 'images/dist/background/light-bg-3.jpg'],
		imagesDark = ['images/dist/background/dark-bg-1.jpg', 'images/dist/background/dark-bg-2.jpg', 'images/dist/background/dark-bg-3.jpg']

	const imgCountDark = imagesDark.length,
		numberDark = Math.floor(Math.random() * imgCountDark),
		imgCountLight = imagesLight.length,
		numberLight = Math.floor(Math.random() * imgCountLight)

	const swiperBg = new Swiper('.swiper-bg', {});

	const swiperHero = new Swiper('.hero-swiper', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	})

	swiperBg.controller.control = swiperHero
	swiperHero.controller.control = swiperBg

	// CHANGE BACKGROUND HEADER
	const scrollHeader = () => {
		const header = document.getElementById('header')
		// When the scroll is greater than 50 viewport height, add the .scroll-header
		globalThis.scrollY >= 50 ? header.classList.add('header-bg')
			: header.classList.remove('header-bg')
	}
	window.addEventListener('scroll', scrollHeader)

	//DARK LIGHT THEME
	const themeButton = document.getElementById('theme-button')
	const darkTheme = 'dark-theme'
	const iconTheme = 'ri-sun-line'

	// Previously selected topic (if user selected)
	const selectedTheme = localStorage.getItem('selected-theme')
	const selectedIcon = localStorage.getItem('selected-icon')

	// We obtain the current theme that the interface has by validating the dark-theme class
	const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
	const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

	// We validate if the user previously chose a topic
	if (selectedTheme) {
		// If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
		document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
		themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
	}

	// Activate / deactivate the theme manually with the button
	themeButton.addEventListener('click', () => {
		// Add or remove the dark / icon theme
		document.body.classList.toggle(darkTheme)
		themeButton.classList.toggle(iconTheme)
		// We save the theme and the current icon that the user chose
		localStorage.setItem('selected-theme', getCurrentTheme())
		localStorage.setItem('selected-icon', getCurrentIcon())
	})

	const getCurrentBg = () => document.body.classList.contains(darkTheme) ?
		randomBg.style.backgroundImage = `url(${imagesDark[numberDark]})` :
		randomBg.style.backgroundImage = `url(${imagesLight[numberLight]})`

	window.onload = () => { getCurrentBg() }

	themeButton.addEventListener('click', getCurrentBg)

})
