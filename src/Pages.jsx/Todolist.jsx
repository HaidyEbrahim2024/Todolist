import { useEffect, useRef, useState } from "react";

export default function Todolist() {
  const [tasks, settasks] = useState([]);
  const [Newtask, setNewtask] = useState("");
  const [Newdesc, setNewdesc] = useState("");
  const [taskToEdit, settaskToEdit] = useState();

  const tName = useRef();
  const tdesc = useRef();
  const editedTaskName = useRef();
  const editedTaskDesc = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      settasks(storedTasks);
    }
  }, []);

  function Addnewtaskarr(event) {
    event.preventDefault();
    let oldArr = [...tasks];
    let obj = {
      id: tasks.length + 1,
      name: tName.current.value,
      desc: tdesc.current.value,
    };
    oldArr.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldArr));
    settasks(oldArr);
    tName.current.value = "";
    tdesc.current.value = "";
  }

  function RemoveTasks(task_id) {
    let oldArr = [...tasks];
    let task_index = oldArr.findIndex((el) => el.id === task_id);
    if (task_index !== -1) {
      oldArr.splice(task_index, 1);
      settasks(oldArr);
      localStorage.setItem("tasks", JSON.stringify(oldArr));
    } else {
      console.log("Task not found.");
    }
  }

  function saveTaskToUpdat(task_id) {
    let oldArr = [...tasks];
    let task_index = oldArr.findIndex((el) => el.id === task_id);
    if (task_index !== -1) {
      oldArr[task_index].name = editedTaskName.current.innerText;
      oldArr[task_index].desc = editedTaskDesc.current.innerText;
      settasks(oldArr);
      localStorage.setItem("tasks", JSON.stringify(oldArr));
      settaskToEdit(undefined);
    }
  }

  return (
    <div className="col-12 Todolist ">
      <h1 style={{ textAlign: "center", color: "blue", padding: "15px" }}>
        To Do List
      </h1>
      <form onSubmit={Addnewtaskarr}>
        <input
          onChange={(e) => setNewtask(e.target.value)}
          ref={tName}
          className="form-control"
          type="text"
          placeholder="Add New Task"
          value={Newtask}
          style={{ marginBottom: "12px" }}
        />
        <input
          onChange={(e) => setNewdesc(e.target.value)}
          ref={tdesc}
          className="form-control"
          type="text"
          placeholder="Add New Desc"
          value={Newdesc}
          style={{ marginBottom: "12px" }}
        />
        <button
          className="btn btn-success"
          style={{ marginBottom: "12px", padding: "5px 15px" }}
        >
          Add
        </button>
      </form>
      <table className="table table-bordered" style={{ marginBottom: "12px" }}>
        <thead>
          <tr>
            <th> -</th>
            <th> Task Name</th>
            <th> Task desc</th>
            <th>Remove</th>
            <th>update</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((el, index) => (
            <tr key={el.id}>
              <th> {index + 1}</th>
              <th
                ref={index === taskToEdit ? editedTaskName : null}
                contentEditable={index === taskToEdit}
              >
                {el.name}
              </th>
              <th
                ref={index === taskToEdit ? editedTaskDesc : null}
                contentEditable={index === taskToEdit}
              >
                {el.desc}
              </th>
              <th>
                <button
                  className="btn btn-danger"
                  onClick={() => RemoveTasks(el.id)}
                >
                  Remove
                </button>
              </th>
              <th>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    index === taskToEdit
                      ? saveTaskToUpdat(el.id)
                      : settaskToEdit(index)
                  }
                >
                  {index === taskToEdit ? "save" : "Edit"}
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
