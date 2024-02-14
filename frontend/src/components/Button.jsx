export function Button(props) {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className="w-full rounded-lg font-medium focus:outline-none text-sm focus:ring-4 focus:ring-gray-300 text-white bg-gray-800 hover:bg-gray-900 px-5 py-2.5 me-2 mb-2 mt-2"
    >
      {props.label}
    </button>
  );
}
