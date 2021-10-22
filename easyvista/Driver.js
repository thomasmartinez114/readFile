var fs = require('fs');

// Step 1. Create all single-d and multi-d arrays AS empty arrays (initially)
// push single string data/elements into an array as a single element
// push array data into an array to form multi-d arrays


/////////////////////////////////////////
////       VARIABLES - ARRAYS       ////
////////////////////////////////////////

// single-d arrays -- valid
var ticketDateOpen = []; // done
var ticketNumber = []; // done
var ticketRequestor = [];
var ticketStatus = [];
var ticketDateClose = [];
var ticketCategory = [];

//create empty multi-d arrays -- currently invalid. Must push sub arrays
var employeeId = [];
var employeeName = [];
var salaries = [];


/////////////////////////////////////////
////          DEPT NAMES            ////
////////////////////////////////////////

// Process 'load_dept_name.txt' file

function dDepartmentNames() {
    fs.readFile('./data/tickets.txt', 'utf8', function(err, data) {
    if (err) throw err;

    console.log()

    var deptDataClean = data.replace(/;/g, "\n");
    var deptDataArray = deptDataClean.split('\n');


    for (var i = 0; i < deptDataArray.length; i++) {
        // populate single-d arrays with DATA
        // ticketDate.push(d001);
        // slice characters 2 - 6 to get ID and push it to array
        ticketDate.push(deptDataArray[i].slice(2, 6));
        departments.push(deptDataArray[i].slice(9, -3));

        // populate multi-d arrays with empty sub-arrays [] (NO DATA!!!)

        employeeId.push([]);
        employeeName.push([]);
        salaries.push([]);
    }

    console.log(ticketDate);
    console.log(departments);

    console.log(employeeId);
    console.log(employeeName);
    console.log(salaries);
    // employeeId[[],[],[],[],[],[],[],[],[]
});
}





/////////////////////////////////////////
////        DEPT EMPLOYEES          ////
////////////////////////////////////////


function dDepartmentEmployees() {
    // Process 'load_dept_emp.txt' file
fs.readFile('load_dept_emp.txt', 'utf8', function(err, data) {
    if (err) throw err;

    // Dept-Emp arrays
    var employeeDataClean;
    var employeeDataArray;

    var employeeDataClean = data.replace(/INSERT INTO `dept_emp` VALUES /g, "");
    var employeeDataArray = employeeDataClean.split('\n');

    for (var i = 0; i < employeeDataArray.length; i++) {
        if (employeeDataArray[i].slice(28, 32) == '9999') {

            // employeeId[4].push(10001);
            // pushing the employee's ID (1001) to appropriate sub array by getting index of d005 within the mult-d array from slicing out of line i of employeeDataArray
            employeeId[ticketDate.indexOf(employeeDataArray[i].slice(8, 12))].push(employeeDataArray[i].slice(1, 6));
            // employeeId[[],[],[],[],[10001],[],[],[],[]
        }
    }
    console.log("EmployeeId Array");
    console.log(employeeId);

});
}




/////////////////////////////////////////
////       EMPLOYEE SALARIES        ////
////////////////////////////////////////

function dDepartmentSalaries() {
    fs.readFile('load_salaries.txt', 'utf8', function(err, data) {
    if (err) throw err;

    // Salary arrays
    var salaryDataClean, salaryDataArray;

    salaryDataClean = data.replace(/INSERT INTO `salaries` VALUES /g, "");
    salaryDataArray = salaryDataClean.split('\n');

    for (var i = 0; i < salaryDataArray.length; i++) {

        // if (salaryDataArray[16].slice(9999) == '9999') {
        if (salaryDataArray[i].slice(27, 31) == '9999') {

            // console.log("Current Salary, EmployeeId:");
            // console.log(salaryDataArray[i].slice(1, 6));

            for (var j = 0; j < employeeId.length; j++) { // 1) loops through the 20 employee id's in the employeeId array. 2) Gives us the employeeId subarray to iterate through in the following for loop (k)

                // employeeId[ [1000x, 1000x, 1000x], [], [], [], [], [], [], [], []];

                for (var k = 0; k < employeeId[j].length; k++) {

                    if (employeeId[j][k] == salaryDataArray[i].slice(1, 6)) {

                        salaries[j].push(salaryDataArray[i].slice(7, 12));
                        // salaries = parseInt(salaries, 10);
                    }
                }
            }
        }

    }
     console.log("Salaries Array");
     console.log(salaries);
});

}


