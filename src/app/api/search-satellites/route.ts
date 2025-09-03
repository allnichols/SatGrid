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
    const categoryParam = searchParams.get('category') || '';
    const categories = categoryParam ? categoryParam.split(',').map(c => c.trim().toLowerCase()).filter(Boolean) : [];
    
    try {
        let sql = `
            SELECT 
                satellites.object_name, 
                satellites.category, 
                satellites.tle_line1, 
                satellites.tle_line2 
            FROM 
                satellites 
            WHERE 
                LOWER(satellites.object_name) 
            LIKE ?`
        let params: string[] = [`%${searchTerm.toLowerCase()}%`];

        if(categories.length > 0) {
            sql += ` AND LOWER(satellites.category) IN (${categories.map(() => '?').join(',')})`;
            params.push(...categories);
        }

        const [rows] = await connection.execute(sql, params);
        await connection.end();
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Error searching for satellites'});
    }
}