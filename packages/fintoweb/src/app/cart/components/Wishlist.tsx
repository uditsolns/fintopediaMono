import Link from "next/link";
import Image from "next/image";
import CourseImage from "../../../assets/courseDetails.png";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const courses = [
    {
      title: "BASICS OF STOCK MARKET",
      image: CourseImage,
      language: "English",
      difficulty: "Beginner",
      duration: "20 Hours",
      rating: 4.6,
      reviews: 1000,
      price: 2999,
      originalPrice: 4999,
    },
    {
      title: "BASICS OF STOCK MARKET",
      image: CourseImage,
      language: "English",
      difficulty: "Beginner",
      duration: "20 Hours",
      rating: 4.6,
      reviews: 1000,
      price: 2999,
      originalPrice: 4999,
    },
    {
      title: "BASICS OF STOCK MARKET",
      image: CourseImage,
      language: "English",
      difficulty: "Beginner",
      duration: "20 Hours",
      rating: 4.4,
      reviews: 1000,
      price: 2999,
      originalPrice: 4999,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Wishlist</h1>
      </div>
      <div className={styles.grid}>
        {courses.map((course, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardImage}>
              <Image
                src={course.image}
                alt={course.title}
                width={350}
                height={200}
                className={styles.image}
              />
              <div className={styles.languageBadge}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g clip-path="url(#clip0_3837_6467)">
                    <path
                      d="M1.25781 7C1.25781 8.52292 1.86279 9.98347 2.93966 11.0603C4.01653 12.1372 5.47708 12.7422 7 12.7422C8.52292 12.7422 9.98347 12.1372 11.0603 11.0603C12.1372 9.98347 12.7422 8.52292 12.7422 7C12.7422 5.47708 12.1372 4.01653 11.0603 2.93966C9.98347 1.86279 8.52292 1.25781 7 1.25781C5.47708 1.25781 4.01653 1.86279 2.93966 2.93966C1.86279 4.01653 1.25781 5.47708 1.25781 7Z"
                      stroke="#434A4A"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4.53906 7C4.53906 5.47708 4.79834 4.01653 5.25985 2.93966C5.72137 1.86279 6.34732 1.25781 7 1.25781C7.65268 1.25781 8.27863 1.86279 8.74015 2.93966C9.20166 4.01653 9.46094 5.47708 9.46094 7C9.46094 8.52292 9.20166 9.98347 8.74015 11.0603C8.27863 12.1372 7.65268 12.7422 7 12.7422C6.34732 12.7422 5.72137 12.1372 5.25985 11.0603C4.79834 9.98347 4.53906 8.52292 4.53906 7Z"
                      stroke="#434A4A"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.66797 8.91406H12.332"
                      stroke="#434A4A"
                      stroke-linecap="round"
                    />
                    <path
                      d="M1.66797 5.08594H12.332"
                      stroke="#434A4A"
                      stroke-linecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3837_6467">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                {course.language}
              </div>
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.courseTitle}>{course.title}</h2>
              <div className={styles.details}>
                <span>{course.difficulty}</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_3837_6489)">
                      <path
                        d="M9.05274 0.75C7.42104 0.75 5.82599 1.23385 4.46928 2.14038C3.11258 3.0469 2.05515 4.33537 1.43073 5.84286C0.806309 7.35035 0.642931 9.00915 0.96126 10.6095C1.27959 12.2098 2.06532 13.6798 3.21911 14.8336C4.37289 15.9874 5.8429 16.7732 7.44324 17.0915C9.04359 17.4098 10.7024 17.2464 12.2099 16.622C13.7174 15.9976 15.0058 14.9402 15.9124 13.5835C16.8189 12.2268 17.3027 10.6317 17.3027 9C17.3002 6.81276 16.4301 4.71584 14.8835 3.16922C13.3369 1.6226 11.24 0.75258 9.05274 0.75ZM11.833 11.7803C11.6923 11.9209 11.5016 11.9998 11.3027 11.9998C11.1039 11.9998 10.9131 11.9209 10.7725 11.7803L8.52249 9.53025C8.38183 9.38963 8.30278 9.1989 8.30274 9V4.5C8.30274 4.30109 8.38176 4.11032 8.52241 3.96967C8.66306 3.82902 8.85383 3.75 9.05274 3.75C9.25165 3.75 9.44242 3.82902 9.58307 3.96967C9.72372 4.11032 9.80274 4.30109 9.80274 4.5V8.6895L11.833 10.7198C11.9736 10.8604 12.0526 11.0511 12.0526 11.25C12.0526 11.4489 11.9736 11.6396 11.833 11.7803Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3837_6489">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0.0527344)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  {course.duration}
                </span>
              </div>
              <div className={styles.rating}>
                <span className={styles.ratingNum}>{course.rating}</span>
                <span className={styles.star}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M19.3718 9.11727C19.595 8.95098 19.7606 8.71899 19.8453 8.45385C19.93 8.1887 19.9296 7.90368 19.8442 7.63877C19.7587 7.37385 19.5925 7.14231 19.3689 6.97662C19.1452 6.81093 18.8753 6.71939 18.597 6.71485L13.1915 6.51064C13.165 6.50881 13.1395 6.49933 13.1182 6.48334C13.0968 6.46736 13.0806 6.44555 13.0714 6.42055L11.2035 1.37547C11.1097 1.1188 10.9392 0.897161 10.7152 0.740571C10.4913 0.58398 10.2246 0.5 9.95127 0.5C9.67797 0.5 9.41128 0.58398 9.1873 0.740571C8.96331 0.897161 8.79286 1.1188 8.69901 1.37547L6.83713 6.43857C6.82793 6.46357 6.81169 6.48538 6.79038 6.50136C6.76907 6.51735 6.74359 6.52683 6.71701 6.52866L1.31157 6.73287C1.03325 6.73741 0.763336 6.82895 0.539668 6.99464C0.316 7.16033 0.149795 7.39187 0.064359 7.65678C-0.021077 7.9217 -0.0214604 8.20672 0.0632628 8.47186C0.147986 8.73701 0.313567 8.96899 0.536789 9.13529L4.77706 12.4686C4.79828 12.4853 4.81414 12.5079 4.82268 12.5335C4.83122 12.5591 4.83206 12.5867 4.82511 12.6128L3.36564 17.784C3.29001 18.0473 3.29733 18.3276 3.38662 18.5866C3.47591 18.8456 3.64282 19.0708 3.86465 19.2316C4.08648 19.3924 4.35246 19.481 4.6264 19.4852C4.90034 19.4895 5.16895 19.4093 5.39568 19.2555L9.87619 16.2525C9.89826 16.2372 9.92445 16.2291 9.95127 16.2291C9.97809 16.2291 10.0043 16.2372 10.0263 16.2525L14.5069 19.2555C14.7305 19.4145 14.9982 19.5 15.2726 19.5C15.5471 19.5 15.8147 19.4145 16.0384 19.2555C16.2603 19.0962 16.4274 18.8721 16.5166 18.6139C16.6059 18.3558 16.613 18.0763 16.5369 17.814L15.0654 12.6248C15.0576 12.5987 15.0581 12.5709 15.0666 12.5451C15.0752 12.5193 15.0916 12.4968 15.1135 12.4807L19.3718 9.11727Z"
                      fill="#FFA11A"
                    />
                  </svg>
                </span>
                <span className={styles.reviewCount}>
                  ({course.reviews} reviews)
                </span>
              </div>
              <div className={styles.priceSection}>
                <div>
                  <span className={styles.price}>₹{course.price}</span>
                  <span className={styles.originalPrice}>
                    ₹{course.originalPrice}
                  </span>
                </div>
                <button className={styles.button}>Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
