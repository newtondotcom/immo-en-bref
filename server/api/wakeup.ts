import { defineEventHandler } from 'h3';

import prisma from '../data/prisma';

export default defineEventHandler(async (event) => {
    const nothing = await prisma.nothing.create({
        data: {
            name: 'nothing',
        },
        select: {
            id: true,
        },
    });
    await prisma.nothing.delete({
        where: {
            id: nothing.id,
        },
    });
    return {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
        },
    };
});
