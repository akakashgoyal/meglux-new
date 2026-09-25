/**
 * Utility functions for form input validations across Megalux applications
 * Supports Phone Number (UAE / GCC / International), Email, Full Name, Message, and File attachments (20MB)
 */

export const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
export const MAX_FILE_SIZE_MB = 20;

/**
 * Validates a phone number string:
 * - Checks if required or optional
 * - Rejects letters and unwanted characters
 * - Ensures valid digit count between 7 and 15 digits (standard E.164 recommendation)
 */
export function validatePhoneNumber(phone: string, required: boolean = true): { isValid: boolean; error: string | null } {
  const trimmed = phone.trim();

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Phone number is required.' };
    }
    return { isValid: true, error: null };
  }

  // Check for invalid characters (only allows digits, spaces, plus, minus, parentheses)
  if (/[^\d\s\+\-\(\)]/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Phone number should only contain numbers, spaces, and standard phone symbols (+, -, ()).'
    };
  }

  // Count raw digits
  const digitsOnly = trimmed.replace(/\D/g, '');

  if (digitsOnly.length < 7) {
    return {
      isValid: false,
      error: 'Phone number is too short. Please enter at least 7 to 15 digits (e.g. +971 50 123 4567).'
    };
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      error: 'Phone number exceeds 15 digits. Please enter a valid telephone or mobile number.'
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validates an email address
 */
export function validateEmail(email: string, required: boolean = true): { isValid: boolean; error: string | null } {
  const trimmed = email.trim();

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Corporate email address is required.' };
    }
    return { isValid: true, error: null };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address (e.g. name@company.com).'
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validates Full Name
 */
export function validateFullName(name: string, required: boolean = true): { isValid: boolean; error: string | null } {
  const trimmed = name.trim();

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Full name is required.' };
    }
    return { isValid: true, error: null };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: 'Full name must be at least 2 characters long.'
    };
  }

  // Name should contain at least some letters
  if (!/[a-zA-Z\u0600-\u06FF]/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid name containing alphabetical letters.'
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validates Message / Technical Specification
 */
export function validateMessage(message: string, minLength: number = 10, required: boolean = true): { isValid: boolean; error: string | null } {
  const trimmed = message.trim();

  if (!trimmed) {
    if (required) {
      return { isValid: false, error: 'Message / technical specifications are required.' };
    }
    return { isValid: true, error: null };
  }

  if (trimmed.length < minLength) {
    return {
      isValid: false,
      error: `Please provide more details (minimum ${minLength} characters).`
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validates uploaded file (up to 20MB, checks allowed extensions)
 */
export function validateAttachment(file: File | null, allowedExtensions: string[]): { isValid: boolean; error: string | null } {
  if (!file) {
    return { isValid: true, error: null };
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!allowedExtensions.map(e => e.replace('.', '').toLowerCase()).includes(ext)) {
    return {
      isValid: false,
      error: `Unsupported file format for "${file.name}". Supported: ${allowedExtensions.join(', ').toUpperCase()} (max 20MB).`
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return {
      isValid: false,
      error: `File "${file.name}" (${sizeMb} MB) exceeds the maximum 20 MB limit. Please upload a file under 20 MB.`
    };
  }

  return { isValid: true, error: null };
}
