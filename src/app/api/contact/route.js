import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import contact from '@/models/User'  // Ensure your model name is correctly capitalized

export async function POST(request) {

  try {
    await dbConnect();  // Connect to the database
   const body = await request.json();
   console.log(body);

    const { name, phone, address, service, message = null } = body;

      // Validate required fields
      if (!name || !phone || !address || !service) {
        return NextResponse.json(
          { message: 'Please fill in all required fields (name, phone, address, service).' },
          { status: 400 }
        );
      }

       // Name validation
    const namePattern = /^[a-zA-Z\s]{3,20}$/;
    if (!namePattern.test(name.trim())) {
      return NextResponse.json(
        { message: 'Invalid name. Name must be 3-20 characters long and can only contain alphabets and spaces.' },
        { status: 400 }
      );
    }

    // Optionally, add more validation like phone number format, service options, etc.
    const phonePattern =/^[6-9][0-9]{9}$/; // Example of a 10-digit Indian phone number
    if (!phonePattern.test(phone)) {
      return NextResponse.json(
        { message: 'Invalid phone number format.' }, { status: 400 });
    }

    // Save the contact form dataa
    const newContact = new contact({
      name: name.trim(),
      phone,
      address,
      service,
      message,
    });

    await newContact.save();  // Save data to MongoDB

    return NextResponse.json({ message: 'Form submitted successfully!' }, { status: 200 });
  } 
  catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json({ message: 'Failed to submit form', error: error.message }, { status: 500 });
  }
}



// PUT: Update user status (active/inactive)
export async function PUT(req) {
  await dbConnect();
  try {
    const { id, status } = await req.json(); // Get the id and status from the request body

    if (!id || !status) {
      return NextResponse.json(
        { message: 'ID and status are required' },
        { status: 400 }
      );
    }
    // Ensure the status is either 'active' or 'inactive'
    if (!['pending', 'success'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status value' },
        { status: 400 }
      );
    }

    const updateData = { status };
    if (status === 'success') {
      updateData.completedAt = new Date(); // Set createdAt for completed services
      console.log('CompletedAt timestamp set:', updateData.completedAt); 
    }

   const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'User status updated', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user:', error.message);
    return NextResponse.json(
      { message: 'Failed to update user', error: error.message },
      { status: 500 }
    );
  }
}


// Handle GET request (fetch data)
export async function GET() {
  try {
    await dbConnect(); // Connect to the database

    // Retrieve all contacts from the database
    const contacts = await contact.find(); // Fetch all documents in the collection

    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch contacts', error: error.message },
      { status: 500 }
    );
  }
}
