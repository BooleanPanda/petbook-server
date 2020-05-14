const accessCheck = async (req, res, next) => {
    if(req.user._id==req.params.id) {
        next();
    } else {
        res.status(401).send({error: 'You have no rights to perform this action'});
    };
};

module.exports = accessCheck;