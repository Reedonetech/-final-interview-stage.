import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const body = await request.json();
  const validation = contactSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return NextResponse.json({
    message: 'Form submitted successfully',
    data: validation.data,
  });
}