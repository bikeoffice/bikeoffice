import { Bike, Client, Rent } from "@bikeoffice/types";
import { schema } from "../../utils/schema";

async function getMany({ filter, limit, offset, order }, opts) {
	try {
		const data = await Rent.schema(schema(opts)).findAll({
			include: [{ model: Bike.schema(schema(opts)) }, { model: Client.schema(schema(opts)) }],
		});
		if (data) {
			const rents = data.map(rent => {
				return {
					...rent.dataValues,
					client: (rent as any).client.dataValues,
					bike: (rent as any).bike.dataValues,
				};
			});
			return rents;
		}
		return [];
	} catch (e: any) {
		console.log("error fetching rents: ", e.message);
	}
}

export { getMany };
