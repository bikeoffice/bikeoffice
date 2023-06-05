import { Rent, Bike, BikeDetail, BikeSize } from "@bikeoffice/types";
import { schema } from "../utils/schema";
import { Op } from "sequelize";

async function getMany(filter, opts) {
    try {

        const rentedBikeIds = await Rent.schema(schema(opts)).findAll({
            attributes: ['bikeId'],
            where: {
                startDate: { [Op.lte]: filter.endDate },
                endDate: { [Op.gte]: filter.startDate },
            },
            raw: true,
        });

        const rentedBikeIdsArray = rentedBikeIds.map((rentedBike: any) => rentedBike.bikeId);

        const availableBikes = await Bike.schema(schema(opts)).findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: BikeDetail.schema(schema(opts)),
                    include: [
                        {
                            model: BikeSize.schema(schema(opts)),
                            where: { id: filter.sizeId }
                        }
                    ],
                    where: { stock: { [Op.gt]: 0 } }
                }
            ],
            where: {
                id: { [Op.notIn]: rentedBikeIdsArray },
            },
            raw: true,
            nest: true
        });

        return availableBikes;
    } catch (e: any) {
        console.log('error getting availability: ', e.message);
    }
}

export { getMany }
