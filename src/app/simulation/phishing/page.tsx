"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, Mail, Shield, AlertTriangle, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Eye, User } from "lucide-react"
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
    title: "البريد الإلكتروني المزيف",
    description: "يستقبل المستخدم بريداً إلكترونياً يبدو من بنك موثوق يطلب تحديث معلومات الحساب.",
    duration: 4000
  },
  {
    id: 2,
    title: "الضغط النفسي",
    description: "الرسالة تحتوي على عبارات استعجال مثل 'حسابك سيتم إغلاقه خلال 24 ساعة'.",
    duration: 3000
  },
  {
    id: 3,
    title: "النقر على الرابط",
    description: "المستخدم ينقر على الرابط المشبوه في البريد الإلكتروني.",
    duration: 3000
  },
  {
    id: 4,
    title: "الموقع المزيف",
    description: "يتم توجيه المستخدم إلى موقع مطابق للموقع الأصلي ولكن بعنوان مختلف.",
    duration: 4000
  },
  {
    id: 5,
    title: "سرقة البيانات",
    description: "عند إدخال المعلومات، يتم إرسالها مباشرة إلى المهاجم.",
    duration: 3000
  }
]

export default function PhishingSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showFakeEmail, setShowFakeEmail] = useState(false)
  const [showFakeWebsite, setShowFakeWebsite] = useState(false)
  const [dataStolen, setDataStolen] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const resetSimulation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setShowFakeEmail(false)
    setShowFakeWebsite(false)
    setDataStolen(false)
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
      case 0:
        setShowFakeEmail(true)
        break
      case 1:
        break
      case 2:
        break
      case 3:
        setShowFakeWebsite(true)
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
            <Lock className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            التصيد الاحتيالي (Phishing)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            اكتشف كيف يخدع المهاجمون المستخدمين للحصول على معلومات حساسة من خلال رسائل بريد إلكتروني مزيفة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  محاكاة هجوم التصيد
                </CardTitle>
                <CardDescription>
                  شاهد كيف يتم خداع المستخدمين للحصول على معلوماتهم الشخصية
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Animation Area */}
                <div className="relative h-96 cyber-grid rounded-lg p-8 mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {currentStep < 3 && showFakeEmail && (
                        <motion.div
                          key="email"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="w-full max-w-md"
                        >
                          <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold">بنك الأمان</div>
                                <div className="text-xs text-muted-foreground">security@bank.com</div>
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="font-medium mb-2">تحذير عاجل!</div>
                              <div className="text-sm text-muted-foreground">
                                عزيزي العميل، تم اكتشاف نشاط مشبوه على حسابك. 
                                يرجى تحديث معلوماتك خلال 24 ساعة لتجنب إغلاق الحساب.
                              </div>
                            </div>
                            <motion.div
                              animate={{ 
                                scale: currentStep === 2 ? [1, 1.05, 1] : 1,
                                backgroundColor: currentStep === 2 ? 'rgb(239 68 68)' : 'rgb(59 130 246)'
                              }}
                              transition={{ duration: 0.5, repeat: currentStep === 2 ? Infinity : 0 }}
                              className="text-center py-2 px-4 rounded text-white text-sm cursor-pointer"
                            >
                              تحديث معلومات الحساب الآن
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {currentStep >= 3 && showFakeWebsite && (
                        <motion.div
                          key="website"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="w-full max-w-md"
                        >
                          <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                            <div className="text-center mb-6">
                              <div className="text-xl font-bold cyber-text mb-2">بنك الأمان</div>
                              <div className="text-xs text-red-400">
                                http://bank-security-update.com
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm text-muted-foreground">اسم المستخدم</label>
                                <div className="border border-border rounded px-3 py-2 bg-muted/50">
                                  john.doe@email.com
                                </div>
                              </div>
                              <div>
                                <label className="text-sm text-muted-foreground">كلمة المرور</label>
                                <div className="border border-border rounded px-3 py-2 bg-muted/50">
                                  ••••••••
                                </div>
                              </div>
                              {dataStolen && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-red-500/10 border border-red-500/30 rounded p-3"
                                >
                                  <div className="flex items-center gap-2 text-red-400">
                                    <Eye className="w-4 h-4" />
                                    <span className="text-sm">تم إرسال البيانات إلى المهاجم!</span>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Attacker indicator */}
                  {dataStolen && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-4 left-4"
                    >
                      <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                        <User className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400">المهاجم حصل على البيانات</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    currentStep >= 0 ? 'border-primary bg-primary/10' : 'border-border/50'
                  }`}>
                    <Mail className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">البريد المزيف</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    currentStep >= 3 ? 'border-primary bg-primary/10' : 'border-border/50'
                  }`}>
                    <Lock className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">الموقع المزيف</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    dataStolen ? 'border-red-500/50 bg-red-500/10' : 'border-border/50'
                  }`}>
                    <AlertTriangle className="w-6 h-6 mx-auto mb-1" />
                    <div className="text-xs">سرقة البيانات</div>
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
                كيفية الحماية من هجمات التصيد
              </CardTitle>
              <CardDescription>
                نصائح هامة للحماية من هجمات التصيد الاحتيالي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "تحقق من المرسل",
                    description: "تأكد دائماً من عنوان البريد الإلكتروني للمرسل",
                    icon: Mail
                  },
                  {
                    title: "لا تضغط على الروابط",
                    description: "تجنب النقر على الروابط المشبوهة في رسائل غير متوقعة",
                    icon: AlertTriangle
                  },
                  {
                    title: "تحقق من عنوان URL",
                    description: "تأكد من أن عنوان الموقع صحيح قبل إدخال معلوماتك",
                    icon: Lock
                  },
                  {
                    title: "استخدم المصادقة الثنائية",
                    description: "فعّل المصادقة الثنائية لحماية حساباتك الهامة",
                    icon: Shield
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
            <Link href="/simulation/ddos">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: DDoS
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/ransomware">
              المحاكاة التالية: برامج الفدية
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}