import express, { json } from "express";
import BajaEdesur from "../models/edesurbaja.js";

console.log(BajaEdesur);

const app = express();

const router = express.Router();

router.post("/edesur", (req, res) => {
  const BajaTension = BajaEdesur(req.body);

  BajaTension.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/edenor", (req, res) => {
  res.send("sending edenor data");
});

export default router;
