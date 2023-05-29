const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

app.get('/', async (req, res) => {

        const browser = await puppeteer.launch({headless: true}); 
        const page = await browser.newPage();
        page.setExtraHTTPHeaders({'Accept-Language': 'pt-BR'});   
        await page.goto(`https://pt.wikipedia.org/wiki/Copa_do_Mundo_FIFA_de_2022`);
        await page.setDefaultNavigationTimeout(90000);
    
        const pageContent = await page.evaluate(() => {

            //buscando elementos da tabela
            const tds = Array.from(document.querySelectorAll('table.infobox tr td'));
            const Links = Array.from(document.querySelectorAll('table.infobox tr td a'));

            //edição
            const edicao = document.querySelector('span.mw-page-title-main').innerHTML;

            //paisSede
            const anfitriaoTd = tds.find(td => td.textContent.trim() === 'Anfitrião');
            const paisSede = anfitriaoTd.nextElementSibling.textContent.trim();

            //periodo
            const periodoTd = tds.find(td => td.textContent.trim() === 'Período');
            const periodo = periodoTd.nextElementSibling.textContent.trim();

            //campeão
            const campTd = tds.find(td => td.textContent.trim() === 'Campeão');
            const campeao = campTd.nextElementSibling.textContent.trim();

            //vice campeão
            const viceCampTd = tds.find(td => td.textContent.trim() === 'Vice-campeão');
            const vicecampeao = viceCampTd.nextElementSibling.textContent.trim();

            //terceiro colocado 
            const terceiroColTd = tds.find(td => td.textContent.trim() === '3.º colocado');
            const terceiroLugar = terceiroColTd.nextElementSibling.textContent.trim();

            //total de gols 
            const totalDeGolsTd = tds.find(td => td.textContent.trim() === 'Gol(o)s');
            const totalDeGols = totalDeGolsTd.nextElementSibling.textContent.trim();

            //média de gols
            const mdDeGolsTd = tds.find(td => td.textContent.trim() === 'Média');
            const mediaDeGols = mdDeGolsTd.nextElementSibling.textContent.trim();
            
            //melhor marcador
            const mlhMarcadorTd = tds.find(td => td.textContent.trim() === 'Melhor marcador');
            const melhorMarcador = mlhMarcadorTd.nextElementSibling.textContent.trim();

            //melhor jogador
            const mlhjogadorTd = tds.find(td => td.textContent.trim() === 'Melhor jogador');
            const melhorJogador = mlhjogadorTd.nextElementSibling.textContent.trim();

            return {
                edicao,
                paisSede,
                periodo,
                campeao,
                vicecampeao,
                terceiroLugar,
                totalDeGols,
                mediaDeGols,
                melhorMarcador,
                melhorJogador
            };
        });
        
        await browser.close();
    
        res.send(
            {
                Informações_gerais: {
                    Edição:  pageContent.edicao,
                    Pais_sede:  pageContent.paisSede,
                    Período: pageContent.periodo,  
                    Campeão: pageContent.campeao,
                    Vice_campeão: pageContent.vicecampeao,
                    Terceiro_lugar: pageContent.terceiroLugar,
                    Total_de_gols: pageContent.totalDeGols,
                    Média_de_gols: pageContent.mediaDeGols,
                    Melhor_marcador: pageContent.melhorMarcador,
                    melhor_Jogador: pageContent.melhorJogador
                    
                }
            }
           
        );

})




app.get('/', async (req, res) => {

    const browser = await puppeteer.launch({ headless: true }); 
    const page = await browser.newPage();
    page.setExtraHTTPHeaders({'Accept-Language': 'pt-BR'});   
    await page.goto(`https://pt.wikipedia.org/wiki/Copa_do_Mundo_FIFA_de_2022`);
    await page.setDefaultNavigationTimeout(90000);

    const pageContent = await page.evaluate(() => {

        //estadios
        const estadios = document.querySelector('.hgKElc').innerHTML;

        //paisSede
        //const anfitriaoTd = tds.find(td => td.textContent.trim() === 'Anfitrião');
        //const paisSede = anfitriaoTd.nextElementSibling.textContent.trim();



        return {
            estadios

        };
    });

    await browser.close();






res.send(
    {
        Location: {
            Localização_estadios:  pageContent.estadios

            
        }
    }
   );
})

















const port = 3000;
app.listen(port, () => {
    console.log('acesse http://localhost:3000')
})