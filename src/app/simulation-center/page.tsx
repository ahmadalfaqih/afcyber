"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Lock, AlertTriangle, Eye, ArrowRight, ArrowLeft, Activity, Wifi, HardDrive,Key, Phone,MessageSquare, Mail } from "lucide-react"
import Link from "next/link"

interface SimulationCard {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  duration: string
  icon: React.ElementType
  href: string
  color: string
  tags: string[]
}

const simulations: SimulationCard[] = [
  {
    id: "ddos",
    title: "هجوم حجب الخدمة الموزعة (DDoS)",
    description: "شاهد كيف يتم غمر الخوادم بطلبات وهمية مما يؤدي إلى تعطلها عن خدمة المستخدمين الحقيقيين.",
    difficulty: "easy",
    duration: "5 دقائق",
    icon: Zap,
    href: "/simulation/ddos",
    color: "text-cyber-blue",
    tags: ["شبكة", "خوادم", "حجب خدمة"]
  },
  {
    id: "phishing",
    title: "التصيد الاحتيالي (Phishing)",
    description: "اكتشف كيف يخدع المهاجمون المستخدمين للحصول على معلومات حساسة من خلال رسائل بريد إلكتروني مزيفة.",
    difficulty: "easy",
    duration: "7 دقائق",
    icon: Lock,
    href: "/simulation/phishing",
    color: "text-cyber-green",
    tags: ["بريد إلكتروني", "خداع", "سرقة هوية"]
  },
  {
    id: "ransomware",
    title: "برامج الفدية (Ransomware)",
    description: "شاهد كيف تقوم برامج الفدية بتشفير الملفات ومطالبة الضحايا بفدية لاستعادتها.",
    difficulty: "medium",
    duration: "8 دقائق",
    icon: AlertTriangle,
    href: "/simulation/ransomware",
    color: "text-cyber-red",
    tags: ["تشفير", "فدية", "برامج ضارة"]
  },
  {
    id: "man-in-the-middle",
    title: "هجوم الرجل في المنتصف",
    description: "تعلم كيف يعترض المهاجمون الاتصالات بين طرفين ويسرقون أو يعدلون المعلومات المنقولة.",
    difficulty: "medium",
    duration: "10 دقائق",
    icon: Eye,
    href: "/simulation/man-in-the-middle",
    color: "text-cyber-orange",
    tags: ["اعتراض", "تواصل", "تجسس"]
  },
  {
    id: "sql-injection",
    title: "حقن SQL (SQL Injection)",
    description: "اكتشف كيف يستغل المهاجمون ثغرات في قواعد البيانات للوصول إلى معلومات حساسة.",
    difficulty: "hard",
    duration: "12 دقيقة",
    icon: Shield,
    href: "/simulation/sql-injection",
    color: "text-cyber-purple",
    tags: ["قاعدة بيانات", "حقن", "ثغرات"]
  },
   {
    id: "wifi-hacking",
    title: "الاختراق عبر الشبكات اللاسلكية",
    description: "تعلم كيف يتم اختراق الشبكات اللاسلكية غير الآمنة لاعتراض البيانات وسرقة المعلومات.",
    difficulty: "medium",
    duration: "9 دقائق",
    icon: Wifi,
    href: "/simulation/wifi-hacking",
    color: "text-cyber-orange",
    tags: ["Wi-Fi", "شبكة لاسلكية", "اعتراض بيانات"]
  },
  {
  id: "xss-attack",
  title: "استغلال ثغرة في موقع ويب (XSS)",
  description: "شاهد كيف يمكن تنفيذ كود خبيث عبر تعليق أو نموذج على موقع ويب غير آمن.",
  difficulty: "medium",
  duration: "8 دقائق",
  icon: MessageSquare,
  href: "/simulation/xss-attack",
  color: "text-cyber-red",
  tags: ["ويب", "ثغرات", "XSS"]
},
{
  id: "vishing",
  title: "هندسة اجتماعية عبر الهاتف (Vishing)",
  description: "تعلم كيف يتم الاحتيال عبر مكالمات هاتفية لسرقة المعلومات البنكية.",
  difficulty: "easy",
  duration: "6 دقائق",
  icon: Phone,
  href: "/simulation/vishing",
  color: "text-cyber-yellow",
  tags: ["هاتف", "احتيال", "بنك"]
},
{
  id: "brute-force",
  title: "هجوم القوة الغاشمة",
  description: "شاهد كيف يتم اختراق كلمات المرور الضعيفة عبر محاولة جميع الاحتمالات.",
  difficulty: "medium",
  duration: "7 دقائق",
  icon: Key,
  href: "/simulation/brute-force",
  color: "text-cyber-purple",
  tags: ["كلمة مرور", "اختراق", "قوة غاشمة"]
},
{
  id: "usb-attack",
  title: "اختراق عبر USB (USB Drop)",
  description: "تعلم خطر توصيل أجهزة USB مجهولة المصدر في جهازك.",
  difficulty: "easy",
  duration: "5 دقائق",
  icon: HardDrive,
  href: "/simulation/usb-attack",
  color: "text-cyber-orange",
  tags: ["USB", "فيروس", "هندسة اجتماعية"]
},
  {
    id: "spear-phishing",
    title: "التصيد المستهدف (Spear Phishing)",
    description: "شاهد الهجمات المتقدمة التي تستهدف أفراداً أو مؤسسات محددة باستخدام معلومات شخصية مخصصة.",
    difficulty: "hard",
    duration: "15 دقيقة",
    icon: Activity,
    href: "/simulation/spear-phishing",
    color: "text-cyber-blue",
    tags: ["استهداف", "هندسة اجتماعية", "معلومات شخصية"]
  },
  {
  id: "email-spoofing",
  title: "انتحال هوية عبر البريد (Email Spoofing)",
  description: "تعلم كيف تميّز بين البريد الرسمي والبريد الاحتيالي الذي ينتحل هوية المديرين.",
  difficulty: "medium",
  duration: "7 دقائق",
  icon: Mail,
  href: "/simulation/email-spoofing",
  color: "text-cyber-blue",
  tags: ["بريد إلكتروني", "اختراق مالي", "انتحال هوية"]
}

]

