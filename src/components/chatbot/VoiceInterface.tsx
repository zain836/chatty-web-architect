import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface VoiceInterfaceProps {
  isListening: boolean;
  onToggle: (listening: boolean) => void;
  onTranscript: (text: string) => void;
}

const VoiceInterface = ({ isListening, onToggle, onTranscript }: VoiceInterfaceProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        console.log('Voice recognition started');
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        if (event.results[0].isFinal) {
          onTranscript(transcript);
          onToggle(false);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast({
          title: "Voice Recognition Error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive"
        });
        onToggle(false);
      };
      
      recognitionInstance.onend = () => {
        onToggle(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onToggle, onTranscript, toast]);

  useEffect(() => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [isListening, recognition]);

  const toggleListening = () => {
    if (!isSupported) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }
    
    onToggle(!isListening);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Voice Input */}
      <Button
        variant={isListening ? "default" : "outline"}
        size="sm"
        onClick={toggleListening}
        className={`${isListening ? 'btn-glow animate-pulse' : ''}`}
        disabled={!isSupported}
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4 mr-1" />
            <Badge variant="destructive" className="text-xs ml-1">Recording</Badge>
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 mr-1" />
            Voice
          </>
        )}
      </Button>

      {/* Text-to-Speech */}
      <Button
        variant="outline"
        size="sm"
        onClick={isSpeaking ? stopSpeaking : () => speakText("ShadowTalk AI voice interface is ready")}
        disabled={!('speechSynthesis' in window)}
      >
        {isSpeaking ? (
          <>
            <VolumeX className="h-4 w-4 mr-1" />
            Stop
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4 mr-1" />
            Speak
          </>
        )}
      </Button>

      {isListening && (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Listening...</span>
        </div>
      )}
    </div>
  );
};

export default VoiceInterface;