import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage = 1, totalPages = 10, onPageChange }: PaginationProps) {
  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.button} ${currentPage === i ? styles.activeButton : ''}`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  return (
    <nav className={styles.pagination}>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={styles.button}
        aria-label="First page"
      >
        <FiChevronsLeft />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.button}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>
      {renderPageNumbers()}
      {totalPages > 3 && (
        <span className={styles.dots} aria-hidden="true">
          ...
        </span>
      )}
      {totalPages > 3 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={styles.button}
        >
          {totalPages}
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.button}
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={styles.button}
        aria-label="Last page"
      >
        <FiChevronsRight />
      </button>
    </nav>
  )
}
