const courses = [{
    prefix: 'ITIS',
    id: 4166,
    title: 'Network based app development'
},
{
    prefix: 'ITIS',
    id: 4180,
    title: 'Mobile application development'
},
{
    prefix: 'ITCS',
    id: 4156,
    title: 'Intro to machine learning'
},
{
    prefix: 'ITCS',
    id: 3160,
    title: 'Database desgin'
}
];

//return a course that matches the id
function findById(id) {
    return courses.find(course => course.id === id);
}

//implement save(course)
function save(course){
    return courses.push(course);
}

//implement findByPrefix(prefix) *filter method
function findByPrefix(prefix){
    let courseObjects = [];
    
    courses.filter(course => {
        if (course.prefix === prefix){
            courseObjects.push(course)
        }
    });
    return courseObjects;
}

//implement updateById(id, course)
function updateById(id, course){
    let coursesIndex = courses.findIndex(course => course.id === id);
    if (coursesIndex != -1){
        courses[coursesIndex] = course;
        return true;
    }
    return false;
}

//implement removeById(id) *splice method
function removeById(id){
    let coursesIndex = courses.findIndex(course => course.id === id);
    if (coursesIndex != -1){
        courses.splice(coursesIndex, 1);
        return true;
    }
    return false;
}

//uncomment the following testing code when you are ready to test your functions

save({ prefix: 'ITIS', id: 3310, title: 'Software architecture & design' });
save({ prefix: 'ITIS', id: 4250, title: 'Computer forensics' });
save({ prefix: 'ITIS', id: 4420, title: 'Usable security and privacy' });
console.log(courses);
console.log(findById(4166));
console.log(findByPrefix('ITIS'));
console.log(removeById(4000));
console.log(updateById(4000));
console.log(updateById(4166, {
    prefix: 'ITIS',
    id: 4166,
    title: 'Network-based app development'
}, ));
console.log(removeById(4420));
console.log(courses);