import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import contact from '@/models/User'  // Ensure your model name is correctly capitalized

export async function POST(request) {

  try {
    await dbConnect();  // Connect to the database
   const body = await request.json();
   console.log(body);

    const { name, phone, address, service, message } = body;

    // Optionally, add more validation like phone number format, service options, etc.
    const phonePattern = /^[0-9]{10}$/; // Example of a 10-digit phone number
    if (!phonePattern.test(phone)) {
      return NextResponse.json({ message: 'Invalid phone number format.' }, { status: 400 });
    }

    // Save the contact form dataa
    const newContact = new contact({
      name,
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
