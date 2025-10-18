
import { NextResponse } from 'next/server';
import axios from 'axios';

const AGILED_API_URL = 'https://my.agiled.app/api/v1/tasks';

// This is a placeholder route. You would replace these with actual IDs from your Agiled project.
const AGILED_PROJECT_ID = 1; 
const AGILED_STATUS_ID = 1;

export async function GET(request: Request) {
    const AGILED_API_KEY = process.env.AGILED_API_KEY;

    if (!AGILED_API_KEY) {
        console.error("Agiled API key is not configured in environment variables.");
        return NextResponse.json({ error: 'Server configuration error: Missing Agiled API key.' }, { status: 500 });
    }
    
    try {
        const response = await axios.get(AGILED_API_URL, {
             headers: {
                'Authorization': `Bearer ${AGILED_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
             throw new Error(`Agiled API responded with status ${response.status}`);
        }

        return NextResponse.json({ success: true, data: response.data });

    } catch (error: any) {
        console.error("Error fetching Agiled tasks:", error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to fetch tasks from project management tool.' }, { status: 502 });
    }
}
