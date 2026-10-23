"use strict";

// =====================================
// GAMEZONE INDIA - GAME DATABASE
// =====================================

const games = [
    {
        name: "Snake Game",
        emoji: "🐍",
        category: "arcade",
        description: "Eat food and grow longer!",
        color: "linear-gradient(135deg,#b9fbc0,#55d68b)",
        file: "snake.html"
    },
    {
        name: "Car Racing",
        emoji: "🏎️",
        category: "racing",
        description: "Race and avoid obstacles!",
        color: "linear-gradient(135deg,#ffd6a5,#ff8c69)",
        file: "car-racing.html"
    },
    {
        name: "Bike Racing",
        emoji: "🏍️",
        category: "racing",
        description: "Ride your bike to victory!",
        color: "linear-gradient(135deg,#caffbf,#70d6ff)",
        file: "bike-racing.html"
    },
    {
        name: "Ping Pong",
        emoji: "🏓",
        category: "sports",
        description: "Test your reflexes!",
        color: "linear-gradient(135deg,#fdffb6,#ffd166)",
        file: "ping-pong.html"
    },
    {
        name: "Brick Breaker",
        emoji: "🧱",
        category: "arcade",
        description: "Break bricks and win!",
        color: "linear-gradient(135deg,#ffc6ff,#bdb2ff)",
        file: "brick-breaker.html"
    },
    {
        name: "Tic Tac Toe",
        emoji: "❌",
        category: "puzzle",
        description: "Can you beat your opponent?",
        color: "linear-gradient(135deg,#a0c4ff,#bdb2ff)",
        file: "tic-tac-toe.html"
    },
    {
        name: "Memory Match",
        emoji: "🧠",
        category: "puzzle",
        description: "Match the hidden pairs!",
        color: "linear-gradient(135deg,#ffc8dd,#ffafcc)",
        file: "memory.html"
    },
    {
        name: "Math Challenge",
        emoji: "🔢",
        category: "puzzle",
        description: "Solve questions against time!",
        color: "linear-gradient(135deg,#caffbf,#9bf6ff)",
        file: "math-game.html"
    },
    {
        name: "Endless Runner",
        emoji: "🏃",
        category: "arcade",
        description: "Run, jump and collect points!",
        color: "linear-gradient(135deg,#fdffb6,#caffbf)",
        file: "runner.html"
    },
    {
        name: "Space Shooter",
        emoji: "🚀",
        category: "action",
        description: "Explore space and dodge danger!",
        color: "linear-gradient(135deg,#bdb2ff,#7b61ff)",
        file: "space-shooter.html"
    },
    {
        name: "Puzzle Game",
        emoji: "🧩",
        category: "puzzle",
        description: "Put the pieces together!",
        color: "linear-gradient(135deg,#ffd6e0,#ffafcc)",
        file: "puzzle.html"
    },
    {
        name: "Basketball",
        emoji: "🏀",
        category: "sports",
        description: "Aim carefully and score!",
        color: "linear-gradient(135deg,#ffdab9,#ffa552)",
        file: "basketball.html"
    },
    {
        name: "Target Shooter",
        emoji: "🎯",
        category: "action",
        description: "Test your accuracy and speed!",
        color: "linear-gradient(135deg,#ffadad,#ff6b6b)",
        file: "target-shooter.html"
    },
    {
        name: "Flappy Bird",
        emoji: "🐦",
        category: "arcade",
        description: "Fly through the obstacles!",
        color: "linear-gradient(135deg,#9bf6ff,#70d6ff)",
        file: "flappy-bird.html"
    },
    {
        name: "Chess",
        emoji: "♟️",
        category: "puzzle",
        description: "Plan your next winning move!",
        color: "linear-gradient(135deg,#e4c1f9,#cfbaf0)",
        file: "chess.html"
    }
];

// =====================================
// HTML ELEMENTS
// =====================================

const gamesGrid = document.getElementById("gamesGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const gameCount = document.getElementById("gameCount");
const noResults = document.getElementById("noResults");
const resetBtn = document.getElementById("resetBtn");
const categoryButtons = document.querySelectorAll(".category");
const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

let activeCategory = "all";

// =====================================
// CREATE GAME CARDS
// =====================================

function createGameCard(game, index) {
    const card = document.createElement("article");
    card.className = "game-card";

    const art = document.createElement("div");
    art.className = "game-art";
    art.style.background = game.color;

    const number = document.createElement("span");
    number.className = "game-number";
    number.textContent = "#" + String(index + 1).padStart(2, "0");

    const emoji = document.createElement("span");
    emoji.className = "game-emoji";
    emoji.textContent = game.emoji;
    emoji.setAttribute("aria-hidden", "true");

    art.append(number, emoji);

    const info = document.createElement("div");
    info.className = "game-info";

    const title = document.createElement("h3");
    title.textContent = game.name;

    const description = document.createElement("p");
    description.textContent = game.description;

    const bottom = document.createElement("div");
    bottom.className = "game-bottom";

    const type = document.createElement("span");
    type.className = "game-type";
    type.textContent =
        game.category.charAt(0).toUpperCase() +
        game.category.slice(1);

    const play = document.createElement("a");
    play.className = "play-btn";
    play.textContent = "▶ Play Now";
    play.href = "games/" + game.file;
    play.setAttribute("aria-label", "Play " + game.name);

    bottom.append(type, play);
    info.append(title, description, bottom);
    card.append(art, info);

    return card;
}

// =====================================
// SEARCH AND CATEGORY FILTER
// =====================================

function renderGames() {
    const query = searchInput.value.trim().toLowerCase();

    const filteredGames = games.filter(function (game) {
        const matchesSearch =
            game.name.toLowerCase().includes(query) ||
            game.category.toLowerCase().includes(query) ||
            game.description.toLowerCase().includes(query);

        const matchesCategory =
            activeCategory === "all" ||
            game.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    gamesGrid.replaceChildren();

    filteredGames.forEach(function (game) {
        const originalIndex = games.indexOf(game);
        gamesGrid.appendChild(createGameCard(game, originalIndex));
    });

    gameCount.textContent =
        filteredGames.length +
        (filteredGames.length === 1 ? " Game" : " Games");

    noResults.hidden = filteredGames.length !== 0;
    gamesGrid.hidden = filteredGames.length === 0;
}

// =====================================
// SEARCH BUTTON
// =====================================

searchBtn.addEventListener("click", function () {
    renderGames();
    document.getElementById("popular").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

searchInput.addEventListener("input", renderGames);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        renderGames();
        document.getElementById("popular").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

// =====================================
// CATEGORY BUTTONS
// =====================================

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        activeCategory = button.dataset.category;

        categoryButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        renderGames();
    });
});

// =====================================
// RESET FILTERS
// =====================================

resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    activeCategory = "all";

    categoryButtons.forEach(function (button) {
        button.classList.toggle(
            "active",
            button.dataset.category === "all"
        );
    });

    renderGames();
});

// =====================================
// MOBILE NAVIGATION
// =====================================

menuBtn.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });
});

// =====================================
// FOOTER YEAR
// =====================================

document.getElementById("year").textContent =
    new Date().getFullYear();

// =====================================
// START WEBSITE
// =====================================

renderGames();

console.log("GameZone India loaded successfully!");
console.log("Total games:", games.length);
