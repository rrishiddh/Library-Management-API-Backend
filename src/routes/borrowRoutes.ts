import { Router } from 'express';
import {
  borrowBook,
  getBorrowedBooksSummary
} from '../controllers/borrowController';

const router = Router();

// for /api/borrow
router.post('/', borrowBook);

// for /api/borrow
router.get('/', getBorrowedBooksSummary);

export default router;