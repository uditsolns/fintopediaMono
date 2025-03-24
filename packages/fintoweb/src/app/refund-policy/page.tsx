import React from "react";
import "./RefundPolicy.css";

const page = () => {
  return (
    <React.Fragment>
      <div className="privacy-policy-header">
        <div className="privacy-policy-content">
          <h1>Refund Policy</h1>
          <h6>No Return & No Refund Policy</h6>
          <p className="privacy-paragraph">
            We appreciate your business and strive to provide the best
            services/products. Please note that all sales are final, and we do
            not offer returns or refunds under any circumstances.
          </p>
          <p className="privacy-paragraph">
            By purchasing from us, you acknowledge and agree to the following:
          </p>
          <div>
            <p>
              <b>1. No Cancellations or Refunds</b> – Once a transaction is
              completed, it is considered final, and no refunds will be
              provided.
            </p>
            <p>
              <b>2. No Exchanges or Returns</b> – We do not accept returns or
              exchanges for any products or services.
            </p>
            <p>
              <b>3. Exceptional Cases</b> – Refunds may only be considered in
              exceptional cases where required by apppcable laws. Any such cases
              will be reviewed at our sole discretion.
            </p>
          </div>
          <p className="privacy-paragraph mt-3">
            For any questions or concerns, please contact our customer support.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default page;
