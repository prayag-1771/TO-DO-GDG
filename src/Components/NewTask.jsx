import { useState } from "react";

export default function NewTask({ onAdd, isDark }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleEnteredTask(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className={
          isDark
            ? "w-64 px-2 py-1 rounded-sm bg-stone-700 text-white placeholder-stone-300"
            : "w-64 px-2 py-1 rounded-sm bg-stone-200"
        }
        placeholder="Enter a task"
        value={enteredTask}
        onChange={handleEnteredTask}
      />
      <button
        className={
          isDark
            ? "text-white hover:text-stone-300"
            : "text-stone-700 hover:text-stone-950"
        }
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
