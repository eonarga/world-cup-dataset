const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
let ano = 1930;

app.get("/", async (req, res) => {
  const dadosCopas = [];

  while (ano < 2023) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    page.setExtraHTTPHeaders({ "Accept-Language": "pt-BR" });
    await page.goto(
      `https://pt.wikipedia.org/wiki/Copa_do_Mundo_FIFA_de_${ano}`
    );
    await page.setDefaultNavigationTimeout(90000);

    const pageContent = await page.evaluate(() => {
      //buscando elementos da tabela
      const tds = Array.from(document.querySelectorAll("table.infobox tr td"));
      const Links = Array.from(
        document.querySelectorAll("table.infobox tr td a")
      );

      //edição
      const edicao = document.querySelector(
        "span.mw-page-title-main"
      ).innerHTML;

      //participantes
      const qtdpaisesTd = tds.find(
        (td) => td.textContent.trim() === "Participantes"
      );
      const participantes = qtdpaisesTd
        ? qtdpaisesTd.nextElementSibling.textContent.trim()
        : "";

      //paisSede
      const anfitriaoTd = tds.find(
        (td) => td.textContent.trim() === "Anfitrião"
      );
      const paisSede = anfitriaoTd
        ? anfitriaoTd.nextElementSibling.textContent.trim()
        : "";

      //periodo
      const periodoTd = tds.find((td) => td.textContent.trim() === "Período");
      const periodo = periodoTd
        ? periodoTd.nextElementSibling.textContent.trim()
        : "";

      //campeão
      const campTd = tds.find((td) => td.textContent.trim() === "Campeão");
      const campeao = campTd
        ? campTd.nextElementSibling.textContent.trim()
        : "";

      //vice campeão
      const viceCampTd = tds.find(
        (td) => td.textContent.trim() === "Vice-campeão"
      );
      const vicecampeao = viceCampTd
        ? viceCampTd.nextElementSibling.textContent.trim()
        : "";

      //terceiro colocadp
      const terceiroColTd = tds.find(
        (td) => td.textContent.trim() === "3.º colocado"
      );
      const terceiroLugar = terceiroColTd
        ? terceiroColTd.nextElementSibling.textContent.trim()
        : "";

      //total de gols
      const totalDeGolsTd = tds.find(
        (td) => td.textContent.trim() === "Gol(o)s"
      );
      const totalDeGols = totalDeGolsTd
        ? totalDeGolsTd.nextElementSibling.textContent.trim()
        : "";

      //média de gols
      const mdDeGolsTd = tds.find((td) => td.textContent.trim() === "Média");
      const mediaDeGols = mdDeGolsTd
        ? mdDeGolsTd.nextElementSibling.textContent.trim()
        : "";

      //artilheiro
      const artilheiroTd = tds.find(
        (td) => td.textContent.trim() === "Melhor marcador"
      );
      const artilheiro = artilheiroTd
        ? artilheiroTd.nextElementSibling.textContent.trim()
        : "";

      //melhor ataque
      const melhorAtaqueTd = tds.find(
        (td) => td.textContent.trim() === "Melhor ataque (fase inicial)"
      );
      const melhorAtaque = melhorAtaqueTd
        ? melhorAtaqueTd.nextElementSibling.textContent.trim()
        : "";

      //melhor defesa
      const melhorDefesaTd = tds.find(
        (td) => td.textContent.trim() === "Melhor defesa (fase inicial)"
      );
      const melhorDefesa = melhorDefesaTd
        ? melhorDefesaTd.nextElementSibling.textContent.trim()
        : "";

      //maior goleada
      const maiorGoleadatd = tds.find(
        (td) => td.textContent.trim() === "Maiores goleada (diferença)"
      );
      const maiorGoleada = maiorGoleadatd
        ? maiorGoleadatd.nextElementSibling.textContent.trim()
        : "";

      //publico total
      const publicoTotalTd = tds.find(
        (td) => td.textContent.trim() === "Público"
      );
      const publicoTotal = publicoTotalTd
        ? publicoTotalTd.nextElementSibling.textContent.trim()
        : "";

      //melhor jogado FIFA
      const melhorJogadorTd = tds.find(
        (td) => td.textContent.trim() === "Melhor jogador(FIFA)"
      );
      const melhorJogador = melhorJogadorTd
        ? melhorJogadorTd.nextElementSibling.textContent.trim()
        : "";

      //melhor goleiro
      const melhorGoleiroTd = tds.find(
        (td) => td.textContent.trim() === "Melhor goleiro"
      );
      const melhorGoleiro = melhorGoleiroTd
        ? melhorGoleiroTd.nextElementSibling.textContent.trim()
        : "";

      return {
        edicao,
        paisSede,
        periodo,
        campeao,
        vicecampeao,
        terceiroLugar,
        totalDeGols,
        mediaDeGols,
        artilheiro,
        melhorAtaque,
        melhorDefesa,
        maiorGoleada,
        publicoTotal,
        participantes,
        melhorJogador,
        melhorGoleiro,
      };
    });

    ano = ano + 4;
    console.log(ano);

    dadosCopas.push(pageContent);
    await browser.close();
  }

  res.send(dadosCopas);
});

const port = 3000;
app.listen(port, () => {
  console.log("acesse http://localhost:3000");
});
