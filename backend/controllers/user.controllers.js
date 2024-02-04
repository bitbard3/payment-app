import { User } from "../db/db";
import { userSignupSchema } from "./validations/user.validation";

const signup = (req, res) => {
    const validInput = userSignupSchema.safeParse(req.body)
    const userExist = req.user
    if (!validInput.success) {
        res.status(411).json({ msg: "Incorrect Inputs" })
        return
    }
    if (!userExist) {
        User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        res.json({ msg: "User created" })
        return
    }
    else {
        res.status(409).json({ msg: "User already exist" })
        return
    }
}
