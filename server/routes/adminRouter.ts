import express from "express";
import adminCtrl from "../controllers/adminCtrl";
import auth from "../middleware/auth";

const router = express.Router();

router.route("/admin_user").get(adminCtrl.getUsers);

router.route("/admin_user/:id").delete(auth, adminCtrl.deleteUser);

//blog

router.route("/admin_blog").get(adminCtrl.getBlogs);
router.route("/admin_blog/:id").patch(auth, adminCtrl.updateBlog);
router.route("/admin_blog/:id").delete(auth, adminCtrl.deleteBlog);
export default router;
