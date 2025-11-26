// app/advanced-mode/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Eye,
  Globe,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Server,
  Lock,
  Unlock,
  Zap,
} from "lucide-react";
import Link from "next/link";

// تحميل مكون الشبكة بدون SSR
const NetworkDiagram = dynamic(() => import("./NetworkDiagram"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-gray-500">
      جاري تحميل البنية...
    </div>
  ),
});

// تعريف الأيقونات كـ مكونات قابلة للاستخدام
const ICONS = {
  Shield,
  Eye,
  Globe,
};

export default function AdvancedModePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0); // 0=Firewall, 1=IDS, 2=Topology
  const [attackDetected, setAttackDetected] = useState(false);
  const [firewallEnabled, setFirewallEnabled] = useState(true);
  const [idsEnabled, setIdsEnabled] = useState(true);
  const [networkStatus, setNetworkStatus] = useState("آمن");
  const [showAlert, setShowAlert] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sections = [
    {
      id: 0,
      title: "جدار الحماية (Firewall)",
      icon: "Shield",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      border: "border-blue-500/30",
      description:
        "الخط الدفاعي الأول للشبكة. يتحكم في حركة المرور بناءً على قواعد محددة.",
      details: [
        "إنشاء قواعد مخصصة حسب IP، المنفذ، أو البروتوكول.",
        "مراقبة السجلات لاكتشاف الطلبات المشبوهة.",
        "وضع 'تنبيه فقط' لمراقبة الهجمات دون التدخل الفوري.",
        "اختبار الثغرات عبر تعطيل قواعد مؤقتًا.",
      ],
    },
    {
      id: 1,
      title: "نظام كشف التسلل (IDS)",
      icon: "Eye",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      border: "border-green-500/30",
      description: "يراقب حركة المرور لاكتشاف النشاط المشبوه وإرسال تنبيهات.",
      details: [
        "يدعم NIDS (للشبكة) و HIDS (للمضيف).",
        "قواعد لاكتشاف هجمات معروفة أو سلوك غير طبيعي.",
        "تصنيف التنبيهات: حرج، عالي، متوسط، منخفض.",
        "تكامل تلقائي مع جدار الحماية لحظر عناوين IP المهاجمة.",
      ],
    },
    {
      id: 2,
      title: "بنية الشبكة (Network Topology)",
      icon: "Globe",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      border: "border-purple-500/30",
      description: "تمثيل فيزيائي أو منطقي للشبكة لفهم نقاط الضعف والقوة.",
      details: [
        "تصميم شبكة مخصصة بسحب وإفلات الأجهزة (خوادم، موجهات...).",
        "تقسيم الشبكة إلى مناطق: DMZ، داخلية، وإدارة.",
        "محاكاة انتقال الهجوم عبر الطبقات الأمنية.",
        "تحليل مسار حركة المرور لاكتشاف نقاط الضعف.",
      ],
    },
  ];

  const startSimulation = () => {
    setIsPlaying(true);
    setCurrentSection(0);
    setAttackDetected(false);
    setNetworkStatus("آمن");
    setShowAlert(false);

    timerRef.current = setTimeout(() => {
      setAttackDetected(true);
      if (firewallEnabled && idsEnabled) {
        setNetworkStatus("محصن");
        setShowAlert(false);
      } else {
        setNetworkStatus("مهدد");
        setShowAlert(true);
      }
    }, 5000);
  };

  const pauseSimulation = () => {
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentSection(0);
    setAttackDetected(false);
    setNetworkStatus("آمن");
    setShowAlert(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const toggleFirewall = () => setFirewallEnabled(!firewallEnabled);
  const toggleIds = () => setIdsEnabled(!idsEnabled);

  useEffect(() => {
    if (!isPlaying || currentSection >= sections.length - 1) return;
    const timer = setTimeout(() => setCurrentSection((prev) => prev + 1), 4000);
    return () => clearTimeout(timer);
  }, [isPlaying, currentSection]);

  // عرض الأيقونة بشكل آمن
  const CurrentIcon =
    ICONS[sections[currentSection].icon as keyof typeof ICONS];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-orange-500/20 text-orange-400 border-orange-500/30">
            <AlertTriangle className="w-4 h-4 ml-2" />
            وضع متقدم
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            ⚙️ وضع المحاكاة مع الحماية
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تدرب على إدارة البنية التحتية الأمنية في بيئة شبكات واقعية ومتكاملة.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="space-y-6">
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
                    >
                      <Play className="w-4 h-4 ml-2" />
                      بدء المحاكاة
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
                    القسم الحالي
                  </div>
                  <div className="text-lg font-bold cyber-text">
                    {currentSection + 1} / {sections.length}
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">جدار الحماية:</span>
                    <Button
                      variant={firewallEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={toggleFirewall}
                      className={`px-3 ${
                        firewallEnabled
                          ? "bg-blue-600 hover:bg-blue-500"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {firewallEnabled ? (
                        <Lock className="w-4 h-4 mr-1" />
                      ) : (
                        <Unlock className="w-4 h-4 mr-1" />
                      )}
                      {firewallEnabled ? "مفعل" : "معطل"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">IDS:</span>
                    <Button
                      variant={idsEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={toggleIds}
                      className={`px-3 ${
                        idsEnabled
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {idsEnabled ? (
                        <Shield className="w-4 h-4 mr-1" />
                      ) : (
                        <Eye className="w-4 h-4 mr-1" />
                      )}
                      {idsEnabled ? "مفعل" : "معطل"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">الأقسام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        index === currentSection
                          ? `${section.border} ${section.bgColor}`
                          : index < currentSection
                          ? "border-green-500/50 bg-green-500/5"
                          : "border-border/50 hover:bg-accent/50"
                      }`}
                      onClick={() => !isPlaying && setCurrentSection(index)}
                      whileHover={{ scale: isPlaying ? 1 : 1.02 }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === currentSection
                              ? section.color.replace("text-", "bg-") +
                                " text-white"
                              : index < currentSection
                              ? "bg-green-500 text-white"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index < currentSection ? "✓" : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {section.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {section.description}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="cyber-grid rounded-lg p-6"
              >
                <Card
                  className={`cyber-border ${sections[currentSection].bgColor} ${sections[currentSection].border}`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {CurrentIcon && (
                        <CurrentIcon
                          className={`w-6 h-6 ${sections[currentSection].color}`}
                        />
                      )}
                      <CardTitle
                        className={`text-xl ${sections[currentSection].color}`}
                      >
                        {sections[currentSection].title}
                      </CardTitle>
                    </div>
                    <CardDescription>
                      {sections[currentSection].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pr-5 space-y-2 text-gray-300">
                      {sections[currentSection].details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Network Visualization */}
                {currentSection === 2 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">
                      محاكاة بنية الشبكة
                    </h3>
                    <div className="h-[300px] w-full bg-gray-800 rounded-lg overflow-hidden border border-border/30">
                      <NetworkDiagram
                        isUnderAttack={attackDetected}
                        firewallEnabled={firewallEnabled}
                        idsEnabled={idsEnabled}
                      />
                    </div>
                  </div>
                )}
                {/* Attack Simulation */}
                {currentSection === 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">محاكاة هجوم</h3>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Server className="w-5 h-5 text-red-400" />
                        <span>هجوم قادم من الإنترنت...</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            firewallEnabled ? "bg-green-500" : "bg-red-500"
                          } animate-pulse`}
                        />
                        <span>
                          جدار الحماية: {firewallEnabled ? "مفعل" : "معطل"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            idsEnabled ? "bg-green-500" : "bg-red-500"
                          } animate-pulse`}
                        />
                        <span>IDS: {idsEnabled ? "مفعل" : "معطل"}</span>
                      </div>
                      <div className="mt-4 p-3 bg-gray-700 rounded">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span
                            className={`font-medium ${
                              attackDetected ? "text-red-400" : "text-green-400"
                            }`}
                          >
                            حالة الشبكة: {networkStatus}
                          </span>
                        </div>
                        {showAlert && (
                          <div className="mt-2 p-2 bg-red-500/20 border border-red-500/50 rounded text-sm">
                            ⚠️ تم اكتشاف هجوم! نظامك معرض للخطر.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
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
                أفضل ممارسات الأمان في الوضع المتقدم
              </CardTitle>
              <CardDescription>
                استراتيجيات أساسية لبناء نظام دفاعي قوي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "التكامل بين الأنظمة",
                    description:
                      "اجعل Firewall و IDS يعملان معًا لتعزيز الحماية.",
                    icon: Shield,
                  },
                  {
                    title: "المراجعة الدورية",
                    description: "راجع قواعد جدار الحماية وسجلات IDS شهريًا.",
                    icon: Eye,
                  },
                  {
                    title: "التدريب المستمر",
                    description: "تدرب على سيناريوهات جديدة باستمرار.",
                    icon: AlertTriangle,
                  },
                  {
                    title: "النسخ الاحتياطي",
                    description: "احتفظ بنسخ احتياطية يومية للبيانات الحساسة.",
                    icon: Globe,
                  },
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
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
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
              العودة إلى مركز المحاكاة
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
