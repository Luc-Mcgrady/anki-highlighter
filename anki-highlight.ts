import * as _ from "lodash-es"


(async () => {

    const query = "deck:L::M"
    const match_field = "Hanzi"
    
    const cards_request = {
      "action": "findCards",
      "version": 6,
      "params": {
        query
      }
    }

    const cards_req = await fetch("http://127.0.0.1:8765", { body: JSON.stringify(cards_request), method: "POST", headers: { "Content-Type": "application/json" } })
    const cards = (await cards_req.json())["result"]

    const cards_info_req = { "action": "cardsInfo", "params": {cards} }

    const card_info_req = await fetch("http://127.0.0.1:8765", { body: JSON.stringify(cards_info_req), method: "POST", headers: { "Content-Type": "application/json" } })
    const card_info = (await card_info_req.json())

    const card_card_info = _.groupBy(card_info, ["fields", match_field, "value"])

    console.log(card_card_info)
  })()