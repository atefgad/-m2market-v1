import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, UncontrolledAccordion } from "reactstrap";
import { Animated, Hemlet } from "../../../components";
import { db } from "../../../firebase.config";
import useAuth from "../../../hooks/useAuth";
import Order from "./Order";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const [translate] = useTranslation();
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const collRef = collection(db, "users", user?.uid, "orders");
      const orderedRef = query(collRef, orderBy("created", "desc"));

      onSnapshot(orderedRef, (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Hemlet title={translate("account.orders")}>
      <Animated>
        <Container>
          <h4>{translate("account.orders")}:</h4>
          {orders.length > 0 && (
            <p>
              <span className="fw-600">
                {orders.length} {translate("account.orders2")}
              </span>{" "}
              {translate("account.placed_in_past_months")}
            </p>
          )}

          <Row className="account__page__container mt-3">
            <UncontrolledAccordion defaultOpen="1">
              {orders.length > 0 ? (
                orders.map((orderItem) => <Order order={orderItem} />)
              ) : (
                <div className="text-center">
                  <p>
                    <i className="ri-dropbox-fill fs-1"></i>
                  </p>
                  <p className="fs-1">{translate("account.no_orders_yet")}</p>
                  <Link to="/shop" className="btn btn-primary btn-lg mt-3">
                    {translate("account.make_your_first_order")}
                  </Link>
                </div>
              )}
            </UncontrolledAccordion>
          </Row>
        </Container>
      </Animated>
    </Hemlet>
  );
};

export default Orders;
