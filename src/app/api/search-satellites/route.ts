import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

export async function GET(request: Request) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const searchParams = new URL(request.url).searchParams;
    const searchTerm = searchParams.get('searchTerm') || '';
    const category = searchParams.get('category') || '';

    try {
        let sql = `SELECT satellites.object_name, satellites.category FROM satellites WHERE LOWER(satellites.object_name) LIKE ?`
        let params: string[] = [`%${searchTerm.toLowerCase()}%`];

        if(category !== ''){
            sql += ` AND LOWER(satellites.category) = ?`;
            params.push(category.toLowerCase());
        }

        const [rows] = await connection.execute(sql, params);
        console.log(rows)
        await connection.end();
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error searching for satellites'});
    }
}