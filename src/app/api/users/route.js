import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

// GET: Fetch users with pagination, filtering, and status management
export async function GET(req) {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    const sortField = url.searchParams.get('sort') || 'createdAt';
    const sortOrder = url.searchParams.get('order') === 'desc' ? -1 : 1;
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status'); // Filter by status (active/inactive)

    const query = {
      ...(search && { name: { $regex: search, $options: 'i' } }), // If search is provided, filter by name
      ...(status && { status }) // If status is provided, filter by status
    };
    
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

// // PUT: Update user status (active/inactive)
// export async function PUT(req) {
//   await dbConnect();
//   try {
//     const { id, status } = await req.json(); // Get the id and status from the request body

//     if (!id || !status) {
//       return NextResponse.json(
//         { message: 'ID and status are required' },
//         { status: 400 }
//       );
//     }
//     // Ensure the status is either 'active' or 'inactive'
//     if (!['pending', 'success'].includes(status)) {
//       return NextResponse.json(
//         { message: 'Invalid status value' },
//         { status: 400 }
//       );
//     }

//     const updateData = { status };
//     if (status === 'success') {
//       updateData.completedAt = new Date(); // Set createdAt for completed services
//       console.log('CompletedAt timestamp set:', updateData.completedAt); 
//     }

//    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
//       new: true, // Return the updated document
//     });

//     if (!updatedUser) {
//       return NextResponse.json(
//         { message: 'User not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: 'User status updated', user: updatedUser },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating user:', error.message);
//     return NextResponse.json(
//       { message: 'Failed to update user', error: error.message },
//       { status: 500 }
//     );
//   }
// }

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

    // const deletedUser = await User.findByIdAndDelete(userId);

    // if (!deletedUser) {
    //   return NextResponse.json(
    //     { message: 'User not found' },
    //     { status: 404 }
    //   );
    // }

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
