import Button from "./Button";

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
  isDark, 
  sortOption, 
  setSortOption, 
}) {
  const today = new Date();

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>

      <div className="mb-4">
        <Button onClick={onStartAddProject} isDark={isDark}>
          + Add Project
        </Button>
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm text-stone-300">
          Sort By:
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full p-1 rounded-sm bg-stone-800 text-stone-200"
        >
          <option value="original">Original</option>
          <option value="time">Least Time Left</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <ul className="mt-4">
        {projects.map((project) => {
          const dueDatePassed =
            project.dueDate && new Date(project.dueDate) < today;

          let CssClass =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if (project.id === selectedProjectId) {
            CssClass += " bg-stone-800 font-bold";
          }

          CssClass += dueDatePassed ? " text-red-200" : " text-stone-400";

          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={CssClass}
              >
                {dueDatePassed ? `${project.title} ⚠️` : project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
