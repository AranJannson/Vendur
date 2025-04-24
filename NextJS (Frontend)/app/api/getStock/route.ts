import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log('Request payload:', payload);

    if (!payload.item_id) {
      return NextResponse.json(
        { error: 'item_id is required' },
        { status: 400 }
      );
    }

    const backendResponse = await fetch('http://localhost:8000/getStock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // First, check if the request failed
    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error('Backend error:', {
        status: backendResponse.status,
        error: errorText,
      });
      return NextResponse.json(
        { error: 'Backend request failed', details: errorText },
        { status: backendResponse.status }
      );
    }

    // If successful, try to parse JSON
    try {
      const jsonData = await backendResponse.json();
      console.log('Backend response:', jsonData);
      return NextResponse.json(jsonData);
    } catch (jsonError) {
      console.error('Failed to parse backend response:', jsonError);
      return NextResponse.json(
        { error: 'Invalid JSON response from backend' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}