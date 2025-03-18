import { Router } from 'express';
const router = Router();


router.get('/history', async (_req, res) => {
  try {
      const history = await HistoryService.getHistory();
      res.json(history);
  } catch (error) {
      res.status(500).json({ error: 'Error retrieving search history' });
  }
});

// DELETE Request to delete a city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
      HistoryService.deleteCity(Number(id));
      res.json({ message: `City with id ${id} deleted from history` });
  } catch (error) {
      res.status(500).json({ error: 'Error deleting city from history' });
  }
});
export default router;
