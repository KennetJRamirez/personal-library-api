import { z } from "zod";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: z.treeifyError(result.error),
        });
      }

      req.body = result.data;
      next();
    } catch (error) {
      return res.status(500).json({
        ok: false,
        msg: "Internal server error",
      });
    }
  };
};
