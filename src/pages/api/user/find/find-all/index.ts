import { prisma } from "@/config";
import { customResponse } from "@/lib/customResponse";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = await getServerSession(req, res, authOptions);
  const headersMail = headers.user.email;

  if (!headers) {
    return res.status(405).json({ message: "Unauthorized" });
  }
  const compareSession = await prisma.user.findFirst({
    where: {
      email: headersMail,
    },
  });
  if (!compareSession) {
    return res.status(405).json({ message: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        is_deleted: true,
      },
      where: {
        role: "USER",
        is_deleted: "ACTIVE",
      },
    });

    res.status(200).json(customResponse({ data: data, type: "find" }));
  } catch (error) {
    throw new Error(`(SERVER ERROR) ${error}`);
  }
}
