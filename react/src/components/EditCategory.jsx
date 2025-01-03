import { useParams } from "react-router-dom";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    gambar: null, // Untuk file gambar
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nama</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 h-24 w-24 object-cover rounded"
            />
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/categories")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Change
          </button>
        </div>
      </form>
    </div>
  );
}
