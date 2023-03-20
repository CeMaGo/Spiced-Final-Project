import connectMongo from "@/database/connectDb";
import Users from "@/model/schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((error) =>
    res.json({ error: "Connection Failed to execute" })
  );

  //only POST method is accepted

  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Form data missing..!" });
    const { username, email, password } = req.body;
    //check for duplicate Users
    const checkExistingUser = await Users.findOne({ email });
    if (checkExistingUser)
      return res.status(422).json({ message: "The User Already Exists..!" });

    //hash password
    Users.create(
      { username, email, password: await hash(password, 12) },
      function (err, data) {
        if (err) return res.status(404).json({ err });
        return res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "HTTP method is not Valid, on;y POST accepted" });
  }
}
