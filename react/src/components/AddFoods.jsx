import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosClient from "../axiosClient";

export default function AddFoods() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    category_id: "",
    gambar: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get("/categories");
        setCategories(response.data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, gambar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await axiosClient.post("/foods", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(response.data.message || "Food added successfully!");
      setFormData({
        nama: "",
        deskripsi: "",
        harga: "",
        category_id: "",
        gambar: null,
      });
    } catch (err) {
      console.error("Error adding food:", err);
      setError("Failed to add food. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Food</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Food Name</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="gambar"
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
            Add Food
          </button>
          <button
            type="button"
            onClick={() => navigate("/foods")} // Navigasi ke halaman Foods
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
