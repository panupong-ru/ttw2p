import { NextResponse } from 'next/server';

/**
 * Safely serializes data to JSON, handling BigInt values
 * @param data The data to serialize
 * @param status HTTP status code
 * @returns NextResponse with serialized data
 */
export function safeJSONResponse(data: any, status: number = 200) {
  return NextResponse.json(
    JSON.parse(JSON.stringify(data, (_, value) => (typeof value === 'bigint' ? value.toString() : value))),
    { status }
  );
}

/**
 * Creates a success response
 * @param data The data to return
 * @param status HTTP status code (defaults to 200)
 * @returns NextResponse with success message and data
 */
export function successResponse(data: any, status: number = 200) {
  return safeJSONResponse({ message: 'success', data }, status);
}

/**
 * Creates an error response
 * @param error The error to return
 * @param status HTTP status code (defaults to 500)
 * @returns NextResponse with error message
 */
export function errorResponse(error: unknown, status: number = 500) {
  return safeJSONResponse({ error: error instanceof Error ? error.message : 'Unknown error' }, status);
}
