const express = require("express");

const {
  createAction,
  getActions,
  getAction,
  updateAction,
  assignAction,
  updateActionStatus,
} = require("../controllers/correctiveActionController");

const router = express.Router();

router.post("/", createAction);
router.get("/", getActions);
router.get("/:id", getAction);
router.put("/:id", updateAction);
router.patch("/:id/assign", assignAction);
router.patch("/:id/status", updateActionStatus);

module.exports = router;