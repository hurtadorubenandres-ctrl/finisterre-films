import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Film from '@/models/Film'
import { requireAdmin } from '@/lib/auth'

interface Params { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect()
    const film = await Film.findById(params.id).lean()
    if (!film) return NextResponse.json({ success: false, error: 'Película no encontrada' }, { status: 404 })
    return NextResponse.json({ success: true, data: film })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    requireAdmin(req)
    await dbConnect()
    const body = await req.json()
    const film = await Film.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
    if (!film) return NextResponse.json({ success: false, error: 'Película no encontrada' }, { status: 404 })
    return NextResponse.json({ success: true, data: film })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    const status = msg.includes('admin') ? 403 : 500
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    requireAdmin(req)
    await dbConnect()
    const film = await Film.findByIdAndDelete(params.id)
    if (!film) return NextResponse.json({ success: false, error: 'Película no encontrada' }, { status: 404 })
    return NextResponse.json({ success: true, message: 'Película eliminada' })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    const status = msg.includes('admin') ? 403 : 500
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}
