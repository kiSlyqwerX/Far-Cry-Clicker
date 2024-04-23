let allBossesBtn = document.querySelectorAll(".boss-btn")

allBossesBtn.forEach(btn => {
	btn.addEventListener("click", () => {
		localStorage.setItem("current-boss", btn.dataset.key)
		location.pathname = "/Far-Cry-Clicker/src/pages/game.html"
	})
})



