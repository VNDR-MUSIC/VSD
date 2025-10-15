'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Cpu, Zap, Milestone, Users, GripVertical, ArrowRight, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';


// --- DATA INTERFACES & API ---
// These interfaces are now placeholders as the backend connection has been removed for stability.

interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done' | 'backlog';
  phase: 'foundation' | 'launch' | 'expansion' | 'growth';
  assignee?: {
    name: string;
    avatarUrl?: string;
  };
}

// The API object is now a placeholder with a clear error message.
const api = {
  getTasks: async (): Promise<RoadmapTask[]> => {
    throw new Error('Project management integration is not configured.');
  },
  updateTaskStatus: async (taskId: string, newPhase: RoadmapTask['phase']) => {
    console.log(`Simulating update for task ${taskId} to phase ${newPhase}. (No backend)`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

// --- KANBAN BOARD COMPONENTS ---

const TaskCard = ({ task }: { task: RoadmapTask }) => {
  return (
    <Card 
      className="mb-4 bg-background/80"
    >
      <CardHeader className="p-4">
        <CardTitle className="text-base">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: task.description || 'No description.' }}></p>
        <div className="flex items-center justify-between">
            <Badge variant={task.status === 'done' ? 'default' : task.status === 'in-progress' ? 'secondary' : 'outline'}>
                {task.status.replace('-', ' ')}
            </Badge>
             {task.assignee && (
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatarUrl} />
                        <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{task.assignee.name}</span>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
};


const RoadmapColumn = ({ title, icon: Icon, phase, tasks }: { title: string, icon: React.ElementType, phase: RoadmapTask['phase'], tasks: RoadmapTask[] }) => {
    return (
        <div 
            className="flex-1 p-4 bg-muted/50 rounded-lg min-h-[500px] border-2 border-dashed border-transparent transition-colors min-w-[300px]"
            data-phase={phase}
        >
            <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="font-headline text-lg">{title}</h3>
                <Badge variant="outline" className="ml-auto">{tasks.length}</Badge>
            </div>
            <div>
                {tasks.length > 0 ? tasks.map(task => <TaskCard key={task.id} task={task} />) : <p className="text-sm text-muted-foreground text-center p-4">No tasks in this phase.</p>}
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---

export default function RoadmapPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<RoadmapTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedTasks = await api.getTasks();
        setTasks(fetchedTasks);
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Failed to load roadmap', description: error.message || 'Could not connect to the project management API.' });
        setError(error.message || 'Could not connect to the project management API.');
        setTasks([]); // Set tasks to an empty array on failure
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [toast]);

  const columns = [
    { id: 'foundation', title: 'Foundation & Presale', icon: Milestone, tasks: tasks.filter(t => t.phase === 'foundation') },
    { id: 'launch', title: 'Platform Launch', icon: Cpu, tasks: tasks.filter(t => t.phase === 'launch') },
    { id: 'expansion', title: 'Ecosystem Expansion', icon: Users, tasks: tasks.filter(t => t.phase === 'expansion') },
    { id: 'growth', title: 'Decentralization & Growth', icon: Zap, tasks: tasks.filter(t => t.phase === 'growth') },
  ];

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-1/3" />
           <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="flex-1 p-4 bg-muted/50 rounded-lg min-w-[300px]">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-24 w-full" />
             </div>
          ))}
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
            <div>
                 <h1 className="font-headline text-2xl font-semibold">Project Roadmap</h1>
                 <p className="text-muted-foreground">Track progress across the VSD Network development lifecycle. (Backend not connected)</p>
            </div>
            <div className="flex items-center gap-4">
                 <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Task (via PM Tool)
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/admin">Back to Dashboard</Link>
                </Button>
            </div>
        </div>
        
        {error && (
            <Card className="bg-destructive/10 border-destructive">
                <CardHeader className="flex-row items-center gap-3 space-y-0">
                    <AlertTriangle className="h-5 w-5 text-destructive-foreground"/>
                    <CardTitle className="text-destructive-foreground">Integration Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-destructive-foreground">{error}</p>
                    <p className="text-xs text-destructive-foreground/80 mt-2">The backend for the roadmap is not connected. To enable this, an administrator must provide a valid API key for your project management tool (e.g., Agiled) as an environment variable.</p>
                </CardContent>
            </Card>
        )}

        <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map(col => (
                <RoadmapColumn 
                    key={col.id}
                    title={col.title}
                    icon={col.icon}
                    phase={col.id as RoadmapTask['phase']}
                    tasks={col.tasks}
                />
            ))}
        </div>
    </main>
  );
}
