import Swiper from 'swiper'

document.addEventListener('DOMContentLoaded', () => {

	const randomBg = document.getElementById('randomBg'),
			images = ['images/dist/background/light-bg-1.jpg','images/dist/background/light-bg-2.jpg','images/dist/background/light-bg-3.jpg']
	
	const imgCount = images.length,
			number = Math.floor(Math.random() * imgCount)

	window.onload = function() {
		randomBg.style.backgroundImage = `url(${images[number]})`
	}

	const swiper = new Swiper('.swiper-bg', {});

})
