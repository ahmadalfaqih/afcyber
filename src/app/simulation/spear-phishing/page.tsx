"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Target, Shield, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Mail, Search, Eye } from "lucide-react"
import Link from "next/link"

interface AnimationStep {
  id: number
  title: string
  description: string
  duration: number
}

const animationSteps: AnimationStep[] = [
  {
    id: 1,
    title: "جمع المعلومات",
    description: "يبحث المهاجم عن معلومات شخصية عن الضحية من وسائل التواصل الاجتماعي.",
    duration: 4000
  },
  {
    id: 2,
    title: "تحليل الأهداف",
    description: "يحلل المهاجم اهتمامات الضحية وعلاقاتها المهنية.",
    duration: 3000
  },
  {
    id: 3,
    title: "تصميم الرسالة",
    description: "يصمم المهاجم رسالة بريد إلكتروني شخصية ومقنعة جداً.",
    duration: 4000
  },
  {
    id: 4,
    title: "إرسال الهجوم",
    description: "يرسل المهاجم الرسالة المستهدفة للضحية.",
    duration: 3000
  },
  {
    id: 5,
    title: "نجاح الهجوم",
    description: "تنخفض الضحية في الهجوم وتقدم معلومات حساسة للمهاجم.",
    duration: 4000
  }
]

