
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect(); // Connect to the database

  try {
  
    const users = await User.find().sort({ createdAt: -1 }); // Fetch sorted users by createdAt

    const formattedUsers = users.map((user) => ({
      ...user.toObject(),
      createdAt: user.createdAt ? user.createdAt.toISOString() : null, // Ensure createdAt is valid ISO string
    }));

    return NextResponse.json(formattedUsers, { status: 200 }); // Return formatted users
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch users', error: error.message },
      { status: 500 }
    );
  }
}

