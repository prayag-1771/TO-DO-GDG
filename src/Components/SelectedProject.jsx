import React, { useState, useRef } from "react";
import Tasks from "./Task.jsx";
import Input from "./Input.jsx";

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  onEdit,
  tasks,
  isDark,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const priorityRef = useRef();

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleSave() {
    onEdit({
      ...project,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
      priority: priorityRef.current.value,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        {isEditing ? (
          <input
            ref={titleRef}
            defaultValue={project.title}
            className={
              isDark
                ? "text-3xl font-bold text-stone-300 mb-4 w-full bg-gray-700 p-1 rounded"
                : "text-3xl font-bold text-stone-600 mb-4 w-full bg-stone-200 p-1 rounded"
            }
          />
        ) : (
          <h1
            className={
              isDark
                ? "text-3xl font-bold text-stone-300 mb-2"
                : "text-3xl font-bold text-stone-600 mb-2"
            }
          >
            {project.title}
          </h1>
        )}

        <div className="flex gap-4 mb-4">
          {isEditing ? (
            <>
              <button
                className={
                  isDark
                    ? "text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                    : "text-black bg-stone-200 px-3 py-1 rounded hover:bg-stone-300"
                }
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className={
                  isDark
                    ? "text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                    : "text-black bg-stone-200 px-3 py-1 rounded hover:bg-stone-300"
                }
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className={
                  isDark
                    ? "text-stone-300 hover:text-stone-400"
                    : "text-stone-600 hover:text-stone-950"
                }
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className={
                  isDark
                    ? "text-stone-300 hover:text-stone-400"
                    : "text-stone-600 hover:text-stone-950"
                }
                onClick={onDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>

        {isEditing ? (
          <>
            <Input
              ref={descriptionRef}
              textarea
              label="Description"
              defaultValue={project.description}
              isDark={isDark}
            />
            <Input
              ref={dueDateRef}
              type="date"
              label="Due Date"
              defaultValue={project.dueDate}
              isDark={isDark}
            />
            <label className={`font-semibold ${isDark ? "text-stone-200" : "text-stone-600"}`}>
              Priority:
            </label>
            <select
              ref={priorityRef}
              defaultValue={project.priority}
              className={
                isDark
                  ? "w-full p-1 mb-4 bg-gray-700 text-white rounded"
                  : "w-full p-1 mb-4 bg-stone-200 text-black rounded"
              }
            >
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </>
        ) : (
          <>
            <p className={isDark ? "mb-1 text-stone-300" : "mb-1 text-stone-400"}>
              Due: {formattedDate}
            </p>
            <p className={`mb-4 font-semibold ${isDark ? "text-stone-200" : "text-stone-600"}`}>
              Priority:{" "}
              <span
                className={
                  project.priority === "high"
                    ? "text-red-400"
                    : project.priority === "moderate"
                    ? "text-yellow-500"
                    : "text-green-500"
                }
              >
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
              </span>
            </p>
            <p className={isDark ? "text-stone-200 whitespace-pre-wrap" : "text-stone-600 whitespace-pre-wrap"}>
              {project.description}
            </p>
          </>
        )}
      </header>

      <section>
        <h2>
          <Tasks
            onAdd={onAddTask}
            onDelete={onDeleteTask}
            tasks={tasks}
            isDark={isDark}
          />
        </h2>
      </section>
    </div>
  );
}
