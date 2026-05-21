import { prisma } from "../../src/config/db.js";

const roles = ["ROLE_ADMIN", "ROLE_USER"];

const seedRoles = async () => {
  try {
    const rolesTransformed = roles.map((role) => {
      return {
        name: role,
      };
    });

    await prisma.role.createMany({
      data: rolesTransformed,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error(`Error seeding roles: ${error}`);
  }
};

seedRoles();
