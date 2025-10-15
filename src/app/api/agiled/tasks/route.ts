
import { NextResponse } from 'next/server';
import axios from 'axios';

// --- DATA MAPPING & INTERFACES ---

interface AgiledTask {
    id: number;
    name: string;
    description: string;
    status: {
        id: number;
        name: string; // e.g., "In Progress", "Completed", "Not Started"
        color: string;
        type: string;
    };
    project_name: string;
    start_date: string;
    due_date: string;
    assigned_users: {
        id: number;
        first_name: string;
        last_name: string;
        avatar: string | null;
    }[];
}

type RoadmapPhase = 'foundation' | 'launch' | 'expansion' | 'growth' | 'backlog';
type TaskStatus = 'todo' | 'in-progress' | 'done' | 'backlog';

// Function to map Agiled project names to our roadmap phases
function mapProjectToPhase(projectName: string): RoadmapPhase {
    const name = projectName.toLowerCase();
    if (name.includes('foundation')) return 'foundation';
    if (name.includes('launch')) return 'launch';
    if (name.includes('expansion')) return 'expansion';
    if (name.includes('growth')) return 'growth';
    return 'backlog'; // Default phase
}

// Function to map Agiled task statuses to our simplified statuses
function mapAgiledStatus(agiledStatusName: string): TaskStatus {
    const status = agiledStatusName.toLowerCase();
    if (status.includes('completed') || status.includes('done')) return 'done';
    if (status.includes('in progress')) return 'in-progress';
    if (status.includes('not started')) return 'todo';
    return 'backlog';
}

// --- API ROUTE HANDLER ---

export async function GET() {
    const AGILED_API_KEY = process.env.AGILED_API_KEY;
    const AGILED_API_URL = 'https://my.agiled.app/api/v1/tasks';

    if (!AGILED_API_KEY) {
        console.error("Agiled API key is not configured in environment variables.");
        return NextResponse.json({ error: 'Server configuration error: Missing API key.' }, { status: 500 });
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

        const agiledTasks: AgiledTask[] = response.data.data;
        
        // Transform the data into the format our frontend expects
        const tasks = agiledTasks.map(task => ({
            id: String(task.id),
            title: task.name,
            description: task.description,
            status: mapAgiledStatus(task.status.name),
            phase: mapProjectToPhase(task.project_name),
            assignee: task.assigned_users.length > 0 ? {
                name: `${task.assigned_users[0].first_name} ${task.assigned_users[0].last_name}`,
                avatarUrl: task.assigned_users[0].avatar || undefined,
            } : undefined,
        }));
        
        return NextResponse.json({ tasks });

    } catch (error: any) {
        console.error("Error fetching from Agiled API:", error.response?.data || error.message);
        return NextResponse.json({ error: 'Failed to fetch data from project management tool.' }, { status: 502 }); // 502 Bad Gateway
    }
}
