const puppeteer = require("puppeteer");

async function screenshotAndConvertToJson(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Tira um screenshot da página
  await page.screenshot({ path: "img/grupo.png" });

  // Extrai o conteúdo relevante da página
  const pageContent = await page.evaluate(() => {
    // Seletor CSS para os elementos que você deseja extrair

    //css atalhos
    //'table.wikitable'; - chama todas as tabelas do site
    //'div.navbox'; - chama as tabelas de times
    //'table[style="width:100%; background: transparent; border-spacing: 0; border-collapse: collapse;"]' - chama todas as patidas

    const selector = 'table.wikitable';
    const elements = Array.from(document.querySelectorAll(selector));

    // Extrai o texto dos elementos
    const extractedData = elements.map((element) => element.textContent.trim());

    return extractedData;
  });

  // Converte o conteúdo em JSON
  const jsonData = JSON.stringify(pageContent);

  // Salva o JSON em um arquivo
  const fs = require("fs");
  fs.writeFileSync("data.json", jsonData);

  await browser.close();
}

// Chama a função com a URL desejada
let ano = 1958;

const url = `https://pt.wikipedia.org/wiki/Copa_do_Mundo_FIFA_de_2014`;
screenshotAndConvertToJson(url)
  .then(() => console.log("Screenshot tirado e JSON gerado com sucesso."))
  .catch((error) => console.error("Ocorreu um erro:", error));

30;
