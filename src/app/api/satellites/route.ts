import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
    });

    try {
        const [rows] = await connection.execute('SELECT * FROM satellite_positions;')
        console.log(rows);
        await connection.end();
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error executing query:', error);
        await connection.end();
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}