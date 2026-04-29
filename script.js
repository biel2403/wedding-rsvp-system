// CONTAGEM REGRESSIVA
const dataCasamento = new Date("Jan 01, 2027 00:00:00").getTime();

setInterval(() => {
  const agora = new Date().getTime();
  const distancia = dataCasamento - agora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((distancia / (1000 * 60)) % 60);

  document.getElementById("dias").innerText = dias;
  document.getElementById("horas").innerText = horas;
  document.getElementById("minutos").innerText = minutos;
}, 1000);

// ADICIONAR ACOMPANHANTE
function adicionarPessoa() {
  const container = document.getElementById("listaAcompanhantes");

  const div = document.createElement("div");
  div.classList.add("acompanhante");

  div.innerHTML = `
    <input type="text" placeholder="Nome do acompanhante">
    <select>
      <option value="">Tipo</option>
      <option>Esposa</option>
      <option>Marido</option>
      <option>Filho(a)</option>
      <option>Namorado(a)</option>
      <option>Amigo(a)</option>
      <option>Outro</option>
    </select>
  `;

  container.appendChild(div);
}

// CONFIRMAR PRESENÇA
function confirmar() {
  const nomePrincipal = document.getElementById("nomePrincipal").value.trim();
  const acompanhantes = document.querySelectorAll(".acompanhante");

  let lista = [];

  acompanhantes.forEach(item => {
    const nome = item.querySelector("input").value.trim();
    if (nome !== "") lista.push(nome);
  });

  fetch("https://backend-fpe4.onrender.com/confirmar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: nomePrincipal, acompanhantes: lista })
  })
  .then(res => res.json())
  .then(data => {
    if (data.erro) {
      alert(data.erro);
    } else {
      document.getElementById("mensagem").innerText = "Presença confirmada! 💖";
    }
  })
  .catch(() => {
    alert("Erro ao conectar com servidor 😢");
  });
}

// MODAL DE IMAGEM
function abrirModal(img) {
  const modal = document.getElementById("modal");
  const imgModal = document.getElementById("imgModal");
  modal.style.display = "block";
  imgModal.src = img.src;
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}
