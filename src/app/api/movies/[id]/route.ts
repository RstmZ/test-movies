import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
// adjust path to your prisma client

// POST: Create new movie
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isNaN(Number((await params)?.id))) {
      const movie = await prisma.movie.findFirst({
        where: {
          id: +(await params).id,
        },
      });

      return NextResponse.json(movie);
    }
    return NextResponse.json(null);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}
