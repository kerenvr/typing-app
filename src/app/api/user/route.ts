import { prisma }from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const { name, email } = request.json();
    await prisma.user.create({
        data: {
            email,
            name,
        },
    });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
}