import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const [
    vacas,
    totalVacas,
    totalVacasArqui,
    totalVacasJose,
    totalVacasAngel,
    totalVacasYoel,
    totalVacasCruz,
  ] = await prisma.$transaction([
    prisma.$queryRaw`SELECT id,name, owner_id  FROM animals WHERE clase_id =1 ORDER BY owner_id ASC`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 1`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 2`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 3`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 4`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 5`,
  ]);

  res.json({
    totalVacas,
    totalVacasArqui,
    totalVacasJose,
    totalVacasAngel,
    totalVacasYoel,
    totalVacasCruz,
    vacas,
  });
}