/////////////////////////////////////////
////       EMPLOYEE NAMES           ////
////////////////////////////////////////

function dEmployeeNames() {
    fs.readFile('load_employee.txt', 'utf8', function(err, data) {
    if (err) throw err;

    var nameSplit, nameSplitId, joinedNames;

    var nameDataClean = data.replace(/INSERT INTO `employees` VALUES /g, "");
    var nameDataArray = nameDataClean.split('\n');

    for (var i = 0; i < nameDataArray.length; i++) {

        nameSplit = nameDataArray[i].split(',');
        nameSplitId = nameSplit[0].replace(/\(/g, "");

        // console.log("nameSplit");
        // console.log(nameSplit);
        // example of what nameSplit will be:
        // nameSplit
        // ['(10018',
        //   '\'1954-06-19\'',
        //   '\'Kazuhide\'',
        //   '\'Peha\'',
        //   '\'F\'',
        //   '\'1987-04-03\')',
        //   '' ]

        // console.log("nameSplitId");
        // console.log(nameSplitId);

        // console.log("nameSplit[2]");
        // console.log(nameSplit[2]);

        for (var j = 0; j < employeeId.length; j++) {

            for (var k = 0; k < employeeId[j].length; k++) {

                if (employeeId[j][k] == nameSplitId) {

                    joinedNames = nameSplit[2].replace(/'/g, "") + " " + nameSplit[3].replace(/'/g, "");
                    employeeName[j].push(joinedNames);

                }
            }
        }
    }

    console.log("EmployeeName Array");
    console.log(employeeName);

    // console.log(employeeName[0][0]);
});
}

// Do for loop to run through departments and sum salaries

// single-d arrays -- valid
// var ticketDate = []; // done
// var departments = []; // done

//create empty multi-d arrays -- currently invalid. Must push sub arrays
// var employeeId = [];
// var employeeName = [];
// var salaries = [];


/////////////////////////////////////////
////            REPORT              ////
////////////////////////////////////////



// Referenced StockMarket.js



// function deptTotalsReport() {

//     var deptGrandTotal = 0;

//     for (var i = 0; i < departments.length; i++) {

//         var deptSalary = 0;

//         console.log('');
//         console.log("Department:", departments[i], ticketDate[i] + ":", deptSalary);

//         for (var j = 0; j < employeeId[i].length; j++) {
//             // console.log(`  ${j+1}. Employee ID: ${employeeId[i][j]}, Name: ${employeeName[i][j]}, Salary: ${salaries[i][j]}`);
//             console.log(j + 1, "Employee ID:", employeeId[i][j], "Name:", employeeName[i][j], "Salary:", salaries[i][j]);

//             deptSalary += parseInt(salaries[i][j]);
//             deptGrandTotal += parseInt(salaries[i][j]);

//         }
//     }
//     console.log("");
//     console.log("Total", departments[i], "salary is:", deptSalary);

//     console.log("");
//     console.log("The company wide salaries total is:", deptGrandTotal);
// }

// deptTotalsReport();

function deptTotalsReport() {
    // delete the following console.log
    console.log(">>>inside of the deptTotalsReport function.");
        // delete the following console.log

    console.log("departments is\n",departments);

    var deptGrandTotal = 0;

    for (var i = 0; i < departments.length; i++) {
        
        // delete the following console.log
        console.log(">>>>>>inside of i < departments.length.");
       
        var deptSalary = 0;
        
        console.log('');
        console.log("Department:", departments[i], ticketDate[i] + ":");

        for (var j = 0; j < employeeId[i].length; j++) {
            // console.log(`  ${j+1}. Employee ID: ${employeeId[i][j]}, Name: ${employeeName[i][j]}, Salary: ${salaries[i][j]}`);
            console.log(j+1, "Employee ID:", employeeId[i][j], "Name:", employeeName[i][j], "Salary:", salaries[i][j]);

            deptSalary += parseInt(salaries[i][j],10);
            deptGrandTotal += parseInt(salaries[i][j],10);
        }



    }
    
    console.log("");
    console.log("Total department salary is:", deptSalary);
    console.log("");
    console.log("The company wide salaries total is:", deptGrandTotal);
}


dDepartmentNames();
dDepartmentEmployees();
dDepartmentSalaries();
dEmployeeNames();

deptTotalsReport();
