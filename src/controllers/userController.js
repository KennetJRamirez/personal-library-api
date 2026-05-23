import UserService from "../services/userService.js";

class UserController {
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json({
        ok: true,
        msg: "User created successfully",
        user,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();

      return res.status(200).json({
        ok: true,
        msg: "Users retrieved successfully",
        users,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.user.id;
      const user = await UserService.getUserById(id);

      return res.status(200).json({
        ok: true,
        msg: "User retrieved successfully",
        user,
      });
    } catch (error) {
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.user.id;

      const user = await UserService.updateUser(id, req.body);

      return res.status(200).json({
        ok: true,
        msg: "User updated successfully",
        user,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      await UserService.deleteUser(id);

      return res.status(200).json({
        ok: true,
        msg: "User deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        msg: error.message,
      });
    }
  }
}

export default new UserController();
