import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ConfigLocalController } from './config-local.controller';

const controller = new ConfigLocalController();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const configLocal = await controller.getById(id);
      return NextResponse.json(configLocal);
    }

    const configLocals = await controller.getAll();
    return NextResponse.json(configLocals);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const configLocal = await controller.create(body);
    return NextResponse.json(configLocal, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const configLocal = await controller.update(id, body);
    return NextResponse.json(configLocal);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await controller.delete(id);
    return NextResponse.json({ message: 'ConfigLocal deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
