import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Film from '@/models/Film'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = req.nextUrl
    const page    = Math.max(1, Number(searchParams.get('page')  ?? '1'))
    const limit   = Math.min(50, Number(searchParams.get('limit') ?? '12'))
    const status  = searchParams.get('status')
    const genre   = searchParams.get('genre')
    const year    = searchParams.get('year')
    const featured= searchParams.get('featured')
    const search  = searchParams.get('q')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {}
    if (status)  query.status  = status
    if (genre)   query.genres  = { $in: [genre] }
    if (year)    query.year    = Number(year)
    if (featured === 'true') query.featured = true
    if (search)  query.$text   = { $search: search }

    const [films, total] = await Promise.all([
      Film.find(query).sort({ year: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Film.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: films,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req)
    await dbConnect()
    const body = await req.json()
    const film = await Film.create(body)
    return NextResponse.json({ success: true, data: film }, { status: 201 })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    const status = msg.includes('autenticado') || msg.includes('admin') ? 403 : 500
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}
