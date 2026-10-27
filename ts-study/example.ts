const scores: Array<number> = [90, 85, 100]
console.log(scores.join(", "));

function getFirst<T>(arr: T[]): T {
    return arr[0]
}

const num = getFirst<number>([10, 20, 30])
const str = getFirst<string>(["사과", "바나나"])
const auto = getFirst([true, false])

console.log(num, str, auto);

