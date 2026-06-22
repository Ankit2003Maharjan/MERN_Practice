import express from "express";
import {
  deleteUsers,
  getAllUsers,
  getById,
  postUsers,
  updateUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", postUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);
router.get("/:id", getById);

export default router;
