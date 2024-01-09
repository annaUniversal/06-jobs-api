import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showTasks } from "./tasks.js";

export const deleteTask = async (taskId) => {
  enableInput(false);
  const method = "DELETE";
  const url = `/api/v1/tasks/${taskId}`;
  console.log(url);

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    message.textContent = "The task was deleted.";
    console.log('Deleting task')
    showTasks();
    enableInput(true);
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
};
