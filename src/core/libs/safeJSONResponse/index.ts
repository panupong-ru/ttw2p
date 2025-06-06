import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Custom serializer for BigInt
const serializeBigInt = (data: any): any => {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'bigint') {
    return data.toString();
  }

  if (Array.isArray(data)) {
    return data.map(serializeBigInt);
  }

  if (typeof data === 'object') {
    const result: any = {};
    for (const key in data) {
      result[key] = serializeBigInt(data[key]);
    }
    return result;
  }

  return data;
};

// Middleware to handle BigInt serialization
export function withBigIntSerialization(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const response = await handler(req);

      // Clone the response to modify it
      const newResponse = NextResponse.json(serializeBigInt(await response.json()), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });

      return newResponse;
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}
