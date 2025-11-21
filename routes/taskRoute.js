import express from "express";
import {
  createSubTask,
  createTask,
  dashboardStatistics,
  deleteRestoreTask,
  duplicateTask,
  getTask,
  getTasks,
  postTaskActivity,
  trashTask,
  updateSubTaskStage,
  updateTask,
  updateTaskStage,
} from "../controllers/taskController.js";

import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
   ADMIN ONLY ROUTES
   =========================== */

router.post("/create", protectRoute, isAdminRoute, createTask);

router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);

router.put("/update/:id", protectRoute, isAdminRoute, updateTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);

router.put("/trash/:id", protectRoute, isAdminRoute, trashTask);

router.delete(
  "/delete-restore/:id?",
  protectRoute,
  isAdminRoute,
  deleteRestoreTask
);

/* ===========================
   SHARED ROUTES (User + Admin)
   =========================== */

router.post("/activity/:id", protectRoute, postTaskActivity);

router.put("/change-stage/:id", protectRoute, updateTaskStage);

router.put(
  "/change-status/:taskId/:subTaskId",
  protectRoute,
  updateSubTaskStage
);

router.get("/dashboard", protectRoute, dashboardStatistics);

router.get("/", protectRoute, getTasks);

router.get("/:id", protectRoute, getTask);

export default router;
