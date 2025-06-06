import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ConfigSystemController } from './config-system.controller';

const controller = new ConfigSystemController();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const configSystem = await controller.getById(id);
      return NextResponse.json(configSystem);
    }

    const configSystems = await controller.getAll();
    return NextResponse.json(configSystems);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const configSystem = await controller.create(body);
    return NextResponse.json(configSystem, { status: 201 });
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
    const configSystem = await controller.update(id, body);
    return NextResponse.json(configSystem);
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
    return NextResponse.json({ message: 'ConfigSystem deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
