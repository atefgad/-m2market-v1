import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const ReviewForm = () => {
  const [rating, setRating] = useState(null);

  const [translate] = useTranslation();
  // const reviewFormRef = useRef();
  const ratingRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const msgRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const review = {
      userName: userNameRef.current.value,
      email: emailRef.current.value,
      text: msgRef.current.value,
      rating: ratingRef.current.value,
    };

    toast.success(translate("product.review_added_msg"));

    userNameRef.current.value = null;
    ratingRef.current.value = null;
    emailRef.current.value = null;
    msgRef.current.value = null;
  };

  return (
    <div className="review__form__wrapper">
      <form onSubmit={formSubmitHandler}>
        <p className="review__form__text">
          {translate("product.Your_email_address_will_not_be_published")}{" "}
          <b>
            {translate("product.required_fields_are_marked")} <span>*</span>
          </b>
        </p>

        {/* review rating */}
        <div className="review__form__rating">
          <span className="rating__txt">
            {translate("product.your_rating")}:
          </span>
          <div className="rating__stars">
            {[1, 2, 3, 4, 5].map((el, idx) => (
              <div
                className={`rating__stars__item ${
                  el === rating ? "active" : ""
                } `}
                key={idx}
              >
                <input
                  type="hidden"
                  id={el}
                  ref={ratingRef}
                  value={el}
                  defaultChecked={el === rating}
                  //   checked={el === rating}
                />
                <label htmlFor={el} onClick={() => setRating(el)}>
                  {el} <i className="ri-star-line"></i>
                  {/* <i className="ri-star-line"></i> */}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* review__form__comment */}
        <div className="review__form__comment">
          <textarea
            className="form-control"
            placeholder={translate("placeholder.your_review")}
            cols="45"
            rows="4"
            required
            ref={msgRef}
          ></textarea>
        </div>

        {/* review form__group */}
        <div className="review__form__group">
          <div className="review__form_input">
            <input
              className="form-control"
              type="text"
              placeholder={translate("placeholder.name*")}
              size="30"
              required
              ref={userNameRef}
            />
          </div>
          <div className="review__form_input">
            <input
              className="form-control"
              type="email"
              placeholder={translate("placeholder.email*")}
              size="30"
              required
              ref={emailRef}
            />
          </div>
        </div>

        <div className="mt-2 text-center">
          <button className="btn btn-primary w-25" type="submit">
            {" "}
            {translate("product.submit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
