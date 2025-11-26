"use client"
// لحل مشكلة التحميل في Next.js
import dynamic from 'next/dynamic';
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Globe, Shield, AlertTriangle, TrendingUp, Zap } from "lucide-react"

interface Attack {
  id: string
  type: string
  source: { lat: number; lng: number; country: string; city: string }
  target: { lat: number; lng: number; country: string; city: string }
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
  description: string
}

const attackTypes = [
  "DDoS", "Phishing", "Ransomware", "SQL Injection", 
  "Man-in-the-Middle", "Spear Phishing", "Malware", "Zero-day"
]

const countries = [
  { name: "الولايات المتحدة", lat: 39.8283, lng: -98.5795, cities: ["نيويورك", "واشنطن", "لوس أنجلوس"] },
  { name: "الصين", lat: 35.8617, lng: 104.1954, cities: ["بكين", "شانغهاي", "شنتشن"] },
  { name: "روسيا", lat: 61.5240, lng: 105.3188, cities: ["موسكو", "سان بطرسبرغ", "نوفوسيبيرسك"] },
  { name: "ألمانيا", lat: 51.1657, lng: 10.4515, cities: ["برلين", "ميونخ", "هامبورغ"] },
  { name: "المملكة المتحدة", lat: 55.3781, lng: -3.4360, cities: ["لندن", "مانشستر", "برمنغهام"] },
  { name: "فرنسا", lat: 46.2276, lng: 2.2137, cities: ["باريس", "مرسيليا", "ليون"] },
  { name: "اليابان", lat: 36.2048, lng: 138.2529, cities: ["طوكيو", "أوساكا", "كيوتو"] },
  { name: "الهند", lat: 20.5937, lng: 78.9629, cities: ["نيودلهي", "مومباي", "بنغالور"] },
  { name: "البرازيل", lat: -14.2350, lng: -51.9253, cities: ["ساو باولو", "ريو دي جانيرو", "برازيليا"] },
  { name: "أستراليا", lat: -25.2744, lng: 133.7751, cities: ["سيدني", "ملبورن", "بريزبان"] },
  { name: "السعودية", lat: 23.8859, lng: 45.0792, cities: ["الرياض", "جدة", "الدوحة"] },
  { name: "مصر", lat: 26.8206, lng: 30.8025, cities: ["القاهرة", "الإسكندرية", "الأقصر"] }
]

const severityColors = {
  low: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  critical: "bg-red-500/20 text-red-400 border-red-500/30"
}

const severityLabels = {
  low: "منخفض",
  medium: "متوسط", 
  high: "مرتفع",
  critical: "حرج"
}

