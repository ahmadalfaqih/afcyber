"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Target, Award, BookOpen, Globe, ArrowRight, Mail, Github, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "أحمد الفقيه",
    role: "مطور الأمن السيبراني",
    bio: "خبير في الأمن السيبراني مع أكثر من 3 سنوات خبرة في تطوير حلول الحماية المتقدمة.",
    avatar: "AF"
  },
  {
    name: "****",
    role: "مصمم تجربة المستخدم",
    bio: "متخصص في تصميم واجهات تعليمية تفاعلية تجعل المفاهيم المعقدة سهلة الفهم.",
    avatar: ""
  },
  {
    name: " *****",
    role: "مطور واجهات أمامية",
    bio: "محترف في تطوير تطبيقات الويب الحديثة باستخدام أحدث التقنيات والأطر البرمجية.",
    avatar: ""
  },
  {
    name: " ****",
    role: "خبير تعليمية",
    bio: "متخصص في تطوير المحتوى التعليمي وطرق التدريس الحديثة في مجال التكنولوجيا.",
    avatar: ""
  }
]

const stats = [
  { label: "محاكاة تفاعلية", value: "6+", icon: Shield },
  { label: "مستخدم", value: "15K+", icon: Users },
  { label: "مصطلح شرح", value: "50+", icon: BookOpen },
  { label: "دولة مستفيدة", value: "20+", icon: Globe }
]

const values = [
  {
    title: "التعليم للجميع",
    description: "نؤمن بأن الأمن السيبراني يجب أن يكون في متناول الجميع، بغض النظر عن خلفيتهم التقنية.",
    icon: Users
  },
  {
    title: "التعلم العملي",
    description: "نركز على التجربة العملية والمحاكاة التفاعلية لتعزيز الفهم الحقيقي.",
    icon: Target
  },
  {
    title: "التحديث المستمر",
    description: "نقوم بتحديث محتواناً باستمرار لمواكبة أحدث التهديدات والحلول الأمنية.",
    icon: Shield
  },
  {
    title: "الجودة والموثوقية",
    description: "نلتزم بتقديم معلومات دقيقة وموثوقة مدعومة بالخبرة العملية.",
    icon: Award
  }
]

export default function About() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 cyber-border cyber-glow bg-primary/10 text-primary border-primary/20">
            <Shield className="w-4 h-4 ml-2" />
            من نحن
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 cyber-text">
          AF Cybersecurity
                   </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            منصة تعليمية رائدة في مجال الأمن السيبراني، تهدف إلى تمكين الأفراد والمؤسسات 
            من خلال المعرفة العملية والتجارب التفاعلية.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="cyber-border bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4 cyber-text">مهمتنا</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    نسعى لجعل الأمن السيبراني مفهوماً ومتاحاً للجميع من خلال تحويل المفاهيم المعقدة 
                    إلى تجارب تعليمية تفاعلية وممتعة. نؤمن بأن التوعية الأمنية هي الخطوة الأولى 
                    نحو بناء عالم رقمي أكثر أماناً.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="cyber-border bg-primary/10 text-primary border-primary/20">
                      تعليم تفاعلي
                    </Badge>
                    <Badge className="cyber-border bg-primary/10 text-primary border-primary/20">
                      محاكاة واقعية
                    </Badge>
                    <Badge className="cyber-border bg-primary/10 text-primary border-primary/20">
                      محتوى موثوق
                    </Badge>
                  </div>
                </div>
                <div className="text-center">
                  <Shield className="w-32 h-32 text-primary mx-auto animate-pulse-slow" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="cyber-border bg-card/50 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold cyber-text mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 cyber-text">قيمنا</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              المبادئ التي توجه عملنا وتشكل أساس منصتنا التعليمية
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="cyber-border bg-card/50 backdrop-blur-sm hover:cyber-glow transition-all duration-300 h-full">
                  <CardHeader>
                    <value.icon className="w-10 h-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 cyber-text">فريق العمل</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              فريق من الخبراء المتخصصين يشاركونك شغفهم بالأمن السيبراني
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card className="cyber-border bg-card/50 backdrop-blur-sm hover:cyber-glow transition-all duration-300 text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-primary/20 border-2 border-primary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{member.avatar}</span>
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="cyber-border bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 cyber-text">تواصل معنا</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  هل لديك أسئلة أو اقتراحات؟ نحب أن نسمع منك! فريقنا جاهز لمساعدتك في رحلتك 
                  لتعلم الأمن السيبراني.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Button asChild className="cyber-glow bg-primary hover:bg-primary/90">
                    <a href="mailto:ahmadbutc@gmail.com">
                      <Mail className="w-4 h-4 ml-2" />
                      راسلنا عبر البريد
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://www.instagram.com/af_btec/" target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-4 h-4 ml-2" />
                      تابعنا على الانستقرام
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://chat.whatsapp.com/LZ4YJHk6WHQ4gky0zbBdmp" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 ml-2" />
                      أنظم الى مجموعتنا
                    </a>
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>البريد الإلكتروني: ahmadalfaqih@gmail.com</p>
                  <p>ساعات العمل: الأحد - الخميس، 9:00 ص - 5:00 م (توقيت لااردن)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-center mt-12">
          <Button asChild>
            <Link href="/glossary">
              <ArrowRight className="w-4 h-4 ml-2" />
              القاموس السيبراني
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}