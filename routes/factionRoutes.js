const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { createFaction, joinFaction, getFaction, leaveFaction } = require('../controllers/factioncontroller');
const Faction = require('../models/factionModel');

/**
 * @swagger
 * tags:
 *   name: Factions
 *   description: Endpoints for joining and managing factions
 */

/**
 * @swagger
 * /api/factions:
 *   post:
 *     summary: Create a new faction
 *     tags: [Factions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Faction created successfully
 */
router.post('/', createFaction);

/**
 * @swagger
 * /api/factions/join:
 *   post:
 *     summary: Join a faction
 *     tags: [Factions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - factionName
 *             properties:
 *               userId:
 *                 type: string
 *               factionName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully joined a faction
 */
router.post('/join', joinFaction);

/**
 * @swagger
 * /api/factions/leave:
 *   post:
 *     summary: Leave a faction
 *     tags: [Factions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully left the faction
 */
router.post('/leave', leaveFaction);

/**
 * @swagger
 * /api/factions/{userId}:
 *   get:
 *     summary: Get faction for a user
 *     tags: [Factions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Faction found
 */
router.get('/:userId', getFaction);

/**
 * @swagger
 * /api/factions:
 *   get:
 *     summary: Get all factions
 *     tags: [Factions]
 *     responses:
 *       200:
 *         description: A list of factions
 */
router.get('/', async (req, res) => {
  try {
    const factions = await Faction.find();
    res.status(200).json(factions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch factions' });
  }
});

module.exports = router;