// API service for profile management with real database operations
// This service makes HTTP requests to a backend API server
//
// Expected Backend API Endpoints:
// GET    /api/profiles/:email          - Get user profile by email
// POST   /api/profiles                 - Create new user profile
// PATCH  /api/profiles/:email          - Update user profile
// DELETE /api/profiles/:email          - Delete user profile
// GET    /api/profiles                 - List all profiles (admin only)
// GET    /api/institutions             - Get list of institutions
// GET    /api/institutions/:inst/majors - Get majors for institution
// GET    /api/degree-requirements/:inst/:major - Get degree requirements
import { User } from '../types';

// API base URL - in production this would be an environment variable
// Set REACT_APP_API_URL in your .env file (e.g., REACT_APP_API_URL=https://api.yourapp.com)
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
// Temporary: 
const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to make API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network request failed');
  }
}

/**
 * Get a user profile by email
 * @param email - User's email address
 * @returns User profile or null if not found
 * @throws Error if request fails or email is invalid
 */
export const getProfile = async (email: string): Promise<User | null> => {
  if (!email) {
    throw new Error('Email is required');
  }

  try {
    const profile = await apiRequest<User>(`/profiles/${encodeURIComponent(email)}`);
    return profile;
  } catch (error) {
    // If profile not found, return null instead of throwing
    if (error instanceof Error && error.message.includes('404')) {
      return null;
    }
    throw error;
  }
};

/**
 * Create a new user profile
 * @param profile - Partial user profile data (email, institution, major required)
 * @returns Created user profile
 * @throws Error if required fields missing or profile already exists
 */
export const createProfile = async (profile: Partial<User>): Promise<User> => {
  if (!profile.email) {
    throw new Error('Email is required to create a profile');
  }

  // Validate required fields
  if (!profile.institution || !profile.major) {
    throw new Error('Institution and major are required');
  }

  const profileData = {
    email: profile.email,
    name: profile.name || profile.email.split('@')[0],
    institution: profile.institution,
    major: profile.major,
    minor: profile.minor,
    year: profile.year || 'Freshman',
    expectedGraduation: profile.expectedGraduation || 'Spring 2027',
    gpa: profile.gpa || 0,
    creditsCompleted: profile.creditsCompleted || 0,
    creditsRequired: profile.creditsRequired || 120,
    advisor: profile.advisor || 'TBD'
  };

  return await apiRequest<User>('/profiles', {
    method: 'POST',
    body: JSON.stringify(profileData),
  });
};

/**
 * Update an existing user profile
 * @param email - Current email of the user
 * @param updates - Fields to update
 * @returns Updated user profile
 * @throws Error if email not found or update fails
 */
export const updateProfile = async (email: string, updates: Partial<User>): Promise<User> => {
  if (!email) {
    throw new Error('Email is required to update a profile');
  }

  // Validate that we have something to update
  if (Object.keys(updates).length === 0) {
    throw new Error('No updates provided');
  }

  // If updating email, ensure it's valid
  if (updates.email && !updates.email.includes('@')) {
    throw new Error('Invalid email format');
  }

  return await apiRequest<User>(`/profiles/${encodeURIComponent(email)}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

/**
 * Delete a user profile
 * @param email - Email of the user to delete
 * @throws Error if email not found or deletion fails
 */
export const deleteProfile = async (email: string): Promise<void> => {
  if (!email) {
    throw new Error('Email is required to delete a profile');
  }

  await apiRequest<void>(`/profiles/${encodeURIComponent(email)}`, {
    method: 'DELETE',
  });
};

/**
 * List all user profiles (admin functionality)
 * @returns Array of all user profiles
 * @throws Error if request fails
 */
export const listProfiles = async (): Promise<User[]> => {
  return await apiRequest<User[]>('/profiles');
};

// Additional API functions for degree requirements and other data

/**
 * Get degree requirements for a specific institution and major
 * @param institution - Name of the institution
 * @param major - Name of the major
 * @returns Degree requirements object
 * @throws Error if institution/major not found
 */
export const getDegreeRequirements = async (institution: string, major: string) => {
  if (!institution || !major) {
    throw new Error('Institution and major are required');
  }

  return await apiRequest(`/degree-requirements/${encodeURIComponent(institution)}/${encodeURIComponent(major)}`);
};

/**
 * Get list of all available institutions
 * @returns Array of institution names
 * @throws Error if request fails
 */
export const getInstitutions = async () => {
  return await apiRequest<string[]>('/institutions');
};

/**
 * Get list of majors available at a specific institution
 * @param institution - Name of the institution
 * @returns Array of major names
 * @throws Error if institution not found
 */
export const getMajorsByInstitution = async (institution: string) => {
  if (!institution) {
    throw new Error('Institution is required');
  }

  return await apiRequest<string[]>(`/institutions/${encodeURIComponent(institution)}/majors`);
};
