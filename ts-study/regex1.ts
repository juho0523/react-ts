const m = "korea".match(/^[a-z]+/);
console.log(m?.[0])

const one = "korea".match(/^[a-z]/)
console.log(one?.[0])

const s = "abc123def".match(/\d+/)
console.log(s?.[0])

const n = "abc123def".match(/^\d+/)
console.log(n)


const a = /^[a-z]+/
const b = /^[a-z]+$/

console.log(a.test("abc"))
console.log(a.test("abc123"))
console.log(a.test("4abc"))

console.log(b.test("abc"))
console.log(b.test("abc123"))
console.log(b.test("4abc"))