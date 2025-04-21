export async function logoutController(req, res) {
    try {
      res.clearCookie("token");
  
      res.json({
        message: "Logout Successfully",
        success: true,
        error: false,
        data: [],
      });
    } catch (err) {
      throw new Error(err);
    }
  }
  