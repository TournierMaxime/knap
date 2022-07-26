import { frauds } from "../../../data/fraud_test.json";
// Get the element id
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const fraud = frauds.find((fraud) => fraud.id === parseInt(id));
    res.status(200).json(fraud);
  }
}
