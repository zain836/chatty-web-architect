import { useState, useEffect, useRef } from "react";
import { MessageCircle, Settings, Lock, Zap, Crown, Infinity, Mic, MicOff, Eye, EyeOff, Terminal, Shield, Briefcase, Sparkles, Bot, User, Send, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import PayloadGenerator from "@/components/chatbot/PayloadGenerator";
import ScriptWriter from "@/components/chatbot/ScriptWriter";
import BusinessPlanner from "@/components/chatbot/BusinessPlanner";
import StealthMode from "@/components/chatbot/StealthMode";
import VoiceInterface from "@/components/chatbot/VoiceInterface";
import SubscriptionModal from "@/components/chatbot/SubscriptionModal";

const ChatbotPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "🔥 Welcome to ShadowTalk AI - The God of Chatbots. I'm your personal AI assistant with superpowers. What would you like to create today?",
      timestamp: new Date(),
      personality: "mentor"
    }
  ]);
  const [userPlan, setUserPlan] = useState("free"); // free, premium, elite, lifetime
  const [isListening, setIsListening] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState("mentor");
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [dailyChats, setDailyChats] = useState(12);
  const [isMinimized, setIsMinimized] = useState(false);
  const [onlineUsers] = useState(Math.floor(Math.random() * 50000) + 89000);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personalities = [
    { id: "mentor", name: "AI Mentor", icon: "🧠", description: "Wise and supportive" },
    { id: "hacker", name: "Shadow Hacker", icon: "⚡", description: "Technical and precise" },
    { id: "ceo", name: "Business CEO", icon: "💼", description: "Strategic and bold" },
    { id: "therapist", name: "Life Coach", icon: "💫", description: "Empathetic and caring" },
    { id: "comedian", name: "AI Comedian", icon: "😄", description: "Fun and entertaining" }
  ];

  const plans = {
    free: { name: "Free", color: "text-muted-foreground", limit: 15 },
    premium: { name: "Premium", color: "text-blue-400", limit: "∞" },
    elite: { name: "Elite", color: "text-purple-400", limit: "∞" },
    lifetime: { name: "Lifetime", color: "text-gold", limit: "∞" }
  };

  const features = {
    free: ["Basic AI responses", "15 chats/day", "Voice-to-text", "Simple notes"],
    premium: ["GPT-4 level responses", "Unlimited chats", "Script writer", "PDF generator", "Resume builder"],
    elite: ["Payload generator", "Terminal simulator", "Stealth mode", "AI agents", "Offline mode"],
    lifetime: ["Custom AI engine", "AI concierge", "Priority servers", "VIP access", "Future updates"]
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    if (userPlan === "free" && dailyChats >= 15) {
      setShowSubscriptionModal(true);
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date(),
      personality: selectedPersonality
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setDailyChats(prev => prev + 1);

    // Simulate AI response based on content
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, selectedPersonality, userPlan);
    setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
        personality: selectedPersonality
      }]);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string, personality: string, plan: string) => {
    const message = userMessage.toLowerCase();
    
    // Payload generation requests
    if (message.includes("payload") || message.includes("exploit") || message.includes("hack")) {
      if (plan !== "elite" && plan !== "lifetime") {
        return "🔒 Payload Generator is an Elite feature. Upgrade to access advanced ethical hacking tools and secure script generation. Elite users get unlimited payload creation with safety guidance.";
      }
      return "⚡ Payload Generator activated! I can help you create ethical testing scripts. What type of payload do you need? (Reverse shell, XSS, SQL injection test, etc.) Remember: Use only for authorized testing.";
    }

    // Script writing requests
    if (message.includes("script") || message.includes("code") || message.includes("program")) {
      if (plan === "free") {
        return "🔒 Advanced Script Writer requires Premium or higher. I can create basic code snippets in Free tier. Upgrade for full automation scripts, complex algorithms, and multi-language support.";
      }
      return "🛠️ Script Writer ready! What programming language and functionality do you need? I can create Python, JavaScript, Bash, PowerShell, and more. Specify your requirements and I'll generate clean, documented code.";
    }

    // Business planning requests
    if (message.includes("business") || message.includes("startup") || message.includes("plan")) {
      if (plan !== "lifetime" && plan !== "elite") {
        return "🔒 AI Business Planner is available for Elite+ users. I can provide basic business advice in lower tiers. Upgrade for full business plan generation, pitch decks, and financial projections.";
      }
      return "📈 Business Intelligence activated! I can help create comprehensive business plans, analyze markets, generate pitch decks, and provide strategic insights. What's your business idea or challenge?";
    }

    // Personality-based responses
    const responses = {
      mentor: [
        "🧠 I understand your question. Let me guide you through this step by step. Based on my analysis, here's what I recommend...",
        "💡 Great question! This reminds me of a pattern I've seen before. Here's how we can approach this strategically...",
        "🎯 I can help you solve this efficiently. Let's break it down into manageable parts and create a roadmap..."
      ],
      hacker: [
        "⚡ Analyzing your request... I detect you're looking for technical solutions. Here's my tactical assessment...",
        "🔍 Scanning available resources... I've identified several approaches. Let me show you the most effective method...",
        "🛡️ Security protocol engaged. I'll provide you with precise, tested solutions. Initiating response sequence..."
      ],
      ceo: [
        "💼 Excellent point. From a strategic perspective, this presents both opportunities and challenges. Here's my executive summary...",
        "📊 I've analyzed the market data and trends. Based on current metrics, I recommend this approach for maximum ROI...",
        "🚀 Time is money. Let me give you actionable insights that will drive results immediately..."
      ],
      therapist: [
        "💫 I hear you, and I want you to know that what you're experiencing is valid. Let's work through this together...",
        "🤗 Thank you for sharing that with me. It takes courage to open up. Here's how we can move forward positively...",
        "🌟 You're doing great by seeking help. Let me offer some gentle guidance that might help you feel more empowered..."
      ],
      comedian: [
        "😄 Haha, well that's an interesting way to put it! Let me tackle this with some humor and helpful advice...",
        "🎭 You know what they say about that... Just kidding! But seriously, here's what I think would work best...",
        "😂 I love your style! Okay, between you and me, here's the real deal on how to handle this situation..."
      ]
    };

    const personalityResponses = responses[personality] || responses.mentor;
    return personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (stealthMode) {
    return <StealthMode onDisableStealthMode={() => setStealthMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bot className="h-8 w-8 text-primary" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full pulse-dot"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">ShadowTalk AI</h1>
              <p className="text-sm text-muted-foreground counter-glow">
                {onlineUsers.toLocaleString()} users online • God Mode Active
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className={`${plans[userPlan].color} bg-card border-border`}>
              {plans[userPlan].name} • {dailyChats}/{plans[userPlan].limit} chats
            </Badge>
            
            {(userPlan === "elite" || userPlan === "lifetime") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStealthMode(true)}
                className="text-muted-foreground hover:text-purple-400"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          {!isMinimized && (
            <div className="lg:col-span-1 space-y-6">
              {/* Personality Selector */}
              <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow">
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>AI Personality</span>
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {personalities.map((personality) => (
                    <div
                      key={personality.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedPersonality === personality.id
                          ? 'bg-primary/20 border border-primary'
                          : 'bg-muted/50 hover:bg-muted/80'
                      }`}
                      onClick={() => setSelectedPersonality(personality.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{personality.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{personality.name}</p>
                          <p className="text-xs text-muted-foreground">{personality.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Tools */}
              <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow">
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Quick Tools</span>
                  </h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Tabs defaultValue="tools" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="tools">Tools</TabsTrigger>
                      <TabsTrigger value="agents">Agents</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="tools" className="space-y-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => userPlan === "free" ? setShowSubscriptionModal(true) : null}
                      >
                        <Terminal className="h-4 w-4 mr-2" />
                        Script Generator
                        {userPlan === "free" && <Lock className="h-3 w-3 ml-auto" />}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => (userPlan !== "elite" && userPlan !== "lifetime") ? setShowSubscriptionModal(true) : null}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Payload Generator
                        {(userPlan !== "elite" && userPlan !== "lifetime") && <Lock className="h-3 w-3 ml-auto" />}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => (userPlan !== "lifetime" && userPlan !== "elite") ? setShowSubscriptionModal(true) : null}
                      >
                        <Briefcase className="h-4 w-4 mr-2" />
                        Business Planner
                        {(userPlan !== "lifetime" && userPlan !== "elite") && <Lock className="h-3 w-3 ml-auto" />}
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="agents" className="space-y-2 mt-4">
                      <div className="text-center py-4">
                        <Crown className="h-8 w-8 text-gold mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">AI Agents available in Elite+</p>
                        <Button 
                          size="sm" 
                          className="mt-2"
                          onClick={() => setShowSubscriptionModal(true)}
                        >
                          Upgrade Now
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Chat Area */}
          <div className={`${isMinimized ? 'lg:col-span-4' : 'lg:col-span-3'}`}>
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow h-[calc(100vh-200px)]">
              {/* Chat Header */}
              <CardHeader className="border-b border-border pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full pulse-dot"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">ShadowTalk AI <span className="text-success">●</span></h3>
                      <p className="text-xs text-muted-foreground">
                        {personalities.find(p => p.id === selectedPersonality)?.name} Mode Active
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <VoiceInterface 
                      isListening={isListening}
                      onToggle={setIsListening}
                      onTranscript={(text) => setMessage(text)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSubscriptionModal(true)}
                      className="btn-glow"
                    >
                      <Crown className="h-4 w-4 mr-1" />
                      Upgrade
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 h-[calc(100vh-350px)]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 ${
                      msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === 'user' ? 'bg-primary' : 'bg-gradient-primary'
                    }`}>
                      {msg.type === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      msg.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted/80 text-foreground border border-border'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message ShadowTalk AI... (${15 - dailyChats} chats left today)`}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="btn-glow">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  ShadowTalk AI can make mistakes. Verify important information.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        currentPlan={userPlan}
        onUpgrade={setUserPlan}
      />
    </div>
  );
};

export default ChatbotPage;