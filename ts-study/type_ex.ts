// type Member = {
//     id: number;
//     name: string;
//     age: number;
// }

type MemberRole = "admin" | "user"
type Point = [number, number]
type Member = {
    id: number;
    name: string;
    age?: number
    role: MemberRole
}

const member1: Member = {
    id: 1,
    name: "최주호",
    role: "admin"
}

const member2: Member = {
    id: 2,
    name: "123",
    age: 30,
    role: "user"
}

console.log(`회원1 - ID: ${member1.id}, 이름: ${member1.name}, 권한: ${member1.role}`);
console.log(`회원2 - ID: ${member2.id}, 이름: ${member2.name}, 나이: ${member2.age}, 권한: ${member2.role}`);