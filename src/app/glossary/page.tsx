"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, Shield, Lock, Globe, Database, Eye, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface GlossaryTerm {
  id: string
  term: string
  englishTerm: string
  category: string
  difficulty: "basic" | "intermediate" | "advanced"
  definition: string
  example?: string
  relatedTerms?: string[]
}

const glossaryTerms: GlossaryTerm[] = [
  {
    id: "ddos",
    term: "هجوم حجب الخدمة الموزعة",
    englishTerm: "DDoS (Distributed Denial of Service)",
    category: "هجمات",
    difficulty: "basic",
    definition: "هجوم يحاول جعل الخدمة أو الموقع غير متاح للمستخدمين الشرعيين من خلال إغراق الخادم بطلبات وهمية من مصادر متعددة.",
    example: "عندما يرسل مهاجم آلاف الطلبات في الثانية إلى موقع تجارة إلكتروني، مما يجعله بطيئاً أو غير متاح للعملاء الحقيقيين.",
    relatedTerms: ["botnet", "firewall", "traffic-filtering"]
  },
  {
    id: "phishing",
    term: "التصيد الاحتيالي",
    englishTerm: "Phishing",
    category: "هجمات",
    difficulty: "basic",
    definition: "محاولة سرقة معلومات حساسة مثل كلمات المرور أو معلومات البطاقات الائتمانية من خلال انتحال شخصية كيان موثوق في الاتصالات الإلكترونية.",
    example: "رسالة بريد إلكتروني تبدو من بنكك تطلب تحديث معلومات حسابك عبر رابط يؤدي إلى موقع مزيف.",
    relatedTerms: ["spear-phishing", "social-engineering", "malware"]
  },
  {
    id: "ransomware",
    term: "برامج الفدية",
    englishTerm: "Ransomware",
    category: "برامج ضارة",
    difficulty: "intermediate",
    definition: "نوع من البرامج الضارة تشفر ملفات الضحية وتطالب بدفع فدية لاستعادتها.",
    example: "برنامج يقوم بتشفير جميع ملفات المستخدم ويعرض رسالة تطالب بدفع 1 بيتكوين للحصول على مفتاح فك التشفير.",
    relatedTerms: ["malware", "encryption", "backup"]
  },
  {
    id: "sql-injection",
    term: "حقن SQL",
    englishTerm: "SQL Injection",
    category: "هجمات",
    difficulty: "advanced",
    definition: "هجوم يستغل ثغرات في تطبيقات الويب لإدخال أوامر SQL خبيثة في قاعدة البيانات.",
    example: "إدخال 'OR '1'='1 في حقل تسجيل الدخول لتجاوز التحقق من كلمة المرور.",
    relatedTerms: ["database", "web-security", "input-validation"]
  },
  {
    id: "man-in-the-middle",
    term: "هجوم الرجل في المنتصف",
    englishTerm: "Man-in-the-Middle Attack",
    category: "هجمات",
    difficulty: "intermediate",
    definition: "هجوم يعترض المهاجم فيه الاتصال بين طرفين دون علمهما، ويمكنه قراءة وتعديل المعلومات المنقولة.",
    example: "المهاجم على شبكة Wi-Fi عامة يعترض الاتصال بين المستخدم وموقعه المصرفي.",
    relatedTerms: ["encryption", "https", "vpn", "certificate"]
  },
  {
    id: "spear-phishing",
    term: "التصيد المستهدف",
    englishTerm: "Spear Phishing",
    category: "هجمات",
    difficulty: "advanced",
    definition: "هجوم تصيد موجه ومخصص لهدف معين باستخدام معلومات شخصية لزيادة فرص النجاح.",
    example: "رسالة بريد إلكتروني مخصصة لمدير شركة تبدو من زميل عمل وتطلب معلومات حساسة عن المشروع.",
    relatedTerms: ["phishing", "social-engineering", "reconnaissance"]
  },
  {
    id: "malware",
    term: "البرامج الضارة",
    englishTerm: "Malware",
    category: "برامج ضارة",
    difficulty: "basic",
    definition: "أي برنامج مصمم لإلحاق الضرر بالكمبيوتر أو الشبكة أو سرقة المعلومات.",
    example: "فيروس يصيب ملفات النظام ويسبب بطء الكمبيوتر وفقدان البيانات.",
    relatedTerms: ["virus", "trojan", "worm", "ransomware"]
  },
  {
    id: "firewall",
    term: "جدار الحماية",
    englishTerm: "Firewall",
    category: "حماية",
    difficulty: "basic",
    definition: "نظام أمن يراقب ويتحكم في حركة الشبكة الواردة والصادرة بناءً على قواعد أمنية محددة مسبقاً.",
    example: "برنامج يمنع الوصول إلى مواقع الويب الضارة ويحظر الاتصالات من عناوين IP مشبوهة.",
    relatedTerms: ["network-security", "ids", "ips"]
  },
  {
    id: "encryption",
    term: "التشفير",
    englishTerm: "Encryption",
    category: "حماية",
    difficulty: "intermediate",
    definition: "عملية تحويل البيانات إلى شكل مشفر لا يمكن قراءته إلا بامتلاك مفتاح فك التشفير الصحيح.",
    example: "تشفير رسالة بريد إلكتروني بحيث لا يمكن قراءتها إلا من قبل المستلم المقصود.",
    relatedTerms: ["decryption", "ssl", "tls", "cryptography"]
  },
  {
    id: "vpn",
    term: "الشبكة الافتراضية الخاصة",
    englishTerm: "VPN (Virtual Private Network)",
    category: "حماية",
    difficulty: "basic",
    definition: "خدمة تنشئ اتصالاً آمناً ومشفراً عبر الإنترنت، مما يخفي عنوان IP ويحمي الخصوصية.",
    example: "استخدام VPN عند الاتصال بشبكة Wi-Fi عامة لحماية البيانات من الاعتراض.",
    relatedTerms: ["privacy", "tunneling", "ip-address"]
  },
  {
    id: "two-factor-authentication",
    term: "المصادقة الثنائية",
    englishTerm: "Two-Factor Authentication (2FA)",
    category: "حماية",
    difficulty: "basic",
    definition: "طريقة أمان تتطلب شكلين مختلفين من الهوية للوصول إلى الحساب، مثل كلمة المرور ورمز من الهاتف.",
    example: "بعد إدخال كلمة المرور، يتطلب التطبيق رمزاً يتم إرساله إلى هاتفك.",
    relatedTerms: ["mfa", "authentication", "security"]
  },
  {
    id: "botnet",
    term: "شبكة البوتات",
    englishTerm: "Botnet",
    category: "هجمات",
    difficulty: "advanced",
    definition: "شبكة من أجهزة الكمبيوتر المصابة بالبرامج الضارة التي يتحكم فيها المهاجم عن بعد.",
    example: "شبكة من 10000 جهاز مصاب تستخدم لإطلاق هجوم DDoS ضخم على موقع ويب.",
    relatedTerms: ["ddos", "malware", "zombie-computer"]
  },
  {
    id: "social-engineering",
    term: "الهندسة الاجتماعية",
    englishTerm: "Social Engineering",
    category: "هجمات",
    difficulty: "intermediate",
    definition: "استخدام التلاعب النفسي لإقناع الأشخاص بكشف معلومات سرية أو القيام بأفعال أمنية غير آمنة.",
    example: "مهاجم يتصل بموظف ويدعي أنه من قسم تكنولوجيا المعلومات ويطلب كلمة المرور.",
    relatedTerms: ["phishing", "pretexting", "manipulation"]
  },
  {
    id: "zero-day",
    term: "ثغرة اليوم الصفري",
    englishTerm: "Zero-Day Vulnerability",
    category: "هجمات",
    difficulty: "advanced",
    definition: "ثغرة أمنية غير معروفة للمطورين ولا يوجد لها تصحيح متاح.",
    example: "مهاجم يكتشف ثغرة في نظام التشغيل ويستغلها قبل أن يتمكن المطورون من إصدار تحديث.",
    relatedTerms: ["vulnerability", "exploit", "patch"]
  }
]

