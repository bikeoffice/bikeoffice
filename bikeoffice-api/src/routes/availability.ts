import express from 'express';
import { getMany } from '../services/availablityService';

export const AvailabilityRouter = express.Router();

AvailabilityRouter.post('/', async (req, res) => {
    const { startDate, endDate } = req.body as any;
    const availableBikesIds = await getMany(startDate, endDate, { req });
    return res.send(availableBikesIds);
});
