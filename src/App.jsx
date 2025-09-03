import React, { useState, useEffect } from "react";
import ProjectSidebar from "./Components/ProjectSidebar";
import NewProject from "./Components/NewProject";
import NoProjectSelected from "./Components/NoProjectSelected";
import SelectedProject from "./Components/SelectedProject";
import ToggleButton from "./Components/toggleButton";

function App() {
  const [projectsState, setProjectsState] = useState(() => {
    const saved = localStorage.getItem("projectsState");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (
        parsed.selectedProjectId &&
        !parsed.projects.some((p) => p.id === parsed.selectedProjectId)
      ) {
        parsed.selectedProjectId = undefined;
      }
      return parsed;
    }
    return { selectedProjectId: undefined, projects: [], tasks: [] };
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("isDark");
    return saved ? JSON.parse(saved) : false;
  });

  const [sortOption, setSortOption] = useState(() => {
    const saved = localStorage.getItem("sortOption");
    return saved || "original";
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("projectsState", JSON.stringify(projectsState));
  }, [projectsState]);

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("sortOption", sortOption);
  }, [sortOption]);

  function handleToggleTheme() { setIsDark((prev) => !prev); }

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskID = Math.random();
      const newTask = { text, projectID: prevState.selectedProjectId, id: taskID };
      return { ...prevState, tasks: [newTask, ...prevState.tasks] };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => ({ ...prevState, selectedProjectId: id }));
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      ),
      tasks: prevState.tasks.filter(
        (task) => task.projectID !== prevState.selectedProjectId
      ),
    }));
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => ({ ...prevState, selectedProjectId: undefined }));
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => ({ ...prevState, selectedProjectId: null }));
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const ProjectID = Math.random();
      const newProject = { ...projectData, id: ProjectID };
      return { ...prevState, selectedProjectId: undefined, projects: [...prevState.projects, newProject] };
    });
  }

  function handleEditProject(updatedProject) {
    setProjectsState((prevState) => ({
      ...prevState,
      projects: prevState.projects.map((project) =>
        project.id === updatedProject.id ? { ...project, ...updatedProject } : project
      ),
    }));
  }

  function getSortedProjects(projects) {
    if (sortOption === "time") {
      return [...projects].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }
    if (sortOption === "priority") {
      const order = { high: 1, moderate: 2, low: 3 };
      return [...projects].sort((a, b) => (order[a.priority] || 4) - (order[b.priority] || 4));
    }
    return projects;
  }

  const sortedProjects = getSortedProjects(projectsState.projects);
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = null;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} isDark={isDark} sidebarOpen={sidebarOpen} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} isDark={isDark} sidebarOpen={sidebarOpen} />;
  } else if (selectedProject) {
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onEdit={handleEditProject}
        tasks={projectsState.tasks.filter(
          (task) => task.projectID === projectsState.selectedProjectId
        )}
        isDark={isDark}
        sidebarOpen={sidebarOpen}
      />
    );
  }

  return (
    <div className={isDark ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="fixed top-4 right-4 mt-6">
        <ToggleButton onChange={handleToggleTheme} checked={isDark} />
      </div>
      <main
        className={`h-screen flex flex-col ${isDark ? "bg-gray-900 text-white" : "bg-stone-100 text-black"}`}
      >
        <div className={isDark ? "bg-gray-800 h-8" : "bg-stone-200 h-8"}></div>
        <div className="flex flex-1 gap-8">
          <ProjectSidebar
            onStartAddProject={handleStartAddProject}
            projects={sortedProjects}
            onSelectProject={handleSelectProject}
            selectedProjectId={projectsState.selectedProjectId}
            isDark={isDark}
            sortOption={sortOption}
            setSortOption={setSortOption}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />
          {content}
        </div>
      </main>
    </div>
  );
}

export default App;
