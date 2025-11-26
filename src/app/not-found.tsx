"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Home, Search, ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <Card className="cyber-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-24 h-24 bg-primary/10 border-2 border-primary/50 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="w-12 h-12 text-primary" />
            </motion.div>
            
            <CardTitle className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
              404
            </CardTitle>
            <CardDescription className="text-xl">
              الصفحة التي تبحث عنها غير موجودة
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground"
            >
              يبدو أنك ضللت الطريق في عالمنا السيبراني. لا تقلق، حتى الخبراء يضلون أحياناً!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid md:grid-cols-2 gap-4"
            >
              <Button asChild className="cyber-glow bg-primary hover:bg-primary/90">
                <Link href="/">
                  <Home className="w-4 h-4 ml-2" />
                  الصفحة الرئيسية
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link href="/simulation-center">
                  <Search className="w-4 h-4 ml-2" />
                  استكشف المحاكاة
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="pt-6 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground mb-4">
                هل تبحث عن شيء محدد؟ جرب هذه الصفحات الشائعة:
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { href: "/simulation-center", label: "مركز المحاكاة" },
                  { href: "/attack-map", label: "خريطة الهجمات" },
                  { href: "/glossary", label: "القاموس السيبراني" },
                  { href: "/about", label: "من نحن" }
                ].map((link) => (
                  <Button key={link.href} variant="ghost" size="sm" asChild>
                    <Link href={link.href}>
                      {link.label}
                      <ArrowLeft className="w-3 h-3 mr-1" />
                    </Link>
                  </Button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-xs text-muted-foreground pt-4"
            >
              <p>إذا كنت تعتقد أن هذه مشكلة تقنية، يرجى إبلاغنا.</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}