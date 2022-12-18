import puppeteer from "puppeteer";
import express, { json } from "express";
import mongoose, { Model } from "mongoose";
import dotenv from "dotenv";
import dbRoutes from "./routes/db.js";
import BajaEdesur from "./models/edesurbaja.js";
import MediaEdesur from "./models/edesurmedia.js";
import ProgramadosEdesur from "./models/edesurprogramados.js";
import e from "express";

dotenv.config();
// user: alek pwd: mongo

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use("/api", dbRoutes);
app.use(express.json());

app.listen(port, () => console.log("Server listening on port", port));

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const scrapeEdesur = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.enre.gov.ar/paginacorte/tabla_cortes_edesur.html"
  );

  const partidosbaja = await page.evaluate(() => {
    let elements = [
      ...document.querySelectorAll("#CortesBT > tbody > tr > td:nth-child(1)"),
    ].map((x) => x.innerHTML);
    return elements;
  });

  const localidadbaja = await page.evaluate(() => {
    let elements = [
      ...document.querySelectorAll("#CortesBT > tbody > tr > td:nth-child(2)"),
    ].map((x) => x.innerHTML);
    return elements;
  });

  const afectadosbaja = await page.evaluate(() => {
    let elements = [
      ...document.querySelectorAll("#CortesBT > tbody > tr > td:nth-child(3)"),
    ].map((x) => x.innerHTML);
    return elements;
  });

  const partidosmedia = await page.evaluate(() => {
    let elements = [
      ...document.querySelectorAll(
        "#InterrupcionesServicio > tbody > tr > td:nth-child(1)"
      ),
    ].map((x) => x.innerHTML);
    return elements;
  });

  const localidadmedia = await page.evaluate(() => {
    let elements = [
      ...document.querySelectorAll(
        "#InterrupcionesServicio > tbody > tr > td:nth-child(2)"
      ),
    ].map((x) => x.innerHTML);
    return elements;
  });

  const alimentadormedia = await page.evaluate(() => {
    let elements = [
      ...document.querySelectorAll(
        "#InterrupcionesServicio > tbody > tr > td:nth-child(3)"
      ),
    ].map((x) => x.innerHTML);
    return elements;
  });

  const afectadosmedia = await page.evaluate(() => {
    let elements = [
      ...document.querySelectorAll(
        "#InterrupcionesServicio > tbody > tr > td:nth-child(4)"
      ),
    ].map((x) => x.innerHTML);
    return elements;
  });

  const etamedia = await page.evaluate(() => {
    let elements = [
      ...document.querySelectorAll(
        "#InterrupcionesServicio > tbody > tr > td:nth-child(5)"
      ),
    ].map((x) => x.innerHTML);
    return elements;
  });

  const date = new Date().toLocaleString("es-ar", {
    timeZone: "America/Argentina/Buenos_Aires",
  });

  const cortesprogramadospartido = await page.evaluate(() => {
    let partido = [
      ...document.querySelectorAll(
        "#CortesProgramados > tbody > tr > td:nth-child(1)"
      ),
    ].map((x) => x.innerHTML);
    return partido;
  });

  const cortesprogramadoslocalidad = await page.evaluate(() => {
    let localidad = [
      ...document.querySelectorAll(
        "#CortesProgramados > tbody > tr > td:nth-child(2)"
      ),
    ].map((x) => x.innerHTML);
    return localidad;
  });

  const cortesprogramadosalimentador = await page.evaluate(() => {
    let alimentador = [
      ...document.querySelectorAll(
        "#CortesProgramados > tbody > tr > td:nth-child(3)"
      ),
    ].map((x) => x.innerHTML);
    return alimentador;
  });

  const cortesprogramadosafectados = await page.evaluate(() => {
    let afectados = [
      ...document.querySelectorAll(
        "#CortesProgramados > tbody > tr > td:nth-child(4)"
      ),
    ].map((x) => x.innerHTML);
    return afectados;
  });

  const cortesprogramadoseta = await page.evaluate(() => {
    let eta = [
      ...document.querySelectorAll(
        "#CortesProgramados > tbody > tr > td:nth-child(5)"
      ),
    ].map((x) => x.innerHTML);
    return eta;
  });

  const cortesprogramados = cortesprogramadospartido.map((x, index) => {
    return {
      partido: x,
      localidad: cortesprogramadoslocalidad[index],
      alimentador: cortesprogramadosalimentador[index],
      afectados: cortesprogramadosafectados[index],
      eta: cortesprogramadoseta[index],
      tiempo: date,
      time: date,
    };
  });

  const bajatension = partidosbaja.map((x, index) => {
    return {
      partido: x,
      localidad: localidadbaja[index],
      afectados: afectadosbaja[index],
      time: date,
    };
  });

  const mediatension = partidosmedia.map((x, index) => {
    return {
      id: index,
      partido: x,
      localidad: localidadmedia[index],
      alimentador: alimentadormedia[index]?.split("/")[0],
      afectados: afectadosmedia[index],
      tiempo: date,
      eta: etamedia[index],
    };
  });
  browser.close;

  return { bajatension, mediatension, cortesprogramados };
};

const data = await scrapeEdesur();

app.get("/", (req, res) => {
  res.send(data);
});

console.log(data.cortesprogramados);

// Inserting many documents into schema

if (data.cortesprogramados[0].afectados != undefined) {
  ProgramadosEdesur.insertMany(data.cortesprogramados)
    .then(function () {
      console.log("Data insertada en cortes programados"); // Success
    })
    .catch(function (err) {
      console.log(err);
    });
} else {
  console.log("Data no insertada en cortes programados");
}

if (data.bajatension[0].afectados != undefined) {
  BajaEdesur.insertMany(data.bajatension)
    .then(function () {
      console.log("Data insertada en baja tension"); // Success
    })
    .catch(function (err) {
      console.log(err);
    });
} else {
  console.log("Data no insertada en baja tension");
}

if (data.mediatension[0].afectados != undefined) {
  MediaEdesur.insertMany(data.mediatension)
    .then(function () {
      console.log("Data insertada en media tension"); // Success
    })
    .catch(function (err) {
      console.log(err);
    });
} else {
  console.log("Data no insertada en media tension");
}

const findData = await BajaEdesur.findOne({});

export default data;
