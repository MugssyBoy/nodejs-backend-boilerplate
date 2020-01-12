module.exports = {
  homePage: async function(req, res, next) {
    try {
      return res.status(200).json({ message: "Home Page" });
    } catch (err) {
      return next({ status: 400, message: "Not Found" });
    }
  }
};
