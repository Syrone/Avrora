import Swiper, { Pagination, Controller } from 'swiper'
import { ExperienceBar } from './experience.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
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

	if (randomBg) {
		const getCurrentBg = () => document.body.classList.contains(darkTheme) ?
			randomBg.style.backgroundImage = `url(${imagesDark[numberDark]})` :
			randomBg.style.backgroundImage = `url(${imagesLight[numberLight]})`

		window.onload = () => { getCurrentBg() }

		themeButton.addEventListener('click', getCurrentBg)
	}

	const addEventOnElements = function (elements, eventType, callback) {
		for (let i = 0, len = elements.length; i < len; i++) {
			elements[i].addEventListener(eventType, callback)
		}
	}

	//CALLING THE REGISTRATION FORM
	const signupForm = document.querySelector('[data-form-signup]'),
		loginForm = document.querySelector('[data-form-login]'),
		forgotForm = document.querySelector('[data-form-forgot]'),
		loginLink = document.querySelector('[data-login-link]'),
		signLink = document.querySelector('[data-signup-link]'),
		forgotLink = document.querySelector('[data-forgot-link]'),
		signupBtn = document.querySelectorAll('[data-btn-signup]'),
		overlay = document.querySelector('[data-overlay]')

	const openForm = function () {
		overlay.classList.add('active')
		signupForm.classList.add('active')
		document.body.classList.add('nav-active')
	}

	const closeForm = function () {
		overlay.classList.remove('active')
		signupForm.classList.remove('active')
		loginForm.classList.remove('active')
		forgotForm.classList.remove('active')
		document.body.classList.remove('nav-active')
	}

	if (loginLink) {
		loginLink.addEventListener('click', () => {
			signupForm.classList.remove('active')
			loginForm.classList.add('active')
		})
	}

	if (signLink) {
		signLink.addEventListener('click', () => {
			loginForm.classList.remove('active')
			signupForm.classList.add('active')
		})
	}

	if (forgotLink) {
		forgotLink.addEventListener('click', () => {
			loginForm.classList.remove('active')
			forgotForm.classList.add('active')
		})
	}

	if (signupBtn) {
		addEventOnElements(signupBtn, 'click', openForm)
	}

	overlay.addEventListener('click', closeForm)

	// OPEN AND CLOSE ACCORDION IN QUESTIONS.HTML
	const accordions = document.querySelectorAll('[data-accordion]')

	accordions.forEach(el => {
		el.addEventListener('click', (e) => {
			const self = e.currentTarget,
				content = self.querySelector('[data-accordion-content]')

			self.classList.toggle('active')

			if (self.classList.contains('active')) {
				content.style.maxHeight = content.scrollHeight + 'px'
			} else {
				content.style.maxHeight = null
			}
		})
	})

	// DISPLAYING THE POSSIBLE LEVEL DURING DONATION
	const inputAurumNode = document.querySelector('.input-aurum')

	if (document.querySelector('.balance')) {
		const experienceBar = new ExperienceBar()
		if (experienceBar) {
			experienceBar.setInitBalance(0)
		}
		if (inputAurumNode) {
			inputAurumNode.addEventListener('input', () => {
				const newBalance = inputAurumNode.valueAsNumber

				// если newBalance не NaN и больше или равно 0
				if (newBalance >= 0 && !isNaN(newBalance)) {
					experienceBar.addBalance(newBalance)
				}
			})
		}
	}

	// DROPDOWN BAN-LIST
	const optionMenu = document.querySelector('.select-menu'),
		selectBtn = document.querySelector('.select-btn'),
		selectOptions = document.querySelector('.select-options'),
		options = document.querySelectorAll('.option'),
		sBtn_text = document.querySelector('.sBtn-text')

	if (selectBtn) {
		selectBtn.addEventListener('click', () => {
			optionMenu.classList.toggle('active')
			selectBtn.classList.remove('active')
		})
	}

	if (options) {
		options.forEach(option => {
			option.addEventListener('click', () => {
				let selectedOption = option.querySelector('.option-btn').innerText
				sBtn_text.innerText = selectedOption
				selectBtn.classList.add('active')
				optionMenu.classList.remove('active')
			})
			if (optionMenu.classList.contains('active')) {
				selectOptions.style.maxHeight = selectOptions.scrollHeight + 'px'
			} else {
				selectOptions.style.maxHeight = null
			}
		})
	}

	// SELECT BAN TABLE
	const optionBtn = document.querySelectorAll('.option-btn'),
		banTable = document.querySelectorAll('.ban-table')

	if (optionBtn) {
		optionBtn.forEach((tab, index) => {
			tab.addEventListener('click', () => {
				optionBtn.forEach(tab => { tab.classList.remove('active') })
				tab.classList.add('active')

				banTable.forEach(content => { content.classList.remove('active') })
				banTable[index].classList.add('active')
			})
		})
	}

	//THREE.JS
	const canvas = document.querySelector('.webgl'),
			scene = new THREE.Scene(),
			camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 100),
			loader = new GLTFLoader(),
			renderer = new THREE.WebGL1Renderer({ alpha: true })

	let object,
		controls,
		objToRender = 'skinHero'
		// mouseX = window.innerWidth / 2,
		// mouseY = window.innerHeight / 2

	loader.load(
		`../models/${objToRender}/scene.gltf`,
		gltf => {
			object = gltf.scene
			scene.add(object)
		},
		xhr => {
			console.log((xhr.loaded / xhr.total * 100) + '% Загружено')
		},
		error => {
			console.error(error)
		}
	)

	renderer.setSize(window.innerWidth, window.innerHeight)

	canvas.appendChild(renderer.domElement)

	camera.position.z = 5
	camera.position.y = -2
	camera.position.x = 3.5

	scene.position.y = -1

	const topLight = new THREE.DirectionalLight(0xffffff, 1)
	topLight.position.set(100, 100, 100)
	topLight.castShadow = true
	scene.add(topLight)

	const aLight = new THREE.AmbientLight(0x333333, objToRender === 'skinHero' ? 15 : 1)
	scene.add(aLight)

	if(objToRender === 'skinHero') {
		controls = new OrbitControls(camera, renderer.domElement)
	}

	function animate() {
		requestAnimationFrame(animate)

		// if(object && objToRender === 'skinHero') {
		// 	object.rotation.y = -3 + mouseX / window.innerWidth * 3
		// 	object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight
		// }

		controls.update()
		controls.maxDistance = 10
		controls.minDistance = 5

		renderer.render(scene, camera)
	}

	window.addEventListener('resize', function() {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	})

	animate()

})
