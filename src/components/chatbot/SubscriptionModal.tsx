import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Crown, Zap, Shield, Infinity, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
}

const SubscriptionModal = ({ isOpen, onClose, currentPlan }: SubscriptionModalProps) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      id: "premium",
      name: "Premium",
      price: "$20",
      period: "/month",
      description: "For hustlers, students & freelancers",
      icon: Zap,
      color: "blue",
      popular: true,
      features: [
        "Unlimited chat sessions + memory",
        "GPT-4 / Claude 3.5 / Gemini access",
        "Script Writer & PDF Generator",
        "Resume Builder & Document Tools",
        "Smart Spreadsheet Creator",
        "Custom Prompt Saver",
        "VoiceBot AI (listen & reply)",
        "No advertisements"
      ],
      savings: "Save $40/year vs monthly"
    },
    {
      id: "elite",
      name: "Elite",
      price: "$49.99",
      period: "/month",
      description: "For founders, hackers & engineers",
      icon: Shield,
      color: "purple",
      popular: false,
      features: [
        "Everything in Premium +",
        "⚡ Payload Generator (ethical testing)",
        "🕹️ Terminal Simulator with AI",
        "🔍 AI Recon Tool (OSINT engine)",
        "🤖 Shadow Agents (AI task runners)",
        "🔐 Offline Mode (local caching)",
        "🕶️ Stealth Mode (hotkey hide)",
        "🔒 Zero-Knowledge Vault (AES-256)",
        "📊 AI Process Recorder"
      ],
      savings: "Save $120/year vs monthly"
    },
    {
      id: "lifetime",
      name: "Lifetime",
      price: "$99",
      period: "one-time",
      description: "🔥 Pay once, own forever!",
      icon: Infinity,
      color: "gold",
      popular: false,
      features: [
        "🏆 All current & future Elite features",
        "🧬 Custom AI Engine with your name",
        "👑 ShadowTalk Founder Badge",
        "🚀 Alpha Labs access (unreleased tools)",
        "📱 Multi-device priority syncing",
        "🔧 API + Webhook generation",
        "📈 AI Portfolio Analyzer",
        "🧠 AI Business Ideation Suite",
        "🗃️ 1TB Encrypted AI Storage",
        "👤 Dedicated AI Concierge",
        "🎟️ Annual Private Events (VIP)"
      ],
      savings: "🔥 Only 47 licenses left!",
      urgency: true
    }
  ];

  const handleUpgrade = (planId: string) => {
    navigate('/pricing');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Crown className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold gradient-text">Upgrade ShadowTalk AI</span>
            </div>
            <p className="text-muted-foreground font-normal">
              Unlock the full power of the God of Chatbots
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative card-hover cursor-pointer transition-all ${
                selectedPlan === plan.id ? 'ring-2 ring-primary shadow-glow' : ''
              } ${plan.popular ? 'ring-2 ring-blue-400 shadow-glow scale-105' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              {plan.urgency && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-destructive text-destructive-foreground urgency-blink">
                  🔥 Limited Time!
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary mb-4 mx-auto`}>
                  <plan.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{plan.savings}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  className={`w-full ${plan.popular ? 'btn-glow' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-success" />
              <span>30-day money-back guarantee</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-success" />
              <span>Cancel anytime</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-success" />
              <span>Secure payment</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-success" />
              <span>Instant activation</span>
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-gold" />
              <span>4.9/5 rating</span>
            </div>
            <span>•</span>
            <span>89,247+ satisfied users</span>
            <span>•</span>
            <span>SOC 2 certified</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;