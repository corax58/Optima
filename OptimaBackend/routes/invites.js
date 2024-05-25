const express = require("express");
const router = express.Router();

const {
  getInvites,
  acceptInvite,
  declineInvite,
} = require("../controllers/invitationController");

router.get("/:userId", getInvites);
router.post("/:inviteId", acceptInvite);
router.delete("/:inviteId", declineInvite);

module.exports = router;
