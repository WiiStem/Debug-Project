fs = require("fs");

function importFile(fileName) {
  const data = fs.readFileSync(fileName);
  return JSON.parse(data);
}

const customers = importFile("data.json");
const prices = customers[0];
customers.splice(0, 1);

const processed = 0;
let total = 0;

function printReciept(customer) {
  console.log(customer);

  const reciept = customer.quantity.map((item, index) => {
    return {
      Item: prices.names[index],
      "Selling price": prices.prices[index],
      Quantity: item,
      "Customer Cost": prices.prices[index] * item,
      "Item Cost to procure": prices.procure[index] * item,
      total: item * prices.prices[index],
    };
  });
  for (let index = 0; index < 4; index++) {
    total += reciept[index].total;
  }

  console.table(reciept);
  return reciept;
}

function main() {
  const receipts = customers.forEach((customer) => printReciept(customer));

  console.log(`orders processed: ${processed}`);
  console.log(`orders' total: ${total}`);
}
main();
