addEventListener("DOMContentLoaded", (event) => {


    fetch('/tasks/getTasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((res) => {
            console.log('/getTasks fetch response: ', res);
        })
        .catch((err) => {
            console.log('/getTasks fetch error: ', err);
        })


    const tasksContainer = document.getElementById('tasks-container');
    // ------------------------------------------------------------
    // -------------------- TASK DIV ------------------------------
    // ------------------------------------------------------------
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("id", "taskDiv");
    taskDiv.setAttribute("class", "task-card");
    tasksContainer.appendChild(taskDiv);

    // *** TITLE ****
    const title = document.createElement("h2");
    title.innerText = "Pack for Hike";
    taskDiv.appendChild(title);

    // *** DESCRIPTION ***
    const description = document.createElement("p");
    description.innerText = "Backpack, boots, rain jacket, hiking poles, electrolytes, etc.";
    taskDiv.appendChild(description);

    // *** DUE DATE ***
    const dueDate = document.createElement("div");
    const testDate = "1/16/2024"
    dueDate.innerHTML = `<p>Due: ${testDate}</p>`;
    taskDiv.appendChild(dueDate);

    // *** STATUS ***
    const statusDiv = document.createElement("div");
    const status = document.createElement("select");
    statusDiv.appendChild(status);
    const option1 = document.createElement("option");
    option1.setAttribute("value", "To-Do");
    option1.innerText = "To-Do";
    status.appendChild(option1);
    const option2 = document.createElement("option");
    option2.setAttribute("value", "Active");
    option2.innerText = "Active";
    status.appendChild(option2);
    const option3 = document.createElement("option");
    option3.setAttribute("value", "Complete");
    option3.innerText = "Complete";
    status.appendChild(option3);
    taskDiv.appendChild(status);

    // *** DELETE BUTTON ***
    const deletePar = document.createElement("p");
    const deleteButton = document.createElement("button");
    deletePar.appendChild(deleteButton);
    deleteButton.innerText = "Delete Task";
    taskDiv.appendChild(deletePar);
    // ------------------------------------------------------------
    // ------------------------------------------------------------
    // ------------------------------------------------------------



});