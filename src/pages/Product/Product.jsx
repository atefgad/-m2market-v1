import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import {
  AddToCartBtn,
  Animated,
  Hemlet,
  SectionHeading,
  Slides,
} from "../../components";

// products
import productsData from "../../assets/data/products";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

// product Styles
import "../../styles/Product.css";
import ProductReview from "./ProductReview";
import { GetProducts, GetProductsByCat } from "../../hooks/getProducts";
import { useTranslation } from "react-i18next";

const Product = () => {
  const [translate, i18n] = useTranslation();
  const [tab, setTab] = useState("desc");
  // for Add To Cart Button
  const [Clicked, setClicked] = useState(false);
  // qty
  const [qty, setQty] = useState(1);
  const qtyRef = useRef(qty);

  const dispatch = useDispatch();

  const { id } = useParams();
  const product = productsData.find((item) => item.id === id);

  const {
    imgUrl,
    productName,
    productName_ar,
    price,
    avgRating,
    reviews,
    description,
    description_ar,
    shortDesc,
    shortDesc_ar,
    category,
    category_ar,
  } = product;

  //related Products
  const [items] = GetProductsByCat(category);
  const relatedProductsFilterd = items.filter((item) => item.id !== id);

  const relatedProducts = GetProducts(relatedProductsFilterd);

  const lang = i18n.language === "ar";

  // Handle Qty
  const handleAddQty = () => (qty >= 10 ? 0 : setQty(qty + 1));
  const handleMinsQty = () => (qty > 1 ? setQty(qty - 1) : setQty(1));

  // Handle Qty change
  const handleQtyChange = () => {
    setQty(parseInt(qtyRef.current.value));
  };

  // handle AddToCart
  const handleAddToCart = (date) => {
    dispatch(
      // add a new item to cart
      addToCart(date)
    );
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 2500);

    toast.success(translate("product.added_to_cart_msg"));
  };

  return (
    <Hemlet title={lang ? productName_ar : productName}>
      <Animated>
        <section className="product py-0">
          <Container>
            <Row className="align-items-center">
              {/* product image */}
              <Col lg="6" className="order-sm-1 order-lg-2 px-0">
                <div className="product__img">
                  {/* Add To Fav Button */}
                  <button
                    className="Fav__Button btn btn-outline-primary rounded-circle"
                    title="add to favourite list"
                  >
                    <i className="ri-heart-2-line fs-3"></i>
                  </button>
                  <img src={imgUrl} alt={lang ? productName_ar : productName} />
                  <div className="social__share">
                    <ul>
                      <span>{translate("product.share_product")} :</span>
                      {["facebook", "twitter", "linkedin", "line"].map(
                        (el, idx) => (
                          <li key={idx}>
                            <a href="#!">
                              <i className={`ri-${el}-fill`}></i>{" "}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </Col>
              {/* product details */}
              <Col lg="6" className="order-sm-2 order-lg-1">
                <div className="product__details">
                  {/* product Name */}
                  <div className="product__title">
                    <h2>{lang ? productName_ar : productName}</h2>
                  </div>

                  {/* rating */}
                  <div className="product__rating d-flex align-items-center gap-1">
                    <div className="rating__star">
                      {["1", "2", "3", "4", "5"].map((el, idx) => (
                        <span key={idx}>
                          {reviews.length > 0 ? (
                            <i className="ri-star-s-fill"></i>
                          ) : (
                            <i className="ri-star-s-line"></i>
                          )}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex">
                      <b className="me-1">{avgRating} </b>
                      <p>
                        {" "}
                        ({reviews.length} {translate("product.reviews")})
                      </p>
                    </div>
                    -
                    <span className="fs-6">
                      <Link to={`/category/${category}`}>
                        {lang ? category_ar : category}
                      </Link>
                    </span>
                  </div>

                  {/* Price */}
                  <div className="price text-primary fs-1 ">
                    <b>$</b>
                    {price}
                  </div>

                  {/* shortDesc */}
                  <p className="short_desc mt-5 mb-4">
                    {lang ? shortDesc_ar : shortDesc}
                  </p>

                  <div className="pro__action__buttons mt-2 d-flex gap-2">
                    {/* Add To Cart Button */}
                    <AddToCartBtn
                      lable={translate("general.add_to_cart")}
                      className="btn-primary fw-bold text-light btn-lg d-block w-100"
                      qty={qty}
                      clicked={Clicked}
                      onClick={() =>
                        handleAddToCart({
                          id,
                          productName: lang ? productName_ar : productName,
                          category: lang ? category_ar : category,
                          price,
                          imgUrl,
                          quantity: qty,
                        })
                      }
                    />

                    {/* Qty input */}
                    <div className="qty__wrapper d-flex align-items-center gap-1">
                      <label htmlFor="qty">{translate("product.qty")}</label>
                      <i
                        className="ri-subtract-line"
                        onClick={handleMinsQty}
                      ></i>
                      <input
                        type="number"
                        id="qty"
                        step="1"
                        min="1"
                        max="10"
                        title="Qty"
                        className="input__qty  border-0 rounded-2 p-0  fs-3 text-center"
                        value={parseInt(qty)}
                        ref={qtyRef}
                        onChange={handleQtyChange}
                      />

                      <i className="ri-add-line" onClick={handleAddQty}></i>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* Product tabs */}
        <section className="">
          <div className="tabs">
            <div className="tabs__wrapper">
              <ul className="tabs__menu">
                <li
                  className={`tab__item ${tab === "desc" ? "active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  {translate("product.description")}
                </li>
                <li
                  className={`tab__item ${tab === "review" ? "active" : ""}`}
                  onClick={() => setTab("review")}
                >
                  {translate("product.reviews")} ({reviews.length})
                </li>
              </ul>
            </div>

            <div className="tab__content">
              {tab === "desc" ? (
                <Container>
                  <div className="product_desc">
                    <p>{lang ? description_ar : description}</p>
                  </div>
                </Container>
              ) : (
                <div className="product_review">
                  <ProductReview
                    productName={lang ? productName_ar : productName}
                    reviews={reviews}
                    lang={lang}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="t">
          <Container>
            <Row>
              <Col lg="12">
                <SectionHeading title={translate("product.related_products")} />
              </Col>

              <Slides products={relatedProducts} />
            </Row>
          </Container>
        </section>
      </Animated>
    </Hemlet>
  );
};

export default Product;
