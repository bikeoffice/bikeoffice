import { Rent, Bike } from "@bikeoffice/types";
import { schema } from "../utils/schema";
import { Op } from "sequelize";

async function getMany(startDate, endDate, opts) {
    try {

        const rentedBikeIds = await Rent.schema(schema(opts)).findAll({
            attributes: ['bikeId'],
            where: {
                startDate: { [Op.lte]: endDate },
                endDate: { [Op.gte]: startDate },
            },
            raw: true,
        });

        const rentedBikeIdsArray = rentedBikeIds.map((rentedBike: any) => rentedBike.bikeId);

        const availableBikes = await Bike.schema(schema(opts)).findAll({
            attributes: ['id', 'name'],
            where: {
                id: { [Op.notIn]: rentedBikeIdsArray },
            },
            raw: true,
        });

        return availableBikes;
    } catch (e: any) {
        console.log('error getting availability: ', e.message);
    }
}

export { getMany }
