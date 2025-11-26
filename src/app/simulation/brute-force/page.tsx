"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Lock, Shield, Key, Terminal } from "lucide-react";
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
    title: "صفحة تسجيل الدخول",
    description: "المستخدم يواجه صفحة تسجيل دخول محمية بكلمة مرور.",
    duration: 2000
  },
  {
    id: 2,
    title: "بدء الهجوم",
    description: "يبدأ المهاجم في محاولة كلمات مرور شائعة واحدة تلو الأخرى.",
    duration: 3000
  },
  {
    id: 3,
    title: "الوصول إلى القاموس",
    description: "يستخدم المهاجم قائمة كلمات مرور شائعة (Dictionary Attack).",
    duration: 3000
  },
  {
    id: 4,
    title: "اكتشاف كلمة المرور",
    description: "بعد عدة محاولات، يتم العثور على كلمة المرور الصحيحة.",
    duration: 3000
  },
  {
    id: 5,
    title: "الوصول غير المصرح به",
    description: "يتم الدخول إلى الحساب بنجاح والاستيلاء على البيانات.",
    duration: 2000
  }
]

const commonPasswords = [
  "123456", "password", "123456789", "12345678", "12345", 
  "1234567", "1234567890", "qwerty", "abc123", "admin", "user"
];

export default function BruteForceSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("*******");
  const [attempts, setAttempts] = useState(0);
  const [isCracked, setIsCracked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setCurrentPassword("*******");
    setAttempts(0);
    setIsCracked(false);
    setIsCompleted(false);
    setShowLoginScreen(false);
  };

  const startSimulation = () => {
    setIsPlaying(true);
    setIsCompleted(false);
    setShowLoginScreen(true);
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying || currentStep >= animationSteps.length) return;

    const step = animationSteps[currentStep];
    const timer = setTimeout(() => {
      if (currentStep < animationSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsPlaying(false);
        setIsCompleted(true);
      }
    }, step.duration);

    // Brute force logic
    if (currentStep === 1) {
      let i = 0;
      const bruteTimer = setInterval(() => {
        if (i < commonPasswords.length && !isCracked) {
          setCurrentPassword(commonPasswords[i]);
          setAttempts(i + 1);
          if (commonPasswords[i] === "password") {
            setTimeout(() => {
              setIsCracked(true);
              setCurrentStep(4);
            }, 500);
            clearInterval(bruteTimer);
          }
          i++;
        }
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, isCracked]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-purple-500/20 text-purple-400 border-purple-500/30">
            <AlertTriangle className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            هجوم القوة الغاشمة
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            شاهد كيف يتم اختراق كلمات المرور الضعيفة عبر محاولة جميع الاحتمالات.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  صفحة تسجيل الدخول
                </CardTitle>
                <CardDescription>
                  محاكاة لهجوم القوة الغاشمة على نظام المصادقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Login Screen Simulation */}
                <div className="relative h-96 cyber-grid rounded-lg p-6 mb-6">
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                      {showLoginScreen ? (
                        <div className="w-80 bg-gray-900/80 border border-purple-500/30 rounded-lg p-6">
                          <div className="text-white text-center mb-6">
                            <Lock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                            <h2 className="text-xl font-bold">تسجيل الدخول</h2>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="text-gray-400 text-sm block mb-2">اسم المستخدم</label>
                              <input 
                                type="text" 
                                defaultValue="admin"
                                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm"
                                readOnly
                              />
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm block mb-2">كلمة المرور</label>
                              <div className="relative">
                                <input 
                                  type="password" 
                                  value={currentPassword}
                                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white text-sm font-mono"
                                  readOnly
                                />
                                {isCracked && (
                                  <div className="absolute inset-0 bg-red-500/20 rounded flex items-center justify-center">
                                    <Lock className="w-6 h-6 text-red-400" />
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {attempts > 0 && (
                              <div className="text-center text-sm text-gray-400">
                                المحاولة #{attempts}
                              </div>
                            )}
                            
                            {isCracked && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-green-400 text-sm text-center font-bold"
                              >
                                تم الدخول بنجاح!
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          اضغط "ابدأ المحاكاة" لعرض صفحة تسجيل الدخول
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${showLoginScreen ? 'border-purple-500/50 bg-purple-500/10' : 'border-border/50'}`}>
                    <Lock className="w-6 h-6 mx-auto mb-1 text-purple-400" />
                    <div className="text-xs">
                      {showLoginScreen ? 'صفحة نشطة' : 'صفحة مخفية'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${attempts > 0 ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-border/50'}`}>
                    <Key className="w-6 h-6 mx-auto mb-1 ${attempts > 0 ? 'text-yellow-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {attempts > 0 ? `${attempts} محاولة` : 'لا محاولات'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${isCracked ? 'border-green-500/50 bg-green-500/10' : 'border-border/50'}`}>
                    <Shield className="w-6 h-6 mx-auto mb-1 ${isCracked ? 'text-green-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {isCracked ? 'تم الاختراق' : 'آمن'}
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
                      className="flex-1 cyber-glow bg-purple-600 hover:bg-purple-500"
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
                          ? 'border-purple-500 bg-purple-500/10' 
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
                            ? 'bg-purple-500 text-white'
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
          <Card className="cyber-border bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                كيفية الحماية من هجمات القوة الغاشمة
              </CardTitle>
              <CardDescription>
                استراتيجيات وقائية لحماية كلمات المرور من الاختراق
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "كلمات مرور قوية",
                    description: "استخدم كلمات مرور طويلة ومعقدة (12+ حرفاً)",
                    icon: Key
                  },
                  {
                    title: "المصادقة الثنائية",
                    description: "فعّل 2FA لإضافة طبقة حماية إضافية",
                    icon: Shield
                  },
                  {
                    title: "قفل الحساب",
                    description: "قم بقفل الحساب بعد عدد محاولات فاشلة",
                    icon: Lock
                  },
                  {
                    title: "مراقبة الدخول",
                    description: "راقب محاولات الدخول غير الناجحة",
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
                      <method.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
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
            <Link href="/simulation/vishing">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: Vishing
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/usb-attack">
              المحاكاة التالية: USB Attack
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}