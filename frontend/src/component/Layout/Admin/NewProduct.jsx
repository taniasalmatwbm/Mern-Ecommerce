import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, clearErrors } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
import MetaData from "../Header/MetaData";
import Sidebar from "./Sidebar";
import Button from "@material-ui/core/Button";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import "./NewProduct.css";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  // State Variables
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [stock, setStock] = useState();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return alert.error("Please upload at least one image!");
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", Number(price));
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", Number(stock));

    images.forEach((image) => {
      formData.append("images", image);
    });
      console.log("form data", [name, price, description, category, stock, images ])
    dispatch(createProduct(formData));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    // setImages([]);
    // setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, file]); // Store actual file
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) setPrice(value);
  };

  const handleStockChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) setStock(value);
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            {/* Product Name */}
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Product Price */}
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={handlePriceChange}
                // onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            {/* Product Description */}
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="2"
              ></textarea>
            </div>

            {/* Category Selection */}
            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Input */}
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={handleStockChange}
                // onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            {/* Image Upload */}
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            {/* Image Previews */}
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            {/* Submit Button */}
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Created"}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
