//https://datalab.medium.com/nextjs-14-json-api-with-mysql-9f635b5ecb1d
import { NextResponse } from "next/server";
import pool from "@/lib/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection();
        const query = "SELECT * FROM words ORDER BY RAND() LIMIT 50";
        const [rows] = await db.execute(query)
        db.release()

        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}