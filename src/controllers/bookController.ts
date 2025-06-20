import { Request, Response } from 'express';
import { Book } from '../models/Book';
import mongoose from 'mongoose';

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: savedBook
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: error
      });
    } else if (error.code === 11000) {
      res.status(400).json({
        message: 'Book with this ISBN already exists',
        success: false,
        error: { message: 'Same ISBN Exists' }
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

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filter, sort = 'asc', sortBy = 'createdAt', limit = '10' } = req.query;
    
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
    
    const sortObject: any = {};
    sortObject[sortBy as string] = sort === 'desc' ? -1 : 1;
    
    const books = await Book.find(query)
      .sort(sortObject)
      .limit(parseInt(limit as string));
    
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message
    });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        message: 'Invalid book ID',
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
        error: { message: 'Book with this ID does not exist' }
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message
    });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        message: 'Invalid book ID',
        success: false,
        error: { message: 'Invalid ObjectId format' }
      });
      return;
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedBook) {
      res.status(404).json({
        message: 'Book not found',
        success: false,
        error: { message: 'Book with this ID does not exist' }
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
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

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        message: 'Invalid book ID',
        success: false,
        error: { message: 'Invalid ObjectId format' }
      });
      return;
    }
    
    const deletedBook = await Book.findByIdAndDelete(bookId);
    
    if (!deletedBook) {
      res.status(404).json({
        message: 'Book not found',
        success: false,
        error: { message: 'Book with this ID does not exist' }
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message
    });
  }
};