import express from 'express';
import { validateErrorEvent } from '../middleware/validateErrorEvent';
import { errorService } from '../services/errorService';

const router = express.Router();

router.get('/stats/trend', async (req, res) => {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const trend = await errorService.getErrorTrend(days);
    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving error trend' });
  }
});

/**
 * @swagger
 * /api/errors:
 *   post:
 *     summary: Report a new error
 *     tags: [Errors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorEvent'
 *     responses:
 *       201:
 *         description: Error reported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 */
router.post('/', validateErrorEvent, async (req, res) => {
  try {
    const errorData = req.body;
    const id = await errorService.storeError(errorData);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ message: 'Error storing error event' });
  }
});

/**
 * @swagger
 * /api/errors/{id}:
 *   get:
 *     summary: Get a specific error by ID
 *     tags: [Errors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Error details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEvent'
 *       404:
 *         description: Error not found
 */
router.get('/:id', async (req, res) => {
  try {
    const error = await errorService.getError(req.params.id);
    if (error) {
      res.json(error);
    } else {
      res.status(404).json({ message: 'Error not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving error event' });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const projectId = req.query.projectId as string;
    const environment = req.query.environment as string;
    const severity = req.query.severity as string;

    const [errors, total] = await errorService.getErrors(page, limit, projectId, environment, severity);
    res.json({
      errors,
      total,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving error events' });
  }
});

router.get('/stats/:projectId', async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const days = parseInt(req.query.days as string) || 7;
    const stats = await errorService.getErrorStats(projectId, days);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving error statistics' });
  }
});



export default router;