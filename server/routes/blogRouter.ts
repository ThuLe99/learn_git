import express from 'express'
import blogCtrl from '../controllers/blogCtrl'
import auth from '../middleware/auth'

const router = express.Router()


router.post('/blog', auth, blogCtrl.createBlog)

router.get('/home/blogs', blogCtrl.getHomeBlogs)

router.get('/blogs/category/:id', blogCtrl.getBlogsByCategory)

router.get('/blogs/user/:id', blogCtrl.getBlogsByUser)

router.get('/blog/:id', blogCtrl.getBlog)

router.patch('/blog/like/:id', auth, blogCtrl.likePost)

router.patch('/blog/unlike/:id', auth, blogCtrl.unLikePost)

router.patch('/blog/:id', auth, blogCtrl.updateBlog)

router.patch('/blog/state:id', auth, blogCtrl.blogState)

 router.get('/search',auth, blogCtrl.searchBlog)

router.get('/blog/view/:id', blogCtrl.getView)

router.get('/topview', blogCtrl.getTopView)
export default router;