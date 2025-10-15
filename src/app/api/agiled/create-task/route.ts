
import { NextResponse } from 'next/server';
import axios from 'axios';

const AGILED_API_URL = 'https://my.agiled.app/api/v1/tasks';

// These would typically be IDs from Agiled for the project and status you want to use.
// You can get these by looking at the URL or making an API call to list projects/statuses.
const AGILED_PROJECT_ID = 1; // Placeholder: The ID for your "VSD Network" project in Agiled
const AGILED_STATUS_ID = 1; // Placeholder: The ID for the "To Do" or "Backlog" status

export async function POST(request: Request) {
    const AGILED_API_KEY = process.env.AGILED_API_KEY;

    if (!AGILED_API_KEY) {
        console.error("Agiled API key is not configured in environment variables.");
        return NextResponse.json({ error: 'Server configuration error: Missing Agiled API key.' }, { status: 500 });
    }
    
    try {
        const body = await request.json();
        const { title, description } = body;

        if (!title || !description) {
            return NextResponse.json({ error: 'Bad Request: title and description are required.' }, { status: 400 });
        }

        const taskPayload = {
            name: title,
            description: description,
            project_id: AGILED_PROJECT_ID,
            status_id: AGILED_STATUS_ID,
            billable: false,
            // You can add more fields like due_date, assigned_to, etc. as needed
        };

        const response = await axios.post(AGILED_API_URL, taskPayload, {
             headers: {
                'Authorization': `Bearer ${AGILED_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200 && response.status !== 201) {
             throw new Error(`Agiled API responded with status ${response.status}`);
        }

        return NextResponse.json({ success: true, data: response.data });

    } catch (error: any) {
        console.error("Error creating Agiled task:", error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to create task in project management tool.' }, { status: 502 });
    }
}
