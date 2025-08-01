import * as _ from "lodash-es";

export async function fetch_card_info_groups(query: string, match_field: string) {
	const cards_request = {
		action: "findCards",
		version: 6,
		params: {
			query: `(${match_field}:*) (${query || "*"})`
		}
	};

	const cards_req = await fetch("http://127.0.0.1:8765", {
		body: JSON.stringify(cards_request),
		method: "POST",
		headers: { "Content-Type": "application/json" }
	});
	const cards = (await cards_req.json())["result"];

	const cards_info_req = { action: "cardsInfo", params: { cards } };

	const card_info_req = await fetch("http://127.0.0.1:8765", {
		body: JSON.stringify(cards_info_req),
		method: "POST",
		headers: { "Content-Type": "application/json" }
	});
	const card_info = await card_info_req.json();

	return _.groupBy(card_info, (card) => card.fields[match_field]?.value);
}
