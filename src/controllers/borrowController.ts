import { Request, Response } from 'express';
import { Borrow } from '../models/Borrow';
import { Book } from '../models/Book';
import mongoose from 'mongoose';

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        message: 'Invalid book id',
        success: false,
        error: { message: 'Invalid ObjectId format' }
      });
      return;
    }
    
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        message: 'Book not found',
        success: false,
        error: { message: 'Book does not exist' }
      });
      return;
    }
    
    if (book.copies < quantity) {
      res.status(400).json({
        message: 'Insufficient copies available',
        success: false,
        error: { 
          message: `Only ${book.copies} copies available, but ${quantity} requested` 
        }
      });
      return;
    }
    
    const borrowRecord = new Borrow({
      book: bookId,
      quantity,
      dueDate: new Date(dueDate)
    });
    
    const savedBorrowRecord = await borrowRecord.save();
    
    book.copies -= quantity;
    
    await book.updateAvailability();
    
    res.status(201).json({
      success: true,
      message: 'Book borrowed done successfully',
      data: savedBorrowRecord
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
        success: false,
        error: error.message
      });
    }
  }
};

export const getBorrowedBooksSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const borrowedBooksSummary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        $unwind: '$bookDetails'
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn'
          },
          totalQuantity: 1
        }
      },
      {
        $sort: { totalQuantity: -1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: borrowedBooksSummary
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message
    });
  }
};