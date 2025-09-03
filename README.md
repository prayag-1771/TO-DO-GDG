# Project Manager App

A lightweight and intuitive **project and task management web app** built with **React**, **TailwindCSS**, and **GSAP** animations.  
Organize your projects, track tasks, prioritize work, and toggle between dark and light modes effortlessly.

---

## Key Features

- **Add, Edit, and Delete Projects**: Each project includes a title, description, due date, and priority.
- **Task Management**: Add, delete, and mark tasks as completed within projects.
- **Project Completion Status**: Mark projects as completed; overdue projects show a red ⚠️ warning.
- **Sorting Options**: Sort projects by original order, least time left, or priority.
- **Dark/Light Mode**: Toggle between dark and light themes. Preferences are saved in local storage.
- **Responsive Sidebar**: Animated project sidebar that adapts for desktop and mobile views.
- **Persistent Storage**: All data is stored in the browser's local storage, so projects and tasks are retained across sessions.

---

## Color Coding & Visual Indicators

The app uses **color coding** to give instant visual feedback on project and task status:

- **⚠️ Red** – Projects past their due date are highlighted in red with a ⚠️ symbol.
- **🟢 Green** – Projects that are completed are shown in green text. Tasks under completed projects also turn green.
- **🟡 Yellow** – Projects with moderate priority are highlighted in yellow.
- **🔴 Red** – High-priority projects are highlighted in red (only if not completed).
- **🟢 Green** – Low-priority projects are highlighted in green (only if not completed).
- **Neutral Stone/Gray** – Active projects that are not overdue or completed use neutral gray tones.
- **Selected Project** – Highlighted with a darker background and bold text for easy identification.

---

## How It Works

1. **Adding a Project**: Click the **+ Add Project** button, fill in project details, and save.
2. **Selecting a Project**: Click on a project from the sidebar to view its tasks and details.
3. **Adding Tasks**: Enter a task in the input field and submit. Tasks appear under the selected project.
4. **Marking Completion**: Click **Mark Completed / Mark Incomplete** to toggle project status. Completed projects and tasks turn green.
5. **Sorting Projects**: Use the **Sort By** dropdown to order projects by priority or due date.
6. **Dark/Light Mode**: Use the toggle button in the top-right corner to switch themes.

---

## Tech Stack

- **React** – Frontend UI framework
- **TailwindCSS** – Utility-first styling framework
- **GSAP** – Animations for smooth sidebar and task transitions
- **LocalStorage** – Browser-based persistent storage

---

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