export default function SpearPhishingSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [targetInfo, setTargetInfo] = useState({
    name: "أحمد الفقيه",
    position: "مدير تقنية المعلومات",
    company: "شركة التقنية المتقدمة",
    interests: ["الأمن السيبراني", "الذكاء الاصطناعي", "التكنولوجيا"],
    contacts: ["خالد الرشيد", "سارة أحمد"]
  })
  const [customEmail, setCustomEmail] = useState("")
  const [attackSuccessful, setAttackSuccessful] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const resetSimulation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setCustomEmail("")
    setAttackSuccessful(false)
    setIsCompleted(false)
  }

  const startSimulation = () => {
    setIsPlaying(true)
    setIsCompleted(false)
  }

  const pauseSimulation = () => {
    setIsPlaying(false)
  }

  useEffect(() => {
    if (!isPlaying || currentStep >= animationSteps.length) return

    const step = animationSteps[currentStep]
    const timer = setTimeout(() => {
      if (currentStep < animationSteps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsPlaying(false)
        setIsCompleted(true)
      }
    }, step.duration)

    // Update animation states based on current step
    switch (currentStep) {
      case 2:
        setCustomEmail(`مرحباً ${targetInfo.name}،

بصفتك مدير تقنية المعلومات في ${targetInfo.company}، أود دعوتك لحضور مؤتمر الأمن السيبراني القادم الذي يتناول أحدث تقنيات ${targetInfo.interests[0]}.

لقد تم اختيارك خصيصاً بناءً على خبرتك المتميزة في هذا المجال. يرجى تأكيد حضورك من خلال الرابط أدناه:

[رابط التسجيل - يحتوي على برمجية خبيثة]

مع أطيب التحيات،
خالد الرشيد
منظم المؤتمر`)
        break
      case 4:
        setAttackSuccessful(true)
        break
    }

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, targetInfo])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-primary/10 text-primary border-primary/20">
            <Target className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            التصيد المستهدف (Spear Phishing)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            شاهد الهجمات المتقدمة التي تستهدف أفراداً أو مؤسسات محددة باستخدام معلومات شخصية مخصصة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  محاكاة هجوم التصيد المستهدف
                </CardTitle>
                <CardDescription>
                  شاهد كيف يتم تصميم هجوم مخصص لهدف معين
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Attack Visualization */}
                <div className="relative h-96 cyber-grid rounded-lg p-8 mb-6">
                  <div className="h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {currentStep === 0 && (
                        <motion.div
                          key="reconnaissance"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="w-full max-w-md"
                        >
                          <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Search className="w-6 h-6 text-primary" />
                              <h3 className="font-semibold">جمع المعلومات</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                                <div className="text-sm font-medium text-blue-400">LinkedIn</div>
                                <div className="text-xs text-muted-foreground">
                  {targetInfo.name} - {targetInfo.position}
                </div>
                              </div>
                              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                                <div className="text-sm font-medium text-green-400">Twitter</div>
                                <div className="text-xs text-muted-foreground">
                  مهتم بـ {targetInfo.interests.join(", ")}
                </div>
                              </div>
                              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                                <div className="text-sm font-medium text-purple-400">Company Website</div>
                                <div className="text-xs text-muted-foreground">
                  يعمل في {targetInfo.company}
                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 1 && (
                        <motion.div
                          key="analysis"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="w-full max-w-md"
                        >
                          <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Eye className="w-6 h-6 text-primary" />
                              <h3 className="font-semibold">تحليل الهدف</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="text-center p-4 bg-primary/10 border border-primary/30 rounded">
                                <User className="w-12 h-12 mx-auto mb-2 text-primary" />
                                <div className="font-medium">{targetInfo.name}</div>
                                <div className="text-sm text-muted-foreground">{targetInfo.position}</div>
                                <div className="text-xs text-muted-foreground mt-1">{targetInfo.company}</div>
                              </div>
                              <div className="text-sm">
                                <div className="font-medium mb-1">نقاط الضعف:</div>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  <li>• مهني ومستجيب للرسائل العملية</li>
                                  <li>• مهتم بالتكنولوجيا والأمن</li>
                                  <li>• له علاقات مهنية مع {targetInfo.contacts.join(" و ")}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {currentStep >= 2 && currentStep <= 4 && (
                        <motion.div
                          key="email"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="w-full max-w-lg"
                        >
                          <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Mail className="w-6 h-6 text-primary" />
                              <h3 className="font-semibold">الرسالة المستهدفة</h3>
                            </div>
                            <div className="bg-black/50 border border-border rounded p-4">
                              <div className="text-xs text-green-400 mb-2">From: khalid@conference-tech.com</div>
                              <div className="text-xs text-green-400 mb-4">To: {targetInfo.name.toLowerCase().replace(" ", ".")}@company.com</div>
                              <div className="text-sm text-white whitespace-pre-line">{customEmail}</div>
                            </div>
                            {currentStep === 4 && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded"
                              >
                                <div className="flex items-center gap-2 text-red-400">
                                  <Target className="w-4 h-4" />
                                  <span className="text-sm">الضحية نقرت على الرابط!</span>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    currentStep >= 0 ? 'border-blue-500/50 bg-blue-500/10' : 'border-border/50'
                  }`}>
                    <Search className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">جمع معلومات</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    currentStep >= 2 ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-border/50'
                  }`}>
                    <Mail className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">رسالة مخصصة</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    attackSuccessful ? 'border-red-500/50 bg-red-500/10' : 'border-border/50'
                  }`}>
                    <Target className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">نجح الهجوم</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Controls */}
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">التحكم بالمحاكاة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  {!isPlaying ? (
                    <Button 
                      onClick={startSimulation} 
                      className="flex-1 cyber-glow"
                      disabled={isCompleted}
                    >
                      <Play className="w-4 h-4 ml-2" />
                      {isCompleted ? "تمت المحاكاة" : "ابدأ المحاكاة"}
                    </Button>
                  ) : (
                    <Button 
                      onClick={pauseSimulation} 
                      variant="outline"
                      className="flex-1"
                    >
                      <Pause className="w-4 h-4 ml-2" />
                      إيقاف مؤقت
                    </Button>
                  )}
                  <Button 
                    onClick={resetSimulation} 
                    variant="outline"
                    size="icon"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    الخطوة الحالية
                  </div>
                  <div className="text-lg font-bold cyber-text">
                    {currentStep + 1} / {animationSteps.length}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Target Profile */}
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">ملف الهدف</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-3 bg-primary/10 border border-primary/30 rounded">
                    <User className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="font-medium">{targetInfo.name}</div>
                    <div className="text-xs text-muted-foreground">{targetInfo.position}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="font-medium mb-1">الشركة:</div>
                      <div className="text-xs text-muted-foreground">{targetInfo.company}</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium mb-1">الاهتمامات:</div>
                      <div className="flex flex-wrap gap-1">
                        {targetInfo.interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Animation Steps */}
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">مراحل الهجوم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {animationSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        index === currentStep 
                          ? 'border-primary bg-primary/10' 
                          : index < currentStep 
                            ? 'border-green-500/50 bg-green-500/5'
                            : 'border-border/50 hover:bg-accent/50'
                      }`}
                      onClick={() => !isPlaying && setCurrentStep(index)}
                      whileHover={{ scale: isPlaying ? 1 : 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === currentStep 
                            ? 'bg-primary text-primary-foreground'
                            : index < currentStep 
                              ? 'bg-green-500 text-white'
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {index < currentStep ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{step.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Protection Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card className="cyber-border bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                كيفية الحماية من هجمات التصيد المستهدف
              </CardTitle>
              <CardDescription>
                استراتيجيات متقدمة للتصدي للهجمات المستهدفة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "التحقق من الهوية",
                    description: "تحقق دائماً من هوية المرسل عبر قنوات اتصال أخرى",
                    icon: User
                  },
                  {
                    title: "الحذر من العجلة",
                    description: "لا تستجيب للرسائل التي تخلق شعوراً بالإلحاح أو الخوف",
                    icon: Target
                  },
                  {
                    title: "تدريب الموظفين",
                    description: "قدم تدريباً منتظماً للموظفين على التعرف على الهجمات",
                    icon: Shield
                  },
                  {
                    title: "حماية المعلومات",
                    description: "قلل من المعلومات الشخصية المتاحة للعامة على الإنترنت",
                    icon: Eye
                  }
                ].map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-center p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                      <method.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                      <h3 className="font-semibold mb-2">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <Button variant="outline" asChild>
            <Link href="/simulation/sql-injection">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: حقن SQL
            </Link>
          </Button>
          <Button asChild>
            <Link href="/glossary">
              القاموس السيبراني
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}