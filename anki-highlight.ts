import * as _ from "lodash-es"
import Rainbow from "rainbowvis.js"

(async () => {
    
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

    const card_card_info = _.groupBy(card_info, card=>card.fields[match_field]?.value)
    
    const gradient = new Rainbow()
    
    gradient.setNumberRange(0, mature)
    gradient.setSpectrum("red", "green")
    
    const colorMap = _.mapValues(card_card_info, (cards) => {
      const filtered_cards = cards.filter(card => card.interval != 0)
      const min_ivl = _.minBy(filtered_cards, card => card.interval)?.interval
      
      return min_ivl ? "#" + gradient.colourAt(min_ivl) : "lightblue"
    })
    
    console.log({colorMap})

    // Escape and join all keys into a single regex alternation
    const escapedKeys = Object.keys(colorMap).map(s =>
      s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    );
    const combinedRegex = new RegExp(`(${escapedKeys.join("|")})`, "g");

    // One-pass replace
    document.body.innerHTML = document.body.innerHTML.replace(combinedRegex, (match) => {
      const color = colorMap[match];
      return `<span style="background-color: ${color};">${match}</span>`;
    });
    
  })()