import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Github, Instagram, Linkedin } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState, useCallback } from "react"
import { Particles } from "@tsparticles/react"
import { type Container, type Engine } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const particlesInit = useCallback(async (engine: Engine): Promise<void> => {
    try {
      await loadSlim(engine);
      console.log('Particles initialized');
    } catch (error) {
      console.error('Failed to initialize particles:', error);
    }
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined): Promise<void> => {
    if (container) {
      console.log('Particles container loaded');
    }
  }, []);

  return (
    <motion.main 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Navbar />
        <motion.div 
          className="flex flex-col items-center space-y-4 sm:space-y-8"
          style={{ y, opacity }}
        >
          <Card className="w-full max-w-3xl p-4 sm:p-6 backdrop-blur-sm bg-background/80">
            <CardHeader className="flex flex-col items-center space-y-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32 ring-2 ring-primary ring-offset-2 ring-offset-background">
                  <AvatarImage src="/your-photo.jpg" alt="Karan Gandhi" />
                  <AvatarFallback className="text-lg sm:text-xl">KG</AvatarFallback>
                </Avatar>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-2xl sm:text-3xl text-center">
                  Karan Gandhi
                </CardTitle>
              </motion.div>

              <motion.p 
                className="text-base sm:text-lg text-muted-foreground text-center px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Software Developer & Technology Enthusiast
              </motion.p>

              <motion.div 
                className="flex flex-wrap justify-center gap-2 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: <Github className="h-5 w-5" />, href: "https://github.com/yourusername" },
                  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/yourusername" },
                  { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/yourusername" }
                ].map((social, index) => (
                  <motion.div
                    key={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        {social.icon}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </CardHeader>

            <CardContent className="prose prose-sm sm:prose-base lg:prose-lg mx-auto mt-4">
              <motion.p 
                className="text-center px-2 sm:px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                I'm a passionate developer focused on creating elegant solutions 
                using modern web technologies. I specialize in React, TypeScript, 
                and building responsive user interfaces.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.main>
  );
}
