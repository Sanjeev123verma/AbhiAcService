
// import dbConnect from '@/lib/dbConnect';
// import User from '@/models/User';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   await dbConnect(); // Connect to the database

//   try {
  
//     const users = await User.find().sort({ createdAt: -1 }); // Fetch sorted users by createdAt

//     const formattedUsers = users.map((user) => ({
//       ...user.toObject(),
//       createdAt: user.createdAt ? user.createdAt.toISOString() : null, // Ensure createdAt is valid ISO string
//     }));

//     return NextResponse.json(formattedUsers, { status: 200 }); // Return formatted users
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Failed to fetch users', error: error.message },
//       { status: 500 }
//     );
//   }
// }
 

import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// GET: Fetch users with sorting, pagination, and filtering
export async function GET(req) {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const sortField = url.searchParams.get('sort') || 'createdAt';
    const sortOrder = url.searchParams.get('order') === 'desc' ? -1 : 1;
    const search = url.searchParams.get('search') || '';

    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    return NextResponse.json(
      { users, total, page, limit },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch users', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete user by ID
export async function DELETE(req) {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('id'); // Extract 'id' from query params

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'User deleted successfully', userId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete user', error: error.message },
      { status: 500 }
    );
  }
}