const difficultyColors = {
  easy: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  hard: "bg-red-500/20 text-red-400 border-red-500/30"
}

const difficultyLabels = {
  easy: "سهل",
  medium: "متوسط",
  hard: "صعب"
}

export default function SimulationCenter() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-primary/10 text-primary border-primary/20">
            <Shield className="w-4 h-4 ml-2" />
            مركز المحاكاة التفاعلي
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            استكشف سيناريوهات الهجمات السيبرانية
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            انغمس في عالم الأمن السيبراني من خلال محاكاة تفاعلية للهجمات الشائعة. 
            كل سيناريو مصمم لتعليمك كيف تعمل الهجمات وكيفية الحماية منها.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: "محاكاة متاحة", value: "6", icon: Shield },
            { label: "مستخدم تعلم", value: "15.3K", icon: Activity },
            { label: "معدل إكمال", value: "89%", icon: Zap },
            { label: "تقييم إيجابي", value: "4.8/5", icon: Eye }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="cyber-border bg-card/50 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold cyber-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Simulations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {simulations.map((simulation, index) => (
            <motion.div
              key={simulation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="cyber-border bg-card/50 backdrop-blur-sm hover:cyber-glow transition-all duration-300 group cursor-pointer h-full">
                <Link href={simulation.href}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <simulation.icon className={`w-12 h-12 ${simulation.color} group-hover:scale-110 transition-transform`} />
                      <Badge className={difficultyColors[simulation.difficulty]}>
                        {difficultyLabels[simulation.difficulty]}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight mb-2">
                      {simulation.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {simulation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {simulation.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-sm text-muted-foreground">
                        {simulation.duration}
                      </span>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary/20">
                        ابدأ المحاكاة
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="cyber-border bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4 cyber-text">مسار التعلم المقترح</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  ابدأ بالهجمات الأساسية ثم تدرج إلى السيناريوهات المتقدمة لاكتساب فهم شامل للأمن السيبراني
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-400">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">المستوى المبتدئ</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    DDoS و Phishing
                  </p>
                  <p className="text-xs text-muted-foreground">
                    تعلم أساسيات الهجمات الشائعة
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-yellow-400">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">المستوى المتوسط</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ransomware و Man-in-the-Middle
                  </p>
                  <p className="text-xs text-muted-foreground">
                    اكتشف الهجمات المتوسطة التعقيد
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-400">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">المستوى المتقدم</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    SQL Injection و Spear Phishing
                  </p>
                  <p className="text-xs text-muted-foreground">
                    تعامل مع السيناريوهات المعقدة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}