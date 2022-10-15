const router = require("express").Router()
const User = require("../model/User")
const Post = require("../model/Post")
const bcrypt = require("bcrypt")

// update

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(401).json("You can update your account")
  }
})
/* 
{
    "userId" : "6332700aeda4d5e6fda5628a",
    "username":"sunil",
    "email": "sunil@gmail.com",
    "password":"sunil"
}
 */

// delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    // delete all post of user and user account
    try {
      const user = await User.findById(req.params.id)
      try {
        await Post.deleteMany({ username: user.username })
        // only delete user account
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
      } catch (error) {
        res.status(500).json(error)
      }
    } catch (error) {
      res.status(404).json("User not found")
    }
  } else {
    res.status(401).json("You can delete only your account")
  }
})
/* 
 {
    "userId" : "633277ed7e57ec2eb50f9f18",
    "username":"sunil",
    "password":"sunil"
 } */

// get   user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    res.status(400).json(error)
  }
})
module.exports = router
