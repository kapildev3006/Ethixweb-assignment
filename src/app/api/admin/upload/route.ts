import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdminFromRequest } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
];

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
  // 1. Verify admin session
  const admin = getAuthenticatedAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'ethixweb/uploads';
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided in request.' },
        { status: 400 }
      );
    }

    // 2. Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file format (${file.type}). Only WebP, JPEG, PNG, GIF, and SVG are supported.`,
        },
        { status: 400 }
      );
    }

    // 3. Validate file size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 5MB limit. Please upload a smaller image.`,
        },
        { status: 400 }
      );
    }

    // 4. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize folder path
    const safeFolder = folder.startsWith('ethixweb/') ? folder : `ethixweb/${folder.replace(/^\/+/, '')}`;

    // 5. Upload securely to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, safeFolder);

    return NextResponse.json(
      {
        success: true,
        data: {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          format: uploadResult.format,
          width: uploadResult.width,
          height: uploadResult.height,
          bytes: uploadResult.bytes,
          altText,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Image upload failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to upload image to Cloudinary.',
      },
      { status: 500 }
    );
  }
}
