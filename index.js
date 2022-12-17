import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import { get } from 'http'

async function start() {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://www.enre.gov.ar/paginacorte/tabla_cortes_edesur.html")

    const partidosbaja = await page.evaluate(() => {

        let elements =  [...document.querySelectorAll("#CortesBT > tbody > tr > td:nth-child(1)")].map(x => x.innerHTML)
        return elements
    })

    const localidadbaja = await page.evaluate(() => {

        let elements =  [...document.querySelectorAll("#CortesBT > tbody > tr > td:nth-child(2)")].map(x => x.innerHTML)
        return elements
    })

    const afectadosbaja = await page.evaluate(() => {

        let elements =  [...document.querySelectorAll("#CortesBT > tbody > tr > td:nth-child(3)")].map(x => x.innerHTML)
        return elements
    })
    


    const partidosmedia = await page.evaluate(() => {

        let elements =  [...document.querySelectorAll("#InterrupcionesServicio > tbody > tr > td:nth-child(1)")].map(x => x.innerHTML)
        return elements
    })

        
    const localidadmedia = await page.evaluate(() => {

        let elements =  [...document.querySelectorAll("#InterrupcionesServicio > tbody > tr > td:nth-child(2)")].map(x => x.innerHTML)
        return elements
    })

    const alimentadormedia = await page.evaluate(() => {

        let elements =  [...document.querySelectorAll("#InterrupcionesServicio > tbody > tr > td:nth-child(3)")].map(x => x.innerHTML)
        return elements
    })

    const afectadosmedia = await page.evaluate(() => {

        let elements =  [...document.querySelectorAll("#InterrupcionesServicio > tbody > tr > td:nth-child(4)")].map(x => x.innerHTML)
        return elements
    })

    const etamedia = await page.evaluate(() => {

        let elements =  [...document.querySelectorAll("#InterrupcionesServicio > tbody > tr > td:nth-child(5)")].map(x => x.innerHTML)
        return elements
    })

    const date = new Date().toLocaleString("es-ar", {timeZone: "America/Argentina/Buenos_Aires"})

    const bajatension = partidosbaja.map((x, index) => {
        return {
            id: index,
            partido: x,
            localidad: localidadbaja[index],
            afectados: afectadosbaja[index],
            tiempo: date,
        }
    })

    const mediatension = partidosmedia.map((x, index) => {
        return {
            id: index,
            partido: x,
            localidad: localidadmedia[index],
            alimentador: alimentadormedia[index].split("/")[0],
            afectados: afectadosmedia[index],
            tiempo: date,
            eta: etamedia[index],
        }
    })

    console.log(bajatension);

    await browser.close

}



start()

