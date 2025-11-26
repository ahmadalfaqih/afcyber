"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, MessageSquare, Shield, Eye, Terminal } from "lucide-react";
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
    title: "الموقع الطبيعي",
    description: "المستخدم يتصفح موقع ويب عادي ويقرأ التعليقات.",
    duration: 3000
  },
  {
    id: 2,
    title: "إدخال الكود الخبيث",
    description: "يقوم المهاجم بنشر تعليق يحتوي على كود JavaScript خبيث.",
    duration: 4000
  },
  {
    id: 3,
    title: "تنفيذ الكود",
    description: "عندما يفتح الضحية الصفحة، يتم تنفيذ الكود الخبيث تلقائياً.",
    duration: 3000
  },
  {
    id: 4,
    title: "سرقة البيانات",
    description: "يتم إرسال ملفات تعريف الارتباط (Cookies) إلى خادم المهاجم.",
    duration: 4000
  },
  {
    id: 5,
    title: "الاستغلال",
    description: "يمكن للمهاجم الآن انتحال هوية الضحية والوصول إلى حسابه.",
    duration: 3000
  }
]

export default function XSSAttackSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, text: "مقال ممتاز! شكراً للكاتب.", safe: true },
    { id: 2, text: "شكراً على المعلومات القيمة.", safe: true }
  ]);
  const [showMaliciousComment, setShowMaliciousComment] = useState(false);
  const [executedScript, setExecutedScript] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setComments([
      { id: 1, text: "مقال ممتاز! شكراً للكاتب.", safe: true },
      { id: 2, text: "شكراً على المعلومات القيمة.", safe: true }
    ]);
    setShowMaliciousComment(false);
    setExecutedScript(false);
    setIsCompleted(false);
  };

  const startSimulation = () => {
    setIsPlaying(true);
    setIsCompleted(false);
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

    // Update states based on current step
    if (currentStep === 1) {
      // Add malicious comment
      setTimeout(() => {
        setShowMaliciousComment(true);
        setComments(prev => [...prev, { 
          id: 3, 
          text: "<script>alert('تم سرقة ملفات تعريف الارتباط!');</script>", 
          safe: false 
        }]);
      }, 1000);
    }

    if (currentStep === 2) {
      // Execute script
      setTimeout(() => {
        setExecutedScript(true);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-red-500/20 text-red-400 border-red-500/30">
            <AlertTriangle className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            استغلال ثغرة XSS
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            شاهد كيف يمكن تنفيذ كود خبيث عبر تعليق على موقع ويب غير آمن.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-red-400" />
                  مدونة غير آمنة
                </CardTitle>
                <CardDescription>
                  محاكاة لهجوم XSS على صفحة تعليقات موقع ويب
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Blog Simulation */}
                <div className="relative h-96 cyber-grid rounded-lg p-6 mb-6">
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6">
                      <div className="text-white text-lg font-bold mb-6">مقالات الأمن السيبراني</div>
                      <div className="text-gray-300 mb-6">
                        تعرف على أحدث تقنيات الحماية من الهجمات الإلكترونية...
                      </div>
                      
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-700/50 p-4 rounded-lg border border-gray-600/50"
                          >
                            <div className="text-gray-300 text-sm">
                              {comment.safe ? (
                                comment.text
                              ) : (
                                <span className="text-red-400 font-mono">
                                  {executedScript ? (
                                    <span className="text-red-400">تم سرقة ملفات تعريف الارتباط!</span>
                                  ) : (
                                    comment.text
                                  )}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {executedScript && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute top-4 right-4 bg-red-500/20 border border-red-500 rounded-lg p-3"
                        >
                          <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                          <div className="text-red-400 text-xs text-center">
                            كود خبيث نُفذ بنجاح!
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${showMaliciousComment ? 'border-red-500/50 bg-red-500/10' : 'border-border/50'}`}>
                    <MessageSquare className="w-6 h-6 mx-auto mb-1 text-red-400" />
                    <div className="text-xs">
                      {showMaliciousComment ? 'تعليق خبيث' : 'لا تعليق خبيث'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${executedScript ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-border/50'}`}>
                    <Terminal className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                    <div className="text-xs">
                      {executedScript ? 'كود نُفذ' : 'كود غير نشط'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${isCompleted ? 'border-green-500/50 bg-green-500/10' : 'border-border/50'}`}>
                    <Eye className="w-6 h-6 mx-auto mb-1 text-green-400" />
                    <div className="text-xs">
                      {isCompleted ? 'الهجوم اكتمل' : 'الهجوم جارٍ'}
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
                      className="flex-1 cyber-glow bg-red-600 hover:bg-red-500"
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
                          ? 'border-red-500 bg-red-500/10' 
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
                            ? 'bg-red-500 text-white'
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
          <Card className="cyber-border bg-gradient-to-br from-red-500/10 to-red-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                كيفية الحماية من هجمات XSS
              </CardTitle>
              <CardDescription>
                استراتيجيات وقائية لحماية مواقع الويب من ثغرات XSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "تنظيف المدخلات",
                    description: "تحقق من جميع المدخلات ونظفها قبل عرضها",
                    icon: Eye
                  },
                  {
                    title: "تشفير المخرجات",
                    description: "قم بتشفير البيانات قبل عرضها في HTML",
                    icon: Shield
                  },
                  {
                    title: "سياسة أمان المحتوى",
                    description: "استخدم CSP لمنع تنفيذ البرامج النصية الخارجية",
                    icon: Terminal
                  },
                  {
                    title: "اختبار الاختراق",
                    description: "أجرِ اختبارات أمنية دورية لاكتشاف الثغرات",
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
                      <method.icon className="w-8 h-8 mx-auto mb-3 text-red-400" />
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
            <Link href="/simulation/wifi-hacking">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: اختراق Wi-Fi
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/vishing">
              المحاكاة التالية: Vishing
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}