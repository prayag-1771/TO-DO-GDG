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
      if (parsed.selectedProjectId && !parsed.projects.some((p) => p.id === parsed.selectedProjectId)) {
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

  function handleToggleTheme() { setIsDark(prev => !prev); }

  function handleAddTask(text) {
    setProjectsState(prev => {
      const taskID = Math.random();
      const newTask = { text, projectID: prev.selectedProjectId, id: taskID, completed: false };
      return { ...prev, tasks: [newTask, ...prev.tasks] };
    });
  }

  function handleToggleTaskCompletion(taskId) {
    setProjectsState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  }

  function handleDeleteTask(id) {
    setProjectsState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id)
    }));
  }

  function handleSelectProject(id) {
    setProjectsState(prev => ({ ...prev, selectedProjectId: id }));
  }

  function handleDeleteProject() {
    setProjectsState(prev => ({
      ...prev,
      selectedProjectId: undefined,
      projects: prev.projects.filter(project => project.id !== prev.selectedProjectId),
      tasks: prev.tasks.filter(task => task.projectID !== prev.selectedProjectId)
    }));
  }

  function handleCancelAddProject() {
    setProjectsState(prev => ({ ...prev, selectedProjectId: undefined }));
  }

  function handleStartAddProject() {
    setProjectsState(prev => ({ ...prev, selectedProjectId: null }));
  }

  function handleAddProject(projectData) {
    setProjectsState(prev => {
      const ProjectID = Math.random();
      const newProject = { ...projectData, id: ProjectID, completed: false };
      return { ...prev, selectedProjectId: undefined, projects: [...prev.projects, newProject] };
    });
  }

  function handleEditProject(updatedProject) {
    setProjectsState(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === updatedProject.id ? { ...project, ...updatedProject } : project
      )
    }));
  }

  function handleToggleProjectCompletion(projectId) {
    setProjectsState(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId ? { ...project, completed: !project.completed } : project
      )
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
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

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
        onComplete={handleToggleProjectCompletion}
        tasks={projectsState.tasks.filter(task => task.projectID === projectsState.selectedProjectId)}
        onToggleTaskCompletion={handleToggleTaskCompletion}
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
      <main className={`h-screen flex flex-col ${isDark ? "bg-gray-900 text-white" : "bg-stone-100 text-black"}`}>
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
            onToggleProjectCompletion={handleToggleProjectCompletion}
          />
          {content}
        </div>
      </main>
    </div>
  );
}

export default App;
