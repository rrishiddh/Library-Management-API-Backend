import { Router } from 'express';
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from '../controllers/bookController';

const router = Router();

// for /api/books
router.post('/', createBook);

// for /api/books
router.get('/', getAllBooks);

// for /api/books/:bookId
router.get('/:bookId', getBookById);

// for /api/books/:bookId
router.put('/:bookId', updateBook);

// for /api/books/:bookId
router.delete('/:bookId', deleteBook);

export default router;