// Your code here

//1 - 7
function createEmployeeRecord(array) {
    const obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj;
}

console.log(
createEmployeeRecord(["Gray", "Worm", "Security", 1])
)

function createEmployeeRecords(array) {
    let newArray = []
    array.forEach(element => {
        newArray.push( createEmployeeRecord(element) )
    });
    return newArray;
}

// console.log (
// createEmployeeRecords( [
//     ["Thor", "Odinsson", "Electrical Engineer", 45],
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150],
//     ["Darcey", "Lewis", "Intern", 15],
//     ["Jarvis", "Stark", "CIO", 125],
//     ["Anthony", "Stark", "Angel Investor", 300],
//     ["Byron", "Poodle", "Mascot", 3],
//     ["Julius", "Caesar", "General", 27],
//     ["Rafiki", "", "Aide", 10],
//     ["Simba", "", "King", 100]
//   ] )
//   )

function createTimeInEvent(employeeObj, dateStampString) {
    const hr = parseInt( dateStampString.slice(11, 15) );
    const da = dateStampString.slice(0, 10)
    const newObj = {
        type: "TimeIn",
        hour: hr,
        date: da
    }
    employeeObj["timeInEvents"].push(newObj)
    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStampString) {
    const hr = parseInt ( dateStampString.slice(11, 15) );
    const da = dateStampString.slice(0, 10)
    const newObj = {
        type: "TimeOut",
        hour: hr,
        date: da
    }
    employeeObj["timeOutEvents"].push(newObj)
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, dateStampString) {
    let timeOutTime;

    employeeObj["timeOutEvents"].forEach(element => {
        if (element.date === dateStampString) {
            timeOutTime = element.hour;
        }
    })

    let timeInTime;

    employeeObj["timeInEvents"].forEach(element => {
        if (element.date === dateStampString) {
            timeInTime = element.hour;
        }
    })

    return ((timeOutTime - timeInTime)/100)
}

function wagesEarnedOnDate(employeeObj, dateStampString) {
    return (hoursWorkedOnDate(employeeObj, dateStampString) * employeeObj.payPerHour)
}

function allWagesFor(employeeObj) {
    let totalEarned = 0;

    employeeObj.timeInEvents.forEach(element => {
        totalEarned += wagesEarnedOnDate(employeeObj, element.date )
    });

    return totalEarned;

}


function calculatePayroll(arrayOfEmployees) {
    let sum = 0;

    arrayOfEmployees.forEach(element => {
        sum += allWagesFor(element)
    });


    return sum;
}