async function getCurrentUser(req, res) {
  try {
    const user = req.userId; // set by isAuth middleware

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ Send full user data
    return res.status(200).json({
       message: "User ",
       user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getCurrentUser };
