"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Wifi, Shield, Eye, Terminal } from "lucide-react";
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
    title: "اكتشاف الشبكات",
    description: "يقوم المهاجم بمسح المنطقة للعثور على شبكات Wi-Fi غير آمنة.",
    duration: 3000
  },
  {
    id: 2,
    title: "اختيار الهدف",
    description: "يحدد المهاجم شبكة عامة غير مشفرة (مثل Free_Public_WiFi).",
    duration: 3000
  },
  {
    id: 3,
    title: "اعتراض الحزم",
    description: "يستخدم أدوات مثل Wireshark لالتقاط البيانات المارة على الشبكة.",
    duration: 4000
  },
  {
    id: 4,
    title: "إنشاء نقطة وهمية",
    description: "يقوم بإنشاء شبكة Wi-Fi مزيفة تحمل نفس الاسم لجذب الضحايا.",
    duration: 3000
  },
  {
    id: 5,
    title: "سرقة البيانات",
    description: "يتم اعتراض كلمات المرور ومعلومات الدخول من الضحايا المتصلين.",
    duration: 3000
  }
]

export default function WifiHackingSimulation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [networks, setNetworks] = useState([
    { name: "Home_Network", secured: true },
    { name: "Company_WiFi", secured: true },
    { name: "Free_Public_WiFi", secured: false }
  ]);
  const [targetNetwork, setTargetNetwork] = useState<string | null>(null);
  const [capturingData, setCapturingData] = useState(false);
  const [evilTwinActive, setEvilTwinActive] = useState(false);
  const [dataStolen, setDataStolen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setTargetNetwork(null);
    setCapturingData(false);
    setEvilTwinActive(false);
    setDataStolen(false);
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
      // Select target network
      setTimeout(() => {
        setTargetNetwork("Free_Public_WiFi");
      }, 1000);
    }

    if (currentStep === 2) {
      // Start capturing data
      setTimeout(() => {
        setCapturingData(true);
      }, 1500);
    }

    if (currentStep === 3) {
      // Activate evil twin
      setTimeout(() => {
        setEvilTwinActive(true);
      }, 1000);
    }

    if (currentStep === 4) {
      // Steal data
      setTimeout(() => {
        setDataStolen(true);
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
          <Badge className="mb-4 cyber-border cyber-glow bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            <AlertTriangle className="w-4 h-4 ml-2" />
            محاكاة تفاعلية
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            اختراق عبر الشبكات اللاسلكية
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعلم كيف يتم استغلال الشبكات اللاسلكية غير الآمنة لاعتراض البيانات.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Animation Area */}
          <div className="lg:col-span-2">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-cyan-400" />
                  مسح الشبكات اللاسلكية
                </CardTitle>
                <CardDescription>
                  محاكاة لهجوم على شبكة Wi-Fi عامة غير آمنة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Network Simulation */}
                <div className="relative h-96 cyber-grid rounded-lg p-6 mb-6">
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-lg p-6">
                      <div className="text-white text-lg font-bold mb-6">نتائج المسح</div>
                      
                      <div className="space-y-3">
                        {networks.map((network, index) => (
                          <motion.div
                            key={network.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`p-3 rounded-lg border ${
                              network.name === targetNetwork 
                                ? 'border-cyan-500 bg-cyan-500/20' 
                                : network.secured 
                                  ? 'border-green-500/30 bg-green-500/10' 
                                  : 'border-red-500/30 bg-red-500/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Wifi className={`w-5 h-5 ${
                                  network.secured ? 'text-green-400' : 'text-red-400'
                                }`} />
                                <span className="text-white font-medium">{network.name}</span>
                              </div>
                              <div className="text-xs">
                                {network.secured ? (
                                  <span className="text-green-400">آمنة</span>
                                ) : (
                                  <span className="text-red-400">مفتوحة</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {capturingData && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-4 left-4 bg-cyan-500/20 border border-cyan-500 rounded-lg p-3"
                        >
                          <Terminal className="w-5 h-5 text-cyan-400 mb-2" />
                          <div className="text-cyan-400 text-xs">
                            جاري اعتراض الحزم...
                          </div>
                        </motion.div>
                      )}

                      {evilTwinActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute top-4 right-4 bg-yellow-500/20 border border-yellow-500 rounded-lg p-3"
                        >
                          <Eye className="w-5 h-5 text-yellow-400 mb-2" />
                          <div className="text-yellow-400 text-xs">
                            نقطة وهمية نشطة
                          </div>
                        </motion.div>
                      )}

                      {dataStolen && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500/20 border border-red-500 rounded-lg p-3 text-center"
                        >
                          <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-1" />
                          <div className="text-red-400 text-xs">
                            تم سرقة بيانات الدخول!
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg border transition-all ${targetNetwork ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-border/50'}`}>
                    <Wifi className="w-6 h-6 mx-auto mb-1 text-cyan-400" />
                    <div className="text-xs">
                      {targetNetwork ? 'شبكة مستهدفة' : 'لا هدف'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${capturingData ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-border/50'}`}>
                    <Terminal className="w-6 h-6 mx-auto mb-1 ${capturingData ? 'text-cyan-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {capturingData ? 'البيانات تُعترض' : 'لا اعتراض'}
                    </div>
                  </div>
                  <div className={`text-center p-3 rounded-lg border transition-all ${dataStolen ? 'border-red-500/50 bg-red-500/10' : 'border-border/50'}`}>
                    <Eye className="w-6 h-6 mx-auto mb-1 ${dataStolen ? 'text-red-400' : 'text-muted-foreground'}" />
                    <div className="text-xs">
                      {dataStolen ? 'البيانات سُرقت' : 'بيانات آمنة'}
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
                      className="flex-1 cyber-glow bg-cyan-600 hover:bg-cyan-500"
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
                          ? 'border-cyan-500 bg-cyan-500/10' 
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
                            ? 'bg-cyan-500 text-white'
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
          <Card className="cyber-border bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                كيفية الحماية من هجمات Wi-Fi
              </CardTitle>
              <CardDescription>
                استراتيجيات وقائية لحماية اتصالك اللاسلكي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "تجنب الشبكات العامة",
                    description: "لا تتصل بالشبكات العامة غير المشفرة",
                    icon: Wifi
                  },
                  {
                    title: "استخدم VPN",
                    description: "شفر اتصالك عند استخدام شبكات عامة",
                    icon: Shield
                  },
                  {
                    title: "تحقق من الاسم",
                    description: "تأكد من اسم الشبكة الرسمي قبل الاتصال",
                    icon: Eye
                  },
                  {
                    title: "لا تدخل معلومات حساسة",
                    description: "تجنب تسجيل الدخول إلى حساباتك على شبكات عامة",
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
                      <method.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
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
            <Link href="/simulation/spear-phishing">
              <ArrowRight className="w-4 h-4 ml-2" />
              السابقة: التصيد المستهدف
            </Link>
          </Button>
          <Button asChild>
            <Link href="/simulation/xss-attack">
              المحاكاة التالية: XSS Attack
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}