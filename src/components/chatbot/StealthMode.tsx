import { useState, useEffect } from "react";
import { EyeOff, Calculator, FileText, Settings, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface StealthModeProps {
  onDisableStealthMode: () => void;
}

const StealthMode = ({ onDisableStealthMode }: StealthModeProps) => {
  const [disguiseMode, setDisguiseMode] = useState("calculator");
  const [unlockCode, setUnlockCode] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcInput, setCalcInput] = useState("");

  const correctCode = "SHADOW123"; // In production, this would be user-configurable

  useEffect(() => {
    // Listen for secret key combination (Ctrl+Shift+S)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        setIsUnlocking(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleUnlock = () => {
    if (unlockCode === correctCode) {
      onDisableStealthMode();
    } else {
      // Wrong code - reset and continue disguise
      setUnlockCode("");
      setIsUnlocking(false);
      // Add a subtle shake animation or error feedback
    }
  };

  const handleCalcButton = (value: string) => {
    if (value === "=") {
      try {
        const result = eval(calcInput);
        setCalcDisplay(result.toString());
        setCalcInput(result.toString());
      } catch {
        setCalcDisplay("Error");
        setCalcInput("");
      }
    } else if (value === "C") {
      setCalcDisplay("0");
      setCalcInput("");
    } else {
      const newInput = calcInput + value;
      setCalcInput(newInput);
      setCalcDisplay(newInput);
    }
  };

  // Calculator Disguise
  const CalculatorDisguise = () => (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white shadow-lg p-6">
        <div className="mb-4">
          <Input
            value={calcDisplay}
            readOnly
            className="text-right text-2xl font-mono bg-gray-50 border-gray-300"
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {["C", "÷", "×", "⌫"].map((btn) => (
            <Button
              key={btn}
              variant="outline"
              className="h-12 text-gray-700 border-gray-300"
              onClick={() => handleCalcButton(btn === "⌫" ? "C" : btn)}
            >
              {btn}
            </Button>
          ))}
          
          {["7", "8", "9", "-"].map((btn) => (
            <Button
              key={btn}
              variant="outline"
              className="h-12 text-gray-700 border-gray-300"
              onClick={() => handleCalcButton(btn)}
            >
              {btn}
            </Button>
          ))}
          
          {["4", "5", "6", "+"].map((btn) => (
            <Button
              key={btn}
              variant="outline"
              className="h-12 text-gray-700 border-gray-300"
              onClick={() => handleCalcButton(btn)}
            >
              {btn}
            </Button>
          ))}
          
          {["1", "2", "3"].map((btn) => (
            <Button
              key={btn}
              variant="outline"
              className="h-12 text-gray-700 border-gray-300"
              onClick={() => handleCalcButton(btn)}
            >
              {btn}
            </Button>
          ))}
          
          <Button
            variant="default"
            className="h-12 bg-blue-500 hover:bg-blue-600 text-white row-span-2"
            onClick={() => handleCalcButton("=")}
          >
            =
          </Button>
          
          <Button
            variant="outline"
            className="h-12 col-span-2 text-gray-700 border-gray-300"
            onClick={() => handleCalcButton("0")}
          >
            0
          </Button>
          
          <Button
            variant="outline"
            className="h-12 text-gray-700 border-gray-300"
            onClick={() => handleCalcButton(".")}
          >
            .
          </Button>
        </div>
        
        {/* Hidden unlock trigger */}
        <div className="mt-4 text-center">
          <span 
            className="text-xs text-gray-400 cursor-pointer select-none"
            onClick={() => setIsUnlocking(true)}
          >
            v2.1.0
          </span>
        </div>
      </Card>
    </div>
  );

  // Notes Disguise
  const NotesDisguise = () => (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Notes</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">New Note</Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Meeting Notes", content: "Quarterly review meeting...", date: "Today" },
            { title: "Project Ideas", content: "New app concept for...", date: "Yesterday" },
            { title: "Shopping List", content: "Milk, Bread, Eggs...", date: "2 days ago" }
          ].map((note, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="font-medium text-gray-800 mb-2">{note.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{note.content}</p>
              <p className="text-xs text-gray-400">{note.date}</p>
            </Card>
          ))}
        </div>
        
        {/* Hidden unlock area */}
        <div 
          className="fixed bottom-4 right-4 w-8 h-8 cursor-pointer"
          onClick={() => setIsUnlocking(true)}
        />
      </div>
    </div>
  );

  // Unlock Modal
  const UnlockModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-sm bg-card/95 backdrop-blur-lg border-border shadow-glow p-6">
        <div className="text-center mb-6">
          <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold">ShadowTalk Access</h3>
          <p className="text-sm text-muted-foreground">Enter your stealth code</p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="password"
            value={unlockCode}
            onChange={(e) => setUnlockCode(e.target.value)}
            placeholder="Enter stealth code..."
            onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
            autoFocus
          />
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsUnlocking(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleUnlock} className="flex-1 btn-glow">
              Unlock
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Hint: Ctrl+Shift+S or click version number
          </p>
        </div>
      </Card>
    </div>
  );

  if (isUnlocking) {
    return (
      <>
        {disguiseMode === "calculator" ? <CalculatorDisguise /> : <NotesDisguise />}
        <UnlockModal />
      </>
    );
  }

  return disguiseMode === "calculator" ? <CalculatorDisguise /> : <NotesDisguise />;
};

export default StealthMode;