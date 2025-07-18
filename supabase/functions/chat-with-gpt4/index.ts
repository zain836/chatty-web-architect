import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://ngmyhnhobctexmglqvou.supabase.co';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, personality = 'mentor', conversationId, userId } = await req.json();

    if (!message || !userId) {
      return new Response(
        JSON.stringify({ error: 'Message and userId are required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get or create conversation
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      const { data: newConversation, error: conversationError } = await supabase
        .from('conversations')
        .insert([{ user_id: userId, title: message.substring(0, 50) + '...' }])
        .select()
        .single();

      if (conversationError) throw conversationError;
      currentConversationId = newConversation.id;
    }

    // Save user message to database
    const { error: userMessageError } = await supabase
      .from('messages')
      .insert([{
        conversation_id: currentConversationId,
        user_id: userId,
        content: message,
        role: 'user',
        personality
      }]);

    if (userMessageError) throw userMessageError;

    // Get conversation history for context
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('content, role')
      .eq('conversation_id', currentConversationId)
      .order('created_at', { ascending: true })
      .limit(20);

    if (messagesError) throw messagesError;

    // Build conversation context
    const conversationMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Personality-based system prompts
    const personalityPrompts = {
      mentor: "You are a wise and supportive AI mentor. Provide thoughtful, educational guidance with encouraging undertones. Use 🧠 emoji occasionally.",
      hacker: "You are a technical AI assistant with cybersecurity expertise. Be precise, analytical, and focus on ethical security practices. Use ⚡ emoji occasionally.",
      ceo: "You are a strategic business AI advisor. Think like a CEO - focus on ROI, scalability, and actionable business insights. Use 💼 emoji occasionally.",
      therapist: "You are an empathetic AI life coach. Be supportive, understanding, and help users work through challenges positively. Use 💫 emoji occasionally.",
      comedian: "You are a witty AI assistant who adds humor while being genuinely helpful. Keep things light but informative. Use 😄 emoji occasionally."
    };

    const systemPrompt = personalityPrompts[personality] || personalityPrompts.mentor;

    // Call OpenAI GPT-4
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationMessages
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Save AI response to database
    const { error: aiMessageError } = await supabase
      .from('messages')
      .insert([{
        conversation_id: currentConversationId,
        user_id: userId,
        content: aiResponse,
        role: 'assistant',
        personality
      }]);

    if (aiMessageError) throw aiMessageError;

    return new Response(
      JSON.stringify({ 
        response: aiResponse, 
        conversationId: currentConversationId 
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in chat-with-gpt4 function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});