import prisma from "../src/prisma.js";
import userData from "../src/data/users.json" with { type: "json" };

async function main() {
  const { users } = userData;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
