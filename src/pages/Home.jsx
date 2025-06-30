import { useState } from "react";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = ({ tableData, handleEdit, handleDelete }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // Sorting 
  const [sort, setSort] = useState({ key: null, value: "asc" });

  const handleSort = (key) => {
    let value = "asc";
    if (sort.key === key && sort.value === "asc") {
      value = "desc";
    }
    setSort({ key, value });
  };

  // Filtered + Sorted Data
  const filteredData = [...tableData]
    .filter((data) =>
      data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((data) =>
      priorityFilter ? data.priority.toLowerCase() === priorityFilter : true
    )
    .sort((a, b) => {
      if (!sort.key) return 0;
      const valA = a[sort.key].toLowerCase();
      const valB = b[sort.key].toLowerCase();
      if (valA < valB) return sort.value === "asc" ? -1 : 1;
      if (valA > valB) return sort.value === "asc" ? 1 : -1;
      return 0;
    });


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-center text-center">
        <h2 className="text-green-600 text-2xl font-bold mb-3">
          Welcome to Task Management App...!
        </h2>
        {/* <label htmlFor="name">
          Enter your name:{" "}
          <input type="text" id="name" name="name" className="border border border-black mb-3" />
        </label> */}
        <button
          onClick={() => navigator("/create")}
          className="flex items-center gap-2 font-bold text-blue-600 ml-[46%]"
        >
          Create Task <FaPlusCircle />
        </button>
      </div>

      <div className="flex justify-center flex-col border rounded">
        <div className="flex justify-between items-center">
          {/*Search Input */}
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 flex-grow">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by title or description..."
              className="flex outline-none flex-grow "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter by Priority */}
          <div className="ml-7">
            <label htmlFor="filter" className="mr-1 font-semibold">Filter:</label>
            <select
              id="filter"
              className="border border-gray-300 rounded px-3 py-2 outline-none hover:bg-gray-100"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/*Task Table */}
        <table className="">
          <thead>
            <tr className="bg-gray-100 border">
              <th
                className="cursor-pointer border border-gray-300 p-2"
                onClick={() => handleSort("title")}
              >
                Title {sort.key === "title" ? (sort.value === "asc" ? "▲" : "▼") : "▲"}
              </th>
              <th
                className="cursor-pointer border p-2"
                onClick={() => handleSort("description")}
              >
                Description {sort.key === "description" ? (sort.value === "asc" ? "▲" : "▼") : "▲"}
              </th>
              <th className="border p-2">Priority</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 px-4 py-2">{startIndex + idx + 1}. {data.title}</td>
                <td className="border border-gray-300 px-4 py-2">{data.description}</td>
                <td className={`border border-gray-300 px-4 py-2 font-bold ${data.priority === "High" ? "text-red-600" :
                  data.priority === "Medium" ? "text-yellow-600" :
                    "text-green-600"
                  }`}>{data.priority}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      navigator("/edit");
                      handleEdit(startIndex + idx);
                    }}>Edit</button>
                  <button className="ml-2 bg-red-500 text-white px-4 py-2"
                    onClick={() => handleDelete(startIndex + idx)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="px-4  bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="flex items-center ">Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Home;
