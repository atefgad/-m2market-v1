import { useDispatch } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { Animated, Hemlet } from "../../components";
import { openModal } from "../../store/slices/modalSlice";

const Addresses = () => {
  const dispatch = useDispatch();
  return (
    <Hemlet title="Addresses">
      <Animated>
        <Container>
          <Row className="account__page__container">
            <Col lg="12">
              <div className="d-flex align-items-center justify-content-between ">
                <h3>Addresses </h3>
                <button
                  className="btn btn-primary d-flex"
                  onClick={() => dispatch(openModal("AddAddress"))}
                >
                  <i className="ri-map-pin-add-line me-1"></i>
                  Add a new address
                </button>
              </div>
              <hr className="hr" />

              <div className="d-flex">
                {/* Address Card */}
                <div className="address__card">
                  <p>Default Address</p>
                  <h6>Atef Gad</h6>
                  <span>01156777561</span>
                  <span>Gerga, Sohag</span>
                  <span>Egypt</span>
                  <span className="address__icon">
                    <i className="ri-map-pin-2-line"></i>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Animated>
    </Hemlet>
  );
};

export default Addresses;
