let currBossId = +localStorage.getItem("current-boss")

let mainBossEl = document.querySelector(".main-boss")
let hpProgressText = document.querySelector(".hp-progress p")
let hpProgressBar = document.querySelector(".hp-progress")

let returnBtn = document.querySelector(".return")
let modal = document.querySelector(".modal")
let modalWindowSpan = document.querySelector(".modal__window span")
let allGunsBtns = document.querySelectorAll(".right button")

returnBtn.addEventListener("click", () => {
	location.pathname = "/src/pages/bosses.html"
})



let timerEl = document.querySelector(".timer")

let starterTime

let fullBossHp = 0
let currBossHp = 0
let currBossHpPercent = 100
let currDamage = 1
let currDamagePercent = 0

let totalTime
let timer
let addedTime = true

async function getBoss() {
	let res = await fetch("../data/bosses.json")
	let data = await res.json()
	return data.filter(el => el.id === currBossId)[0]
}

function renderBoss(data) {
	let { id, name, hp, img, time } = data
	totalTime = time
	starterTime = time
	fullBossHp = hp
	currBossHp = hp
	calcDamage(1)
	mainBossEl.src = img
	hpProgressText.innerHTML = `${hp} / ${hp}`
	startTimer()
}

function startTimer() {
	timerEl.innerHTML = totalTime
	timer = setInterval(() => {
		if (totalTime < 1) {
			alert("Ви програли")
			clearInterval(timer)
			location.pathname = "/src/pages/bosses.html"
		} else {
			totalTime--
		}
		timerEl.innerHTML = totalTime
	}, 1000)
}

function calcDamage(damage) {
	currDamagePercent = damage * 100 / fullBossHp
	currDamage = damage
}

getBoss().then(data => renderBoss(data))

allGunsBtns.forEach(gun => {
	gun.addEventListener("click", (event) => {
		calcDamage(+gun.dataset.damage)
	})
})

allGunsBtns.forEach(btn => btn.disabled = true)
allGunsBtns[0].disabled = false

mainBossEl.addEventListener("click", () => {
	currBossHpPercent -= currDamagePercent
	currBossHp -= currDamage
	hpProgressText.innerHTML = `${currBossHp} / ${fullBossHp}`
	hpProgressBar.style.width = currBossHpPercent + "%"


	if (currBossHpPercent < 90) {
		allGunsBtns[1].disabled = false
	}

	if (currBossHpPercent < 80) {
		allGunsBtns[2].disabled = false
	}

	if (currBossHpPercent < 70) {
		allGunsBtns[3].disabled = false
		if (addedTime) {
			addedTime = false
			totalTime += 10
		}
	}

	if (currBossHpPercent < 60) {
		allGunsBtns[4].disabled = false
	}

	if (currBossHpPercent < 50) {
		allGunsBtns[5].disabled = false
	}

	if (currBossHpPercent < 40) {
		allGunsBtns[6].disabled = false
	}

	if (currBossHpPercent < 30) {
		allGunsBtns[7].disabled = false
	}

	if (currBossHpPercent < 20) {
		allGunsBtns[8].disabled = false
	}

	if (currBossHpPercent <= 0) {
		modal.classList.remove("hide")
		modalWindowSpan.innerHTML = totalTime
		hpProgressBar.style.width = "0%"
	}
})



modal.addEventListener("click", (event) => {
	if (event.target.closest(".to-modal-menu")) {
		location.pathname = "/Far-Cry-Clicker/src/pages/bosses.html"
	}
})