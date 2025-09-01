import Button from "./Button";

export default function ProjectsSidebar({onStartAddProject,projects,onSelectProject,SelectedProjectId}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2
        className={
          "mb-8 font-bold uppercase md:text-xl text-stone-20"
        }
      >
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">{projects.map(project=>{
        let CssClass = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"
        if (project.id === SelectedProjectId){
          CssClass+=" bg-stone-800 text-stone-200"
        }else{
          CssClass += " text-stone-400"
        }
        return(<li key={project.id}>
        <button onClick={() => onSelectProject(project.id)} className={CssClass}>{project.title}</button>
      </li>)
      })}
      </ul>
    </aside>
  );
}
