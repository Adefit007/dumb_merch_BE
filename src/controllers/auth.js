const { user, profile } = require("../../models");

const Joi = require("joi");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  //checking email data user in database
  const userExist = await user.findOne({
    where: {
      email: req.body.email,
    },
  });

  console.log(userExist);

  if (userExist) {
    return res.status(400).send({
      status: "failed",
      message: "Email already registered",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //add user in database
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      status: "customer",
    });

    const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_KEY);

    await profile.create({
      image: "blank.png",
      phone: "",
      gender: "",
      address: "",
      idUser: newUser.id,
    });

    res.status(201).send({
      status: "success",
      message: "register success",
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log(userExist);

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email not found",
      });
    }

    // if (userExist.password !== req.body.password) {
    //   return res.status(400).send({
    //     status: "failed",
    //     message: "Password wrong",
    //   });
    // }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "Wrong password",
      });
    }

    const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          name: userExist.name,
          email: userExist.email,
          status: userExist.status,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed2",
      message: "server error",
    });
  }
};
