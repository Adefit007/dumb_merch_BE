const { profile, users } = require("../../models");

exports.getProfile = async (req, res) => {
  try {
    let profileData = await profile.findOne({
      where: {
        idUser: req.user.id,
      },
      include: [
        {
          model: users,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updateAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updateAt"],
      },
    });

    profileData = JSON.parse(JSON.stringify(profileData));

    profileData = {
      ...profileData,
      image: process.env.PATH_FILE + profileData.image,
    };

    res.send({
      status: "success",
      data: profileData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
