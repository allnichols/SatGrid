import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { Satellite } from "./types";

export async function GET() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
    });

    try {

        const [rows] = await connection.execute(`
            SELECT 
                satellites.object_name, 
                satellites.tle_line1, 
                satellites.tle_line2 
            FROM 
                satellites;
        `);
        await connection.end();
        return NextResponse.json(rows as Satellite[], { status: 200 });
    } catch (error) {
        console.error('Error executing query:', error);
        await connection.end();
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}