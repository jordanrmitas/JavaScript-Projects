import { employeeData } from "./employee_data.js";

const emp = JSON.parse(employeeData);

let filteredList = [...emp];
//console.log(emp);

//const ordered = emp.sort((a,b) => a.salary > b.salary ? 1: -1)
//console.log(ordered);

export function generateTable() {
    let titles = document.createElement("tr");
    document.getElementById("employee-table").appendChild(titles)
    titles.innerHTML = `<th data-key="name">Name <span class="sort-arrow">↕</span></th> <th data-key="id">Employee ID <span class="sort-arrow">↕</span></th> <th data-key="jobTitle">Job Title <span class="sort-arrow">↕</span></th> <th data-key="department">Department <span class="sort-arrow">↕</span></th> <th data-key="salary">Salary <span class="sort-arrow">↕</span></th> <th data-key="location">Location <span class="sort-arrow">↕</span></th>`;

    for (let i=0; i < emp.length; i++) {
       let row = document.createElement("tr");
       let empName = document.createElement("td");
       row.appendChild(empName);
       empName.classList.add("employee-name")

       let empID = document.createElement("td");
       row.appendChild(empID);
       empID.classList.add("employee-id")

       let empJobTitle = document.createElement("td");
       row.appendChild(empJobTitle);
       empJobTitle.classList.add("employee-job-title")

       let empDepartment = document.createElement("td");
       row.appendChild(empDepartment);
       empDepartment.classList.add("employee-department")

       let empSalary = document.createElement("td");
       row.appendChild(empSalary);
       empSalary.classList.add("employee-salary")
       
       let empLocation = document.createElement("td");
       row.appendChild(empLocation);
       empLocation.classList.add("employee-location")


       document.getElementById("employee-table").appendChild(row)
    }
    
    titles.addEventListener("click", function (e) {
     if (e.target.tagName !== "TH") return;
     
     let cat = e.target.dataset.key;
     
     titles.querySelectorAll("th").forEach(th => {
         th.classList.remove("selected")
     });
        
     e.target.classList.add("selected");
     
     updateTable(cat);   
    })

    populateTable(emp);

    let searchValue = document.getElementById("employee-search");
    searchValue.addEventListener("input", (e) => {
        console.log(searchValue.value);
        updateTable(false, searchValue.value);
    });
}

function populateTable(t) {
    const rows = document.getElementById("employee-table").children;
    for (let i=0; i<emp.length; i++) {
        let row = rows[i+1];
        if (i >= t.length) {
            row.style.display = "none"
            for (let j=0; j<row.length; j++) {
                row.children[j].innerText = "";
            }
        } else {
            row.style.display = "";
            row.children[0].innerText = t[i].name;
            row.children[1].innerText = t[i].id;
            row.children[2].innerText = t[i].jobTitle;
            row.children[3].innerText = t[i].department;
            row.children[4].innerText = t[i].salary;
            row.children[5].innerText = t[i].location;
        }
    }
}

function updateTable(cat, search) {    
    if (search || search == "") {
        filteredList = [...emp].filter(o => (o.name.toLowerCase().includes(search) || o.department.toLowerCase().includes(search) || o.jobTitle.toLowerCase().includes(search) || o.location.toLowerCase().includes(search)));
    }
    
    let newTable = [...filteredList];

    if (cat) {
        newTable = newTable.sort((a,b) => a[cat] > b[cat] ? 1 : -1);
    }

    populateTable(newTable);
}