import React, { useState } from "react";

import { useNavigate} from "react-router-dom";

const Edit = ({formData,  handleSubmit, HandleFormDatachange,editIndex }) => {
  const navigator = useNavigate();
const [message, setMessage] = useState("");
  const handleFormSubmit = (e) => {
    handleSubmit(e);          // Update the data
    navigator("");   
     if (editIndex !== null) {
      alert("Task Updated successfully!");
    }
   
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-3">Edit Task:</h1>
      <form className="p-4 border rounded-lg" onSubmit={handleFormSubmit}>
        <input 
          className="w-full border rounded p-3 mb-2"
          type="text"
          placeholder="Title"
           value={formData.title}

          onChange={(event) => {
            const { value } = event.target;
            HandleFormDatachange("title",value);
          }}
          required
         
        />
        <input
          className="w-full border rounded p-3 mb-2"
          type="text"
          placeholder="Description"
          required
          value={formData.description}

          onChange={(event) => {
            const { value } = event.target;
            HandleFormDatachange("description", value);
          }}
          
        />

         <select
  className="w-full border rounded p-3 mb-4"
  value={formData.priority}
  onChange={(e) => HandleFormDatachange("priority", e.target.value)}
  required
>
  <option value="" disabled>Select Priority</option> {/* forces selection */}
  <option value="High">High</option>
  <option value="Medium" className="text-yellow-500 font-bold">Medium</option>
  <option value="Low">Low</option>
</select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit" 
        onSubmit={handleSubmit}>
          
          
        Update</button>
        <br />
        <br />
        <button
          type="button"
          onClick={() => navigator("/home")}
          className="text-blue-500 underline"
        >
          Back to Home
        </button>
         <p className="text-green-600 font-semibold mb-2">{message}</p>
      </form>
    </div>
  );
};

export default Edit;
