import prisma from "../../../lib/prisma";

export default async function handle1(req, res) {
  const ID = 1;
  const ID14 = 14;
  const ID13 = 13;
  const result = await prisma.animal.findMany({
    where: {
      OR: [
        {
          clase_id: Number(ID),
        },
        {
          clase_id: Number(ID13),
        },
        {
          clase_id: Number(ID14),
        },
      ],
    },
    include: {
      owner: {
        select: { id: true, name: true },
      },
    },
    orderBy: { name: "asc" },
  });

  res.json(result);
}
