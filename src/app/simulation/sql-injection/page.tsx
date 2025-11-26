"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Shield, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Lock, Terminal } from "lucide-react"
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
    title: "صفحة تسجيل الدخول",
    description: "المستخدم يرى صفحة تسجيل دخول عادية تبدو آمنة.",
    duration: 3000
  },
  {
    id: 2,
    title: "إدخال الكود الخبيث",
    description: "يدخل المهاجم كود SQL خبيث بدلاً من اسم المستخدم.",
    duration: 4000
  },
  {
    id: 3,
    title: "تنفيذ الاستعلام",
    description: "يقوم الخادم بتنفيذ الكود الخبيث دون التحقق منه.",
    duration: 4000
  },
  {
    id: 4,
    title: "تجاوز المصادقة",
    description: "يتجاوز المهاجم التحقق من كلمة المرور ويحصل على وصول.",
    duration: 3000
  },
  {
    id: 5,
    title: "سرقة البيانات",
    description: "يتمكن المهاجم من الوصول إلى جميع بيانات المستخدمين في قاعدة البيانات.",
    duration: 4000
  }
]

export default function SQLInjectionSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [maliciousInput, setMaliciousInput] = useState("")
  const [queryResult, setQueryResult] = useState("")
  const [dataLeaked, setDataLeaked] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const resetSimulation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setMaliciousInput("")
    setQueryResult("")
    setDataLeaked(false)
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
      case 1:
        setMaliciousInput("admin'--")
        break
      case 2:
        setQueryResult("SELECT * FROM users WHERE username='admin'--' AND password='...'")
        break
      case 3:
        setQueryResult("تم تسجيل الدخول بنجاح!")
        break
      case 4:
        setDataLeaked(true)
        break
    }

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep])

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
            <Database className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            حقن SQL (SQL Injection)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            اكتشف كيف يستغل المهاجمون ثغرات في قواعد البيانات للوصول إلى معلومات حساسة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" />
                  محاكاة ثغرة SQL Injection
                </CardTitle>
                <CardDescription>
                  شاهد كيف يتم استغلال ثغرات قاعدة البيانات لسرقة المعلومات
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Login Form Simulation */}
                <div className="relative h-96 cyber-grid rounded-lg p-8 mb-6">
                  <div className="max-w-md mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded-lg p-6"
                    >
                      <h3 className="text-xl font-bold mb-6 text-center">تسجيل الدخول</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">اسم المستخدم</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={maliciousInput}
                              readOnly
                              className="w-full px-3 py-2 bg-muted border border-border rounded text-sm font-mono"
                              placeholder="أدخل اسم المستخدم"
                            />
                            {currentStep === 1 && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                              >
                                <Badge variant="destructive" className="text-xs">
                                  كود خبيث
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">كلمة المرور</label>
                          <input
                            type="password"
                            value="••••••••"
                            readOnly
                            className="w-full px-3 py-2 bg-muted border border-border rounded text-sm"
                            placeholder="أدخل كلمة المرور"
                          />
                        </div>
                        
                        <motion.button
                          animate={{
                            backgroundColor: currentStep >= 3 ? "rgb(34 197 94)" : "rgb(59 130 246)"
                          }}
                          className="w-full py-2 rounded text-white font-medium"
                        >
                          {currentStep >= 3 ? "تم تسجيل الدخول!" : "تسجيل الدخول"}
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Database Query Visualization */}
                    <AnimatePresence>
                      {queryResult && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 bg-black/50 border border-green-500/30 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Terminal className="w-4 h-4 text-green-400" />
                            <span className="text-sm font-medium text-green-400">SQL Query:</span>
                          </div>
                          <code className="text-xs text-green-300 font-mono block">
                            {queryResult}
                          </code>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Data Leak Visualization */}
                    <AnimatePresence>
                      {dataLeaked && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Lock className="w-4 h-4 text-red-400" />
                            <span className="text-sm font-medium text-red-400">تم تسريب البيانات!</span>
                          </div>
                          <div className="space-y-2">
                            {[
                              "admin: admin@example.com",
                              "user1: user1@example.com", 
                              "user2: user2@example.com",
                              "user3: user3@example.com"
                            ].map((data, index) => (
                              <motion.div
                                key={data}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-xs text-red-300 font-mono bg-black/30 rounded px-2 py-1"
                              >
                                {data}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    currentStep >= 1 ? 'border-red-500/50 bg-red-500/10' : 'border-border/50'
                  }`}>
                    <Terminal className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">كود خبيث</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    queryResult ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-border/50'
                  }`}>
                    <Database className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">استعلام منفذ</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    dataLeaked ? 'border-red-500/50 bg-red-500/10' : 'border-border/50'
                  }`}>
                    <Lock className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">بيانات مسربة</div>
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
                كيفية الحماية من هجمات حقن SQL
              </CardTitle>
              <CardDescription>
                استراتيجيات مهمة لتأمين قواعد البيانات ضد الهجمات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "التحقق من المدخلات",
                    description: "تحقق جميع مدخلات المستخدمين وتطهيرها من الأكواد الخبيثة",
                    icon: Shield
                  },
                  {
                    title: "استخدام Prepared Statements",
                    description: "استخدم عبارات محضرة لفصل الأكواد عن البيانات",
                    icon: Database
                  },
                  {
                    title: "أقل الصلاحيات",
                    description: "استخدم حسابات قاعدة بيانات بأقل صلاحيات ممكنة",
                    icon: Lock
                  },
                  {
                    title: "تحديث البرامج",
                    description: "حافظ على تحديث أنظمة إدارة قواعد البيانات بشكل مستمر",
                    icon: Terminal
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
            <Link href="/simulation/man-in-the-middle">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: الرجل في المنتصف
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/spear-phishing">
              المحاكاة التالية: التصيد المستهدف
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}