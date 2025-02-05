import { useParams, useNavigate } from 'react-router-dom'
import { projects } from '@/data/projects'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowUp } from "lucide-react"
import { Navbar } from '@/components/Navbar'
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const project = projects.find(p => p.slug === slug)
  
  if (!project) {
    navigate('/projects')
    return null
  }

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-none shadow-none">
            <CardHeader className="space-y-4 px-2 sm:px-6">
              <div className="flex flex-col items-center gap-4">
                <CardTitle className="text-2xl sm:text-4xl font-bold text-center">{project.title}</CardTitle>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github size={20} />
                    View Source
                  </a>
                </Button>
              </div>
              <CardDescription className="text-base sm:text-lg text-center">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 sm:space-y-8 px-2 sm:px-6">
              {/* Main Project Media */}
              <motion.div
                className="relative h-[200px] sm:h-[400px] overflow-hidden rounded-xl bg-muted z-0"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {project.video ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${project.video.split('v=')[1]}`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full z-0"
                  />
                ) : project.images && project.images[0] ? (
                  <img 
                    src={import.meta.env.BASE_URL + project.images[0].replace('/public', '')} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-contain"
                    onError={(e) => {
                      console.error('Image failed to load:', e.currentTarget.src);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </motion.div>

              {/* Project Details */}
              <ScrollArea className="prose prose-lg max-w-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                  <ReactMarkdown 
                    className="text-muted-foreground"
                    components={{
                      code: ({ node, ...props }) => (
                        <code className="bg-muted px-1.5 py-0.5 rounded-md" {...props} />
                      ),
                    }}
                  >
                    {project.longDescription}
                  </ReactMarkdown>
                </motion.div>
              </ScrollArea>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4 mt-8 z-0">
                {project.images && project.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative h-[200px] rounded-lg overflow-hidden bg-muted"
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <img 
                      src={ new URL(image, window.location.origin).toString() }
                      alt={`${project.title} screenshot ${index + 2}`}
                      className="absolute inset-0 w-full h-full object-contain"
                      onError={(e) => {
                        console.error('Gallery image failed to load:', e.currentTarget.src);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scroll to top button */}
        <motion.button
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg ${
            showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp size={24} />
        </motion.button>
      </div>
    </>
  )
}