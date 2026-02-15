import prisma from "../src/prisma.js";
import userData from "../src/data/users.json" with { type: "json" };
import hostData from "../src/data/hosts.json" with { type: "json" };
import propertyData from "../src/data/properties.json" with { type: "json" };

async function main() {
  const { users } = userData;
  const { hosts } = hostData;
  const { properties } = propertyData;
  
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
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
