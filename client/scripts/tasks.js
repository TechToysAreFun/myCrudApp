addEventListener("DOMContentLoaded", async (event) => {


    await fetch('/tasks/getTasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .then((res) => {
            console.log('/getTasks fetch response: ', res);
            const tasksContainer = document.getElementById('tasks-container');

            res.forEach((task) => {
                const taskDiv = document.createElement("div");
                taskDiv.setAttribute("id", `taskDiv-${task.id}`);
                taskDiv.setAttribute("class", "task-card");
                tasksContainer.appendChild(taskDiv);

                // *** TITLE ****
                const title = document.createElement("h2");
                title.innerText = task.title;
                taskDiv.appendChild(title);

                // *** DESCRIPTION ***
                const description = document.createElement("p");
                description.innerText = task.description;
                taskDiv.appendChild(description);

                // *** DUE DATE ***
                const dueDate = document.createElement("div");
                dueDate.innerHTML = `<p><b>Due: </b> ${task.due_date}</p>`;
                taskDiv.appendChild(dueDate);

                // *** STATUS ***
                const statusPar = document.createElement('p');
                statusPar.innerHTML = `<b>Status: </b>${task.status}`;
                taskDiv.appendChild(statusPar);


                // * ---------- Select Tag for Updating Status ----------
                // const updateStatusDiv = document.createElement("div");
                // const status = document.createElement("select");
                // updateStatusDiv.appendChild(status);
                // const option1 = document.createElement("option");
                // option1.setAttribute("value", "To-Do");
                // option1.innerText = "To-Do";
                // status.appendChild(option1);
                // const option2 = document.createElement("option");
                // option2.setAttribute("value", "Active");
                // option2.innerText = "Active";
                // status.appendChild(option2);
                // const option3 = document.createElement("option");
                // option3.setAttribute("value", "Complete");
                // option3.innerText = "Complete";
                // status.appendChild(option3);
                // taskDiv.appendChild(status);
                // * ----------------------------------------------------


                // *** DELETE BUTTON ***
                const deletePar = document.createElement("p");
                const deleteButton = document.createElement("button");
                deletePar.appendChild(deleteButton);
                deleteButton.innerText = "Delete Task";
                taskDiv.appendChild(deletePar);
                deleteButton.addEventListener("click", async () => {
                    console.log('Inside of delete task event listener');
                    await fetch('/tasks/deleteTask', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: task.id })
                    })
                        .then((res) => {
                            console.log('Successful return to deleteTask promise chain');
                            alert('Task Deleted!')
                            window.location.href = "/home"
                        })
                        .catch((err) => {
                            console.log('Error in deleteTask promise chain');
                        })
                })
            })
        })
        .catch((err) => {
            console.log('/getTasks fetch error: ', err);
        })
});