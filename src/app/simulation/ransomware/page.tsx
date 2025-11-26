"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, File, Lock, Shield, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Monitor } from "lucide-react"
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
    title: "الوضع الطبيعي",
    description: "الملفات على سطح المكتب تعمل بشكل طبيعي ويمكن الوصول إليها.",
    duration: 3000
  },
  {
    id: 2,
    title: "ملف خبيث",
    description: "يظهر ملف مشبوه (مثل invoice.pdf.exe) ويقوم المستخدم بفتحه.",
    duration: 4000
  },
  {
    id: 3,
    title: "بدء التشفير",
    description: "يبدأ البرنامج في تشفير الملفات واحدة تلو الأخرى.",
    duration: 5000
  },
  {
    id: 4,
    title: "اكتمال التشفير",
    description: "تم تشفير جميع الملفات وأصبحت غير قابلة للوصول.",
    duration: 3000
  },
  {
    id: 5,
    title: "رسالة الفدية",
    description: "تظهر رسالة تطلب مبلغاً من المال لاستعادة الملفات.",
    duration: 4000
  }
]

export default function RansomwareSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [files, setFiles] = useState([
    { name: "document.pdf", encrypted: false },
    { name: "photo.jpg", encrypted: false },
    { name: "presentation.pptx", encrypted: false },
    { name: "database.db", encrypted: false },
    { name: "report.docx", encrypted: false },
    { name: "spreadsheet.xlsx", encrypted: false }
  ])
  const [showRansomNote, setShowRansomNote] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const resetSimulation = () => {
    setCurrentStep(0)
    setIsPlaying(false)
    setFiles(files.map(f => ({ ...f, encrypted: false })))
    setShowRansomNote(false)
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
        // Encrypt files gradually
        const encryptionTimer = setInterval(() => {
          setFiles(prevFiles => {
            const unencryptedIndex = prevFiles.findIndex(f => !f.encrypted)
            if (unencryptedIndex === -1) {
              clearInterval(encryptionTimer)
              return prevFiles
            }
            const newFiles = [...prevFiles]
            newFiles[unencryptedIndex].encrypted = true
            return newFiles
          })
        }, 800)
        break
      case 4:
        setShowRansomNote(true)
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
            <AlertTriangle className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            برامج الفدية (Ransomware)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            شاهد كيف تقوم برامج الفدية بتشفير الملفات ومطالبة الضحايا بفدية لاستعادتها.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  سطح المكتب المصاب
                </CardTitle>
                <CardDescription>
                  محاكاة لهجوم برامج الفدية على جهاز الكمبيوتر
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Desktop Simulation */}
                <div className="relative h-96 cyber-grid rounded-lg p-6 mb-6">
                  <div className="absolute inset-0">
                    {/* Desktop Background */}
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg">
                      <div className="p-4">
                        <div className="text-white text-sm mb-4">سطح المكتب</div>
                        
                        {/* Files Grid */}
                        <div className="grid grid-cols-3 gap-4">
                          {files.map((file, index) => (
                            <motion.div
                              key={file.name}
                              initial={{ scale: 1 }}
                              animate={{ 
                                scale: file.encrypted ? [1, 0.8, 1] : 1,
                                opacity: file.encrypted ? 0.6 : 1
                              }}
                              transition={{ duration: 0.5 }}
                              className="text-center"
                            >
                              <div className={`w-12 h-12 mx-auto mb-2 rounded flex items-center justify-center ${
                                file.encrypted 
                                  ? 'bg-red-500/20 border-2 border-red-500/50' 
                                  : 'bg-blue-500/20 border-2 border-blue-500/50'
                              }`}>
                                {file.encrypted ? (
                                  <Lock className="w-6 h-6 text-red-400" />
                                ) : (
                                  <File className="w-6 h-6 text-blue-400" />
                                )}
                              </div>
                              <div className={`text-xs text-white break-all ${
                                file.encrypted ? 'text-red-400' : ''
                              }`}>
                                {file.encrypted ? file.name + '.locked' : file.name}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Malicious File */}
                        {currentStep === 2 && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          >
                            <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 text-center">
                              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                              <div className="text-red-400 text-sm font-medium">
                                invoice.pdf.exe
                              </div>
                              <div className="text-red-300 text-xs mt-1">
                                جاري التشفير...
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Ransom Note */}
                        <AnimatePresence>
                          {showRansomNote && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute inset-0 bg-black/80 flex items-center justify-center p-6"
                            >
                              <div className="bg-red-900 border-2 border-red-500 rounded-lg p-6 max-w-md">
                                <div className="text-center">
                                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                                  <h2 className="text-xl font-bold text-red-400 mb-4">
                                    تم تشفير ملفاتك!
                                  </h2>
                                  <p className="text-white text-sm mb-4">
                                    لقد تم تشفير جميع ملفاتك باستخدام خوارزمية تشفير قوية.
                                    لاستعادة ملفاتك، يجب عليك دفع فدية قدرها 0.5 بيتكوين.
                                  </p>
                                  <div className="bg-black/50 rounded p-3 mb-4">
                                    <div className="text-xs text-gray-400 mb-1">عنوان البيتكوين:</div>
                                    <div className="text-xs text-white font-mono">
                                      1A2b3C4d5E6f7G8h9i0JkLmNoPqRsTuVwXyZ
                                    </div>
                                  </div>
                                  <p className="text-yellow-400 text-xs">
                                    لديك 72 ساعة فقط قبل حذف الملفات نهائياً!
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    files.some(f => !f.encrypted) ? 'border-green-500/50 bg-green-500/10' : 'border-border/50'
                  }`}>
                    <File className="w-6 h-6 mx-auto mb-1 text-green-400" />
                    <div className="text-xs">
                      {files.filter(f => !f.encrypted).length} ملفات آمنة
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    files.some(f => f.encrypted) ? 'border-red-500/50 bg-red-500/10' : 'border-border/50'
                  }`}>
                    <Lock className="w-6 h-6 mx-auto mb-1 text-red-400" />
                    <div className="text-xs">
                      {files.filter(f => f.encrypted).length} ملفات مشفرة
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${
                    showRansomNote ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-border/50'
                  }`}>
                    <AlertTriangle className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                    <div className="text-xs">
                      {showRansomNote ? 'رسالة فدية ظاهرة' : 'لا توجد رسالة فدية'}
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
                كيفية الحماية من برامج الفدية
              </CardTitle>
              <CardDescription>
                استراتيجيات وقائية للحماية من هجمات برامج الفدية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "نسخ احتياطي منتظم",
                    description: "احتفظ بنسخ احتياطية من ملفاتك الهامة بشكل منتظم",
                    icon: File
                  },
                  {
                    title: "تحديث البرامج",
                    description: "حافظ على تحديث نظام التشغيل والبرامج بشكل مستمر",
                    icon: Shield
                  },
                  {
                    title: "الحذر من المرفقات",
                    description: "لا تفتح مرفقات البريد الإلكتروني من مصادر غير معروفة",
                    icon: AlertTriangle
                  },
                  {
                    title: "برامج مكافحة الفيروسات",
                    description: "استخدم برامج مكافحة الفيروسات الموثوقة وحدثها بانتظام",
                    icon: Lock
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
            <Link href="/simulation/phishing">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: التصيد الاحتيالي
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/man-in-the-middle">
              المحاكاة التالية: الرجل في المنتصف
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}