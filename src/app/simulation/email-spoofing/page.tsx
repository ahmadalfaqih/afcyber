"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Mail, Shield, User, Globe, Eye } from "lucide-react";
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
    title: "استلام البريد",
    description: "يتلقى المستخدم بريدًا إلكترونيًا يبدو رسميًا من 'المدير التنفيذي'.",
    duration: 3000
  },
  {
    id: 2,
    title: "فحص المرسل",
    description: "يقوم المستخدم بفحص عنوان المرسل الحقيقي (ليس الاسم الظاهري).",
    duration: 4000
  },
  {
    id: 3,
    title: "كشف التفاصيل",
    description: "يظهر أن البريد أُرسل من خادم غير رسمي (IP مشبوه).",
    duration: 3000
  },
  {
    id: 4,
    title: "اتخاذ القرار",
    description: "يقرر المستخدم ما إذا كان سينفذ الطلب أم لا.",
    duration: 3000
  },
  {
    id: 5,
    title: "النتيجة",
    description: "إذا نُفّذ الطلب: تم تحويل الأموال للمهاجم. إذا رُفض: تم تجنب الكارثة.",
    duration: 3000
  }
]

export default function EmailSpoofingSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [userDecision, setUserDecision] = useState<string | null>(null);
  const [attackSuccess, setAttackSuccess] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setShowEmail(false);
    setShowTechnicalDetails(false);
    setUserDecision(null);
    setAttackSuccess(false);
    setIsCompleted(false);
  };

  const startSimulation = () => {
    setIsPlaying(true);
    setIsCompleted(false);
    setShowEmail(true);
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
  };

  const handleUserDecision = (decision: string) => {
    setUserDecision(decision);
    setAttackSuccess(decision === 'execute');
    setTimeout(() => {
      setCurrentStep(4);
      setTimeout(() => {
        setCurrentStep(5);
        setIsPlaying(false);
        setIsCompleted(true);
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (!isPlaying || currentStep >= animationSteps.length || userDecision) return;

    const step = animationSteps[currentStep];
    const timer = setTimeout(() => {
      if (currentStep === 1) {
        // Show technical details
        setTimeout(() => setShowTechnicalDetails(true), 1500);
        setCurrentStep(currentStep + 1);
      } else if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
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
          <Badge className="mb-4 cyber-border cyber-glow bg-blue-500/20 text-blue-400 border-blue-500/30">
            <AlertTriangle className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            انتحال هوية عبر البريد (Email Spoofing)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعلم كيف تميّز بين البريد الرسمي والبريد الاحتيالي الذي ينتحل هوية المديرين.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  صندوق البريد الوارد
                </CardTitle>
                <CardDescription>
                  محاكاة لهجوم انتحال الهوية عبر البريد الإلكتروني
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Email Simulation */}
                <div className="relative h-96 cyber-grid rounded-lg p-6 mb-6">
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6">
                      {showEmail ? (
                        <div className="space-y-4">
                          <div className="text-white text-lg font-bold mb-4">البريد الوارد</div>
                          
                          <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <User className="w-4 h-4 text-blue-400" />
                              <span className="font-medium text-blue-400">من:</span>
                              <span className="text-gray-300">
                                <span className="font-medium line-through text-red-400">ahmad@company-security.com</span>
                                <span className="mx-2">→</span>
                                <span className="font-medium">ahmad@company-secure.com</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Globe className="w-4 h-4 text-blue-400" />
                              <span className="font-medium text-blue-400">إلى:</span>
                              <span className="text-gray-300">أنت &lt;you@yourcompany.com&gt;</span>
                            </div>
                            <div className="font-bold text-white mb-3">طلب عاجل: تحويل مالي</div>
                            <p className="text-gray-300 text-sm mb-4">
                              مرحبًا،<br />
                              نحتاج تحويل مبلغ 25,000 ريال فورًا لضمان استمرارية المشروع مع العميل الجديد.<br />
                              الرجاء تنفيذ التحويل خلال ساعة وموافاتي بالإيصال.<br />
                              — أحمد السالم، المدير التنفيذي
                            </p>
                            
                            {showTechnicalDetails && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-4 p-3 bg-gray-800/70 rounded border border-red-500/30"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Eye className="w-4 h-4 text-yellow-400" />
                                  <span className="text-yellow-400 text-xs font-bold">التفاصيل التقنية</span>
                                </div>
                                <div className="text-red-400 text-xs font-mono space-y-1">
                                  <div>Return-Path: &lt;spoofed@fake-server.net&gt;</div>
                                  <div>Received: from [185.222.xxx.xxx] (غير موثوق)</div>
                                  <div>X-Originating-IP: [185.222.xxx.xxx]</div>
                                  <div className="text-yellow-400 mt-2">⚠️ هذا البريد لم يُرسل من خوادم الشركة الرسمية!</div>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {currentStep >= 3 && !userDecision && (
                            <div className="flex flex-col gap-3 max-w-xs">
                              <Button 
                                className="bg-red-600 hover:bg-red-500 text-white py-2 text-sm"
                                onClick={() => handleUserDecision('execute')}
                              >
                                سأنفذ التحويل الآن
                              </Button>
                              <Button 
                                className="bg-green-600 hover:bg-green-500 text-white py-2 text-sm"
                                onClick={() => handleUserDecision('verify')}
                              >
                                سأتصل بالمدير للتحقق
                              </Button>
                            </div>
                          )}

                          {userDecision === 'execute' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-400 text-center mt-4 font-bold"
                            >
                              تم تحويل المبلغ إلى المهاجم!
                            </motion.div>
                          )}

                          {userDecision === 'verify' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-green-400 text-center mt-4 font-bold"
                            >
                              تم تجنب الهجوم بنجاح!
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          اضغط "ابدأ المحاكاة" لعرض البريد الاحتيالي
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${showEmail ? 'border-blue-500/50 bg-blue-500/10' : 'border-border/50'}`}>
                    <Mail className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                    <div className="text-xs">
                      {showEmail ? 'بريد وارد' : 'لا بريد'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${showTechnicalDetails ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-border/50'}`}>
                    <Eye className="w-6 h-6 mx-auto mb-1 ${showTechnicalDetails ? 'text-yellow-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {showTechnicalDetails ? 'تفاصيل ظاهرة' : 'تفاصيل مخفية'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${attackSuccess ? 'border-red-500/50 bg-red-500/10' : isCompleted ? 'border-green-500/50 bg-green-500/10' : 'border-border/50'}`}>
                    <User className="w-6 h-6 mx-auto mb-1 ${attackSuccess ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {attackSuccess ? 'حساب مخترق' : isCompleted ? 'تم التجنب' : 'قيد التقييم'}
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
                      className="flex-1 cyber-glow bg-blue-600 hover:bg-blue-500"
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
                          ? 'border-blue-500 bg-blue-500/10' 
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
                            ? 'bg-blue-500 text-white'
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
          <Card className="cyber-border bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                كيفية الحماية من انتحال الهوية عبر البريد
              </CardTitle>
              <CardDescription>
                استراتيجيات وقائية لاكتشاف البريد الاحتيالي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "تحقق من العنوان",
                    description: "افحص عنوان البريد الحقيقي وليس الاسم الظاهري",
                    icon: Mail
                  },
                  {
                    title: "ابحث عن الأخطاء",
                    description: "الرسائل الرسمية خالية من الأخطاء اللغوية",
                    icon: Eye
                  },
                  {
                    title: "التحقق الخارجي",
                    description: "اتصل بالمرسل عبر قناة منفصلة للتأكد",
                    icon: User
                  },
                  {
                    title: "احذر الطلبات العاجلة",
                    description: "الهجمات تستخدم الضغط النفسي لاتخاذ قرارات سريعة",
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
                      <method.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
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
            <Link href="/simulation/usb-attack">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: USB Attack
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/ddos">
              العودة إلى القائمة
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}