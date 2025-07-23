import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';

const users = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  },
];

export async function POST(request: Request) {
  const body = await request.json();
  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password } = validation.data;
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }
const { password: _, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword);
}