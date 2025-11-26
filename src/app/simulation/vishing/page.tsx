"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Phone, Shield, User, Globe } from "lucide-react";
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
    title: "المكالمة الواردة",
    description: "يتلقى المستخدم مكالمة هاتفية من شخص يدّعي أنه من البنك.",
    duration: 3000
  },
  {
    id: 2,
    title: "طلب المعلومات",
    description: "يطلب المتصل معلومات حساسة مثل رقم البطاقة ورمز CVV.",
    duration: 4000
  },
  {
    id: 3,
    title: "مغريات الخداع",
    description: "يستخدم المتصل أساليب نفسية مثل التهديد بغلق الحساب.",
    duration: 3000
  },
  {
    id: 4,
    title: "تسليم المعلومات",
    description: "إذا وافق الضحية، يتم تسجيل المعلومات واستغلالها.",
    duration: 4000
  },
  {
    id: 5,
    title: "الاختراق المالي",
    description: "يتم سرقة الأموال من الحساب البنكي للضحية.",
    duration: 3000
  }
]

export default function VishingSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userResponse, setUserResponse] = useState<string | null>(null);
  const [attackSuccess, setAttackSuccess] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCallScreen, setShowCallScreen] = useState(false);

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setUserResponse(null);
    setAttackSuccess(false);
    setIsCompleted(false);
    setShowCallScreen(false);
  };

  const startSimulation = () => {
    setIsPlaying(true);
    setIsCompleted(false);
    setShowCallScreen(true);
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
  };

  const handleUserDecision = (decision: string) => {
    setUserResponse(decision);
    setAttackSuccess(decision === 'give');
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
    if (!isPlaying || currentStep >= animationSteps.length || userResponse) return;

    const step = animationSteps[currentStep];
    const timer = setTimeout(() => {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 2) {
        // Wait for user decision
      }
    }, step.duration);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, userResponse]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <AlertTriangle className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            هندسة اجتماعية عبر الهاتف (Vishing)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعلم كيف يتم الاحتيال عبر المكالمات الهاتفية لسرقة المعلومات البنكية.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  مكالمة احتيالية
                </CardTitle>
                <CardDescription>
                  محاكاة لهجوم Vishing عبر الهاتف
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Phone Simulation */}
                <div className="relative h-96 cyber-grid rounded-lg p-6 mb-6">
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center">
                      {showCallScreen ? (
                        <div className="text-center">
                          <div className="w-48 h-64 mx-auto bg-black rounded-3xl p-6 border-2 border-yellow-500/30">
                            <Phone className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                            <div className="text-white font-bold text-lg mb-2">بنك الأمان الوطني</div>
                            <div className="text-yellow-400 text-sm mb-6">مكالمة واردة</div>
                            
                            {currentStep >= 2 && !userResponse && (
                              <div className="space-y-3">
                                <div className="text-white text-sm mb-4 text-left">
                                  "مرحباً، أنا أحمد من فريق الأمان. لاحظنا نشاطاً مشبوهاً في حسابك. 
                                  نحتاج التحقق من هويتك. هل يمكنك إعطائي رقم بطاقتك ورمز CVV؟"
                                </div>
                                <div className="flex flex-col gap-2">
                                  <Button 
                                    className="bg-red-600 hover:bg-red-500 text-white text-sm py-2"
                                    onClick={() => handleUserDecision('give')}
                                  >
                                    أعطِ المعلومات
                                  </Button>
                                  <Button 
                                    className="bg-green-600 hover:bg-green-500 text-white text-sm py-2"
                                    onClick={() => handleUserDecision('refuse')}
                                  >
                                    رفض و إنهاء المكالمة
                                  </Button>
                                </div>
                              </div>
                            )}

                            {userResponse === 'give' && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-sm mt-4"
                              >
                                تم تسجيل المعلومات...
                              </motion.div>
                            )}

                            {userResponse === 'refuse' && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-green-400 text-sm mt-4"
                              >
                                تم إنهاء المكالمة بأمان
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          اضغط "ابدأ المحاكاة" لعرض المكالمة الاحتيالية
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${showCallScreen ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-border/50'}`}>
                    <Phone className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                    <div className="text-xs">
                      {showCallScreen ? 'مكالمة نشطة' : 'لا مكالمة'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${userResponse === 'give' ? 'border-red-500/50 bg-red-500/10' : userResponse === 'refuse' ? 'border-green-500/50 bg-green-500/10' : 'border-border/50'}`}>
                    <User className="w-6 h-6 mx-auto mb-1 ${userResponse === 'give' ? 'text-red-400' : userResponse === 'refuse' ? 'text-green-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {userResponse === 'give' ? 'معلومات سُرقت' : userResponse === 'refuse' ? 'تم الرفض' : 'في انتظار القرار'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${attackSuccess ? 'border-red-500/50 bg-red-500/10' : isCompleted ? 'border-green-500/50 bg-green-500/10' : 'border-border/50'}`}>
                    <Globe className="w-6 h-6 mx-auto mb-1 ${attackSuccess ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {attackSuccess ? 'حساب مخترق' : isCompleted ? 'المحاكاة اكتملت' : 'قيد التنفيذ'}
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
                      className="flex-1 cyber-glow bg-yellow-600 hover:bg-yellow-500"
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
                          ? 'border-yellow-500 bg-yellow-500/10' 
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
                            ? 'bg-yellow-500 text-white'
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
          <Card className="cyber-border bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                كيفية الحماية من هجمات Vishing
              </CardTitle>
              <CardDescription>
                استراتيجيات وقائية لتجنب الاحتيال عبر الهاتف
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "لا تشارك المعلومات",
                    description: "البنوك لا تطلب أبداً رقم البطاقة أو CVV عبر الهاتف",
                    icon: User
                  },
                  {
                    title: "تحقق من الهوية",
                    description: "اطلب رقم الاتصال الرسمي واتصل بهم مباشرة",
                    icon: Phone
                  },
                  {
                    title: "أبلغ عن المكالمات",
                    description: "أبلغ البنك والجهات الأمنية عن المكالمات المشبوهة",
                    icon: AlertTriangle
                  },
                  {
                    title: "استخدم القوائم السوداء",
                    description: "أضف الأرقام المشبوهة إلى قائمة الحظر",
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
                      <method.icon className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
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
            <Link href="/simulation/xss-attack">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: XSS Attack
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/brute-force">
              المحاكاة التالية: Brute Force
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}