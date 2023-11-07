import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [form, setForm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/${form}`);
  };

  const handleChange = (e) => {
    setForm(e.target.value);
  };

  return (
    <form className="flex items-center justify-center w-full md:mt-[0px]" onSubmit={handleSubmit}>
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full max-w-md ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
          <input
            type="text"
            id="voice-search"
            className="bg-black border border-gray-400 text-black text-sm rounded-lg  focus:ring-red-500 focus:border-red-500 
            block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search"
            value={form}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            title="microphone"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-400 hover:text-gray-900 dark:hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                clipRule="evenodd"
              />
            </svg>
          </button>
      </div>

      <button
        type="submit"
        title="search"
        className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-gray-700 rounded-lg border border-gray-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-gray-800"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 mr-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
}

export default SearchForm;
