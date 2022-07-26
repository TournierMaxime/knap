import { frauds } from "../../../data/fraud_test.json";
import fs from "fs";
import path from "path";
import useRouter from "next/router";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const fraud = frauds.find((fraud) => fraud.id === parseInt(id));
    res.status(200).json(fraud);
  } else if (req.method === "POST") {
    return res.status(200).json({
      message: "This is in post",
    });
  }
}
