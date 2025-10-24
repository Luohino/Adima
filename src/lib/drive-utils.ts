/**
 * Google Drive Link Processing Utility
 * Converts various Google Drive link formats to direct download links
 */

export interface DriveLinkInfo {
  originalUrl: string;
  directUrl: string;
  fileId: string;
  fileName?: string;
  mimeType?: string;
  fileSize?: string;
}

/**
 * Extract file ID from Google Drive URL
 */
export function extractFileId(url: string): string | null {
  // Pattern for standard Google Drive links
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Convert Google Drive URL to direct download link
 */
export function getDirectDownloadLink(url: string): string | null {
  const fileId = extractFileId(url);
  
  if (!fileId) {
    return null;
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/**
 * Convert Google Drive URL to embed/view link
 */
export function getEmbedLink(url: string): string | null {
  const fileId = extractFileId(url);
  
  if (!fileId) {
    return null;
  }

  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/**
 * Process multiple Google Drive links
 */
export function processDriveLinks(urls: string[]): DriveLinkInfo[] {
  const results: DriveLinkInfo[] = [];

  for (const url of urls) {
    const fileId = extractFileId(url);
    
    if (fileId) {
      results.push({
        originalUrl: url,
        directUrl: getDirectDownloadLink(url) || url,
        fileId,
        fileName: extractFileName(url),
        mimeType: 'unknown',
        fileSize: 'unknown'
      });
    } else {
      results.push({
        originalUrl: url,
        directUrl: url,
        fileId: '',
        fileName: extractFileName(url),
        mimeType: 'unknown',
        fileSize: 'unknown'
      });
    }
  }

  return results;
}

/**
 * Extract file name from Google Drive URL (if available)
 */
export function extractFileName(url: string): string | null {
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

/**
 * Validate if a URL is a Google Drive link
 */
export function isGoogleDriveLink(url: string): boolean {
  return url.includes('drive.google.com') || url.includes('docs.google.com');
}

/**
 * Get file type from Google Drive URL
 */
export function getFileType(url: string): 'video' | 'document' | 'image' | 'other' {
  const fileName = extractFileName(url);
  
  if (!fileName) {
    return 'other';
  }

  const extension = fileName.toLowerCase().split('.').pop();
  
  if (!extension) {
    return 'other';
  }

  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];
  const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

  if (videoExtensions.includes(extension)) {
    return 'video';
  } else if (documentExtensions.includes(extension)) {
    return 'document';
  } else if (imageExtensions.includes(extension)) {
    return 'image';
  } else {
    return 'other';
  }
}

/**
 * Create a shareable Google Drive link
 */
export function createShareableLink(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}

/**
 * Batch process Google Drive links from text input
 */
export function processDriveLinksFromText(text: string): DriveLinkInfo[] {
  // Extract all URLs from text
  const urlRegex = /https?:\/\/[^\s]+/g;
  const urls = text.match(urlRegex) || [];
  
  // Filter only Google Drive links
  const driveUrls = urls.filter(url => isGoogleDriveLink(url));
  
  return processDriveLinks(driveUrls);
}

/**
 * Generate HTML embed code for Google Drive files
 */
export function generateEmbedCode(url: string, width: number = 640, height: number = 480): string | null {
  const embedUrl = getEmbedLink(url);
  
  if (!embedUrl) {
    return null;
  }

  return `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;
}

/**
 * Get thumbnail URL for Google Drive video
 */
export function getVideoThumbnail(url: string): string | null {
  const fileId = extractFileId(url);
  
  if (!fileId) {
    return null;
  }

  // This is a workaround - Google Drive doesn't provide direct thumbnail access
  // You might need to use the Google Drive API for this
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w320-h240`;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validate Google Drive link accessibility
 */
export async function validateDriveLink(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
}