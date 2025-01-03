import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function AddFoods() {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert harga to number if the field is price
    const processedValue = name === "harga" ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: processedValue });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }
      setFormData({ ...formData, gambar: file });
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Category name is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("name", formData.name.trim());

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axiosClient.post("/categories", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      console.log("Food creation response:", response.data);

      if (response.data.status === "success") {
        setSuccess("Category added successfully!");
        // Clear form
        setFormData({
          name: "",
          image: null,
        });
        setTimeout(() => {
          navigate("/categories");
        }, 1500);
      } else {
        setError(response.data.message || "Failed to add category");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add category. Please check all fields and try again."
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Category
          </button>
          <button
            type="button"
            onClick={() => navigate("/category")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
