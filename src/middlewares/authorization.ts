// import verify from '@modules/tokenValidation';

const authCheck = async (req, res, next) => {
  try {
    //     await verify.verifyWithToken(req);
    //     if (!req.decoded) {
    //       const error = new Error('Authorization Fail!');
    //       error.status = 403;
    //       throw error;
    //     }
    //     next();
  } catch (err) {
    // next(err);
  }
};

module.exports = { authCheck };
