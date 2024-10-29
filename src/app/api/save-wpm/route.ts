//arc/app/api/save-wpm/route.ts
import { saveWpm } from "@/actions/save-wpm"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, wpm, difficulty, time } = await req.json();
    console.log(userId)

    try {
        await saveWpm({
            userId,
            wpm,
            difficulty,
            time
        });
        return NextResponse.json({ message: "WPM saved." }, { status: 201 });
    } catch (err) {
        console.error("Error saving WPM:", err); // Log the error
        return NextResponse.json(
            { message: "An error occurred", err },
            { status: 400 }
        );
    }
}
