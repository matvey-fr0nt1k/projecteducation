/*
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
*/
//include('https://cdn.jsdelivr.net/npm/faker@5.5.3/dist/faker.min.js');
//include('https://gitcdn.link/repo/vladbash/hillel-helpers/master/src/students/script.js');

let studentList = studentsMock.getStudentList(11);

//console.log(studentList);

// #1 функция принимает массив студентов и каждому студенту добавляет среднюю оценку и возвращает обновленный список
function addAverageMark(students){
    for(let student of students) {
        student.averageMark = 0;
        for (let mark of student.marks) {
            student.averageMark += mark;
        }
        student.averageMark /= student.marks.length;
    }
    return students
}

console.log(addAverageMark(studentList));

// #2 функция, которая возвращает студентов, средний балл которых ниже 50
function studentsForExpulsion(students) {
    let forExpulsion = [];
    for (const student of students) {
        if (student.averageMark < 50) {
            forExpulsion.push(student);
        }
    }
    return forExpulsion
}

studentList[0].marks.unshift(5);
console.log(studentsForExpulsion(studentList));

// #3 функция принимает массив студентов и каждому студенту добавляет оценку, которая является медианой
function addMedianMark(students) {
    for (let student of students) {
        student.marks.sort( (a, b) => a - b );
        if(student.marks.length % 2 == 0){
            student.medianMark = (student.marks[(student.marks.length / 2) - 1] + student.marks[(student.marks.length / 2)]) / 2;
        }
        else{
            student.medianMark = student.marks[Math.floor(student.marks.length / 2)];
        }
    }

}

addMedianMark(studentList);

// #4 функция добавляет нового рандомного студента с полями ^^
function addNewStudent() {
    studentList.push(studentsMock.getStudent());
}

addNewStudent();
console.log(studentList);

// #5 Красивый вывод
function beautifulOutput(studentList) {
    console.table(studentList);
}

beautifulOutput(studentList);