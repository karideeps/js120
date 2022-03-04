/*

1. Two disadvantages of factor functions are:
  i. Ever object created with the factor function has a full copy of all the methods. This is redundant and can put a heavy load on the system memory.
  ii. There is no way to inspect an object and tell whether or not it was created from a factory function. 

*/

// 2
function makeObj() {
  return {
    propA: 10,
    propB: 20,
  }
}

// 3
function createInvoice(services) {

  let obj = {
    phone: 3000,
    internet: 5500,
    remaining: null,

    total: function() {
      return this.phone + this.internet;
    },

    addPayment: function(obj) {
      this.remaining = this.remaining - obj.total();
    },

    addPayments: function(array) {
      array.forEach(obj => {
        this.remaining = this.remaining - obj.total();
      })
    },

    amountDue: function () {
      return this.remaining;
    }

  }

  if (services) {
    if (services.phone) obj.phone = services.phone;
    if (services.internet) obj.internet = services.internet;
    obj.remaining = obj.phone + obj.internet;
  }


  return obj;


  return {
    phone: services ? (services.phone ? services.phone : 3000) : 3000,
    internet: services ? (services.internet ? services.internet : 5500) : 5500,
    
    total: function() {
      return this.phone + this.internet;
    },
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length ; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

// console.log(invoiceTotal(invoices));

// 4
function createPayment(services) {

  let obj = {
    internet: 0,
    phone: 0,
    amount: 0,

    total: function() {
      if (this.amount) return this.amount;
      let totalPayment = 0;
      if (this.internet) totalPayment += this.internet;
      if (this.phone) totalPayment += this.phone;
      return totalPayment;
    }
  };

  if (services) {
    if (services.internet) obj.internet = services.internet;
    if (services.phone) obj.phone = services.phone;
    if (services.amount) obj.amount = services.amount;
  }

  return obj;

}

function paymentTotal(payments) {
  return payments.reduce((sum, payment) => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

// console.log(paymentTotal(payments));

// 5
let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000});
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());