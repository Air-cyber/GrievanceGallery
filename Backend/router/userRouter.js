import express from "express";
import { addNewAdmin,getAllMinister,getUserDetails,login,logoutAdmin,userRegister,logoutUser, addNewMinister } from "../controller/userController.js";
import { isAdminAuthenticated,isUserAuthenticated } from "../middlewares/auth.js";
 
const router = express.Router();

router.post("/user/register",userRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin);
router.get("/minister",getAllMinister);
router.get("/admin/me", isAdminAuthenticated,getUserDetails);
router.get("/user/me", isUserAuthenticated,getUserDetails);
router.get("/admin/logout", isAdminAuthenticated,logoutAdmin);
router.get("/user/logout", isUserAuthenticated,logoutUser);
router.post("/minister/addnew",isAdminAuthenticated,addNewMinister);

export default router;