export default function Button({ children }) {
  return (
    <button
      className="rounded-full bg-green-500 py-3 px-9 drop-shadow-md hover:bg-green-800 hover:opacity-85 transition duration-300"
    >
      <span className="text-md text-white font-semibold">{children}</span>
    </button>
  );
}
