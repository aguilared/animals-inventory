import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const animal = await prisma.animal.update({
    where: { id: req.body.id },
    data: req.body,
  });
  res.json(animal);
}
