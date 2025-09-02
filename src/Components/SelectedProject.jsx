import Tasks from "./Task.jsx";

export default function SelectedProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
  isDark,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1
            className={
              isDark
                ? "text-3xl font-bold text-stone-300 mb-2"
                : "text-3xl font-bold text-stone-600 mb-2"
            }
          >
            {project.title}
          </h1>
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
        </div>
        <p className={isDark ? "mb-1 text-stone-300" : "mb-1 text-stone-400"}>
          Due: {formattedDate}
        </p>

        <p
          className={`mb-4 font-semibold ${
            isDark ? "text-stone-200" : "text-stone-600"
          }`}
        >
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

        <p
          className={
            isDark
              ? "text-stone-200 whitespace-pre-wrap"
              : "text-stone-600 whitespace-pre-wrap"
          }
        >
          {project.description}
        </p>
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
