import express from 'express';
import { getMany } from './service';

export const AvailabilityRouter = express.Router();

AvailabilityRouter.post('/', async (req, res) => {
    const { startDate, endDate, sizeId } = req.body as any;
    const availableBikesIds = await getMany({ startDate, endDate, sizeId }, { req });
    return res.send(availableBikesIds);
});
