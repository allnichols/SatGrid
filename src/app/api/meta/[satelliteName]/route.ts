import { NextResponse, } from "next/server";
import mysql from 'mysql2/promise';
import { SatelliteMeta } from "@/types/types";

export async function GET(request: Request, { params }: { params: { satelliteName: string } }) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    console.log(params)
    const { satelliteName } = params;
    
    try {
        const [rows] = await connection.execute(`
            SELECT * FROM satellites WHERE satellites.object_name = ?
            `, [satelliteName])

            await connection.end();
            return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error fetching satellite metadata');
        await connection.end();
        return NextResponse.json({ error: 'Error fetching satellite metadata' }, { status: 500 });
    }

}