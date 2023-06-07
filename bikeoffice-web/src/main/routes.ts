/**
 * Config object to manage the modules organization against the routes provided in the
 * application
 */

export const routes = {
	tpv: { value: 0, to: "/tpv", layout: "tpv", label: "TPV" },
	rent: { value: 1, to: "/rent", layout: "rent", label: "Rent" },
	manage: { value: 2, to: "/manage", layout: "manage", label: "Manage" },
};
