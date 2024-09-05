import express from 'express';
import { validateErrorEvent } from '../middleware/validateErrorEvent';
import { errorStorage } from '../services/errorStorage';

const router = express.Router();

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
router.post('/', validateErrorEvent, (req, res) => {
  const errorData = req.body;
  const id = errorStorage.storeError(errorData);
  res.status(201).json({ id });
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
router.get('/:id', (req, res) => {
  const error = errorStorage.getError(req.params.id);
  if (error) {
    res.json(error);
  } else {
    res.status(404).json({ message: 'Error not found' });
  }
});

export default router;