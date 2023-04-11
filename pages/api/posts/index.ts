import { NextApiRequest, NextApiResponse } from "next"

import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
        }
    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
}