import authService from "../services/authService.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const token = await authService.login(email, password);

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000,
        })
        .status(200)
        .json({
          ok: true,
          msg: "Login successful",
        });
    } catch (error) {
      return res.status(401).json({
        ok: false,
        msg: error.message,
      });
    }
  }

  logout(req, res) {
    return res.clearCookie("access_token").status(200).json({
      ok: true,
      msg: "Logout successful",
    });
  }
}

export default new AuthController();
