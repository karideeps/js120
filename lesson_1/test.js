function addQuotationMarks(array) {
  return array.map(element => `'${element}'`)
}


addQuotationMarks(['a', 'b', 'c']).forEach(element => console.log(element));