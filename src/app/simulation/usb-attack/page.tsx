"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, HardDrive, Shield, Eye, File } from "lucide-react";
import Link from "next/link";

interface AnimationStep {
  id: number;
  title: string;
  description: string;
  duration: number;
}

const animationSteps: AnimationStep[] = [
  {
    id: 1,
    title: "العثور على الفلاشة",
    description: "يجد المستخدم فلاشة USB مجهولة في ممر المكتب.",
    duration: 3000
  },
  {
    id: 2,
    title: "اتخاذ القرار",
    description: "يقرر المستخدم ما إذا كان سيوصل الفلاشة أم لا.",
    duration: 3000
  },
  {
    id: 3,
    title: "التوصيل (الخيار الخاطئ)",
    description: "إذا تم توصيل الفلاشة، يبدأ البرنامج الخبيث في التنفيذ.",
    duration: 3000
  },
  {
    id: 4,
    title: "انتشار الفيروس",
    description: "يتم نسخ البرنامج الخبيث إلى النظام وفتح ثغرة خلفية.",
    duration: 3000
  },
  {
    id: 5,
    title: "الوصول عن بُعد",
    description: "يمكن للمهاجم الآن الوصول إلى الجهاز عن بُعد والتحكم به.",
    duration: 3000
  }
]

export default function USBAttackSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userDecision, setUserDecision] = useState<string | null>(null);
  const [systemInfected, setSystemInfected] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showUSBFound, setShowUSBFound] = useState(false);

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setUserDecision(null);
    setSystemInfected(false);
    setIsCompleted(false);
    setShowUSBFound(false);
  };

  const startSimulation = () => {
    setIsPlaying(true);
    setIsCompleted(false);
    setShowUSBFound(true);
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
  };

  const handleDecision = (decision: string) => {
    setUserDecision(decision);
    setSystemInfected(decision === 'connect');
    setTimeout(() => {
      setCurrentStep(2);
      if (decision === 'connect') {
        setTimeout(() => setCurrentStep(3), 1000);
        setTimeout(() => setCurrentStep(4), 2000);
        setTimeout(() => {
          setCurrentStep(5);
          setIsPlaying(false);
          setIsCompleted(true);
        }, 3000);
      } else {
        setTimeout(() => {
          setIsPlaying(false);
          setIsCompleted(true);
        }, 2000);
      }
    }, 500);
  };

  useEffect(() => {
    if (!isPlaying || currentStep >= 2 || userDecision) return;

    const step = animationSteps[currentStep];
    const timer = setTimeout(() => {
      if (currentStep === 0) {
        setCurrentStep(1);
      }
    }, step.duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, userDecision]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-orange-500/20 text-orange-400 border-orange-500/30">
            <AlertTriangle className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            اختراق عبر USB (USB Drop)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعلم خطر توصيل أجهزة USB مجهولة المصدر في جهازك.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-orange-400" />
                  فلاشة USB مجهولة
                </CardTitle>
                <CardDescription>
                  محاكاة لهجوم USB Drop في بيئة مكتبية
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* USB Simulation */}
                <div className="relative h-96 cyber-grid rounded-lg p-6 mb-6">
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                      {showUSBFound ? (
                        <div className="text-center">
                          <HardDrive className="w-24 h-24 text-orange-400 mx-auto mb-6" />
                          <h3 className="text-white text-xl font-bold mb-4">فلاشة USB مجهولة</h3>
                          <p className="text-gray-400 mb-6">وجدت في ممر المكتب</p>
                          
                          {!userDecision && (
                            <div className="flex flex-col gap-3 max-w-xs mx-auto">
                              <Button 
                                className="bg-red-600 hover:bg-red-500 text-white py-3"
                                onClick={() => handleDecision('connect')}
                              >
                                سأوصلها لرؤية محتواها
                              </Button>
                              <Button 
                                className="bg-green-600 hover:bg-green-500 text-white py-3"
                                onClick={() => handleDecision('ignore')}
                              >
                                سأتجاهلها وأبلغ الأمن
                              </Button>
                            </div>
                          )}

                          {userDecision === 'connect' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-400 mt-4"
                            >
                              جاري تحميل المحتوى...
                            </motion.div>
                          )}

                          {userDecision === 'ignore' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-green-400 mt-4"
                            >
                              تم الإبلاغ عن الفلاشة بأمان
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          اضغط "ابدأ المحاكاة" للعثور على الفلاشة
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${showUSBFound ? 'border-orange-500/50 bg-orange-500/10' : 'border-border/50'}`}>
                    <HardDrive className="w-6 h-6 mx-auto mb-1 text-orange-400" />
                    <div className="text-xs">
                      {showUSBFound ? 'فلاشة وجدت' : 'لا فلاشة'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${userDecision === 'connect' ? 'border-red-500/50 bg-red-500/10' : userDecision === 'ignore' ? 'border-green-500/50 bg-green-500/10' : 'border-border/50'}`}>
                    <Eye className="w-6 h-6 mx-auto mb-1 ${userDecision === 'connect' ? 'text-red-400' : userDecision === 'ignore' ? 'text-green-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {userDecision === 'connect' ? 'تم التوصيل' : userDecision === 'ignore' ? 'تم الإبلاغ' : 'في انتظار القرار'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${systemInfected ? 'border-red-500/50 bg-red-500/10' : isCompleted ? 'border-green-500/50 bg-green-500/10' : 'border-border/50'}`}>
                    <File className="w-6 h-6 mx-auto mb-1 ${systemInfected ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {systemInfected ? 'النظام مخترق' : isCompleted ? 'المحاكاة اكتملت' : 'آمن'}
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
                      className="flex-1 cyber-glow bg-orange-600 hover:bg-orange-500"
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
                          ? 'border-orange-500 bg-orange-500/10' 
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
                            ? 'bg-orange-500 text-white'
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
          <Card className="cyber-border bg-gradient-to-br from-orange-500/10 to-orange-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-400" />
                كيفية الحماية من هجمات USB Drop
              </CardTitle>
              <CardDescription>
                استراتيجيات وقائية لتجنب الاختراق عبر أجهزة USB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "لا توصل USB مجهولة",
                    description: "لا توصل أي جهاز USB غير معروف المصدر",
                    icon: HardDrive
                  },
                  {
                    title: "عطل AutoRun",
                    description: "عطّل خاصية التشغيل التلقائي في نظامك",
                    icon: Eye
                  },
                  {
                    title: "فحص الفلاشات",
                    description: "استخدم أدوات مكافحة الفيروسات لفحص الأجهزة",
                    icon: Shield
                  },
                  {
                    title: "الإبلاغ الفوري",
                    description: "أبلغ الأمن فور العثور على أجهزة مشبوهة",
                    icon: AlertTriangle
                  }
                ].map((method, index) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-center p-4 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors">
                      <method.icon className="w-8 h-8 mx-auto mb-3 text-orange-400" />
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
            <Link href="/simulation/brute-force">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: Brute Force
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/email-spoofing">
              المحاكاة التالية: Email Spoofing
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}