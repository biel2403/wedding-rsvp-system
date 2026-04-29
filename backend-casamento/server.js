const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const convidados = require("./convidados.json");

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

app.post("/confirmar", (req, res) => {
  try {
    const { nome, acompanhantes = [] } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const convidadosNormalizados = convidados.map(n => normalizar(n));
    const nomeNormalizado = normalizar(nome);

    if (!convidadosNormalizados.includes(nomeNormalizado)) {
      return res.status(400).json({ erro: "Nome não encontrado na lista" });
    }

    for (let pessoa of acompanhantes) {
      if (!pessoa || pessoa.trim() === "") continue;

      const pessoaNormalizada = normalizar(pessoa);

      if (!convidadosNormalizados.includes(pessoaNormalizada)) {
        return res.status(400).json({
          erro: `O acompanhante "${pessoa}" não está na lista`
        });
      }
    }

    res.json({ sucesso: true });

  } catch (erro) {
    console.error("Erro no servidor:", erro);
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
