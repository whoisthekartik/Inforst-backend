const isAdmin = (req, res, next) => {
  if (req.player?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

module.exports = isAdmin;