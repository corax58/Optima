const prisma = require("../prisma/prismaClient");

//accept invite
const acceptInvite = async (req, res) => {
  const { inviteId } = req.params;

  const invitation = parseInt(inviteId);

  try {
    const invitationExist = await prisma.projecctInvites.findFirst({
      where: {
        id: invitation,
      },
    });
    if (!invitationExist) {
      throw Error("youre not invited to this project");
    }

    const member = await prisma.projectMember.create({
      data: {
        projectProjectId: invitationExist.projectProjectId,
        userUserId: invitationExist.userUserId,
      },
    });

    await prisma.projecctInvites.update({
      where: {
        id: invitationExist.id,
      },
      data: {
        state: "accepted",
      },
    });
    res.status(200).json(member);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
  //todo
};
const declineInvite = async (req, res) => {
  const { inviteId } = req.params;

  const invitation = parseInt(inviteId);
  try {
    const invitationExist = await prisma.projecctInvites.findFirst({
      where: {
        id: invitation,
      },
    });
    if (!invitationExist) {
      throw Error("youre not invited to this project");
    }
    await prisma.projecctInvites.update({
      where: {
        id: invitationExist.id,
      },
      data: {
        state: "declined",
      },
    });
    res.status(200).json({ message: "declined" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e.message });
  }
  //todo
};

const getInvites = async (req, res) => {
  const { userId } = req.params;
  const invites = await prisma.projecctInvites.findMany({
    where: {
      userUserId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      project: {
        include: {
          admin: {
            select: {
              userName: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json(invites);
};

module.exports = {
  acceptInvite,
  declineInvite,
  getInvites,
};
