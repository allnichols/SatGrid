import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

export async function GET(request: Request, context: {params: any}) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    const params = await context.params;
    const searchTerm = params.searchTerm || '';
    const category = params.category || '';

    try {
        let sql = `SELECT satellites.object_name, satellites.category FROM satellites WHERE object_name LIKE ?`
        let params: string[] = [`%${searchTerm}%`];

        if(category !== ''){
            sql += ` AND category = ?`;
            params.push(category);
        }

        const [rows] = await connection.execute(sql, params);
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error searching for satellites'});
    }
}