const categories = ["الكل", "هجمات", "برامج ضارة", "حماية"]
const difficulties = ["basic", "intermediate", "advanced"]

const difficultyColors = {
  basic: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30"
}

const difficultyLabels = {
  basic: "أساسي",
  intermediate: "متوسط",
  advanced: "متقدم"
}

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.englishTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "الكل" || term.category === selectedCategory
      const matchesDifficulty = !selectedDifficulty || term.difficulty === selectedDifficulty
      
      return matchesSearch && matchesCategory && matchesDifficulty
    })
  }, [searchTerm, selectedCategory, selectedDifficulty])

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
            <BookOpen className="w-4 h-4 ml-2" />
            مرجع الأمن السيبراني
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
            القاموس السيبراني
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            تعلم المصطلحات التقنية في مجال الأمن السيبراني من خلال شروحات مبسطة وأمثلة عملية.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="cyber-border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="md:col-span-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="ابحث عن مصطلح..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(
                          selectedDifficulty === difficulty ? null : difficulty
                        )}
                      >
                        {difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-center">
                <span className="text-sm text-muted-foreground">
                  تم العثور على {filteredTerms.length} مصطلح
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((term, index) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="cyber-border bg-card/50 backdrop-blur-sm hover:cyber-glow transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight mb-2">
                        {term.term}
                      </CardTitle>
                      <CardDescription className="text-sm font-mono text-primary">
                        {term.englishTerm}
                      </CardDescription>
                    </div>
                    <Badge className={difficultyColors[term.difficulty]}>
                      {difficultyLabels[term.difficulty]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">التعريف:</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {term.definition}
                      </p>
                    </div>

                    {term.example && (
                      <div>
                        <div className="text-sm font-medium mb-1">مثال:</div>
                        <p className="text-sm text-muted-foreground bg-muted/30 rounded p-2">
                          {term.example}
                        </p>
                      </div>
                    )}

                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-2">مصطلحات ذات صلة:</div>
                        <div className="flex flex-wrap gap-1">
                          {term.relatedTerms.map((relatedTerm) => (
                            <Badge key={relatedTerm} variant="outline" className="text-xs">
                              {relatedTerm}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTerms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">لم يتم العثور على مصطلحات</h3>
            <p className="text-muted-foreground mb-4">
              جرب تغيير مصطلح البحث أو تعديل الفلاتر
            </p>
            <Button onClick={() => {
              setSearchTerm("")
              setSelectedCategory("الكل")
              setSelectedDifficulty(null)
            }}>
              مسح الفلاتر
            </Button>
          </motion.div>
        )}

        {/* Learning Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="cyber-border bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                مصادر تعليمية إضافية
              </CardTitle>
              <CardDescription>
                تعمق في فهم الأمن السيبراني من خلال هذه المصادر
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "مركز المحاكاة",
                    description: "جرب المحاكاة التفاعلية لفهم كيف تعمل الهجمات",
                    icon: Eye,
                    href: "/simulation-center"
                  },
                  {
                    title: "خريطة الهجمات",
                    description: "شاهد الهجمات السيبرانية في الوقت الفعلي",
                    icon: Globe,
                    href: "/attack-map"
                  },
                  {
                    title: "دليل الحماية",
                    description: "تعلم كيفية حماية نفسك من الهجمات الشائعة",
                    icon: Lock,
                    href: "#"
                  }
                ].map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Card className="cyber-border bg-card/50 backdrop-blur-sm hover:cyber-glow transition-all duration-300 group cursor-pointer">
                      <Link href={resource.href}>
                        <CardHeader>
                          <resource.icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{resource.description}</CardDescription>
                        </CardContent>
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center mt-12">
          <Button asChild>
            <Link href="/simulation/spear-phishing">
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للمحاكاة
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}