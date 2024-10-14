"use client";

import React from "react";
import styles from "./CategoryBanner.module.css";
import { Col, Row } from "reactstrap";
import { CategoriesResponse } from "shared/src/utils/types/categories";
import ButtonWithIcons from "@src/components/button/ButtonWithIcons";

interface CategoryBannerProps {
  categories: CategoriesResponse[];
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ categories }) => {
  return (
    <div className={styles.CategoryBanner}>
      <div className={styles.mainRow}>
        <Row>
          <Col md={8}>
            <h1>Don’t know where to start?</h1>
            <p>
              Create screens directly in Method or add your images from Sketch
              or Figma. You can even sync designs from your cloud storage!
            </p>
          </Col>
          <Col md={4}>
            <Row className="form-group mt-3">
              <Col md={12}>
                <div className="custom-select">
                  <select
                    id="categorySelect"
                    className="textfield form-control"
                  >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={12}>
                <ButtonWithIcons
                  label="Let's go"
                  path="/where-to-start"
                  width="100%"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CategoryBanner;
