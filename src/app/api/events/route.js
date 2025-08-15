import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import {NextResponse} from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const NewEvent = await Event.create(body);
    return NextResponse.json({success: true, event: NewEvent}, {status: 201});
  } catch (error) {
    return NextResponse.json({success: false, message: error.message}, {status: 500});
  }
}

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find().sort({date: -1});
    return Response.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(JSON.stringify({error: "Failed to fetch events"}), {status: 500});
  }
}
