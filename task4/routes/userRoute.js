import express from 'express'
import { creatUser, deleteUser, getUser, searchUser, updatUser } from '../controllers/userController.js'

const router=express.Router()

router.get('/',getUser)
router.get('/:id',searchUser)
router.post('/',creatUser)
router.put('/:id',updatUser)
router.delete('/:id',deleteUser)

export default router