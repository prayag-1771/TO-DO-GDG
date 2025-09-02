import NewTask from "./NewTask.jsx";

export default function Tasks({ tasks, onAdd, onDelete, isDark }) {
  return (
    <section>
      <h2
        className={
          isDark
            ? "text-2xl font-bold text-stone-300 mb-4"
            : "text-2xl font-bold text-stone-700 mb-4"
        }
      >
        Tasks
      </h2>

      <div className="mb-4">
        <NewTask onAdd={onAdd} isDark={isDark} />
      </div>

      {tasks.length === 0 && (
        <p className={isDark ? "text-stone-200 my-4" : "text-stone-800 my-4"}>
          This project does not have any tasks yet.
        </p>
      )}

      {tasks.length > 0 && (
        <ul
          className={
            isDark
              ? "p-4 mt-8 rounded-md bg-stone-800"
              : "p-4 mt-8 rounded-md bg-stone-100"
          }
        >
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span className={isDark ? "text-stone-200" : ""}>
                {task.text}
              </span>
              <button
                className={
                  isDark
                    ? "text-white hover:text-red-400"
                    : "text-stone-700 hover:text-red-500"
                }
                onClick={() => onDelete(task.id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
