type StringMap = Record<string, string>

const translations: StringMap = {
    hello: "안녕히세요",
    goodbye: "안녕히가세요"
}

console.log(translations.hello);
console.log(translations.goodbye);


type Fruit = 'apple' | 'banana' | 'orange';

const prices: Record<Fruit, number> = {
  apple: 2000,
  banana: 1500,
  orange: 1000
}
console.log(`사과 가격: ${prices.apple}`);
for(const fruit in prices){
    console.log(`${fruit}: ${prices[fruit as Fruit]}`);
}
