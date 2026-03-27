export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Validation function
function validateFormData(data: ContactFormData): string[] {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.subject) {
    errors.push('Please select a subject');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate form data
    const errors = validateFormData(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors, message: 'Validation failed' },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Send email notification (using services like Resend, SendGrid, etc.)
    // 2. Store in database
    // 3. Send confirmation email to user

    // Example: Log for development (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', {
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
        timestamp: new Date().toISOString(),
      });
    }

    // TODO: Integrate with your email service
    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@haclab.net',
    //   to: 'info@haclab.net',
    //   subject: `New Contact Form: ${body.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${body.name}</p>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
    //     <p><strong>Subject:</strong> ${body.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${body.message}</p>
    //   `,
    // });

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24-48 hours.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}