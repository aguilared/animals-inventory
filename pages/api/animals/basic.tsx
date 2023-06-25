import prisma from "../../../lib/prisma";
export default async function handle(req, res) {
  const result = await prisma.animal.findMany({
    orderBy: {
      name: "asc",
    },
  });
  res.json(result);
}