export default function AttackMap() {
  const [attacks, setAttacks] = useState<Attack[]>([])
  const [selectedAttack, setSelectedAttack] = useState<Attack | null>(null)
  const [isLive, setIsLive] = useState(true)
  const [stats, setStats] = useState({
    totalAttacks: 0,
    attacksPerMinute: 0,
    topTargetCountry: "",
    mostCommonAttack: ""
  })

  const generateRandomAttack = (): Attack => {
    const sourceCountry = countries[Math.floor(Math.random() * countries.length)]
    const targetCountry = countries[Math.floor(Math.random() * countries.length)]
    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)]
    const severities: Array<"low" | "medium" | "high" | "critical"> = ["low", "medium", "high", "critical"]
    const severity = severities[Math.floor(Math.random() * severities.length)]

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: attackType,
      source: {
        lat: sourceCountry.lat + (Math.random() - 0.5) * 10,
        lng: sourceCountry.lng + (Math.random() - 0.5) * 10,
        country: sourceCountry.name,
        city: sourceCountry.cities[Math.floor(Math.random() * sourceCountry.cities.length)]
      },
      target: {
        lat: targetCountry.lat + (Math.random() - 0.5) * 10,
        lng: targetCountry.lng + (Math.random() - 0.5) * 10,
        country: targetCountry.name,
        city: targetCountry.cities[Math.floor(Math.random() * targetCountry.cities.length)]
      },
      severity,
      timestamp: new Date(),
      description: `محاولة ${attackType} من ${sourceCountry.name} إلى ${targetCountry.name}`
    }
  }

  useEffect(() => {
    // Generate initial attacks
    const initialAttacks = Array.from({ length: 8 }, generateRandomAttack)
    setAttacks(initialAttacks)

    if (isLive) {
      const interval = setInterval(() => {
        const newAttack = generateRandomAttack()
        setAttacks(prev => {
          const updated = [newAttack, ...prev].slice(0, 20) // Keep only last 20 attacks
          return updated
        })
      }, 2000) // New attack every 2 seconds

      return () => clearInterval(interval)
    }
  }, [isLive])

  useEffect(() => {
    // Update stats
    const countryCounts = attacks.reduce((acc, attack) => {
      acc[attack.target.country] = (acc[attack.target.country] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const attackCounts = attacks.reduce((acc, attack) => {
      acc[attack.type] = (acc[attack.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const topTarget = Object.entries(countryCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || ""
    const mostCommon = Object.entries(attackCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || ""

    setStats({
      totalAttacks: attacks.length,
      attacksPerMinute: Math.round(attacks.length * 30 / 10), // Rough estimate
      topTargetCountry: topTarget,
      mostCommonAttack: mostCommon
    })
  }, [attacks])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-primary/10 text-primary border-primary/20">
            <Activity className="w-4 h-4 ml-2" />
            مراقبة مباشرة
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            خريطة الهجمات المباشرة
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            شاهد الهجمات السيبرانية الوهمية في الوقت الفعلي على خريطة العالم
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsLive(!isLive)}
            variant={isLive ? "default" : "outline"}
            className="cyber-glow"
          >
            {isLive ? (
              <>
                <Zap className="w-4 h-4 ml-2" />
                مباشر
              </>
            ) : (
              <>
                <Activity className="w-4 h-4 ml-2" />
                متوقف
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="cyber-border bg-card/50 backdrop-blur-sm h-[600px] relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  خريطة الهجمات العالمية
                </CardTitle>
                <CardDescription>
                  الهجمات المعروضة هي وهمية لأغراض تعليمية فقط
                </CardDescription>
              </CardHeader>
            <CardContent className="p-0">
  <div className="relative w-full h-[500px]">
    {typeof window !== 'undefined' ? (
      <div className="w-full h-full">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-180%2C-90%2C180%2C90&amp;layer=mapnik&amp;marker=0%2C0"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: '1px solid #3b82f6', borderRadius: '8px' }}
          title="خريطة العالم"
        ></iframe>
      </div>
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        تحميل الخريطة...
      </div>
    )}
    
    {/* عرض نقاط الهجمات كـ مؤشرات فوق الخريطة (تقريبي) */}
    {attacks.slice(0, 10).map((attack, index) => {
      // تحويل إحداثيات GPS إلى نسبة مئوية على الشاشة (تقريبية)
      const left = 50 + (attack.target.lng / 360) * 100; // -180 إلى 180 → 0% إلى 100%
      const top = 50 - (attack.target.lat / 180) * 100;   // -90 إلى 90 → 100% إلى 0%

      return (
        <div
          key={attack.id}
          className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer z-10"
          style={{
            left: `${Math.max(5, Math.min(95, left))}%`,
            top: `${Math.max(5, Math.min(95, top))}%`,
          }}
          onClick={() => setSelectedAttack(attack)}
          title={`${attack.type} → ${attack.target.city}`}
        />
      );
    })}
  </div>
</CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">الإحصائيات الحية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">إجمالي الهجمات</span>
                  <span className="font-bold cyber-text">{stats.totalAttacks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">الهجمات/دقيقة</span>
                  <span className="font-bold text-cyber-green">{stats.attacksPerMinute}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">الهدف الأكثر</span>
                  <span className="font-bold text-cyber-orange text-sm">
                    {stats.topTargetCountry || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">الهجوم الأكثر</span>
                  <span className="font-bold text-cyber-blue text-sm">
                    {stats.mostCommonAttack || "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Attacks */}
            <Card className="cyber-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">الهجمات الأخيرة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {attacks.slice(0, 8).map((attack) => (
                    <motion.div
                      key={attack.id}
                      className="p-3 rounded-lg border border-border/50 hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedAttack(attack)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={`text-xs ${severityColors[attack.severity]}`}>
                          {severityLabels[attack.severity]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(attack.timestamp).toLocaleTimeString('ar-SA')}
                        </span>
                      </div>
                      <div className="text-sm font-medium">{attack.type}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {attack.source.city} → {attack.target.city}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Attack Modal */}
        {selectedAttack && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedAttack(null)}
          >
            <motion.div
              className="bg-card cyber-border rounded-lg p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold cyber-text">{selectedAttack.type}</h3>
                <Badge className={severityColors[selectedAttack.severity]}>
                  {severityLabels[selectedAttack.severity]}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">المصدر</div>
                  <div className="font-medium">{selectedAttack.source.city}, {selectedAttack.source.country}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">الهدف</div>
                  <div className="font-medium">{selectedAttack.target.city}, {selectedAttack.target.country}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">الوقت</div>
                  <div className="font-medium">{selectedAttack.timestamp.toLocaleString('ar-SA')}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">الوصف</div>
                  <div className="text-sm">{selectedAttack.description}</div>
                </div>
              </div>
              
              <Button
                className="w-full mt-6"
                onClick={() => setSelectedAttack(null)}
              >
                إغلاق
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}