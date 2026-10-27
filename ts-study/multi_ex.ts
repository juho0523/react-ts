type Grade = "A" | "B" | "C" | "D" | "F"

interface Course {
    courseId: number;
    courseName: string;
    grade?: Grade;
}

interface Student {
    id: number;
    name: string;
    subjects: Course[];
}

let student1: Student = {
    id:1,
    name: "최주호",
    subjects: [
        {courseId: 101, courseName: "수학", grade: "B"},
        {courseId: 102, courseName: "영어", grade: "A"},
    ]
}

console.log(`학생명: ${student1.name}`)
student1.subjects.forEach(subject => {
    console.log(`과목명: ${subject.courseName}, 학점: ${subject.grade}`)
})
