let chart; // variável para armazenar o gráfico

// Alternar tema
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  document.getElementById("theme-toggle").textContent = isDark
    ? "☀️ Modo Claro"
    : "🌙 Modo Escuro";
  localStorage.setItem("tema", isDark ? "dark" : "light");
});

// Manter tema salvo
if (localStorage.getItem("tema") === "dark") {
  document.body.classList.add("dark");
  document.getElementById("theme-toggle").textContent = "☀️ Modo Claro";
}

// Ano no rodapé
document.getElementById("anoAtual").textContent = new Date().getFullYear();

// Calcular juros compostos
document.getElementById("calcular").addEventListener("click", () => {
  const valorInicial =
    parseFloat(document.getElementById("valorInicial").value) || 0;
  const contribuicao =
    parseFloat(document.getElementById("contribuicao").value) || 0;
  const taxa = (parseFloat(document.getElementById("taxa").value) || 0) / 100;
  const anos = parseInt(document.getElementById("anos").value) || 0;

  let saldo = valorInicial;
  const meses = anos * 12;
  const taxaMensal = Math.pow(1 + taxa, 1 / 12) - 1;

  let labels = [];
  let dadosSaldo = [];
  let dadosInvestido = [];

  for (let i = 0; i <= meses; i++) {
    if (i > 0) {
      saldo *= 1 + taxaMensal;
      saldo += contribuicao;
    }
    labels.push(`Mês ${i}`);
    dadosSaldo.push(saldo);
    dadosInvestido.push(valorInicial + contribuicao * i);
  }

  const totalInvestido = valorInicial + contribuicao * meses;
  const jurosGanhos = saldo - totalInvestido;

  document.getElementById("saldoFinal").textContent = saldo.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );
  document.getElementById("totalInvestido").textContent =
    totalInvestido.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  document.getElementById("jurosGanhos").textContent =
    jurosGanhos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  document.getElementById("resultado").classList.remove("hidden");

  // Criar ou atualizar gráfico
  if (chart) chart.destroy();
  const ctx = document.getElementById("grafico").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Saldo Total",
          data: dadosSaldo,
          borderColor: "#007bff",
          fill: false,
        },
        {
          label: "Total Investido",
          data: dadosInvestido,
          borderColor: "#28a745",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
