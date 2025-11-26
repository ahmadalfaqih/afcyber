"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Server, Users, Shield, AlertTriangle, Play, Pause, RotateCcw, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AnimationStep {
  id: number
  title: string
  description: string
  duration: number
  animation: string
}

const animationSteps: AnimationStep[] = [
  {
    id: 1,
    title: "الوضع الطبيعي",
    description: "الخادم يعمل بشكل طبيعي مع عدد قليل من المستخدمين الحقيقيين.",
    duration: 3000,
    animation: "normal"
  },
  {
    id: 2,
    title: "بداية الهجوم",
    description: "يبدأ المهاجم في إرسال طلبات وهمية متعددة من أجهزة مختلفة.",
    duration: 3000,
    animation: "attack-start"
  },
  {
    id: 3,
    title: "تصاعد الهجوم",
    description: "يزداد عدد الطلبات بشكل هائل، مما يبدأ في إرهاق موارد الخادم.",
    duration: 4000,
    animation: "attack-escalate"
  },
  {
    id: 4,
    title: "الخادم متعطل",
    description: "الخادم لم يعد قادراً على الاستجابة للطلبات الحقيقية بسبب الإرهاق.",
    duration: 3000,
    animation: "server-overload"
  },
  {
    id: 5,
    title: "تأثير على المستخدمين",
    description: "المستخدمون الحقيقيون لم يتمكنوا من الوصول إلى الخدمة.",
    duration: 3000,
    animation: "users-affected"
  }
]

export default function DDoSSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [serverLoad, setServerLoad] = useState(20)
  const [realUsers, setRealUsers] = useState(5)
  const [fakeUsers, setFakeUsers] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const resetSimulation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setServerLoad(20)
    setRealUsers(5)
    setFakeUsers(0)
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

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep])

  useEffect(() => {
    // Update animation values based on current step
    switch (currentStep) {
      case 0: // Normal
        setServerLoad(20)
        setRealUsers(5)
        setFakeUsers(0)
        break
      case 1: // Attack start
        setServerLoad(40)
        setRealUsers(5)
        setFakeUsers(15)
        break
      case 2: // Attack escalate
        setServerLoad(70)
        setRealUsers(3)
        setFakeUsers(50)
        break
      case 3: // Server overload
        setServerLoad(95)
        setRealUsers(1)
        setFakeUsers(100)
        break
      case 4: // Users affected
        setServerLoad(98)
        setRealUsers(0)
        setFakeUsers(120)
        break
    }
  }, [currentStep])

  const getServerStatus = () => {
    if (serverLoad < 50) return { text: "يعمل بشكل طبيعي", color: "text-green-400" }
    if (serverLoad < 80) return { text: "تحت ضغط", color: "text-yellow-400" }
    if (serverLoad < 95) return { text: "متعثر", color: "text-orange-400" }
    return { text: "متوقف عن العمل", color: "text-red-400" }
  }

  const serverStatus = getServerStatus()

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
            <Zap className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            هجوم حجب الخدمة الموزعة (DDoS)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            شاهد كيف يتم غمر الخوادم بطلبات وهمية مما يؤدي إلى تعطلها عن خدمة المستخدمين الحقيقيين.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" />
                  محاكاة الخادم
                </CardTitle>
                <CardDescription>
                  انقر على "ابدأ المحاكاة" لمشاهدة كيف يعمل هجوم DDoS
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Server Visualization */}
                <div className="relative h-96 cyber-grid rounded-lg p-8 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className={`w-32 h-32 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-500 ${
                        serverLoad < 50 ? 'bg-green-500/20 border-2 border-green-500/50' :
                        serverLoad < 80 ? 'bg-yellow-500/20 border-2 border-yellow-500/50' :
                        serverLoad < 95 ? 'bg-orange-500/20 border-2 border-orange-500/50' :
                        'bg-red-500/20 border-2 border-red-500/50'
                      }`}
                      animate={{
                        scale: serverLoad > 80 ? [1, 1.1, 1] : 1,
                        opacity: serverLoad > 95 ? 0.5 : 1
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: serverLoad > 80 ? Infinity : 0
                      }}
                    >
                      <div className="text-center">
                        <Server className="w-12 h-12 mx-auto mb-2" />
                        <div className={`text-sm ${serverStatus.color}`}>
                          {serverStatus.text}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Real Users */}
                  <AnimatePresence>
                    {Array.from({ length: realUsers }).map((_, i) => (
                      <motion.div
                        key={`real-${i}`}
                        className="absolute w-3 h-3 bg-green-400 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: 1,
                          x: [0, 100, 0],
                          y: [0, -50, 0]
                        }}
                        exit={{ scale: 0 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                        style={{
                          left: `${20 + i * 10}%`,
                          bottom: '20%'
                        }}
                      />
                    ))}
                  </AnimatePresence>

                  {/* Fake Users (Attack) */}
                  <AnimatePresence>
                    {Array.from({ length: Math.min(fakeUsers, 20) }).map((_, i) => (
                      <motion.div
                        key={`fake-${i}`}
                        className="absolute w-3 h-3 bg-red-400 rounded-full"
                        initial={{ scale: 0, x: -200 }}
                        animate={{ 
                          scale: 1,
                          x: 400
                        }}
                        exit={{ scale: 0, x: 600 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                        style={{
                          left: '10%',
                          top: `${30 + (i % 5) * 10}%`
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Server Load Progress */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">حمل الخادم</span>
                      <span className={`text-sm font-bold ${serverStatus.color}`}>
                        {serverLoad}%
                      </span>
                    </div>
                    <Progress 
                      value={serverLoad} 
                      className="h-2"
                      style={{
                        background: serverLoad < 50 ? 'rgb(34 197 94 / 0.2)' :
                                     serverLoad < 80 ? 'rgb(250 204 21 / 0.2)' :
                                     serverLoad < 95 ? 'rgb(251 146 60 / 0.2)' :
                                     'rgb(239 68 68 / 0.2)'
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                      <Users className="w-6 h-6 mx-auto mb-1 text-green-400" />
                      <div className="text-lg font-bold text-green-400">{realUsers}</div>
                      <div className="text-xs text-muted-foreground">مستخدمين حقيقيين</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <AlertTriangle className="w-6 h-6 mx-auto mb-1 text-red-400" />
                      <div className="text-lg font-bold text-red-400">{fakeUsers}</div>
                      <div className="text-xs text-muted-foreground">طلبات وهمية</div>
                    </div>
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
                كيفية الحماية من هجمات DDoS
              </CardTitle>
              <CardDescription>
                استراتيجيات فعالة للحماية من هجمات حجب الخدمة الموزعة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "خدمات الحماية",
                    description: "استخدام خدمات مثل Cloudflare أو AWS Shield لتصفية الحركة الضارة",
                    icon: Shield
                  },
                  {
                    title: "موازنة الحمل",
                    description: "توزيع الحركة على خوادم متعددة لتجنب إرهاق خادم واحد",
                    icon: Server
                  },
                  {
                    title: "حدود الطلبات",
                    description: "تحديد أقصى عدد من الطلبات من عنوان IP واحد خلال فترة زمنية",
                    icon: AlertTriangle
                  },
                  {
                    title: "مراقبة الشبكة",
                    description: "مراقبة مستمرة لحركة المرور للكشف عن الأنماط المشبوهة",
                    icon: Users
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
            <Link href="/simulation-center">
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للمركز
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/phishing">
              المحاكاة التالية: التصيد الاحتيالي
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}