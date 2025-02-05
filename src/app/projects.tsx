import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { projects } from "../data/projects";
import { Navbar } from "@/components/Navbar";

export default function ProjectsPage() {

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6">
            <Navbar/>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">My Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                            <img 
                              src={
                                new URL(project.images[0], window.location.origin).toString()
                              }
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-contain"
                              onError={(e) => {
                                console.error('Gallery image failed to load:', e.currentTarget.src);
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            </div>
                            <CardTitle className="mt-4">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-muted-foreground">
                                {project.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                <a href={`/projects/${project.slug}`}>Learn More</a>
                            </Button>
                            <Button variant="outline" size="sm">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <Github className="h-4 w-4" />
                                    View Code
                                </a>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
