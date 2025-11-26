import React, { useState, useEffect } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../../services";
import { sanitizeImageSrc } from "../../../utils/sanitizeImage"; // sanitize image src to prevent DOM XSS

const Məhsullar = () => {

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [modalMode, setModalMode] = useState("create"); // 'create' | 'edit'
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    sku: "",
    barcode: "",
    name: "",
    category: "",
    unitofmeasure: "",
    min: "",
    max: "",
    quantity: "",
    location: "",
    cost: "",
    image: null,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      // Ensure data is an array, if backend returns { products: [...] } adjust accordingly
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result })); // store Data URL
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      sku: "",
      barcode: "",
      name: "",
      category: "",
      unitofmeasure: "",
      min: "",
      max: "",
      quantity: "",
      location: "",
      cost: "",
      image: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.sku || !form.name) return;
    const newItem = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      barcode: form.barcode.trim(),
      category: form.category,
      unitofmeasure: form.unitofmeasure,
      quantity: String(form.quantity || "0"),
      min: Number(form.min || 0),
      max: Number(form.max || 0),
      location: form.location.trim(),
      cost: Number(form.cost || 0),
      image: form.image || null,
    };

    try {
      if (modalMode === "edit" && editId) {
        await updateProduct(editId, newItem);
      } else {
        await createProduct(newItem);
      }
      await loadProducts();
      resetForm();
      setEditId(null);
      setOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const openCreate = () => {
    setModalMode("create");
    resetForm();
    setEditId(null);
    setOpen(true);
  };

  const openEdit = (product) => {
    setModalMode("edit");
    setEditId(product._id || product.id);
    setForm({
      sku: product.sku || "",
      barcode: product.barcode || "",
      name: product.name || "",
      category: product.category || "",
      unitofmeasure: product.unitofmeasure || "",
      min: String(product.min ?? ""),
      max: String(product.max ?? ""),
      quantity: String(product.quantity ?? ""),
      location: product.location || "",
      cost: String(product.cost ?? ""),
      image: product.image || null,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('common.confirmDelete'))) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Axtarış üçün filter
  const filtered = products.filter(
    (m) =>
      m.sku.toLowerCase().includes(search.toLowerCase()) ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.barcode.includes(search)
  );

  return (
    <div className="mt-9 px-6 dark:bg-[#001233] bg-[#FFFFFF]">
      {/* Başlıq və düymə */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold dark:text-white text-[#023E7D]">{t('pages.warehouse.products.title')} ({filtered.length})</h2>
          <p className="text-sm dark:text-[#7D8597] text-[#7D8597]">{t('pages.warehouse.products.subtitle')}</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#0466CB] hover:bg-[#0453A4] text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          <span className="text-white font-semibold">{t('pages.warehouse.products.newProduct')}</span>
        </button>
      </div>

      {/* Axtarış inputu */}
      <div className="flex justify-end mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('pages.warehouse.products.searchPlaceholder')}
          className="w-72 px-3 py-2 border border-[#979DAC] rounded-lg dark:bg-[#001233] dark:text-white bg-[#FFFFFF] outline-none text-[#001233] placeholder:text-[#7D8597]"
        />
      </div>

      {/* Məhsullar cədvəli */}
      <div className="bg-[#FFFFFF] rounded-2xl dark:bg-[#001233] dark:text-white p-6 border border-[#33415C] shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[#5C677D] text-sm border-b border-[#979DAC]">
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.image')}</th>
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.sku')}</th>
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.product')}</th>
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.category')}</th>
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.quantity')}</th>
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.minMax')}</th>
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.status')}</th>
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.location')}</th>
              <th className="py-2 font-semibold">{t('pages.warehouse.products.table.cost')}</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => {
              // Sanitize product image before rendering to avoid DOM XSS vectors
              const safeImg = sanitizeImageSrc(m.image);
              const qaliq = Number(m.quantity);
              let status = "";
              let statusClass = "";
              if (qaliq < m.min) {
                status = t('pages.warehouse.products.status.low');
                statusClass = "bg-rose-400";
              } else if (qaliq > m.max) {
                status = t('pages.warehouse.products.status.high');
                statusClass = "bg-[#023E7D]";
              } else {
                status = t('pages.warehouse.products.status.good');
                statusClass = "bg-[#0466CB]";
              }
              return (
                <tr
                  key={m.sku}
                  className="border-b border-[#979DAC] last:border-b-0 hover:bg-[#F5F8FF] dark:hover:bg-[#002147] transition-colors"
                >
                  <td className="py-2">
                    {safeImg ? (
                      <img
                        src={safeImg}
                        alt={m.name}
                        className="w-10 h-10 rounded object-cover border border-[#979DAC]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-[#FFFFFF] dark:bg-[#001233] dark:text-white border border-[#979DAC] flex items-center justify-center text-[#001233]">
                        <FaBox/>
                      </div>
                    )}
                  </td>
                  <td className="py-2 font-medium dark:text-white flex items-center gap-2">
                    <FaBox className="text-[#001233] dark:text-white" /> {m.sku}
                  </td>
                  <td className="py-2">
                    <div className="font-semibold dark:text-white text-[#023E7D]">{m.name}</div>
                    <div className="text-xs dark:text-[#7D8597]  text-[#7D8597]">{m.barcode}</div>
                  </td>
                  <td className="py-2 dark:text-white">{m.category}</td>
                  <td className="py-2 dark:text-white">
                    {m.quantity} {m.unitofmeasure}
                  </td>
                  <td className="py-2 dark:text-white">
                    {m.min} / {m.max}
                  </td>
                  <td className="py-2">
                    <span
                      className={`${statusClass} text-white px-3 py-1 rounded-full text-xs`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="py-2 dark:text-white">{m.location}</td>
                  <td className="py-2 font-semibold dark:text-white text-[#023E7D]">₼{m.cost.toFixed(2)}</td>
                  <td className="py-2 flex items-center gap-2">
                    <button
                      onClick={() => openEdit(m)}
                      className="p-1 rounded border border-[#0466CB] text-[#0466CB] hover:bg-[#0453A4] hover:text-white"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(m._id || m.id)}
                      className="p-1 rounded hover:bg-red-100 text-red-600 border border-red-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal - Yeni Məhsul Əlavə Et (image upload dəstəyi ilə) */}
      {open && (
        <div className="fixed inset-0 backdrop-blur-xl  bg-black/30 flex items-center justify-center z-50">
          <div className="bg-[#FFFFFF] rounded-2xl dark:bg-[#001233] dark:text-white p-8 w-[500px] max-w-full relative shadow-lg border border-[#33415C]">
            {/* Modal başlıq */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold dark:text-white text-[#023E7D]">{t('pages.warehouse.products.modal.title')}</h3>
                <p className="text-[#7D8597] dark:text-[#7D8597] text-sm">
                  {t('pages.warehouse.products.modal.subtitle')}
                </p>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="text-2xl text-[#7D8597] hover:text-[#023E7D]"
              >
                ×
              </button>
            </div>

            {/* Form sahələri */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.sku')}
                  </label>
                  <input
                    className="w-full border dark:bg-[#001233] border-[#979DAC] rounded px-2 py-1 bg-[#FFFFFF]"
                    placeholder="XM-A101"
                    value={form.sku}
                    onChange={(e) => handleFormChange("sku", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.barcode')}
                  </label>
                  <input
                    className="w-full border border-[#979DAC] dark:bg-[#001233] rounded px-2 py-1 bg-[#FFFFFF]"
                    placeholder="8594562341234"
                    value={form.barcode}
                    onChange={(e) =>
                      handleFormChange("barcode", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">
                  {t('pages.warehouse.products.modal.labels.name')}
                </label>
                <input
                  className="w-full border border-[#979DAC] rounded px-2 py-1 dark:bg-[#001233] bg-[#FFFFFF]"
                  placeholder={t('pages.warehouse.products.modal.placeholders.name')}
                  value={form.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                />
              </div>
              {/* Şəkil yükləmə */}
              <div>
                <label className="block font-semibold text-sm mb-1">
                  {t('pages.warehouse.products.modal.labels.image')}
                </label>
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded bg-[#FFFFFF] dark:bg-[#001233] border border-[#979DAC] flex items-center justify-center overflow-hidden">
                    {sanitizeImageSrc(form.image) ? (
                      <img
                        src={sanitizeImageSrc(form.image)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaBox className="text-[#001233] dark:text-white" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.category')}
                  </label>
                  <select
                    className="w-full border border-[#979DAC] dark:bg-[#001233] dark:text-white rounded px-2 py-1 bg-[#FFFFFF]"
                    value={form.category}
                    onChange={(e) =>
                      handleFormChange("category", e.target.value)
                    }
                  >
                    <option hidden>{t('pages.warehouse.products.modal.placeholders.select')}</option>
                    <option value="Xammal">{t('pages.warehouse.categories.rawMaterials')}</option>
                    <option value="Hazır məhsul">{t('pages.warehouse.categories.finishedGoods')}</option>
                    <option value="Ehtiyat hissələri">{t('pages.warehouse.categories.spareParts')}</option>
                    <option value="Qablaşdırma">{t('pages.warehouse.categories.packaging')}</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.unit')}
                  </label>
                  <select
                    className="w-full border border-[#979DAC] dark:bg-[#001233] rounded px-2 py-1 bg-[#FFFFFF]"
                    value={form.unitofmeasure}
                    onChange={(e) =>
                      handleFormChange("unitofmeasure", e.target.value)
                    }
                  >
                    <option hidden>{t('pages.warehouse.products.modal.placeholders.select')}</option>
                    <option value="kq">kq</option>
                    <option value="ədəd">ədəd</option>
                    <option value="litr">litr</option>
                    <option value="metr">metr</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.minStock')}
                  </label>
                  <input
                    className="w-full border border-[#979DAC] dark:bg-[#001233] rounded px-2 py-1 bg-[#FFFFFF]"
                    type="number"
                    placeholder="50"
                    value={form.min}
                    onChange={(e) => handleFormChange("min", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.maxStock')}
                  </label>
                  <input
                    className="w-full border border-[#979DAC] dark:bg-[#001233] rounded px-2 py-1 bg-[#FFFFFF]"
                    type="number"
                    placeholder="500"
                    value={form.max}
                    onChange={(e) => handleFormChange("max", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.cost')}
                  </label>
                  <input
                    className="w-full border border-[#979DAC] dark:bg-[#001233] rounded px-2 py-1 bg-[#FFFFFF]"
                    type="number"
                    step="any"
                    placeholder="12.50"
                    value={form.cost}
                    onChange={(e) => handleFormChange("cost", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.initialQuantity')}
                  </label>
                  <input
                    className="w-full border border-[#979DAC] dark:bg-[#001233] rounded px-2 py-1 bg-[#FFFFFF]"
                    type="number"
                    placeholder="0"
                    value={form.quantity}
                    onChange={(e) =>
                      handleFormChange("quantity", e.target.value)
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold text-sm mb-1">
                    {t('pages.warehouse.products.modal.labels.location')}
                  </label>
                  <input
                    className="w-full border border-[#979DAC] dark:bg-[#001233] rounded px-2 py-1 bg-[#FFFFFF]"
                    placeholder="A1-R2-H5"
                    value={form.location}
                    onChange={(e) =>
                      handleFormChange("location", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Modal alt düymələri */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded bg-[#FFFFFF] dark:bg-[#001233] dark:text-white dark:hover:bg-[#00264d] border border-[#979DAC] text-[#023E7D]"
                >
                  {t('pages.warehouse.products.modal.buttons.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#0466CB] hover:bg-[#0453A4] text-white font-bold"
                >
                  {t('pages.warehouse.products.modal.buttons.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Məhsullar;
