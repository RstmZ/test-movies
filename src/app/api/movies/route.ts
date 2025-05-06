import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
// adjust path to your prisma client

// POST: Create new movie
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('limit') || '10');
    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.movie.count(),
    ]);

    return NextResponse.json({
      data: movies,
      page,
      totalPages: Math.ceil(total / pageSize),
      totalItems: total,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}
