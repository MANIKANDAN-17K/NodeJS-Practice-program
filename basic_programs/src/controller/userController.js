const getUserProfile = (req, res) => {
    res.status(200).json(
        {
            message: 'User profile retrieved successfully',
            user: req.user
        }
    )
}

module.exports = { getUserProfile };