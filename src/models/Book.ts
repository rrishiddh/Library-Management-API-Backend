import mongoose, { Schema, Document } from 'mongoose';

export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY'
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  updateAvailability(): Promise<void>;
}

export interface IBookModel extends mongoose.Model<IBook> {
  updateBookAvailability(bookId: string): Promise<IBook | null>;
}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: {
      values: Object.values(Genre),
      message: 'Genre must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY'
    }
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  copies: {
    type: Number,
    required: [true, 'Copies is required'],
    min: [0, 'Copies must be a non-negative number'],
    validate: {
      validator: Number.isInteger,
      message: 'Copies must be an integer'
    }
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Instance method to update availability
bookSchema.methods.updateAvailability = async function(this: IBook): Promise<void> {
  this.available = this.copies > 0;
  await this.save();
};

// Static method to update book availability
bookSchema.statics.updateBookAvailability = async function(bookId: string): Promise<IBook | null> {
  const book = await this.findById(bookId);
  if (!book) return null;
  
  book.available = book.copies > 0;
  await book.save();
  return book;
};

// Pre-save middleware to automatically set availability
bookSchema.pre('save', function(next) {
  this.available = this.copies > 0;
  next();
});

// Post-save middleware
bookSchema.post('save', function(doc) {
  console.log(`Book "${doc.title}" has been saved with ${doc.copies} copies`);
});

export const Book = mongoose.model<IBook, IBookModel>('Book', bookSchema);