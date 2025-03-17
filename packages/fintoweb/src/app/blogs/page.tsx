"use client";

import React from "react";
import styles from "./Blogs.module.css";
import Image from "next/image";
import BlogsHeader from "../../assets/blogsHeader.png";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import CustomInput from "../../custom/CustomInput";
import Blog1 from "../../assets/blogs/Blog1.png";
import Blog2 from "../../assets/blogs/Blog2.png";
import Blog3 from "../../assets/blogs/Blog3.png";
import Blog4 from "../../assets/blogs/Blog4.png";

const stocks = [
  {
    id: 1,
    image: Blog1,
    title: "Mastering Option",
    description:
      "Explore key strategies and concepts to enhance your option trading skills. Gain insights from expert Jyoti Budhia.Lorem ispum",
    rating: 4.6,
    reviews: 1000,
    price: 5000,
    originalPrice: 6000,
  },
  {
    id: 2,
    image: Blog2,
    title: "Decoding Market Trends",
    description:
      "Stay ahead with the latest market analysis and trend predictions. Learn how to make informed trading decisions.",
    rating: 4.8,
    reviews: 1500,
    price: 4500,
    originalPrice: 5500,
  },
  {
    id: 3,
    image: Blog3,
    title: "Leveraging Trading ",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 4,
    image: Blog4,
    title: "Fundamental Analysis",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 5,
    image: Blog1,
    title: "Basic of Stock Market",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 6,
    image: Blog2,
    title: "Basic of Stock Market",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 7,
    image: Blog3,
    title: "Basic of Stock Market",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
  {
    id: 8,
    image: Blog4,
    title: "Basic of Stock Market",
    description:
      "Discover the tools and technologies that can give you an edge in the trading world. Learn to optimize your trades.",
    rating: 4.2,
    reviews: 800,
    price: 4000,
    originalPrice: 5000,
  },
];
interface BlogsFormValues {
  email: string;
}
const Blogs: React.FC = () => {
  const handleSubmit = (
    values: BlogsFormValues,
    { setSubmitting }: FormikHelpers<BlogsFormValues>
  ) => {
    const register = {
      email: values.email,
    };
    // dispatch(actions.postRegister(register, () => router.push('/login')));
    setSubmitting(false);
  };
  const categories = [
    { id: 1, category_name: "Budgeting and Saving" },
    { id: 2, category_name: "Personal Investing" },
    { id: 3, category_name: "Retirement Planning" },
    { id: 4, category_name: "Credit and Debt Management" },
    { id: 5, category_name: "Personal Investing" },
  ];
  const [categoriesSelected, setCategoriesSelected] = React.useState<
    number | string
  >("all");

  return (
    <>
      <div className={styles.blogs}>
        <div className={styles.blogsHeader}>
          <div className={styles.blogsContent}>
            <h1>
              The fast & visual way to
              <br /> understand your users
            </h1>
            <p>
              Welcome to the ZAura Blog, your portal to the world of exquisite
              fragrances and elegance. Dive into the art of perfumery, discover
              the impact of scents on your life, and explore sustainable
              practices that define our brand. From styling tips to the science
              of aromas, we&apos;re here to enrich your fragrance journey. Join
              us as we delve into the essence of ZAura, where every scent tells
              a story.
            </p>
          </div>
          <div className={styles.blogsImage}>
            <Image src={BlogsHeader} alt="Image" />
          </div>
        </div>
      </div>

      <div className={styles.blogsListing}>
        <div className={styles.categories}>
          <button
            className={`${styles.categoryButton} ${
              categoriesSelected === "all" ? styles.active : ""
            }`}
            onClick={() => {
              setCategoriesSelected("all");
              // setFilterCourses(
              //   courses.filter((course) => course.is_popular === 1)
              // );
              // setCurrentSlide(0);
              // setProgress(0);
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryButton} ${
                categoriesSelected === cat.id ? styles.active : ""
              }`}
              onClick={() => {
                setCategoriesSelected(cat.id);
                // let filterCourseRes = courses.filter(
                //   (el) => el.category_id == cat.id && el.is_popular === 1
                // );
                // setFilterCourses(filterCourseRes);
                // setCurrentSlide(0);
                // setProgress(0);
              }}
            >
              {cat.category_name}
            </button>
          ))}
        </div>
        <Row>
          {stocks.map((stock) => {
            return (
              <Col
                md={3}
                key={stock.id}
                className={`${styles.bolgsColumns} mt-3`}
              >
                <Card className={styles.blogsCard}>
                  <Image
                    src={stock.image}
                    alt={stock.title}
                    className={styles.blogsCardImage}
                  />
                  <CardBody className={styles.blogsCardContent}>
                    <CardTitle tag="h3" className={styles.blogsCardTitle}>
                      {stock.title}
                    </CardTitle>
                    <div className={styles.blogsCardText}>
                      <p>{stock.description}</p>
                    </div>
                    <div className={styles.blogsFooter}>
                      <a href="/blogs/blog-details" className={styles.readmore}>
                        Read More
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className={styles.loadMore}>
          <button>Load More</button>
        </div>
      </div>
      <div className={styles.subscribeSection}>
        <div className={styles.subscribeContent}>
          <h1>Subscribe to our newsletter</h1>
          <p>
            Pro video workflows involve a range of professionals with unique
            setups. Pro video workflows involve a range of professionals with
            unique setups.
          </p>
        </div>
        <div className={styles.blogsForm}>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className={styles.form}>
                <Row className="form-group mt-3">
                  <Col md={6}>
                    <Label className="text-white">Email</Label>
                    <InputGroup>
                      <Field
                        component={CustomInput}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        className={`${styles.textfieldBlog} form-control ${
                          errors.email && touched.email ? "is-invalid" : ""
                        }`}
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Button
                      type="submit"
                      className={styles.subscribeButton}
                      size="md"
                      block
                      disabled={isSubmitting}
                    >
                      Subscribe
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
        <div className={styles.subscribeFooter}>
          By signing in you agree with the <b>Terms and Conditions</b> and{" "}
          <b>Privacy Policy</b>
        </div>
      </div>
    </>
  );
};

export default Blogs;
