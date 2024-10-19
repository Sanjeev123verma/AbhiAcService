// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import contact from '@/models/contact';

// export async function GET() {
//   try {
//     await dbConnect(); // Connect to the database
//     const contacts = await contact.find({}).sort({ createdAt: -1 }); // Fetch all the records
//     return NextResponse.json(contacts, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Failed to fetch users', error: error.message }, { status: 500 });
//   }
// }


import dbConnect from '@/lib/dbConnect';
import contact from '@/models/contact';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect(); // Connect to the database

  try {
    const users = await contact.find().sort({ createdAt: -1 }); // Fetch sorted users by createdAt
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

