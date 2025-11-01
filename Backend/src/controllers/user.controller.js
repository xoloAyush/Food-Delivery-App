async function getCurrentUser(req, res){
    try {
        const userId = req.user;

        if(!userId){
            return res.status(400).json({ message: "userId is not found" });
        }
        console.log(userId)
        // return res.status(200).json({ userId });

    } catch(err) {
        return res.status(400).json({ message: "userId is not found" });
    }
}

module.exports = { getCurrentUser }
