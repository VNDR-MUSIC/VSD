'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Cpu, Zap, Milestone, Users, GripVertical, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';


// --- DATA INTERFACES & API ---
// These interfaces now match what we expect from our new backend route.

interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done' | 'backlog'; // Mapped from Agiled status
  phase: 'foundation' | 'launch' | 'expansion' | 'growth'; // Mapped from Agiled project name
  assignee?: {
    name: string;
    avatarUrl?: string;
  };
}

// The API object now points to our internal Next.js route
const api = {
  getTasks: async (): Promise<RoadmapTask[]> => {
    const response = await fetch('/api/agiled/tasks');
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch roadmap tasks.');
    }
    const data = await response.json();
    return data.tasks;
  },
  // Update function is now a placeholder as we don't have write access logic yet.
  updateTaskStatus: async (taskId: string, newPhase: RoadmapTask['phase']) => {
    console.log(`Updating task ${taskId} to phase ${newPhase}. (This is a simulation)`);
    // In a real app, you would have a corresponding backend route to update Agiled
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

// --- KANBAN BOARD COMPONENTS ---

const TaskCard = ({ task }: { task: RoadmapTask }) => {
  return (
    <Card 
      draggable
      onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
      className="mb-4 bg-background/80 cursor-grab active:cursor-grabbing"
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


const RoadmapColumn = ({ title, icon: Icon, phase, tasks, onDrop, onDragOver }: { title: string, icon: React.ElementType, phase: RoadmapTask['phase'], tasks: RoadmapTask[], onDrop: (e: React.DragEvent<HTMLDivElement>, phase: RoadmapTask['phase']) => void, onDragOver: (e: React.DragEvent<HTMLDivElement>) => void }) => {
    return (
        <div 
            className="flex-1 p-4 bg-muted/50 rounded-lg min-h-[500px] border-2 border-dashed border-transparent transition-colors min-w-[300px]"
            onDrop={(e) => onDrop(e, phase)}
            onDragOver={onDragOver}
            onDragLeave={(e) => (e.currentTarget as HTMLDivElement).classList.remove('border-primary', 'bg-primary/10')}
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

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const fetchedTasks = await api.getTasks();
        setTasks(fetchedTasks);
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Failed to load roadmap', description: error.message || 'Could not connect to the project management API.' });
        setTasks([]); // Set tasks to an empty array on failure
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [toast]);
  
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>, targetPhase: RoadmapTask['phase']) => {
    e.preventDefault();
    (e.currentTarget as HTMLDivElement).classList.remove('border-primary', 'bg-primary/10');
    const taskId = e.dataTransfer.getData("taskId");
    const draggedTask = tasks.find(t => t.id === taskId);
    
    if (draggedTask && draggedTask.phase !== targetPhase) {
      // Optimistic UI update
      setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? { ...t, phase: targetPhase } : t));

      try {
        await api.updateTaskStatus(taskId, targetPhase);
        toast({ title: 'Task Phase Moved', description: `"${draggedTask.title}" moved to ${targetPhase}.` });
      } catch {
        toast({ variant: 'destructive', title: 'Update Failed', description: 'Could not save changes to the roadmap.' });
        // Revert UI on failure
        setTasks(prevTasks => prevTasks.map(t => t.id === taskId ? { ...t, phase: draggedTask.phase } : t));
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
     e.preventDefault(); // Necessary to allow drop
     (e.currentTarget as HTMLDivElement).classList.add('border-primary', 'bg-primary/10');
  };

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
                 <p className="text-muted-foreground">Syncs with Agiled.app to track progress across the VSD Network development lifecycle.</p>
            </div>
            <div className="flex items-center gap-4">
                 <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Task (via Agiled)
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/admin">Back to Dashboard</Link>
                </Button>
            </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4" onDragLeave={(e) => (e.currentTarget as HTMLDivElement).classList.remove('border-primary', 'bg-primary/10')}>
            {columns.map(col => (
                <RoadmapColumn 
                    key={col.id}
                    title={col.title}
                    icon={col.icon}
                    phase={col.id as RoadmapTask['phase']}
                    tasks={col.tasks}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                />
            ))}
        </div>
    </main>
  );
}
