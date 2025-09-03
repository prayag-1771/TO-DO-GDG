import { useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import Button from "./Button";

gsap.registerPlugin(Flip);

export default function ProjectsSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  onToggleProjectCompletion,
  selectedProjectId,
  isDark,
  sortOption,
  setSortOption,
  isOpen,
  setIsOpen,
}) {
  const sidebarRef = useRef();
  const arrowRef = useRef();
  const listRef = useRef();
  const today = new Date();

  gsap.to(sidebarRef.current, {
    x: isOpen ? 0 : "-100%",
    duration: 0.5,
    ease: "power3.out",
  });

  gsap.to(arrowRef.current, {
    rotate: isOpen ? 0 : 180,
    duration: 0.3,
    ease: "power3.out",
  });

  const handleSortChange = (e) => {
    const state = Flip.getState(listRef.current.children);
    setSortOption(e.target.value);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "power1.inOut",
        absolute: true,
      });
    });
  };

  return (
    <div className="relative flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-4 z-50 p-2 bg-stone-700 rounded-r"
      >
        <span
          ref={arrowRef}
          className="block w-4 h-4 border-b-2 border-r-2 border-stone-50 transform rotate-45 transition-transform"
        ></span>
      </button>

      <aside
        ref={sidebarRef}
        className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl absolute left-0 top-0 bottom-0"
      >
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
          Your Projects
        </h2>

        <div className="mb-4">
          <Button onClick={onStartAddProject} isDark={isDark}>
            + Add Project
          </Button>
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm text-stone-300">Sort By:</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full p-1 rounded-3xl bg-stone-800 text-stone-200"
          >
            <option value="original">Original</option>
            <option value="time">Least Time Left</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <ul className="mt-4" ref={listRef}>
          {projects.map((project) => {
            const dueDatePassed = project.dueDate && new Date(project.dueDate) < today;

            return (
              <li key={project.id} className="flex items-center my-1">
                <button
                  onClick={() => onSelectProject(project.id)}
                  className={`flex-1 text-left px-2 py-1 rounded-sm
                    ${project.completed ? "text-green-500" : dueDatePassed ? "text-red-400" : "text-stone-400"}
                    ${project.id === selectedProjectId ? "bg-stone-800 font-bold" : ""}
                  `}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
