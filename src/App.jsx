import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";
import './App.css';

function App() {
  const initialFormData = {
    title: "",
    description: "",
    priority: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const HandleFormDatachange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === null) {
      setTableData([...tableData, formData]);
    } else {
      const updatedData = [...tableData];
      updatedData[editIndex] = formData;
      setTableData(updatedData);
      setEditIndex(null);
    }
    setFormData(initialFormData);
  };

  const handleEdit = (index) => {
    const clickedItem = tableData[index];
    setFormData(clickedItem);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  return (
    <div className='mx-auto max-w-3xl'>
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              tableData={tableData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="/create"
          element={
            <Create
              formData={formData}
              handleSubmit={handleSubmit}
              HandleFormDatachange={HandleFormDatachange}
            />
          }
        />
        <Route
          path="/edit"
          element={
            <Edit
              formData={formData}
              editIndex={editIndex}
              handleSubmit={handleSubmit}
              HandleFormDatachange={HandleFormDatachange}
            />
          }
        />
        <Route path="/delete" element={<Delete />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
