"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Activity, BookOpen, ArrowRight, TrendingUp, Globe, Lock, AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const stats = [
    { label: "هجوم محاكاة هذا الشهر", value: "2,847", icon: Activity, color: "text-cyber-blue" },
    { label: "دولة متأثرة", value: "127", icon: Globe, color: "text-cyber-green" },
    { label: "مستخدم تعلم", value: "15.3K", icon: BookOpen, color: "text-cyber-orange" },
    { label: "هجوم محايد", value: "98.2%", icon: Shield, color: "text-cyber-purple" },
  ]

  const features = [
    {
      title: "محاكاة تفاعلية",
      description: "استكشف الهجمات السيبرانية من خلال رسوم متحركة تفاعلية وواضحة",
      icon: Activity,
      href: "/simulation-center"
    },
    {
      title: "خريطة الهجمات المباشرة",
      description: "شاهد هجمات وهمية في الوقت الفعلي على خريطة العالم",
      icon: Globe,
      href: "/attack-map"
    },
    {
      title: "قاموس سيبراني",
      description: "تعلم المصطلحات التقنية بلغة سهلة ومبسطة",
      icon: BookOpen,
      href: "/glossary"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge className="mb-4 text-sm cyber-border cyber-glow bg-primary/10 text-primary border-primary/20">
              <Shield className="w-4 h-4 ml-2" />
              منصة  تفاعلية
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="cyber-text">AF Cybersecurity </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              اكتشف عالم الأمن السيبراني من خلال محاكاة مرئية تفاعلية. 
              حوّل المفاهيم المعقدة إلى تجارب سهلة الفهم.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button asChild size="lg" className="cyber-glow bg-primary hover:bg-primary/90">
              <Link href="/simulation-center">
                ابدأ المحاكاة
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="cyber-border hover:bg-accent">
              <Link href="/attack-map">
                خريطة الهجمات
                <Activity className="w-4 h-4 mr-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                <Card className="cyber-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold cyber-text mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-text">
              اكتشف عالم الأمن السيبراني
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              تعلم من خلال التجربة العملية والتفاعلية
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="cyber-border bg-card/50 backdrop-blur-sm hover:cyber-glow transition-all duration-300 group cursor-pointer">
                  <Link href={feature.href}>
                    <CardHeader>
                      <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="cyber-border bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
            <CardContent className="p-12">
              <AlertTriangle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 cyber-text">
                هل أنت مستعد للبدء؟
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                انضم إلى آلاف المستخدمين الذين يتعلمون حماية أنفسهم في العالم الرقمي
              </p>
              <Button asChild size="lg" className="cyber-glow bg-primary hover:bg-primary/90">
                <Link href="/simulation-center">
                  ابدأ رحلتك الآن
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}