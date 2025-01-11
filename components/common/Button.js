export default function Button({color, children }) {
    return (
      <button
        className={`rounded-full bg-${color}-500 py-3 px-9 m-9 drop-shadow-md hover:bg-${color}-800 hover:opacity-85 transition duration-300`}
      >
        <span className="text-md text-white semibold">{children}</span>
      </button>
    );
  }
  