import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

interface LoginRequest {
  email: string;
  password: string;
}

const DEMO_USER = {
  id: '1',
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'admin123',
  name: 'Admin User',
  role: 'admin' as const
};

export async function POST(req: Request) {
  try {
    // Validate request has a body
    if (!req.body) {
      return NextResponse.json(
        { error: 'Missing request body' },
        { status: 400 }
      );
    }

    const body = await req.json() as LoginRequest;

    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Handle login logic
    if (body.email === DEMO_USER.email && body.password === DEMO_USER.password) {
      const token = sign(
        { userId: DEMO_USER.id, role: DEMO_USER.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1d' }
      );

      const response = NextResponse.json(
        { 
          success: true, 
          user: { 
            id: DEMO_USER.id, 
            name: DEMO_USER.name, 
            role: DEMO_USER.role 
          } 
        },
        { status: 200 }
      );

      response.cookies.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}