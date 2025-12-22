import express from 'express'
import { deleteBook, findBook, getBooks, postBook, searchBook } from '../controllers/booksController.js'


const router=express.Router()

router.get('/',getBooks)
router.get('/search',searchBook)
router.get('/:id',findBook)
router.post('/',postBook)
router.delete('/:id',deleteBook)

export default router