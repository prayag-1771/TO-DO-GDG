export default function Input({ label, textarea, isDark, ...props }) {
  const classes = isDark
    ? "w-full p-1 border-b-2 rounded-sm border-stone-600 bg-stone-700 text-white focus:outline-none focus:border focus:border-stone-300"
    : "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label
        className={
          isDark
            ? "text-sm font-bold uppercase text-stone-300"
            : "text-sm font-bold uppercase text-stone-500"
        }
      >
        {label}
      </label>
      {textarea ? (
        <textarea className={classes} {...props} />
      ) : (
        <input className={classes} {...props} />
      )}
    </p>
  );
}
