import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { 
  processDriveLinksFromText, 
  getDirectDownloadLink, 
  getEmbedLink, 
  getFileType,
  isGoogleDriveLink,
  DriveLinkInfo 
} from '@/lib/drive-utils';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify JWT token
function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

// POST - Process Google Drive links
export async function POST(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { links, text } = await request.json();

    let processedLinks: DriveLinkInfo[] = [];

    if (text) {
      // Process links from text input
      processedLinks = processDriveLinksFromText(text);
    } else if (Array.isArray(links)) {
      // Process array of links
      processedLinks = links.map((url: string) => {
        const fileId = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] || 
                      url.match(/id=([a-zA-Z0-9_-]+)/)?.[1] || '';

        return {
          originalUrl: url,
          directUrl: getDirectDownloadLink(url) || url,
          fileId,
          fileName: extractFileName(url),
          mimeType: 'unknown',
          fileSize: 'unknown'
        };
      });
    }

    // Add file type detection
    processedLinks = processedLinks.map(link => ({
      ...link,
      fileType: getFileType(link.originalUrl)
    }));

    return NextResponse.json({
      message: 'Links processed successfully',
      links: processedLinks,
      count: processedLinks.length
    });

  } catch (error) {
    console.error('Process drive links error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to extract file name
function extractFileName(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const nameParam = urlObj.searchParams.get('name');
    if (nameParam) {
      return decodeURIComponent(nameParam);
    }
  } catch (error) {
    // Invalid URL, return null
  }

  return null;
}

// GET - Get link processing info
export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { message: 'URL parameter is required' },
        { status: 400 }
      );
    }

    if (!isGoogleDriveLink(url)) {
      return NextResponse.json(
        { message: 'Invalid Google Drive URL' },
        { status: 400 }
      );
    }

    const linkInfo = {
      originalUrl: url,
      directUrl: getDirectDownloadLink(url),
      embedUrl: getEmbedLink(url),
      fileType: getFileType(url),
      fileName: extractFileName(url),
      fileId: url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] || 
              url.match(/id=([a-zA-Z0-9_-]+)/)?.[1] || ''
    };

    return NextResponse.json({
      message: 'Link info retrieved successfully',
      link: linkInfo
    });

  } catch (error) {
    console.error('Get link info error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}