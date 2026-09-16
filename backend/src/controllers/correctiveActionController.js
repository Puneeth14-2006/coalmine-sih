const CorrectiveAction = require("../models/CorrectiveAction");

const createAction = async (req, res) => {
  try {
    const action = await CorrectiveAction.create(req.body);

    res.status(201).json({
      success: true,
      message: "Corrective action created successfully",
      data: action,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getActions = async (req, res) => {
  try {
    const actions = await CorrectiveAction.find().sort({
      deadline: 1,
    });

    res.json({
      success: true,
      count: actions.length,
      data: actions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAction = async (req, res) => {
  try {
    const action = await CorrectiveAction.findOne({
      actionId: req.params.id,
    });

    if (!action) {
      return res.status(404).json({
        success: false,
        message: "Corrective action not found",
      });
    }

    res.json({
      success: true,
      data: action,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAction = async (req, res) => {
  try {
    const action = await CorrectiveAction.findOneAndUpdate(
      { actionId: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!action) {
      return res.status(404).json({
        success: false,
        message: "Corrective action not found",
      });
    }

    res.json({
      success: true,
      message: "Corrective action updated successfully",
      data: action,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const assignAction = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const action = await CorrectiveAction.findOneAndUpdate(
      { actionId: req.params.id },
      { assignedTo },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!action) {
      return res.status(404).json({
        success: false,
        message: "Corrective action not found",
      });
    }

    res.json({
      success: true,
      message: "Action assigned successfully",
      data: action,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateActionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const action = await CorrectiveAction.findOneAndUpdate(
      { actionId: req.params.id },
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!action) {
      return res.status(404).json({
        success: false,
        message: "Corrective action not found",
      });
    }

    res.json({
      success: true,
      message: "Action status updated",
      data: action,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAction,
  getActions,
  getAction,
  updateAction,
  assignAction,
  updateActionStatus,
};