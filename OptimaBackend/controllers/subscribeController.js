const webpush = require("web-push");
const prisma = require("../prisma/prismaClient");

const apiKey = {
  PublicKey:
    "BFZg97OJ5GsuX1flh9yomVTzWm_fBraeWeSzunuzcYhKnubE-8rP7rWEp8uOoK3YWOMQdriZqf50caB06UE_wZ8",
  PrivateKey: "KGH9Mi63H4ujhJ-A1aSV9p8QpqJOdq90UmdavqUMgDk",
};

// Public Key:
// BLH9JhcYK7KsY8cUxW5JLIoOBuBw7h0jiGJsM2OLlt1Zir_cJTLwFqT3sY_8CuNFk5e2OQJNfmCghPzlr-vxuZc

// Private Key:
// d-KibqxzHtoXkyTk0m9EGbwxDfpxUxreLRNM1Uv6eVI

webpush.setVapidDetails(
  "mailto:abubekera87@gmail.com",
  apiKey.PublicKey,
  apiKey.PrivateKey
);

const subscribePush = async (req, res) => {
  const { subscription, userId } = req.body;

  console.log(req.body);
  try {
    const subsctiptionExist = await prisma.notificationSubcription.findFirst({
      where: {
        userUserId: userId,
      },
    });

    if (subsctiptionExist) {
      await prisma.notificationSubcription.update({
        where: {
          id: subsctiptionExist.id,
        },
        data: {
          subscription,
        },
      });
    } else {
      await prisma.notificationSubcription.create({
        data: {
          userUserId: userId,
          subscription,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }

  res.send({ msg: "hello" });
};

const sendNotification = async ({ userId, message }) => {
  try {
    const subscription = await prisma.notificationSubcription.findFirst({
      where: {
        userUserId: userId,
      },
    });

    // console.log({
    //   subs: subscription.subscription,
    //   userId,
    // });
    if (!subscription) {
      return;
    } else {
      webpush.sendNotification(subscription.subscription, message);
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  subscribePush,
  sendNotification,
};
