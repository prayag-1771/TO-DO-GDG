import React, { useRef } from "react";
import Input from "./Input";
import Modal from "./Model";

export default function NewProject({ onAdd, onCancel, isDark }) {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const priority = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;
    const enteredPriority = priority.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === "" ||
      enteredPriority.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
      priority: enteredPriority, 
    });
  }

  return (
    <>
      <Modal ref={modal} buttonData="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-2">Opps.. looks like you left empty.</p>
        <p className="text-stone-600 mb-2">Please provide all valid inputs.</p>
      </Modal>

      <div className="w-[35rem] mt-16">
        <div className="flex items-center justify-end gap-4 my-4">
          <button
            className={
              isDark
                ? "text-white hover:text-stone-200"
                : "text-stone-800 hover:text-stone-950"
            }
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={
              isDark
                ? "px-6 py-2 rounded-md bg-stone-600 text-stone-50 hover:bg-stone-700"
                : "px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-900"
            }
            onClick={handleSave}
          >
            Submit
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <Input type="text" ref={title} label="Title" isDark={isDark} />
          <Input ref={description} label="Description" textarea isDark={isDark} />
          <Input type="date" ref={dueDate} label="Due Date" isDark={isDark} />
          <div className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">
              Priority
            </label>
            <select
              ref={priority}
              className={`w-full p-1 border-b-2 rounded-sm ${
                isDark
                  ? "border-stone-600 bg-stone-700 text-stone-200"
                  : "border-stone-300 bg-stone-200 text-stone-600"
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
