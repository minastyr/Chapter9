import { Router } from "express";
const router = Router();
import HistoryService from "../../service/historyService.js";

router.get("/history", (_req, res) => {
  HistoryService.getHistory().then((data) => res.json(data));
});

// * BONUS TODO: DELETE city from search history-DONE!
router.delete("/history/:id", async (req, res) => {});
export default router;
