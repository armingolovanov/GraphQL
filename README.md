first push

--- Siit saab kätte userId näiteks
query {transaction(where: {type: {\_eq: "xp"}, object: {type: {\_eq: "project"}}}) {
id
userId

}}

--- Siit saab vist nt kätte skillid
query {
transaction(where: {type: {\_like: "%skill%"}},
order_by: {amount: desc}) {amount, type}
}
