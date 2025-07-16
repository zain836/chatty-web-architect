import { Code, Wifi, Brain, Shield, Zap, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Smart Conversations",
      description: "Advanced AI that understands context and provides intelligent responses to any question or request.",
      color: "text-primary"
    },
    {
      icon: Code,
      title: "Code Generator",
      description: "Generate, debug, and optimize code in any programming language with intelligent suggestions.",
      color: "text-secondary"
    },
    {
      icon: Zap,
      title: "Smart Scripts",
      description: "Automate repetitive tasks with AI-powered script generation for productivity and efficiency.",
      color: "text-accent"
    },
    {
      icon: Wifi,
      title: "Offline Mode",
      description: "Continue working without internet connection. Your AI assistant is always available.",
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your conversations are encrypted and secure. We never store or share your personal data.",
      color: "text-success"
    },
    {
      icon: Download,
      title: "Export Everything",
      description: "Download your chats, generated code, and scripts in multiple formats for easy sharing.",
      color: "text-destructive"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-card/50 border border-border rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need in One{" "}
            <span className="gradient-text">AI Assistant</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From intelligent conversations to code generation, our AI assistant is designed 
            to boost your productivity and creativity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-hover group cursor-pointer"
            >
              <CardContent className="p-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">1M+</div>
            <div className="text-muted-foreground">Messages Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;