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
        const [rows] = await connection.execute(`
            SELECT
                satellite_positions.satellite_id,
                satellite_positions.timestamp,
                satellite_positions.latitude,
                satellite_positions.longitude,
                satellite_positions.altitude_km,
                satellite_positions.velocity_kms,
                satellites.object_name,
                satellites.norad_cat_id,
                satellites.category,
                satellites.sub_category 
            FROM 
                satellite_positions
            INNER JOIN
                satellites
            ON
                satellite_positions.satellite_id = satellites.id;

            `)
        await connection.end();
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error('Error executing query:', error);
        await connection.end();
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}