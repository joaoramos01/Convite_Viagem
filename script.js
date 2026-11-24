const openEnvelopeBtn = document.getElementById("open-envelope-btn");
const envelopeScreen = document.getElementById("envelope-screen");
const inviteScreen = document.getElementById("invite-screen");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const actionButtons = document.getElementById("action-buttons");
const confirmedBox = document.getElementById("confirmed-box");
const resetBtn = document.getElementById("reset-btn");

// Personalize os dados da viagem aqui se quiser:
const tripConfig = {
  origin: "Florianópolis",
  destination: "Rio de Janeiro",
  date: "18 a 22 de Dezembro",
  guest: "Você",
  message:
    "Prepare as malas! Separei esses dias para curtirmos juntos, conhecer lugares novos e criar memórias incríveis. Topa embarcar nessa?"
};

function applyTripConfig() {
  document.getElementById("origin-text").textContent = tripConfig.origin;
  document.getElementById("destination-text").textContent = tripConfig.destination;
  document.getElementById("date-text").textContent = tripConfig.date;
  document.getElementById("guest-text").textContent = tripConfig.guest;
  document.getElementById("message-text").textContent = tripConfig.message;
}

applyTripConfig();

// Abre o convite
openEnvelopeBtn.addEventListener("click", () => {
  envelopeScreen.classList.remove("active");
  inviteScreen.classList.add("active");
});

// Faz o botão "Não posso ir" desviar ao tentar clicar ou passar o mouse
function dodgeButton() {
  const maxX = 140;
  const maxY = 70;
  const randomX = Math.floor(Math.random() * maxX * 2) - maxX;
  const randomY = Math.floor(Math.random() * maxY) - maxY / 2;

  noBtn.style.position = "relative";
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

noBtn.addEventListener("mouseenter", dodgeButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodgeButton();
});

// Confirma presença + dispara confetes simples
yesBtn.addEventListener("click", () => {
  actionButtons.classList.add("hidden");
  confirmedBox.classList.remove("hidden");
  startConfetti();
});

resetBtn.addEventListener("click", () => {
  confirmedBox.classList.add("hidden");
  actionButtons.classList.remove("hidden");
  noBtn.style.transform = "translate(0, 0)";
});

// Efeito de confete no canvas
function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#f97316", "#4ade80", "#38bdf8", "#facc15", "#f472b6"];
  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -canvas.height,
    size: Math.random() * 8 + 4,
    speedY: Math.random() * 3 + 2,
    speedX: Math.random() * 2 - 1,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  let frames = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
    });

    frames++;
    if (frames < 180) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}