const admin = async (req, res, next) => {
    try {
        next()
    } catch (e) {
        res.status(401).send({error: e.message })
    }
}

module.exports = admin;