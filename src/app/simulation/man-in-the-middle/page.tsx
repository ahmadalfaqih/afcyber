"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, User, Shield, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Lock, MessageSquare } from "lucide-react"
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
    title: "الاتصال الآمن",
    description: "المستخدم والبنك يتواصلان بشكل مباشر وآمن.",
    duration: 3000
  },
  {
    id: 2,
    title: "المهاجم يتدخل",
    description: "يظهر المهاجم بين المستخدم والبنك ويعترض الاتصال.",
    duration: 3000
  },
  {
    id: 3,
    title: "اعتراض الرسائل",
    description: "يقرأ المهاجم جميع الرسائل المتبادلة بين الطرفين.",
    duration: 4000
  },
  {
    id: 4,
    title: "تعديل البيانات",
    description: "يقوم المهاجم بتعديل المعلومات قبل إرسالها إلى الطرف الآخر.",
    duration: 4000
  },
  {
    id: 5,
    title: "سرقة المعلومات",
    description: "تمكن المهاجم من سرقة معلومات حساسة مثل بيانات الحساب.",
    duration: 3000
  }
]

export default function ManInTheMiddleSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [messages, setMessages] = useState<Array<{from: string, to: string, content: string, intercepted?: boolean}>>([])
  const [attackerPresent, setAttackerPresent] = useState(false)
  const [dataStolen, setDataStolen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const resetSimulation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setMessages([])
    setAttackerPresent(false)
    setDataStolen(false)
    setIsCompleted(false)
  }

  const startSimulation = () => {
    setIsPlaying(true)
    setIsCompleted(false)
    // Start with initial messages
    setMessages([
      { from: "user", to: "bank", content: "أريد التحقق من رصيدي" }
    ])
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
      case 0:
        // Normal communication
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            from: "bank", 
            to: "user", 
            content: "رصيدك الحالي: 5,000 ريال" 
          }])
        }, 1500)
        break
      case 1:
        setAttackerPresent(true)
        break
      case 2:
        // Intercept messages
        setMessages(prev => prev.map(msg => ({ ...msg, intercepted: true })))
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            from: "user", 
            to: "bank", 
            content: "أريد تحويل 1,000 ريال",
            intercepted: true
          }])
        }, 1000)
        break
      case 3:
        // Modify data
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            from: "attacker", 
            to: "bank", 
            content: "أريد تحويل 10,000 ريال",
            intercepted: true
          }])
        }, 1000)
        break
      case 4:
        setDataStolen(true)
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
            <Eye className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            هجوم الرجل في المنتصف (Man-in-the-Middle)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعلم كيف يعترض المهاجمون الاتصالات بين طرفين ويسرقون أو يعدلون المعلومات المنقولة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  محاكاة اعتراض الاتصال
                </CardTitle>
                <CardDescription>
                  شاهد كيف يعترض المهاجم الاتصال بين المستخدم والبنك
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Communication Visualization */}
                <div className="relative h-96 cyber-grid rounded-lg p-8 mb-6">
                  <div className="absolute inset-0 flex items-center justify-between px-8">
                    {/* User */}
                    <motion.div
                      animate={{ x: attackerPresent ? -20 : 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-blue-500/20 border-2 border-blue-500/50 rounded-full flex items-center justify-center mb-2">
                        <User className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="text-sm font-medium">المستخدم</div>
                    </motion.div>

                    {/* Attacker */}
                    <AnimatePresence>
                      {attackerPresent && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="text-center"
                        >
                          <div className="w-16 h-16 bg-red-500/20 border-2 border-red-500/50 rounded-full flex items-center justify-center mb-2">
                            <Eye className="w-8 h-8 text-red-400" />
                          </div>
                          <div className="text-sm font-medium text-red-400">المهاجم</div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bank */}
                    <motion.div
                      animate={{ x: attackerPresent ? 20 : 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500/50 rounded-full flex items-center justify-center mb-2">
                        <Shield className="w-8 h-8 text-green-400" />
                      </div>
                      <div className="text-sm font-medium">البنك</div>
                    </motion.div>
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill={attackerPresent ? "rgb(239 68 68)" : "rgb(59 130 246)"}
                        />
                      </marker>
                    </defs>
                    
                    {/* User to Bank Line */}
                    <motion.line
                      x1="25%"
                      y1="50%"
                      x2={attackerPresent ? "50%" : "75%"}
                      y2="50%"
                      stroke={attackerPresent ? "rgb(239 68 68)" : "rgb(59 130 246)"}
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                    />
                    
                    {/* Attacker to Bank Line */}
                    {attackerPresent && (
                      <motion.line
                        x1="50%"
                        y1="50%"
                        x2="75%"
                        y2="50%"
                        stroke="rgb(239 68 68)"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    )}
                  </svg>

                  {/* Data Stolen Alert */}
                  {dataStolen && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2 text-red-400">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">تم سرقة البيانات!</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Messages Log */}
                <div className="space-y-4">
                  <h3 className="font-semibold">سجل الرسائل:</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 rounded-lg border ${
                          message.intercepted 
                            ? 'border-red-500/50 bg-red-500/10' 
                            : 'border-border/50 bg-muted/20'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-sm font-medium">
                            {message.from === "user" ? "المستخدم" : 
                             message.from === "bank" ? "البنك" : "المهاجم"} 
                            {" → "}
                            {message.to === "user" ? "المستخدم" : 
                             message.to === "bank" ? "البنك" : "المهاجم"}
                          </span>
                          {message.intercepted && (
                            <Badge variant="destructive" className="text-xs">
                              <Eye className="w-3 h-3 ml-1" />
                              تم اعتراضها
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm">{message.content}</div>
                      </motion.div>
                    ))}
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
                كيفية الحماية من هجمات الرجل في المنتصف
              </CardTitle>
              <CardDescription>
                طرق فعالة لحماية اتصالاتك من الاعتراض
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "استخدام HTTPS",
                    description: "تأكد من استخدام المواقع الآمنة التي تستخدم بروتوكول HTTPS",
                    icon: Lock
                  },
                  {
                    title: "شبكات VPN",
                    description: "استخدم شبكات VPN الموثوقة عند الاتصال من شبكات عامة",
                    icon: Shield
                  },
                  {
                    title: "تجنب الشبكات العامة",
                    description: "تجنب إجراء معاملات حساسة عبر شبكات Wi-Fi العامة",
                    icon: Eye
                  },
                  {
                    title: "التشفير من طرف إلى طرف",
                    description: "استخدم تطبيقات تواصل توفر تشفيراً من طرف إلى طرف",
                    icon: MessageSquare
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
            <Link href="/simulation/ransomware">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: برامج الفدية
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/sql-injection">
              المحاكاة التالية: حقن SQL
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}