const sub = (x: number, y: number): number => {
    return x - y;
}
const result = sub(10, 5)
console.log(`10 - 5 = ${result}`);


const greet = (name: string): void => {
    console.log(`Hello, ${name}!`);
}
greet("world")


const createUser = (id: number, name: string): 
    {id: number; name: string} => {
    return {id, name}
}
const user_kim = createUser(1, "최주호")
console.log(`사용자 ID: ${user_kim.id}, 이름: ${user_kim.name}`);
